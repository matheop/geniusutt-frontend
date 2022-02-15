<script lang="ts">
	import { page } from "$app/stores";
	import Calendar from "$svg/admin/Calendar.svelte";

	import UserSettings from "$svg/admin/UserSettings.svelte";
	import Members from "$svg/admin/Members.svelte";
	import GeniusUtt from "$svg/logos/GeniusUTT.svelte";
	import type { SvelteComponent } from "svelte";
	import TextBubble from "$svg/admin/TextBubble.svelte";
	import User from "$svg/admin/User.svelte";
	import { session } from "$app/stores";
	import { Role } from "$helpers/enums";
	import Information from "$svg/admin/Information.svelte";

	$: path = $page.url.pathname;

	let profileHovering: boolean = false;

	interface Links {
		icon: typeof SvelteComponent;
		route: string;
		hover: boolean;
	}

	const adminLinks: Links[] = [
		{
			icon: UserSettings,
			route: "/admin/users",
			hover: false,
		},
		{
			icon: Members,
			route: "/admin/board-members",
			hover: false,
		},
	];

	const links: Links[] = [
		{
			icon: Calendar,
			route: "/admin/events",
			hover: false,
		},
		{
			icon: TextBubble,
			route: "/admin/contact-forms",
			hover: false,
		},
		{
			icon: Information,
			route: "/admin/help",
			hover: false,
		},
	];

	if ($session.user?.role === Role.ADMIN) {
		links.unshift(adminLinks[0]);
		links.splice(-1, 0, adminLinks[1]);
	}
</script>

<div class="navbar">
	<i class="logo">
		<GeniusUtt />
	</i>

	<nav>
		{#each links as i}
			<a
				sveltekit:prefetch
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

	<i class="profile">
		<a
			sveltekit:prefetch
			href="/admin/profile"
			class:active={path === "/admin/profile"}
			on:mouseenter={() => (profileHovering = true)}
			on:mouseleave={() => (profileHovering = false)}>
			<User color={profileHovering ? "#fbde4b" : "#fff"} />
		</a>
	</i>
</div>

<style lang="scss">
	.navbar {
		position: fixed;
		background-color: $black;
		color: $white;
		height: 100vh;
		width: $BOnavWidth;
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

		.profile {
			cursor: pointer;
			width: 4rem;
			position: absolute;
			bottom: 1rem;
		}
	}
</style>
