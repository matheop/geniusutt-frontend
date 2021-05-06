<script>
	import MetricBox from "$components/homepage/MetricBox.svelte";
	import ObjectiveCard from "$components/homepage/ObjectiveCard.svelte";
	import ProfileCard from "$components/homepage/ProfileCard.svelte";
	import { form } from "$stores/contact-form";
	import University from "$svg/homepage/University.svelte";
</script>

<main class="global-container">
	<ProfileCard
		img="/img/paul-julien.jpeg"
		name="Paul Julien"
		position="Président - Genius UTT"
		desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
		linkedin="https://www.linkedin.com/in/paul-julien0704/" />

	<MetricBox
		metric={16}
		label={"Écoles & Universités"}
		color="yellow">
		<University />
	</MetricBox>

	<ObjectiveCard
		link="uikit"
		imgUrl="/img/helping-hand.jpeg"
		title="Aider 🤝"
		desc="Les étudiants à développer leur projet en les accompagnant tout le long de leur formation." />

	<button class="fill-blue" on:click={() => form.set()}>
		Contact
	</button>
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
