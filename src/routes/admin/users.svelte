<script context="module">
	import { API_URL } from "env";

	export async function load({ fetch }) {
		try {
			const res = await fetch(`${API_URL}/users/getAll`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});

			const result = await res.json();

			if (res.status === 200) {
				return {
					props: { users: result.users },
				};
			} else {
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

	export let users: User[];

	// sort by role
	$: users.sort((a, b) => (a.role > b.role ? 1 : -1));

	let isModalDisplayed: boolean = false;

	const removeUser = (i) => {
		users = users.filter((user) => user._id !== users[i]._id);
	};

	const updateList = (e) => {
		if (e.detail.user) users = [...users, e.detail.user];
		isModalDisplayed = false;
	};
</script>

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
			{#each users as user, i}
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
