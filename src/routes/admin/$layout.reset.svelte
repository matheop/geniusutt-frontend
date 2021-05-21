<script>
	import Navbar from "$components/admin/Navbar.svelte";
	import ModalCompo from "$components/templates/Modal.svelte";
	import Notifications from "$components/templates/Notifications.svelte";
	import { modal } from "$stores/modal";
</script>

<Notifications />

<Navbar />

{#if !!$modal}
	<ModalCompo {...$modal} />
{/if}

<main>
	<slot />
</main>

<style lang="scss">
	main {
		margin-left: $BOnavWidth;
	}
</style>
