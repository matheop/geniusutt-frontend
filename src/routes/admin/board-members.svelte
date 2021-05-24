<script context="module">
	import { API_URL } from "env";

	export async function load({ fetch }) {
		try {
			const res = await fetch(
				`${API_URL}/board-members/getAll`,
				{
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);

			const result = await res.json();

			if (res.status === 200) {
				return {
					props: { members: result.members },
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
	import UserModal from "$components/admin/UserModal.svelte";
	import type { BoardMember } from "$helpers/interfaces/boardmembers";
	import UserAdd from "$svg/admin/UserAdd.svelte";
	import BoardMemberBanner from "$components/admin/BoardMemberBanner.svelte";

	export let members: BoardMember[];

	let isModalDisplayed: boolean = false;

	const removeMember = (i) => {
		members = members.filter(
			(user) => user._id !== members[i]._id
		);
	};

	const updateList = (e) => {
		if (e.detail.member) members = [...members, e.detail.member];
		isModalDisplayed = false;
	};
</script>

<section class="admin-page">
	<article class="adding">
		<h2>Gestion des membres du bureau</h2>
		<button
			class="fill-blue-btn"
			on:click={() => (isModalDisplayed = true)}>
			Ajouter un membre
			<i>
				<UserAdd />
			</i>
		</button>
	</article>
	<h3>Bureau actuel</h3>
	<div class="banners">
		{#await members}
			<p>Chargement...</p>
		{:then}
			{#each members as member, i}
				<BoardMemberBanner
					on:delete={() => removeMember(i)}
					{member} />
			{/each}
		{:catch err}
			<p>{err}</p>
		{/await}
	</div>
</section>

{#if isModalDisplayed}
	<UserModal action="create" on:remove={updateList} />
{/if}
