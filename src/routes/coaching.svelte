<script>
	import CoachingCard from "$components/coaching/CoachingCard.svelte";
	import ObjectiveBanner from "$components/coaching/ObjectiveBanner.svelte";
	import VideoPopIn from "$components/events/utils/VideoPopIn.svelte";
	import { isPhone } from "$stores/media";

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
			imgUrl: "/img/coaching/idea.jpeg",
			imgSide: "left",
		},
		{
			title:
				"Mettre en place des formations et séances de Coaching",
			desc:
				"Une fois les projets connus, notre objectif est de fournir aux étudiants toute la connaissance et toute la ressource nécessaires pour pouvoir avancer sur leur projet. Cela passe évidemment par des formations (Elevator Pitch, Communication...) et des séances de coaching personnalisé !",
			imgUrl: "/img/coaching/idea.jpeg",
			imgSide: "right",
		},
		{
			title: "Participer aux financements des projets",
			desc:
				"Grâce à l’UTT et aux différents partenaires de Genius Coaching, nous proposons également des financements pour faciliter le développement des projets.",
			imgUrl: "/img/coaching/idea.jpeg",
			imgSide: "left",
		},
		{
			title: "Accompagner au quotidien",
			desc:
				"Être présent en cas de besoin et répondre aux interrogations des porteurs de projet. Voici notre ultime mission. C’est pourquoi nous nous efforçons d’être au plus proche et d’accompagner chaque projet indiviuellement.",
			imgUrl: "/img/coaching/idea.jpeg",
			imgSide: "right",
		},
	];

	interface CoachingCard {
		title: string;
		desc: string;
		color: "blue" | "yellow";
		displayBtn: boolean;
		videoUrl: string;
	}

	const cards: CoachingCard[] = [
		{
			title: "Coaching EGEE",
			desc: `Fréquence : 4-5 fois /semestre
			\nType : Coaching personnalisé
			\nConcept : d’anciens entrepreneurs aident individuellement les porteurs de projet selon leurs problématiques. Un Coach est assigné à un projet pour 1 semestre à minima et permet un meilleur accompagnement.`,
			color: "blue",
			displayBtn: true,
			videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
		},
		{
			title: "Coaching EGEE",
			desc: `Fréquence : 4-5 fois /semestre
			\nType : Coaching personnalisé
			\nConcept : d’anciens entrepreneurs aident individuellement les porteurs de projet selon leurs problématiques. Un Coach est assigné à un projet pour 1 semestre à minima et permet un meilleur accompagnement.`,
			color: "yellow",
			displayBtn: false,
			videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
		},
	];
</script>

{#each cards as { title, desc, color, displayBtn, videoUrl }}
	<div class="card-container">
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

{#each objectives as { title, desc, imgUrl, imgSide }}
	<ObjectiveBanner {title} {desc} {imgUrl} {imgSide} />
{/each}

<style lang="scss">
	.card-container {
		@include min-tablet {
			@include grid-12;
		}
		iframe {
			@include br-500;
			@include ds-500;
			grid-column: 1 / 9;
			width: 100%;
			height: 25rem;
		}

		.info {
			grid-column: 9 / -1;
		}
	}
</style>
