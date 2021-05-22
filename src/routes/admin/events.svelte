<script context="module">
	import { API_URL } from "env";

	export async function load({ fetch }) {
		try {
			const res = await fetch(`${API_URL}/events/getAll`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});

			const result = await res.json();

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

	export let events: Event[];

	const removeEvent = (i) => {
		events = events.filter(
			(event) => event._id !== events[i]._id
		);
	};
</script>

<h3>Events</h3>
{#await events}
	<p>Chargement...</p>
{:then}
	{#each events as event, i}
		<Banner
			type="events"
			on:delete={() => removeEvent(i)}
			data={event} />
	{/each}
{:catch err}
	<p>{err}</p>
{/await}
