<script lang="ts">
	import CoachingCard from "$components/coaching/CoachingCard.svelte";
	import ObjectiveBanner from "$components/coaching/ObjectiveBanner.svelte";
	import Seo from "$components/templates/SEO.svelte";
	import { form } from "$stores/contact-form";
	import { isPhone } from "$stores/media";
	import RocketTakeOff from "$svg/stars/RocketTakeOff.svelte";
	import Star2 from "$svg/stars/Star2.svelte";

	interface Objective {
		title: string;
		desc: string;
		imgUrl: string;
		imgSide: "left" | "right";
	}

	const objectives: Objective[] = [
		{
			title: "Identifier les porteurs de projet",
			desc:
				"Notre premier rôle est d’identifier les étudiants porteurs de projet au sein de l’UTT. Pour cela, nous communiquons sur nos réseaux et organisons en chaque début de semestre un événement prévu à cet effet.",
			imgUrl: "/img/coaching-idea.jpeg",
			imgSide: "left",
		},
		{
			title:
				"Mettre en place des formations et séances de Coaching",
			desc:
				"Une fois les projets connus, notre objectif est de fournir aux étudiants toute la connaissance et toute la ressource nécessaires pour pouvoir avancer sur leur projet. Cela passe évidemment par des formations (Elevator Pitch, Communication...) et des séances de coaching personnalisé !",
			imgUrl: "/img/coaching-training.jpeg",
			imgSide: "right",
		},
		{
			title: "Participer aux financements des projets",
			desc:
				"Grâce à l’UTT et aux différents partenaires de Genius Coaching, nous proposons également des financements pour faciliter le développement des projets.",
			imgUrl: "/img/coaching-money.jpeg",
			imgSide: "left",
		},
		{
			title: "Accompagner au quotidien",
			desc:
				"Être présent en cas de besoin et répondre aux interrogations des porteurs de projet. Voici notre ultime mission. C’est pourquoi nous nous efforçons d’être au plus proche et d’accompagner chaque projet indiviuellement.",
			imgUrl: "/img/coaching-question.jpeg",
			imgSide: "right",
		},
	];

	interface CoachingCard {
		title: string;
		desc: string;
		descSide: "left" | "right";
		color: "blue" | "yellow";
		displayBtn: boolean;
		videoUrl: string;
	}

	const events: CoachingCard[] = [
		{
			title: "Coaching EGEE",
			desc: `<strong>Fréquence</strong> : 4x/semestre<br/>
			<strong>Type</strong> : Séance coaching personnalisée<br/>
			<strong>Concept</strong> : EGEE, ce sont d’anciens dirigeants d’entreprises qui souhaitent mettre leur expérience et connaissances à disposition des étudiants ! Ils sont là pour échanger avec les étudiants individuellement et de façon informelle, leur donner des conseils et les orienter vers les bons interlocuteurs, tout ça bénévolement.`,
			descSide: "right",
			color: "blue",
			displayBtn: false,
			videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
		},
		{
			title: "MINDStart",
			desc: `<strong>Fréquence</strong> : 1x/semestre<br/>
			<strong>Type</strong> : Commission de financement<br/>
			<strong>Concept</strong> : C’est la commission de financement des projets UTTiens proposée par la Fondation UTT avec le soutien de la Caisse d’Épargne Grand Est Europe ! Elle permet aux étudiants de venir pitcher leur idée de start-up ainsi que l’avancée du projet afin d’obtenir un financement si le projet est retenu par le jury.`,
			descSide: "left",
			color: "yellow",
			displayBtn: false,
			videoUrl: "https://youtube.com/embed/mbamHkj83ug",
		},
	];

	const projects: CoachingCard[] = [
		{
			title: "Coyali",
			desc: `<strong>Par</strong> : Maxime Tajan<br/>
			<strong>Projet</strong> : Une solution de simplification des smartphones grâce à une interface simplifiée qui permettra aux aînés de rester connectés en utilisant que les fonctionnalités utiles à leurs besoins et adaptées à leurs usages.<br><br>Accompagné par coaching 😉`,
			descSide: "right",
			color: "blue",
			displayBtn: false, // true
			videoUrl: "https://youtube.com/embed/mbamHkj83ug",
		},
		{
			title: "LlamaBus",
			desc: `<strong>Par</strong> : Zarela Mariscal & Marc-Antoine Thimm<br/>
			<strong>Projet</strong> : Une solution numérique pour la vente de tickets de bus pour les compagnies péruviennes.<br><br>Accompagné par coaching 😉`,
			descSide: "left",
			color: "yellow",
			displayBtn: false, // true
			videoUrl: "https://www.youtube.com/embed/laqIGYY0hrE",
		},
	];

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
</script>

<Seo
	title="Genius UTT | Coaching"
	url="https://geniusutt.fr/coaching" />

