<script>
	import "../style/global.scss";
	import Footer from "$uikit/Footer.svelte";
	import Header from "$uikit/Header.svelte";

	import ModalCompo from "$components/templates/Modal.svelte";
	import { modal } from "$stores/modal";
	import { media } from "$stores/media";

	let windowWidth: number;
	$: if (windowWidth) media.up(windowWidth);
</script>

{#if !!$modal}
	<ModalCompo {...$modal} />
{/if}

<svelte:window bind:innerWidth={windowWidth} />

<Header />

<slot />

<Footer />
