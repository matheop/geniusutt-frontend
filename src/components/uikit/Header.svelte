<script>
	import { slide } from "svelte/transition";
	import GeniusUtt from "$svg/logos/GeniusUTT.svelte";
	import { isPhone } from "$stores/media";
	import HeaderNav from "./helpers/HeaderNav.svelte";

	let openMenu: boolean = false;

	const toggleMenu = () => (openMenu = !openMenu);
</script>

<header>
	<div class="global-container">
		<a aria-label="Accueil" href="/">
			<div class="logo">
				<i>
					<GeniusUtt />
				</i>
			</div>
		</a>

		{#if $isPhone}
			<div on:click={toggleMenu} class="burger" />
		{/if}

		<nav class="desktop">
			<HeaderNav />
		</nav>
	</div>

	{#if $isPhone && openMenu}
		<nav transition:slide class="mobile">
			<HeaderNav on:click={toggleMenu} />
		</nav>
	{/if}
</header>

<style lang="scss">
	header {
		position: fixed;
		top: 0;
		z-index: 1000;
		background-color: $black;
		height: $headerHeight;
		width: 100%;
		@include ds-700;

		.global-container {
			height: 100%;
			@include flex-y;
			justify-content: space-between;

			@include min-tablet {
				@include grid-12;
			}
			.logo {
				grid-column: 1 / 6;
				@include min-tablet {
					grid-column: 1 / 3;
				}
				background-color: $white;
				// i {
				// 	height: 3rem;
				// }
			}
			.burger {
				background-color: $white;
				width: 2rem;
				height: 2rem;
				cursor: pointer;
			}
			nav.desktop {
				grid-column: 6 / -1;
				@include flex-y;
				justify-content: space-between;

				@include xl-desktop {
					grid-column: 3 / -1;
				}

				@include tablet {
					grid-column: 3 / -1;
				}

				@include phone {
					display: none;
				}
			}
		}
	}

	nav.mobile {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		height: calc(100vh - #{$headerHeight} + 2px);
		width: 100%;
		background-color: $black;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		& > :global(*) {
			@include mx(auto);
		}
	}
</style>
