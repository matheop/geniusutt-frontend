<script>
	const name: string = "WORLD";
</script>

<container>
	<h1>Hello, {name}!</h1>
</container>

<style lang="scss">
	container {
		@include grid-12;
		h1 {
			text-align: center;
			grid-column: 1/13;
		}
	}
</style>
