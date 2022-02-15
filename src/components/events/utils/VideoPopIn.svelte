<script lang="ts">
	import PopIn from "$components/templates/PopIn.svelte";

	export let title: string;
	export let videoUrl: string;
	export let showVideo: boolean = false;
</script>

<PopIn on:out-popin={() => (showVideo = false)}>
	<section class="video-popin">
		<iframe {title} max-height="60vh" src={videoUrl} />
		<h3>{title}</h3>
	</section>
</PopIn>

<style lang="scss">
	.video-popin {
		background-color: $white;
		@include br-500;
		overflow: hidden;
		padding: $sp-200;

		iframe {
			@include br-500;
			margin: auto;
			display: block;
			width: 100%;
			min-height: 360px;
		}

		h3 {
			margin-top: $sp-200;
			text-align: center;
		}
	}
</style>
