<script context="module">
	import { API_URL } from "env";

	export async function load({ fetch }) {
		try {
			const res = await fetch(`${API_URL}/users/getAll`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});

			const result = await res.json();

			if (res.status === 200) {
				return {
					props: { users: result.users },
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
	import type { User } from "$helpers/interfaces/user";

	const event: Event = {
		name: "string",
		date: "string", // TODO: Date
		schedule: "string",
		place: "string",
		desc: "string",
		imgUrl: "string",
		videoUrl: "string",
		tags: ["string"],
		eventUrl: "string", // Facebook event
		upcoming: false,
	};

	export let users: User[];
</script>

<Banner type="users" data={users[0]} />
<Banner type="events" data={event} />
