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
			console.log("result:", result);

			if (res.status === 200) {
				return {
					props: { users: result.users },
				};
			} else {
				return {
					status: res.status,
					error: new Error(JSON.stringify(result)),
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

	let adminUsers: User[];
	let modoUsers: User[];

	$: if (users) {
		adminUsers = users.filter((user) => user.role === Role.ADMIN);
		modoUsers = users.filter((user) => user.role === Role.MODO);
	}

	let isModalDisplayed: boolean = false;

	const removeUser = (i) => {
		users = users.filter((user) => user._id !== users[i]._id);
	};

	const updateList = (e) => {
		if (e.detail.user) users = [...users, e.detail.user];
		isModalDisplayed = false;
	};
</script>

<Seo title="Admin | Utilisateurs" url="TODO" image="TODO" />

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
			{#each adminUsers as user, i}
				<Banner
					type="users"
					on:delete={() => removeUser(i)}
					data={user} />
			{/each}
			<h4>Modérateurs</h4>
			{#each modoUsers as user, i}
				<Banner
					type="users"
					on:delete={() => removeUser(i)}
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
