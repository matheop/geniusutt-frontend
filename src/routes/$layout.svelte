<script>
	import "../style/global.scss";
	import Footer from "$uikit/Footer.svelte";
	import Header from "$uikit/Header.svelte";

	import ModalCompo from "$components/templates/Modal.svelte";
	import { modal } from "$stores/modal";
</script>

{#if !!$modal}
	<ModalCompo {...$modal} />
{/if}

<Header />

<slot />

<Footer />
