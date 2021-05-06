<script>
	import EventInfo from "./utils/EventInfo.svelte";
	import VideoPopIn from "./utils/VideoPopIn.svelte";

	export let name: string;
	export let desc: string;
	export let date: string;
	export let imgUrl: string;
	export let videoUrl: string =
		"https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1";
	export let eventInfo: string[] = [date, "Dev Perso"];
	export let tags: string[] = ["Conférence", "Dev Perso"];

	// TODO: gestion auto avec moment
	export let upcomingEvent: boolean = false;
	let showVideo: boolean = false;
</script>

<article class="event-card">
	<div class="img-div">
		<img class="cover" src={imgUrl} alt={name} />
	</div>
	<div class="info">
		<h2>{name}</h2>
		<p>{desc}</p>

		<div>
			<EventInfo flex="inline" {eventInfo} />
		</div>

		<div class="footer">
			{#if !!videoUrl}
				<button
					on:click={() => (showVideo = true)}
					class="link video">Voir la vidéo</button>
			{:else}
				<div />
			{/if}

			<button class="fill-blue"> Je participe ! </button>
		</div>
	</div>
</article>

{#if showVideo}
	<VideoPopIn title={name} {videoUrl} bind:showVideo />
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
