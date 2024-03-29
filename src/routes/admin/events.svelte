<script context="module">
	import { API_URL } from "env";
	import moment, { deprecationHandler } from "moment";
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

<script lang="ts">
	import Banner from "$components/admin/Banner.svelte";
	import type { Event } from "$helpers/interfaces/events";
	import EventModal from "$components/admin/EventModal.svelte";
	import Plus from "$svg/admin/Plus.svelte";
	import Seo from "$components/templates/SEO.svelte";

	export let events: Event[];

	let upcomingEvents: Event[];
	let pastEvents: Event[];

	const sortEvents = (): void => {
		events = events.sort(
			(a, b) =>
				moment(b.date, "DD/MM/YYYY") -
				moment(a.date, "DD/MM/YYYY")
		);
	};

	sortEvents();

	const assignUpcomingPpt = (events) => {
		for (const e of events) {
			let dateAsMoment = moment(e.date, "DD/MM/YYYY");
			if (dateAsMoment.isBefore(Date.now())) {
				e.upcoming = false;
			} else {
				e.upcoming = true;
			}
		}
		return events;
	};

	$: if (events) {
		events = events.map((e) => ({ ...e, upcoming: false }));
		sortEvents();
		events = assignUpcomingPpt(events);

		upcomingEvents = events.filter(
			(event) => event.upcoming === true
		);
		pastEvents = events.filter(
			(event) => event.upcoming === false
		);
	}

	let isModalDisplayed: boolean = false;

	const removeEvent = (e) => {
		const eid = e.detail.id;
		events = events.filter((event) => event._id !== eid);
	};
	const updateList = (e) => {
		if (e.detail.event) events = [...events, e.detail.event];
		isModalDisplayed = false;
	};

	const updateEvent = (e) => {
		const event: Event = e.detail.event;
		events = events.map((e: Event) =>
			e._id === event._id ? (e = event) : e
		);
	};
</script>

<Seo
	title="Admin | Events"
	url="https://www.geniusutt.fr/admin/events" />

<section class="admin-page">
	<article class="adding">
		<h2>Paramètres évènements</h2>
		<button
			class="fill-blue-btn"
			on:click={() => (isModalDisplayed = true)}>
			Ajouter un évènement
			<i>
				<Plus />
			</i>
		</button>
	</article>
	<h3>Évènements</h3>
	<div class="banners">
		{#await events}
			<p>Chargement...</p>
		{:then}
			<h4>A venir</h4>
			{#each upcomingEvents as event}
				<Banner
					type="events"
					on:update={(e) => updateEvent(e)}
					on:delete={(e) => removeEvent(e)}
					data={event} />
			{/each}
			<h4>Passés</h4>
			{#each pastEvents as event}
				<Banner
					type="events"
					on:update={(e) => updateEvent(e)}
					on:delete={(e) => removeEvent(e)}
					data={event} />
			{/each}
		{:catch err}
			<p>{err}</p>
		{/await}
	</div>
</section>

{#if isModalDisplayed}
	<EventModal action="create" on:remove={updateList} />
{/if}
