<script>
	import Navbar from "$components/admin/Navbar.svelte";
</script>

<Navbar />

<main>
	<slot />
</main>

<style lang="scss">
	main {
		margin-left: $BOnavWidth;
	}
</style>
