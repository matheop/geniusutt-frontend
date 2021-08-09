<script context="module">
	export async function load({ page, session }) {
		if (
			/^\/admin\/(.*)/.test(page.path) &&
			!session.token &&
			!session.user
		) {
			return { redirect: "/admin", status: 302 };
		}
		return { props: {} };
	}
</script>

<script>
	import { session } from "$app/stores";

	import Login from "$components/admin/Login.svelte";
	import Navbar from "$components/admin/Navbar.svelte";
	import ModalCompo from "$components/templates/Modal.svelte";
	import Notifications from "$components/templates/Notifications.svelte";
	import { modal } from "$stores/modal";

	$: console.log("$session:", $session);
</script>

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
