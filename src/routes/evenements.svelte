<script context="module">
	import { API_URL } from "env";
	import moment from "moment";
	moment().format();

	export async function load({ fetch }) {
		try {
			const res = await fetch(`${API_URL}/events/getAll`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});

			const result = await res.json();
			for (const e of result.events) {
				let dateAsMoment = moment(e.date, "DD/MM/YYYY");
				if (dateAsMoment.isBefore(Date.now())) {
					e.upcoming = false;
				} else {
					e.upcoming = true;
				}
			}

			if (res.status === 200) {
				return {
					props: { events: result.events },
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
	import EventDesktop from "$components/events/EventDesktop.svelte";
	import EventMobile from "$components/events/EventMobile.svelte";
	import Seo from "$components/templates/SEO.svelte";
	import type { Event } from "$helpers/interfaces/events";
	import { isPhone } from "$stores/media";

	export let events: Event[];

	events = events.sort(
		(a, b) =>
			moment(b.date, "DD/MM/YYYY") -
			moment(a.date, "DD/MM/YYYY")
	);

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
