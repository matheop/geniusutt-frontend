<script>
	import MetricBox from "$components/homepage/MetricBox.svelte";
	import ObjectiveCard from "$components/homepage/ObjectiveCard.svelte";
	import ProfileCard from "$components/homepage/ProfileCard.svelte";
	import Seo from "$components/templates/SEO.svelte";
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

	const partners: string[] = [
		"/img/partner-fondation.png",
		"/img/partner-utt.png",
		"/img/partner-aubassadeur.png",
		"/img/partner-pumpkin.png",
		"/img/partner-sparkmate.png",
	];
</script>

<Seo title="Genius UTT | Accueil" url="TODO" image="TODO" />

<section class="welcome">
	<div class="video-foreground" />
	<iframe
		title=""
		src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&showinfo=0&controls=0&autohide=1&loop=1"
		frameborder="0" />

	<div class="global-container content">
		<i> FUTUR PLACE POUR LOGO </i>
		<h1>Dream Big – Work hard <br /> start small</h1>
		<h3>APPRENDRE & ENTREPRENDRE</h3>
	</div>

	<div class="yellow" />
	<div class="blue" />
</section>

<section class="global-container section-pdg pb-500-inner">
	<h2>Qui sommes-nous ?</h2>
	<p class="block">
		Lorem Ipsum is simply dummy text of the printing and
		typesetting industry. Lorem Ipsum has been the industry's
		standard dummy text ever since the 1500s, when an unknown
		printer took a galley of type and scrambled it to make a type
		specimen book. It has survived not only five centuries, but
		also the leap into electronic typesetting, remaining
		essentially unchanged. It was popularised in the 1960s with
		the release of Letraset sheets containing Lorem Ipsum
		passages, and more recently with desktop publishing software
		like Aldus PageMaker including versions of Lorem Ipsum. Lorem
		Ipsum is simply dummy text of the printing and typesetting
		industry. Lorem Ipsum has been the industry's standard dummy
		text ever since the 1500s, when an unknown printer took a
		galley of type and scrambled it to make a type specimen book.
		It has survived not only five centuries, but also the leap
		into electronic typesetting, remaining essentially unchanged.
		It was popularised in the 1960s with the release of Letraset
		sheets containing Lorem Ipsum passages, and more recently with
		desktop publishing software like Aldus PageMaker including
		versions of Lorem Ipsum.
	</p>
</section>

<section class="board pb-500-inner">
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

<section class="genius-global section-pdg pb-500-inner">
	<article class="global-container pb-500-inner">
		<h2>Genius Global – A plusieurs, plus loin</h2>
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
			<button class="fill-blue">
				Découvrir Genius Global
			</button>
		</a>
	</div>
</section>

<section class="section-pdg pb-500-inner">
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

<section class="partnerships section-pdg pb-500-inner">
	<h2>Nos partenaires</h2>

	<Sweeper contentWidth="10rem">
		{#each partners as p}
			<i>
				<img src={p} alt={p} />
			</i>
		{/each}
	</Sweeper>

	<h3>Pourquoi devenir Partenaire ?</h3>

	<p class="block">
		Lorem Ipsum is simply dummy text of the printing and
		typesetting industry. Lorem Ipsum has been the industry's
		standard dummy text ever since the 1500s, when an unknown
		printer took a galley of type and scrambled it to make a type
		specimen book. It has survived not only five centuries, but
		also the leap into electronic typesetting, remaining
		essentially unchanged. It was popularised in the 1960s with
		the release of Letraset sheets containing Lorem Ipsum
		passages, and more recently with desktop publishing software
		like Aldus PageMaker including versions of Lorem Ipsum. Lorem
		Ipsum is simply dummy text of the printing and typesetting
		industry. Lorem Ipsum has been the industry's standard dummy
		text ever since the 1500s, when an unknown printer took a
		galley of type
	</p>

	<button class="fill-blue"> Devenir Partenaire ! </button>
</section>

<style lang="scss">
	h2,
	h3,
	p {
		color: $white;
	}
	h2,
	h3 {
		text-align: center;
	}
	h3 {
		@include t3-light;
	}
	button {
		margin: $sp-400 auto 0;
	}
	section {
		--pb: #{$sp-700};
		background-color: $black;

		@include phone {
			--pb: #{$sp-500};
		}
		&:not(:last-child) {
			padding-bottom: var(--pb);
		}
	}

	.welcome {
		position: relative;
		height: calc(100vh - #{$headerHeight});
		width: 100%;
		background-color: $grey-700;
		overflow: hidden;
		padding: 0;

		.video-foreground,
		iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}

		.video-foreground {
			z-index: 10;
			background-color: rgba($black, 0.6);
		}
		.content {
			position: relative;
			padding-top: 20%;
			z-index: 10;
			h3 {
				text-align: left;
			}
		}

		.blue,
		.yellow {
			position: absolute;
			z-index: 10;
			width: 150vw;
			height: 20rem;
			bottom: -20rem;
			transform-origin: top left;
		}
		.blue {
			background-color: $prim-500;
			transform: rotate(-3deg);
		}
		.yellow {
			background-color: $sec-500;
			transform: rotate(-5deg);
		}
	}

	.board {
		@include min-tablet {
			:global(.sweeper) {
				display: grid;
				grid: repeat(8, calc(17rem / 3)) / repeat(9, 1fr);
				max-width: $maxWidth;
				margin: auto;
			}

			:global(.profile-card) {
				margin: auto;
				padding: 0;

				&:first-child {
					grid-column: 2 / 4;
				}
				&:nth-child(2) {
					grid-column: 4 / -4;
					grid-row: 1 / 5;
				}
				&:nth-child(3) {
					grid-column: -4 / -2;
				}
				&:nth-child(4) {
					grid-column: -5 / -3;
					margin-left: 0;
				}
				&:nth-child(5) {
					grid-column: 3 / 5;
					margin-right: 0;
				}
				&:nth-child(4),
				&:last-child {
					grid-row: 6 / -1;
				}
				&:first-child,
				&:nth-child(3) {
					grid-row: 2 / 5;
				}
			}
		}
	}

	.genius-global {
		background-color: $prim-900;

		@include min-tablet {
			:global(.sweeper) {
				max-width: $maxWidth;
				margin: auto;
				justify-content: space-around;
			}
			.metric {
				margin: 0;
				@include px(0);
			}
		}

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

	.partnerships {
		background-color: $prim-900;

		:global(.sweeper) {
			background-color: $sec-500;
			@include py($sp-400);
			margin-bottom: $sp-500;

			@include min-tablet {
				@include py($sp-600);
				max-width: 100%;
				margin: auto auto $sp-500 auto;
				justify-content: space-around;
				align-items: center;
				gap: $sp-600;
				@include px($sp-800);
			}
		}

		p {
			@include container-width;
		}

		button {
			margin-top: 0;
		}

		i {
			@include flex;

			@include min-tablet {
				height: 7rem;
				width: calc(100% / 5);
				margin: 0;
				padding: 0;

				img {
					max-width: 100%;
				}
			}

			@include phone {
				height: 6rem;
				&:last-child {
					padding-right: 15vw;

					img {
						max-width: 70vw;
					}
				}
			}
			img {
				max-height: 100%;
			}
		}
	}
</style>
