<script>
	import type { Event } from "$helpers/interfaces/events";

	import EventInfo from "./utils/EventInfo.svelte";
	import VideoPopIn from "./utils/VideoPopIn.svelte";

	export let event: Event;

	// TODO: gestion auto avec moment
	export let upcomingEvent: boolean = false;
	let showVideo: boolean = false;
</script>

<article class="event-card">
	<div class="img-div">
		<img class="cover" src={event.imgUrl} alt={event.name} />
	</div>
	<div class="info">
		<h2>{event.name}</h2>
		<p>{event.desc}</p>

		<div>
			<EventInfo
				flex="inline"
				eventInfo={[
					event.date,
					event.schedule,
					event.place,
				]} />
		</div>

		<div class="footer">
			{#if !!event.videoUrl}
				<button
					on:click={() => (showVideo = true)}
					class="link video">Voir la vidéo</button>
			{:else}
				<div />
			{/if}

			{#if event.upcoming}
				<a
					href={event.eventUrl}
					target="_blank"
					class="no-deco">
					<button class="fill-blue-btn">
						Je participe !
					</button>
				</a>
			{/if}
		</div>
	</div>
</article>

{#if showVideo}
	<VideoPopIn
		title={event.name}
		videoUrl={event.videoUrl}
		bind:showVideo />
{/if}

<style lang="scss">
	article {
		@include grid-12;
		background-color: $white;
		color: $black;
		@include br-900;
		@include transition($transition);
		overflow: hidden;
		max-height: 23rem;

		&:hover {
			transform: scale(1.01);
			@include transition($transition);
		}

		.img-div {
			grid-column: 1 / 6;
		}

		.info {
			grid-column: 6 / -1;
			padding: $sp-400 0;
			padding-right: $sp-400;

			& > *:not(:last-child) {
				margin-bottom: $sp-300;
			}

			:global(event-info) {
				gap: $sp-200;
			}

			.footer {
				@include flex-y;
				justify-content: space-between;
			}
		}
	}
</style>
