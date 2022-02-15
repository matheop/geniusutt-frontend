<script lang="ts">
	import "../style/global.scss";
	import Footer from "$uikit/Footer.svelte";
	import Header from "$uikit/Header.svelte";

	import ModalCompo from "$components/templates/Modal.svelte";
	import { modal } from "$stores/modal";
	import { media } from "$stores/media";
	import { form } from "$stores/contact-form";
	import ContactForm from "$uikit/ContactForm.svelte";
	import Notifications from "$components/templates/Notifications.svelte";

	let windowWidth: number;
	$: if (windowWidth) media.up(windowWidth);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<Notifications />

{#if !!$modal}
	<ModalCompo {...$modal} />
{/if}

{#if !!$form}
	<ContactForm />
{/if}

<Header />

<main>
	<slot />
</main>

<Footer />

<style lang="scss">
	main {
		margin-top: $headerHeight;
		background-color: $prim-900;
	}
</style>
