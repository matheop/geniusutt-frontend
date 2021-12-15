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

			const boardmembers = await res.json();

			if (res.status === 200) {
				return {
					props: { boardmembers: boardmembers.members },
				};
			} else {
				return {
					status: res.status,
					error: new Error(boardmembers),
				};
			}
		} catch (error) {
			console.error("error:", error);
		}
	}
</script>

<script>
	import BoardMemberInfo from "$components/team/BoardMemberInfo.svelte";
	import Seo from "$components/templates/SEO.svelte";
	import { isPhone } from "$stores/media";
	import type { BoardMember } from "$helpers/interfaces/boardmembers";

	export let boardmembers: BoardMember[];
</script>

<Seo title="Genius UTT | Bureau" url="https://geniusutt.fr/equipe" />

<main class="global-container section-pdg">
	<section>
		<h1>le bureau {$isPhone ? "" : " – Genius Utt"}</h1>

		{#each boardmembers as m, i}
			<BoardMemberInfo
				imgSide={i % 2 === 0 ? "left" : "right"}
				name={m.name}
				position={m.position}
				imgUrl={m.imgUrl}
				desc={m.longDesc} />
		{/each}
	</section>
</main>

<style lang="scss">
	main {
		@include grid-12;
		--mb: #{$sp-700};
		@include phone {
			--mb: #{$sp-500};
		}

		section {
			grid-column: 1 / -1;
			@include min-tablet {
				grid-column: 2 / -2;
			}

			& > :global(*:not(:last-child)) {
				margin-bottom: var(--mb);
			}

			h1 {
				text-align: center;
			}
		}
	}
</style>
