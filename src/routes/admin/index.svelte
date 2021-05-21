<script>
	import Banner from "$components/admin/Banner.svelte";
	import type { Event } from "$helpers/interfaces/events";

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
</script>

<Banner type="users" />
<Banner type="events" data={event} />
