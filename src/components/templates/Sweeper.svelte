<script>
	import { onMount } from "svelte";

	export let contentWidth: string;

	onMount(() => {
		document.documentElement.style.setProperty(
			"--content-width",
			contentWidth
		);
	});
</script>

<div class="sweeper" style="">
	<slot />
</div>

<style lang="scss">
	:root {
		--content-width: 8rem;
	}
	.sweeper {
		scroll-snap-type: x mandatory;
		display: flex;
		justify-content: space-between;
		overflow-x: scroll;
		overflow-y: hidden;
		padding: 1rem 0;

		& > :global(*) {
			scroll-snap-align: center;
			margin: 0 calc(50vw - (var(--content-width) / 2)); // 13.5 === ProfileCard's width
			box-sizing: initial;
			&:last-child {
				padding-right: calc(
					50vw - (var(--content-width) / 2)
				);
			}
		}
	}
</style>
