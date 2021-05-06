<script>
	import PopIn from "$components/templates/PopIn.svelte";
	import Cross from "$svg/Cross.svelte";
	import Info from "$svg/Info.svelte";
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
	export let upcomingEvent: boolean = true;
	let showInfo: boolean = false;
	let showVideo: boolean = false;
	let maxHeight: string = "90vh";
</script>

<article on:click={() => (showInfo = true)}>
	<div class="info">
		<h4>{name}</h4>
		<p>{date}</p>
		<i>
			<Info />
		</i>
	</div>
	<div class="tags">
		{#each tags as tag}
			<span class="tag">{tag}</span>
		{/each}
	</div>
</article>

{#if showInfo}
	<PopIn {maxHeight} on:out-popin={() => (showInfo = false)}>
		<section class="event-card" style="max-height: {maxHeight}">
			<div
				class="popin-cross"
				on:click={() => (showInfo = false)}>
				<Cross />
			</div>

			<div class="img-cover">
				<img class="cover" src={imgUrl} alt={name} />
			</div>

			<h3>{name}</h3>

			<div>
				<EventInfo {eventInfo} />
			</div>

			<p>{desc}</p>

			{#if !!videoUrl}
				<button
					on:click={() => (showVideo = true)}
					class="link video">Voir la vidéo</button>
			{/if}
			{#if upcomingEvent}
				<button class="fill-blue">Participer</button>
			{/if}
		</section>
	</PopIn>

	{#if showVideo}
		<VideoPopIn {name} {videoUrl} bind:showVideo />
	{/if}
{/if}

<style lang="scss">
	article {
		width: 100%;
		background-color: $white;
		padding: $sp-200;
		@include br-500;
		cursor: pointer;

		.info {
			@include flex-y;
			justify-content: space-between;
			margin-bottom: $sp-200;

			h4 {
				width: 60%;
			}
			p {
				@include body2;
			}
			i {
				width: 1.5rem;
				height: 1.5rem;
			}
		}

		.tags {
			@include flex-y;
			flex-wrap: wrap;
			gap: $sp-50;
			.tag {
				color: $white;
				background-color: $success;
			}
		}
	}

	section {
		position: relative;
		background-color: $white;
		@include br-500;
		padding: $sp-300;
		overflow-y: scroll;

		& > *:not(:last-child) {
			margin-bottom: $sp-200;
		}

		.img-cover {
			width: 100%;
			@include mx(auto);
		}

		h3 {
			text-align: center;
		}

		p {
			@include body2;
		}

		button {
			display: block;
			margin: auto;
		}
	}
</style>
