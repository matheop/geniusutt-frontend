<script>
	import { page } from "$app/stores";
	import { form } from "$stores/contact-form";
	import PaperPlane from "$svg/PaperPlane.svelte";

	$: path = $page.path;
</script>

<a
	href="/equipe"
	on:click
	class:active={path === "/equipe"}
	class="header-link">
	EQUIPE
</a>
<a
	href="/coaching"
	on:click
	class:active={path === "/coaching"}
	class="header-link">
	COACHING
</a>
<a class="no-deco" href="/evenements" on:click>
	<button class="outline-yellow">Events</button>
</a>
<button class="fill-blue contact" on:click on:click={form.set}>
	Contact
	<i>
		<PaperPlane />
	</i>
</button>

<style lang="scss">
	.contact {
		@include icon-btn(1.5rem, $sp-100);
	}
</style>
