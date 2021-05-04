<script>
	import MetricBox from "$components/homepage/MetricBox.svelte";
	import ObjectiveCard from "$components/homepage/ObjectiveCard.svelte";
	import University from "$svg/University.svelte";
</script>

<main class="global-container">
	<MetricBox
		metric={16}
		label={"Écoles & Universités"}
		color="yellow">
		<University />
	</MetricBox>

	<ObjectiveCard
		img="/img/helping-hand.jpeg"
		title="Aider 🤝"
		desc="Les étudiants à développer leur projet en les accompagnant tout le long de leur formation." />
</main>

<style lang="scss">
	main {
		border: 1px $black solid;
		background-color: $prim-900;

		> :global(*) {
			margin: auto;
		}
	}
</style>
