<script>
	import MetricBox from "$components/homepage/MetricBox.svelte";
	import ObjectiveCard from "$components/homepage/ObjectiveCard.svelte";
	import ProfileCard from "$components/homepage/ProfileCard.svelte";
	import Sweeper from "$components/templates/Sweeper.svelte";
	import { boardmembers } from "$helpers/boardmembers";
	import University from "$svg/homepage/University.svelte";
</script>

<main class="page-pd">
	<section class="global-container genius-utt">
		<h2>Qui sommes-nous ?</h2>
		<p>
			Lorem Ipsum is simply dummy text of the printing and
			typesetting industry. Lorem Ipsum has been the industry's
			standard dummy text ever since the 1500s, when an unknown
			printer took a galley of type and scrambled it to make a
			type specimen book. It has survived not only five
			centuries, but also the leap into electronic typesetting,
			remaining essentially unchanged. It was popularised in the
			1960s with the release of Letraset sheets containing Lorem
			Ipsum passages, and more recently with desktop publishing
			software like Aldus PageMaker including versions of Lorem
			Ipsum. Lorem Ipsum is simply dummy text of the printing
			and typesetting industry. Lorem Ipsum has been the
			industry's standard dummy text ever since the 1500s, when
			an unknown printer took a galley of type and scrambled it
			to make a type specimen book. It has survived not only
			five centuries, but also the leap into electronic
			typesetting, remaining essentially unchanged. It was
			popularised in the 1960s with the release of Letraset
			sheets containing Lorem Ipsum passages, and more recently
			with desktop publishing software like Aldus PageMaker
			including versions of Lorem Ipsum.
		</p>
	</section>
	<section>
		<h2>Le Bureau</h2>

		<Sweeper contentWidth="13.5rem">
			{#each boardmembers as m}
				<ProfileCard
					name={m.name}
					position={m.position}
					imgUrl={m.imgUrl}
					desc={m.desc}
					linkedin={m.linkedin} />
			{/each}
		</Sweeper>

		<button class="outline-yellow">En savoir +</button>
	</section>

	<section class="global-container genius-global">
		<h2>Genius Global – A plusieurs, plus loin</h2>
		<p>
			Lorem Ipsum is simply dummy text of the printing and
			typesetting industry. Lorem Ipsum has been the industry's
			standard dummy text ever since the 1500s, when an unknown
			printer took a galley of type and scrambled it to make a
			type specimen book. It has survived not only five
			centuries, but also the leap into electronic typesetting,
			remaining essentially unchanged. It was popularised in the
			1960s with the release of Letraset sheets containing Lorem
			Ipsum passages, and more recently with desktop publishing
			software like Aldus PageMaker including versions of Lorem
			Ipsum. Lorem Ipsum is simply dummy text of the printing
			and typesetting industry. Lorem Ipsum has been the
			industry's standard dummy text ever since the 1500s, when
			an unknown printer took a galley of type and scrambled it
			to make a type specimen book. It has survived not only
			five centuries, but also the leap into electronic
			typesetting, remaining essentially unchanged. It was
			popularised in the 1960s with the release of Letraset
			sheets containing Lorem Ipsum passages, and more recently
			with desktop publishing software like Aldus PageMaker
			including versions of Lorem Ipsum.
		</p>

		<MetricBox
			metric={16}
			label={"Écoles & Universités"}
			color="yellow">
			<University />
		</MetricBox>
	</section>

	<section class="global-container">
		<ObjectiveCard
			link="uikit"
			imgUrl="/img/helping-hand.jpeg"
			title="Aider 🤝"
			desc="Les étudiants à développer leur projet en les accompagnant tout le long de leur formation." />
	</section>
</main>

<style lang="scss">
	main {
		background-color: $black;

		h2,
		p {
			color: $white;
		}
		h2 {
			text-align: center;
		}

		section {
			button {
				margin: auto;
			}
		}

		section.genius-utt {
			@include grid-12;
			--pb: #{$sp-700};

			@include phone {
				--pb: #{$sp-500};
			}
			&:not(:last-child) {
				padding-bottom: var(--pb);
			}

			& > * {
				grid-column: 1 / -1;
				@include min-tablet {
					grid-column: 2 / -2;
				}
			}
		}

		.genius-global {
			background-color: $prim-900;
		}
	}
</style>
