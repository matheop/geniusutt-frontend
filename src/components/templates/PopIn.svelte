<script>
	/* Svelte */
	import {
		createEventDispatcher,
		onDestroy,
		onMount,
	} from "svelte";
	import { fade, fly } from "svelte/transition";

	export let width: string = "90%";
	export let maxWidth: string = "600px";
	export let maxHeight: string = "90vh";

	const dispatch = createEventDispatcher();

	// onMount(() => document.body.classList.add("no-scroll"));
	// onDestroy(() => document.body.classList.remove("no-scroll"));

	const checkTargetId = (e) => {
		document.body.classList.remove("no-scroll");
		if (e.target.id === "popin-blur") dispatch("out-popin");
	};
</script>

<div
	transition:fade={{ duration: 400 }}
	id="popin-blur"
	on:click={(e) => checkTargetId(e)}>
	<div
		in:fly={{ delay: 250, y: 200, duration: 400 }}
		out:fly={{ y: 200 }}
		style="width: {width}; max-width: {maxWidth}; max-height: {maxHeight}"
		id="popin">
		<slot />
	</div>
</div>

<style lang="scss">
	#popin-blur {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 99999;
		background-color: rgba($prim-900, 0.6);
		@include flex;

		#popin {
			position: relative;
			background-color: transparent;
			z-index: 10000;
		}
	}
</style>
