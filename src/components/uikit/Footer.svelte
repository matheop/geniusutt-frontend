<script>
	import GeniusUtt from "$svg/logos/GeniusUTT.svelte";
	import Facebook from "$svg/networks/Facebook.svelte";
	import Instagram from "$svg/networks/Instagram.svelte";
	import LinkedIn from "$svg/networks/LinkedIn.svelte";
	import Twitter from "$svg/networks/Twitter.svelte";
	import Youtube from "$svg/networks/Youtube.svelte";
	import type { SvelteComponent } from "svelte";

	const currentYear: number = new Date().getFullYear();

	interface Media {
		label: string;
		link: string;
		compo: typeof SvelteComponent;
		hover: boolean;
	}

	const medias: Media[] = [
		{
			label: "LinkedIn",
			link: "https://www.linkedin.com/company/innov'utt/",
			compo: LinkedIn,
			hover: false,
		},
		{
			label: "Twitter",
			link: "https://twitter.com/genius_utt",
			compo: Twitter,
			hover: false,
		},
		{
			label: "Youtube",
			link:
				"https://www.youtube.com/channel/UC1X2wjYmQSnO7t-ZZhy3UqQ",
			compo: Youtube,
			hover: false,
		},
		{
			label: "Facebook",
			link: "https://www.facebook.com/geniusutt",
			compo: Facebook,
			hover: false,
		},
		{
			label: "Instagram",
			link: "https://www.instagram.com/geniusutt/?hl=fr",
			compo: Instagram,
			hover: false,
		},
	];
</script>

<footer>
	<div class="global-container">
		<div class="content">
			<nav>
				<a class="yellow-link" href="/equipe"> Équipe </a>
				<a class="yellow-link" href="/coaching"> Coaching </a>
				<a class="yellow-link" href="/evenements">
					Nos événements
				</a>
			</nav>

			<div class="contact">
				<a href="mailto:contact@geniusutt.fr">
					contact@geniusutt.fr
				</a>
				<a href="tel:+33787281791">07 87 28 17 91</a>
				<div class="medias">
					{#each medias as md}
						<i>
							<a
								on:mouseenter={() =>
									(md.hover = true)}
								on:mouseleave={() =>
									(md.hover = false)}
								target="_blank"
								rel="noopener"
								href={md.link}
								aria-label={md.label}>
								<svelte:component
									this={md.compo}
									color={md.hover
										? "yellow"
										: "white"} />
							</a>
						</i>
					{/each}
				</div>
			</div>
		</div>

		<div class="logo-div">
			<i class="logo"><GeniusUtt /></i>
			<p>
				©{currentYear} par M&P
			</p>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		background-color: $black;
	}
	.global-container {
		@include body2;
		@include py($sp-800);

		@include phone {
			@include px($sp-800);
		}

		@include min-tablet {
			@include flex-y;
			flex-direction: row-reverse;
			justify-content: space-between;
		}

		.content {
			@include min-tablet {
				@include flex-y;
				gap: $sp-800;
			}

			@include phone {
				> * {
					margin-bottom: $sp-500;
				}
			}
		}

		nav > *,
		.contact > * {
			display: block;
			&:not(:last-child) {
				margin-bottom: $sp-200;
			}
		}

		.contact {
			.medias {
				@include flex-y;
				flex-wrap: wrap;
				gap: $sp-200;

				i {
					width: 1.5rem;
					height: 1.5rem;
				}
			}
		}

		.logo {
			margin: auto;
			padding-top: $sp-300;
			display: block;
			width: fit-content;
		}
	}
</style>
