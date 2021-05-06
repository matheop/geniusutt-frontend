<script>
	import VideoPopIn from "$components/events/utils/VideoPopIn.svelte";

	import { isPhone } from "$stores/media";

	export let title: string;
	export let desc: string;
	export let videoUrl: string;
	export let color: "blue" | "yellow";
	export let displayBtn: boolean = false;

	let showVideo: boolean = false;
</script>

<article>
	<h3 class={color}>{title}</h3>
	<p>{@html desc}</p>

	{#if $isPhone}
		<button
			on:click={() => (showVideo = true)}
			class="link video">
			Voir la vidéo
		</button>
	{/if}

	{#if displayBtn}
		<button class="fill-{color}">En savoir +</button>
	{/if}
</article>

{#if showVideo}
	<VideoPopIn {title} {videoUrl} bind:showVideo />
{/if}

<style lang="scss">
	article {
		background-color: $white;
		color: $black;
		padding: $sp-300;
		@include br-500;
		@include ds-300;

		& > *:not(:last-child) {
			margin-bottom: $sp-300;
		}

		h3 {
			text-align: center;

			&.blue {
				color: $prim-500;
			}
			&.yellow {
				color: $sec-700;
			}
		}

		button {
			margin: auto;

			&.video {
				color: $black;
				margin-bottom: $sp-400;
			}
		}
	}
</style>
