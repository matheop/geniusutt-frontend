<script>
	import EventDesktop from "$components/events/EventDesktop.svelte";
	import EventMobile from "$components/events/EventMobile.svelte";
	import Seo from "$components/templates/SEO.svelte";
	import type { Event } from "$helpers/interfaces/events";
	import { isPhone } from "$stores/media";

	const events: Event[] = [
		{
			name: "TEDxUTTroyes 2021",
			desc: `Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.
		Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.`,
			imgUrl: "/img/paul-julien.jpeg",
			videoUrl:
				"https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1",
			place: "M500",
			date: "9 Mai 2021", // TODO: Date
			schedule: "16h-20h",
			eventUrl: "string", // Facebook event
			tags: ["Conférence", "Dev Perso"],
			upcoming: true,
		},
		{
			name: "TEDxUTTroyes 2021",
			desc: `Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.
		Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.`,
			imgUrl: "/img/paul-julien.jpeg",
			videoUrl:
				"https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1",
			place: "M500",
			date: "9 Mai 2021", // TODO: Date
			schedule: "16h-20h",
			eventUrl: "string", // Facebook event
			tags: ["Conférence", "Dev Perso"],
			upcoming: true,
		},
		{
			name: "TEDxUTTroyes 2021",
			desc: `Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.
		Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.`,
			imgUrl: "/img/paul-julien.jpeg",
			videoUrl:
				"https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1",
			place: "M500",
			date: "9 Mai 2021", // TODO: Date
			schedule: "16h-20h",
			eventUrl: "string", // Facebook event
			tags: ["Conférence", "Dev Perso"],
			upcoming: false,
		},
		{
			name: "TEDxUTTroyes 2021",
			desc: `Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.
		Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.`,
			imgUrl: "/img/paul-julien.jpeg",
			videoUrl:
				"https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1",
			place: "M500",
			date: "9 Mai 2021", // TODO: Date
			schedule: "16h-20h",
			eventUrl: "string", // Facebook event
			tags: ["Conférence", "Dev Perso"],
			upcoming: false,
		},
	];

	const upcomingEvents: Event[] = events.filter(
		(e) => e.upcoming === true
	);

	const pastEvents: Event[] = events.filter(
		(e) => e.upcoming === false
	);
</script>

<Seo title="Genius UTT | Événements" url="TODO" image="TODO" />

<main class="global-container section-pdg">
	<h1>Nos événements</h1>
	<h2>&nbsp; A venir &nbsp;</h2>
	<section class="pb-500">
		{#each upcomingEvents as event}
			<div class="pb-500">
				{#if $isPhone}
					<EventMobile {event} />
				{:else}
					<EventDesktop {event} />
				{/if}
			</div>
		{/each}
	</section>
	<h2>&nbsp; Passés &nbsp;</h2>
	<section>
		{#each pastEvents as event}
			<div class="pb-500">
				{#if $isPhone}
					<EventMobile {event} />
				{:else}
					<EventDesktop {event} />
				{/if}
			</div>
		{/each}
	</section>
</main>

<style lang="scss">
	main {
		h1,
		h2 {
			text-align: center;
			margin-bottom: var(--mb-500);

			--mb-500: #{$sp-500};

			@include phone {
				--mb: #{$sp-300};
			}
		}
		h2 {
			color: $white;
			@include t3-light;

			position: relative;
			z-index: 1;
			overflow: hidden;
			text-align: center;

			&:before,
			&:after {
				position: absolute;
				top: 51%;
				overflow: hidden;
				width: 50%;
				height: 1px;
				content: "";
				background-color: $white;
			}

			&:before {
				margin-left: -50%;
				text-align: right;
			}
		}
	}
</style>
