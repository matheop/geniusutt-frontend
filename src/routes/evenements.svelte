<script>
	import EventDesktop from "$components/events/EventDesktop.svelte";
	import EventMobile from "$components/events/EventMobile.svelte";
	import Seo from "$components/templates/SEO.svelte";
</script>

<Seo title="Genius UTT | Événements" url="TODO" image="TODO" />

<main class="global-container">
	<section>
		<EventMobile
			name="TEDxUTTroyes 2021"
			date="21 Décembre"
			imgUrl="/img/paul-julien.jpeg"
			desc="Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.
		Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum." />

		<EventDesktop
			name="TEDxUTTroyes 2021"
			date="21 Décembre"
			imgUrl="/img/paul-julien.jpeg"
			desc="Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum.
		Une petite description des familles pour présenter ce magnifique événement qui se tient chez nous chaque année.
		Que dire de plus ? Je ne sais que trop vous répondre. Lorem ipsum." />
	</section>
</main>

<style lang="scss">
	main {
		padding: $sp-700 $sp-200;
		background-color: $prim-900;
	}
</style>
