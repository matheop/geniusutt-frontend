<script>
	import Lightbeams from "./Lightbeams.svelte";
	import Rocket from "./Rocket.svelte";
</script>

<div>
	<i>
		<Rocket />
	</i>
	<i>
		<Lightbeams />
	</i>
</div>

<style lang="scss">
	div {
		@include flex-y;
		flex-direction: column;
	}
</style>
