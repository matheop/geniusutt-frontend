<script>
	import BoardMemberInfo from "$components/team/BoardMemberInfo.svelte";
	import { boardmembers } from "$helpers/boardmembers";
	import { isPhone } from "$stores/media";
</script>

<main class="global-container page-pd">
	<section>
		<h1>le bureau {$isPhone ? "" : " – Genius Utt"}</h1>

		{#each boardmembers as m}
			<BoardMemberInfo
				imgSide={m.imgSide}
				name={m.name}
				position={m.position}
				imgUrl={m.imgUrl}
				desc={m.desc} />
		{/each}
	</section>
</main>

<style lang="scss">
	main {
		@include grid-12;

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
