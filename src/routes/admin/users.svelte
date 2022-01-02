<script context="module">
	import { API_URL } from "env";

	export async function load({ fetch, session }) {
		try {
			const res = await fetch(`${API_URL}/users/getAll`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + session.token,
				},
			});

			const result = await res.json();

			if (res.status === 200) {
				return {
					props: { users: result.users },
				};
			} else {
				session.token = null;
				session.user = null;
				return {
					status: res.status,
					error: new Error(result),
				};
			}
		} catch (error) {
			console.error("error:", error);
		}
	}
</script>

<script>
	import Banner from "$components/admin/Banner.svelte";
	import UserModal from "$components/admin/UserModal.svelte";
	import type { User } from "$helpers/interfaces/user";
	import UserAdd from "$svg/admin/UserAdd.svelte";
	import { Role } from "$helpers/enums";
	import Seo from "$components/templates/SEO.svelte";

	export let users: User[];

	let isModalDisplayed: boolean = false;

	let adminUsers: User[];
	let modoUsers: User[];

	const updateArrays = () => {
		adminUsers = users.filter((user) => user.role === Role.ADMIN);
		modoUsers = users.filter((user) => user.role === Role.MODO);
	};

	$: if (users) {
		updateArrays();
	}

	const removeUser = (e) => {
		const uid = e.detail.id;
		users = users.filter((user) => {
			return user._id !== uid;
		});
	};

	const updateList = (e) => {
		if (e.detail.user) users = [...users, e.detail.user];
		isModalDisplayed = false;
	};
</script>

<Seo
	title="Admin | Utilisateurs"
	url="https://www.geniusutt.fr/admin/users" />

<section class="admin-page">
	<article class="adding">
		<h2>Paramètres utilisateurs</h2>
		<button
			class="fill-blue-btn"
			on:click={() => (isModalDisplayed = true)}>
			Ajouter un utilisateur
			<i>
				<UserAdd />
			</i>
		</button>
	</article>
	<h3>Utilisateurs</h3>
	<div class="banners">
		{#await users}
			<p>Chargement...</p>
		{:then}
			<h4>Administrateurs</h4>
			{#each adminUsers as user}
				<Banner
					type="users"
					on:delete={(e) => removeUser(e)}
					data={user} />
			{/each}
			<h4>Modérateurs</h4>
			{#each modoUsers as user}
				<Banner
					type="users"
					on:delete={(e) => removeUser(e)}
					data={user} />
			{/each}
		{:catch err}
			<p>{err}</p>
		{/await}
	</div>
</section>

{#if isModalDisplayed}
	<UserModal action="create" on:remove={updateList} />
{/if}
