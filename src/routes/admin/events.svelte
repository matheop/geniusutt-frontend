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
	import Banner from "$components/admin/Banner.svelte";
	import type { Event } from "$helpers/interfaces/events";
	import EventModal from "$components/admin/EventModal.svelte";
	import Plus from "$svg/admin/Plus.svelte";
	import Seo from "$components/templates/SEO.svelte";

	export let events: Event[];

	let upcomingEvents: Event[];
	let pastEvents: Event[];

	// TODO: sort en fonction des dates

	$: if (events) {
		upcomingEvents = events.filter(
			(event) => event.upcoming === true
		);
		pastEvents = events.filter(
			(event) => event.upcoming === false
		);
	}

	let isModalDisplayed: boolean = false;

	const removeEvent = (i) => {
		events = events.filter(
			(event) => event._id !== events[i]._id
		);
	};
	const updateList = (e) => {
		if (e.detail.event) events = [...events, e.detail.event];
		isModalDisplayed = false;
	};
</script>

<Seo title="Admin | Events" url="TODO" image="TODO" />

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
			{#each upcomingEvents as event, i}
				<Banner
					type="events"
					on:delete={() => removeEvent(i)}
					data={event} />
			{/each}
			<h4>Passés</h4>
			{#each pastEvents as event, i}
				<Banner
					type="events"
					on:delete={() => removeEvent(i)}
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
