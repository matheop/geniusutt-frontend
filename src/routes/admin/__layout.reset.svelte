<script context="module">
	export async function load({ url, session }) {
		if (
			/^\/admin\/(.*)/.test(url.path) &&
			!session.token &&
			!session.user
		) {
			return { redirect: "/admin", status: 302 };
		}
		return { props: {} };
	}
</script>

<script lang="ts">
	import { session } from "$app/stores";

	import Login from "$components/admin/Login.svelte";
	import Navbar from "$components/admin/Navbar.svelte";
	import ModalCompo from "$components/templates/Modal.svelte";
	import Notifications from "$components/templates/Notifications.svelte";
	import { media } from "$stores/media";
	import { modal } from "$stores/modal";

	let windowWidth: number;
	$: if (windowWidth) media.up(windowWidth);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<Notifications />

{#if !!$modal}
	<ModalCompo {...$modal} />
{/if}

{#if !!$session.token && !!$session.user}
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
	}
</style>