<section class="rocket section-pdg">
	<div class="global-container content pb-500-inner">
		<h1>Genius Coaching</h1>
		<h2>
			Fais décoller ton projet grâce à la branche
			entrepreneuriat !
		</h2>
		<button on:click={form.set} class="fill-blue-btn">
			J'ai un projet !
		</button>
	</div>
	<i class="stars">
		<Star2 />
	</i>
	<i class="bfr">
		<RocketTakeOff />
	</i>

	<svelte:component
		this={ParticlesComponent}
		id="tsparticles"
		options={particlesConfig} />
</section>

<section class="objectives section-pdg">
	<div class="global-container pb-500-inner">
		<h2 class="pb-700">
			{!$isPhone ? "Qu’est-ce que" : ""} Genius Coaching
		</h2>
		{#each objectives as { title, desc, imgUrl, imgSide }}
			<ObjectiveBanner {title} {desc} {imgUrl} {imgSide} />
		{/each}
	</div>
</section>
<!-- TEMP
<section
	class="coaching-events global-container pb-700-inner section-pdg">
	<h2 class="pb-700">
		{#if $isPhone}
			Events Coaching
		{:else}
			#ZoomEvent : 2 événements phares chez Genius Coaching
		{/if}
	</h2>

	{#each events as { title, desc, color, displayBtn, videoUrl, descSide }}
		<div class="card-container {descSide}">
			{#if !$isPhone}
				<iframe {title} src={videoUrl} />
			{/if}
			<div class="info">
				<CoachingCard
					{title}
					{desc}
					{color}
					{displayBtn}
					{videoUrl} />
			</div>
		</div>
	{/each}
</section>
-->
<section class="projects global-container pb-700-inner pb-500">
	<h2 class="pb-700">
		{#if $isPhone}
			Retours d’expérience
		{:else}
			#ZoomExp : Retours d’expérience d’étudiants
		{/if}
		<i>
			<Star2 />
		</i>
	</h2>

	{#each projects as { title, desc, color, displayBtn, videoUrl, descSide }}
		<div class="card-container {descSide}">
			{#if !$isPhone}
				<iframe {title} src={videoUrl} />
			{/if}
			<div class="info">
				<CoachingCard
					{title}
					{desc}
					{color}
					{displayBtn}
					{videoUrl} />
			</div>
		</div>
	{/each}
</section>

<style lang="scss">
	section {
		color: $white;
		text-align: center;
	}

	.rocket {
		position: relative;
		width: 100%;
		overflow: hidden;

		@include min-tablet {
			padding: 0;
		}

		@include min-tablet {
			height: calc(100vh - #{$headerHeight});
		}

		& > * {
			position: relative;
			z-index: 1;
		}

		.content {
			@include min-tablet {
				padding-top: 20vh;
				z-index: 10;
				max-width: 55%;
				@include mx(12vw);
			}

			& > * {
				opacity: 0;
				@include animation(fadein 2s linear forwards);
			}

			h1,
			h2 {
				animation-delay: 1s;

				@include min-tablet {
					text-align: left;
				}
			}
			h2 {
				@include t2-light;
				animation-delay: 2s;
			}
			button {
				animation-delay: 3s;

				@include phone {
					margin: auto;
				}
			}
		}

		.stars {
			@include min-tablet {
				margin-right: 35%;
			}
		}

		.bfr {
			position: absolute;
			right: 12.5%;
			bottom: -446px; // lightbeams height
			@include animation(slide-top 10s linear 3.5s infinite);
			transition-delay: 3s;
			opacity: 0;

			@include phone {
				display: none;
			}
		}

		:global(#tsparticles) {
			z-index: 0;
			position: absolute;
			width: 100%;
			height: 100vh;
			top: 0;
		}
	}
	.objectives {
		background-color: $black;

		.global-container {
			@include min-tablet {
				@include grid-12;
				grid-row-gap: 0;

				& > :global(*) {
					grid-column: 2 / -2;
				}
			}
		}
	}

	.projects {
		h2 {
			position: relative;
			z-index: 1;

			i {
				position: absolute;
				top: 25%;
				left: 20%;
				transform: translate(-50%, -50%);
				z-index: -1;
			}
		}
	}

	.card-container {
		@include min-tablet {
			@include grid-12;
		}

		&.right {
			iframe {
				grid-column: 1 / 9;
			}
			.info {
				grid-column: 9 / -1;
			}
		}
		&.left {
			iframe {
				grid-column: -9 / -1;
			}
			.info {
				grid-column: 1 / -9;
				grid-row: 1;
			}
		}
		iframe {
			@include br-500;
			@include ds-500;
			width: 100%;
			height: 25rem;
		}
	}

	@include anim(fadein) {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@include anim(slide-top) {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 1;
			@include transform(translateY(0));
		}
		40% {
			@include transform(translateY(-20%));
		}
		50% {
			@include transform(translateY(-60%));
		}
		100% {
			@include transform(translateY(-400%));
			opacity: 1;
		}
	}
</style>
