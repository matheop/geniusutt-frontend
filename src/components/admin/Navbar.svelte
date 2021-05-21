<script>
	import { page } from "$app/stores";
	import Calendar from "$svg/admin/Calendar.svelte";

	import UserSettings from "$svg/admin/UserSettings.svelte";
	import Members from "$svg/admin/Members.svelte";
	import GeniusUtt from "$svg/logos/GeniusUTT.svelte";
	import type { SvelteComponent } from "svelte";

	$: path = $page.path;

	interface Links {
		icon: typeof SvelteComponent;
		route: string;
		hover: boolean;
	}

	const links: Links[] = [
		{
			icon: UserSettings,
			route: "/admin/users-settings",
			hover: false,
		},
		{
			icon: Calendar,
			route: "/admin/events",
			hover: false,
		},
		{
			icon: Members,
			route: "/admin/board-members",
			hover: false,
		},
	];
</script>

<div>
	<i class="logo">
		<GeniusUtt />
	</i>

	<nav>
		{#each links as i}
			<a
				on:mouseenter={() => (i.hover = true)}
				on:mouseleave={() => (i.hover = false)}
				href={i.route}
				class:active={path === i.route}>
				<i>
					<svelte:component
						this={i.icon}
						color={path === i.route || !!i.hover
							? "#fbde4b"
							: "#fff"} />
				</i>
			</a>
		{/each}
	</nav>
</div>

<style lang="scss">
	div {
		position: fixed;
		background-color: $black;
		color: $white;
		height: 100vh;
		width: 6rem;
		padding: $sp-300 $sp-200;

		.logo {
			position: relative;
			margin-bottom: $sp-900;
			width: 100%;
		}

		nav {
			position: relative;
			height: 100%;
			width: 100%;
			@include flex-y;
			flex-direction: column;
			gap: $sp-500;

			i {
				height: 2.5rem;
			}
		}
	}
</style>
