<script>
	const name: string = "WORLD";
</script>

<main class="global-container">
	<h1>Hello, {name}!</h1>

	<section>In main</section>
</main>

<section>Out of main</section>

<style lang="scss">
	main {
		background-color: $prim-500;
		section {
			width: 100%;
			background-color: $sec-500;
		}
		h1 {
			text-align: center;
		}
	}

	section {
		width: 100%;
		background-color: $error;
	}
</style>
