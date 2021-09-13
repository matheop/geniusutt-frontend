<script lang="ts">
	/* Svelte */
	import { slide } from "svelte/transition";

	export let error: string = "";
</script>

<p class="input-error" transition:slide={{ duration: 400 }}>
	{error}
</p>
