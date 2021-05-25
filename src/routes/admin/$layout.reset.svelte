<script>
	import Login from "$components/admin/Login.svelte";
	import Navbar from "$components/admin/Navbar.svelte";
	import ModalCompo from "$components/templates/Modal.svelte";
	import Notifications from "$components/templates/Notifications.svelte";
	import { isAuth } from "$stores/isAuth";
	import { modal } from "$stores/modal";
	import { onMount } from "svelte";

	onMount(() => {
		const token = window.localStorage.getItem("token");
		console.log("token:", token);
	});
</script>

<Notifications />

{#if !!$modal}
	<ModalCompo {...$modal} />
{/if}

{#if $isAuth}
	<Navbar />

	<main>
		<slot />
	</main>
{:else}
	<Login />
{/if}

<style lang="scss">
	main {
		margin-left: $BOnavWidth;

		:global(*) {
			color: $black;
		}
	}
</style>
