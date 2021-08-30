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
	import MetricBox from "$components/homepage/MetricBox.svelte";
	import ObjectiveCard from "$components/homepage/ObjectiveCard.svelte";
	import ProfileCard from "$components/homepage/ProfileCard.svelte";
	import Seo from "$components/templates/SEO.svelte";
	import Sweeper from "$components/templates/Sweeper.svelte";
	import CheckedCalendar from "$svg/homepage/CheckedCalendar.svelte";
	import Members from "$svg/homepage/Members.svelte";
	import University from "$svg/homepage/University.svelte";
	import YellowShape from "$svg/homepage/YellowShape.svelte";
	import Star1 from "$svg/stars/Star1.svelte";
	import type { SvelteComponent } from "svelte";
	import type { BoardMember } from "$helpers/interfaces/boardmembers";
	import { isPhone, isTablet, media } from "$stores/media";
	import GeniusUtt from "$svg/logos/GeniusUTT.svelte";

	export let boardmembers: BoardMember[];

	import { onMount } from "svelte";

	let ParticlesComponent;

	onMount(async () => {
		const module = await import("svelte-particles");

		ParticlesComponent = module.default;
	});

	let particlesConfig = {
		detectRetina: false,
		fpsLimit: 30,
		interactivity: {
			detectsOn: "canvas",
			events: {
				resize: true,
			},
		},
		particles: {
			color: {
				value: "#fff",
			},
			number: {
				density: {
					enable: true,
					area: 1080,
				},
				limit: 0,
				value: 400,
			},
			opacity: {
				animation: {
					enable: true,
					minimumValue: 0.05,
					speed: 0.25,
					sync: false,
				},
				random: {
					enable: true,
					minimumValue: 0.05,
				},
				value: 1,
			},
			shape: {
				type: "circle",
			},
			size: {
				random: {
					enable: true,
					minimumValue: 0.5,
				},
				value: 1,
			},
			move: {
				enable: true,
				speed: 0.2,
				direction: "none",
				random: false,
				straight: false,
				out_mode: "out",
				attract: {
					enable: false,
					rotateX: 600,
					rotateY: 1200,
				},
			},
		},
	};

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
			imgUrl: "/img/helping-hands.jpeg",
			title: "🤝 Aider...",
			desc:
				"Les étudiants à développer leur projet en les accompagnant tout le long de leur formation",
			position: "top",
		},
		{
			link: "/equipe",
			imgUrl: "/img/helping-new-skills.jpeg",
			title: "🎓 Découvrir...",
			desc:
				"La vie associative et développer de nouvelles compétences complémentaires à la formation",
			position: "right",
		},
		{
			link: "https://geniusglobal.fr/",
			imgUrl: "/img/helping-friends.jpeg",
			title: "🙏 Rencontrer...",
			desc:
				"Un nouveau réseau d’étudiants et d’entrepreneurs ambitieux, motivés, et cool !",
			position: "bottom",
			target_blank: true,
		},
		{
			link: "/evenements",
			imgUrl: "/img/helping-dream-big.jpeg",
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

{#if ["md", "lg", "xl"].includes($media)}
	<section class="welcome">
		<div class="video-foreground" />

		<video autoplay muted loop>
			<source
				src="/videos/teaser-genius.mp4"
				type="video/mp4" />
			Your browser does not support the video tag.
		</video>

		<div class="yellow" />
		<div class="blue" />
	</section>
{:else}
	<div class="global-container headline-section">
		<i>
			<GeniusUtt />
		</i>
		<h3>APPRENDRE & ENTREPRENDRE</h3>
		<svelte:component
			this={ParticlesComponent}
			id="tsparticles"
			options={particlesConfig} />
	</div>
	<div class="divider" />
{/if}

<section class="section-pdg">
	<article class="geniusutt global-container pb-500-inner">
		<h2>Qui sommes-nous ?</h2>
		<div>
			<p>
				Genius UTT est l'association étudiante qui vise à
				promouvoir l'innovation et l'entrepreneuriat au sein
				de l'UTT. Fondée en 2013 par des étudiants UTTiens,
				Genius encourage les initiatives étudiantes,
				accompagne les projets innovants et met en avant
				l'entrepreneuriat auprès des étudiants de l'UTT.
				L'association est entièrement animée par des étudiants
				de l'UTT et réunit aujourd’hui une trentaine de
				membres actifs.
			</p>
			<p>
				Nous souhaitons avant tout offrir une porte d’entrée
				unique sur le monde de l'entreprenariat et apporter
				des moyens de supporter les projets d'innovation
				étudiants comme un encadrement personnalisé de vos
				projets ou le prototypage de vos idées.
			</p>
			<p>
				Genius UTT fait aussi partie de la fédération Genius
				Global qui est une fédération d’associations
				étudiantes ayant les mêmes objectifs axés sur
				l'innovation et l'entreprenarait au sein de diverses
				écoles de toute la France (écoles de commerce, de
				design, des universités et des écoles d’ingénieur).
				Cette fédération compte aujourd’hui dans ses rangs
				Dauphine, Centrale Paris, Mines Paris, Les Ponts
				Paris, Supelec, Strate, IPSA, Mines Nancy, l’UTT et
				bientôt l’EM Lyon. Ce regroupement de nombreuses
				écoles nous permet donc d’accéder à un réseau national
				d’intervenants, d’étudiants aux compétences diverses
				et de ressources en tout genre.
			</p>
		</div>
	</article>
</section>

<section class="board pb-500-inner">
	<h2>Le Bureau</h2>

	<i>
		<Star1 />
	</i>
	<Sweeper contentWidth="10rem">
		{#each boardmembers as m}
			<div class="card-container">
				<ProfileCard
					name={m.name}
					position={m.position}
					imgUrl={m.imgUrl}
					desc={m.shortDesc}
					linkedin={m.linkedin} />
			</div>
		{/each}
	</Sweeper>

	<a href="/equipe" class="no-deco">
		<button class="outline-yellow-btn">En savoir +</button>
	</a>
</section>

<section class="genius-global section-pdg pb-500-inner">
	<article class="global-container pb-500-inner">
		<h2>Genius Global – A plusieurs, plus loin</h2>
		<p class="block">
			Genius souhaite rendre l’entrepreneuriat accessible à tous
			les étudiants, peu importe leur orientation (business,
			design, ingénieurs, universitaires, etc.) et devenir la
			référence de l’entrepreneuriat étudiant. Présente dans +15
			écoles, chaque association vise à promouvoir
			l’entrepreneuriat étudiant dans son école.
			<br />
			Genius Global fédère les différentes associations Genius et
			fait émerger des startups étudiantes.
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
			<button class="fill-blue-btn">
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

	<button class="fill-blue-btn"> Devenir Partenaire ! </button>
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
		video {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			object-fit: cover;
		}

		.video-foreground {
			z-index: 10;
			background-color: rgba($black, 0.4);
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

	.headline-section {
		@include flex;
		flex-direction: column;
		gap: $sp-400;
		@include py($sp-600);
		position: relative;
	}
	.divider {
		height: 0.2rem;
		width: 100%;
		background-color: $white;
	}

	.geniusutt {
		div {
			@include min-tablet {
				@include px(5vw);
			}
		}
		p {
			margin-bottom: $sp-100;
		}
	}

	.board {
		position: relative;
		i {
			display: none;
		}
		@include min-tablet {
			i {
				display: block;
				position: absolute;
				bottom: 10%;
				left: 20%;
			}
			:global(.sweeper) {
				@include flex-x;
				flex-flow: wrap row;
				row-gap: $sp-600;
				max-width: $maxWidth;
				margin: auto;
			}
			:global(.sweeper > *) {
				width: 25%;
			}

			/* profile-card in global.scss */
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
			@include min-tablet {
				@include px($sp-800 !important);
			}
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
