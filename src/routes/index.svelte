<script>
	import MetricBox from "$components/homepage/MetricBox.svelte";
	import ObjectiveCard from "$components/homepage/ObjectiveCard.svelte";
	import ProfileCard from "$components/homepage/ProfileCard.svelte";
	import Sweeper from "$components/templates/Sweeper.svelte";
	import { boardmembers } from "$helpers/boardmembers";
	import CheckedCalendar from "$svg/homepage/CheckedCalendar.svelte";
	import Members from "$svg/homepage/Members.svelte";
	import University from "$svg/homepage/University.svelte";
	import YellowShape from "$svg/homepage/YellowShape.svelte";
	import type { SvelteComponent } from "svelte";

	interface MetricBox {
		metric: string;
		label: string;
		color: "blue" | "yellow";
		compo: typeof SvelteComponent;
	}

	const metrics: MetricBox[] = [
		{
			metric: "16",
			label: "Écoles & Universités",
			color: "blue",
			compo: University,
		},
		{
			metric: "+500",
			label: "Écoles & Universités",
			color: "yellow",
			compo: Members,
		},
		{
			metric: "+100",
			label: "Écoles & Universités",
			color: "blue",
			compo: CheckedCalendar,
		},
	];

	interface Objective {
		link: string;
		imgUrl: string;
		title: string;
		desc: string;
		position: string;
		target_blank?: boolean;
	}

	const objectives: Objective[] = [
		{
			link: "uikit",
			imgUrl: "/img/helping-hand.jpeg",
			title: "🤝 Aider...",
			desc:
				"Les étudiants à développer leur projet en les accompagnant tout le long de leur formation",
			position: "top",
		},
		{
			link: "/equipe",
			imgUrl: "/img/helping-hand.jpeg",
			title: "🎓 Découvrir...",
			desc:
				"La vie associative et développer de nouvelles compétences complémentaires à la formation",
			position: "right",
		},
		{
			link: "https://geniusglobal.fr/",
			imgUrl: "/img/helping-hand.jpeg",
			title: "🙏 Rencontrer...",
			desc:
				"Un nouveau réseau d’étudiants et d’entrepreneurs ambitieux, motivés, et cool !",
			position: "bottom",
			target_blank: true,
		},
		{
			link: "/evenements",
			imgUrl: "/img/helping-hand.jpeg",
			title: "✨ Inspirer...",
			desc:
				"Les étudiants à entreprendre et à repousser leurs propres limites à travers différents événements",
			position: "left",
		},
	];
</script>

<main class="page-pd">
	<section class="global-container pb-500-inner">
		<h2>Qui sommes-nous ?</h2>
		<p class="block">
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

	<section class="pb-500-inner">
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

		<a href="/equipe" class="no-deco">
			<button class="outline-yellow">En savoir +</button>
		</a>
	</section>

	<section class="genius-global pb-500-inner">
		<article class="global-container pb-500-inner">
			<h2>Genius Global – A plusieurs, plus loin</h2>
			<p class="block">
				Lorem Ipsum is simply dummy text of the printing and
				typesetting industry. Lorem Ipsum has been the
				industry's standard dummy text ever since the 1500s,
				when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has
				survived not only five centuries, but also the leap
				into electronic typesetting, remaining essentially
				unchanged. It was popularised in the 1960s with the
				release of Letraset sheets containing Lorem Ipsum
				passages, and more recently with desktop publishing
				software like Aldus PageMaker including versions of
				Lorem Ipsum. Lorem Ipsum is simply dummy text of the
				printing and typesetting industry. Lorem Ipsum has
				been the industry's standard dummy text ever since the
				1500s, when an unknown printer took a galley of type
				and scrambled it to make a type specimen book. It has
				survived not only five centuries, but also the leap
				into electronic typesetting, remaining essentially
				unchanged. It was popularised in the 1960s with the
				release of Letraset sheets containing Lorem Ipsum
				passages, and more recently with desktop publishing
				software like Aldus PageMaker including versions of
				Lorem Ipsum.
			</p>
		</article>

		<div class="shape-container">
			<i>
				<YellowShape />
			</i>
			<Sweeper contentWidth="13rem">
				{#each metrics as { metric, label, color, compo }}
					<div class="metric">
						<MetricBox {metric} {label} {color}>
							<svelte:component this={compo} />
						</MetricBox>
					</div>
				{/each}
			</Sweeper>

			<a
				href="https://geniusglobal.fr/"
				target="_blank"
				class="no-deco">
				<button class="fill-blue"
					>Découvrir Genius Global</button>
			</a>
		</div>
	</section>

	<section class="global-container page-pd pb-500-inner">
		<h2>Genius, à votre service !</h2>
		<div class="obj-grid">
			{#each objectives as { link, imgUrl, title, desc, position, target_blank }}
				<div class={position}>
					<ObjectiveCard
						{link}
						{imgUrl}
						{title}
						{desc}
						{target_blank} />
				</div>
			{/each}
		</div>
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
		button {
			margin: $sp-400 auto 0;
		}
		section {
			--pb: #{$sp-700};

			@include phone {
				--pb: #{$sp-500};
			}
			&:not(:last-child) {
				padding-bottom: var(--pb);
			}
		}

		.genius-global {
			padding-top: $sp-700;
			background-color: $prim-900;

			.shape-container {
				position: relative;

				.metric {
					position: relative;
				}

				i {
					position: absolute;
					width: 100vw;

					@include tablet {
						top: -20%;
					}
					@include desktop {
						top: -50%;
					}
				}
			}
		}

		.obj-grid {
			display: grid;
			grid-gap: $sp-500;

			& > * {
				margin: auto;
			}

			@include min-tablet {
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: repeat(4, 1fr);

				.top {
					grid-column: 2/3;
					grid-row: 1/3;
				}
				.right {
					grid-column: 3/-1;
					grid-row: 2/4;
					margin-left: 0;
				}
				.bottom {
					grid-column: 2/3;
					grid-row: 3/-1;
				}
				.left {
					grid-column: 1/2;
					grid-row: 2/4;
					margin-right: 0;
				}
			}
		}
	}
</style>
