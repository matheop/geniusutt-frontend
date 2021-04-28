<script>
	const name: string = "WORLD";
</script>

<main class="global-container">
	<h1>Hello, {name}!</h1>

	<section>In main</section>
</main>

<section>
	<button class="fill-blue">Primary Fill</button>
	<button class="outline-blue">Primary Outline</button>
	<button class="fill-yellow">Secondary Fill</button>
	<button class="outline-yellow">Secondary Outline</button>
	<button class="link">Link Button</button>
	<a href="#">default</a>
	<a href="#" class="yellow-link">yell</a>
	<a href="#" class="header-link">Header Link</a>
</section>

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
