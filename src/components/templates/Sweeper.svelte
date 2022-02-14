<script lang="ts">
	import { onMount } from "svelte";

	export let contentWidth: string;

	onMount(() => {
		document.documentElement.style.setProperty(
			"--content-width",
			contentWidth
		);
	});
</script>

<div class="sweeper">
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
			box-sizing: initial;
			@include phone {
				margin: 0 calc(50vw - (var(--content-width) / 2)); // 13.5 === ProfileCard's width
			}
			&:last-child {
				padding-right: calc(
					50vw - (var(--content-width) / 2)
				);
			}
		}
	}
</style>
