<script>
	import MetricBox from "$components/homepage/MetricBox.svelte";
	import ObjectiveCard from "$components/homepage/ObjectiveCard.svelte";
	import University from "$svg/University.svelte";
</script>

<main class="global-container">
	<ObjectiveCard />

	<MetricBox
		metric={16}
		label={"Écoles & Universités"}
		color="yellow">
		<University />
	</MetricBox>
</main>

<style lang="scss">
	main {
		border: 1px $black solid;
	}
</style>
