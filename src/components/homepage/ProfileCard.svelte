<script lang="ts">
	import { API_URL } from "env";
	import LinkedIn from "$svg/networks/LinkedIn.svelte";

	export let imgUrl: string;
	export let name: string;
	export let position: string;
	export let desc: string;
	export let linkedin: string;
</script>

<div class="profile-card">
	<div class="flip-card">
		<!-- FRONT -->
		<div class="flip-front">
			<div class="img-cover">
				<img
					class="cover"
					src={`${API_URL}/${imgUrl}`}
					alt={name} />
			</div>
			<p class="light">
				{name}
			</p>
			<p>
				{position}
			</p>
		</div>
		<!-- BACK -->
		<div class="flip-back">
			<p class="light">{name}</p>
			<h6>{@html desc}</h6>
			<a
				href={linkedin}
				target="_blank"
				rel="noopener"
				aria-label="LinkedIn de {name}">
				<i>
					<LinkedIn color={"black"} />
				</i>
			</a>
		</div>
	</div>
</div>

<style lang="scss">
	.profile-card {
		width: 13.5rem;
		min-width: 13.5rem;
		height: 17rem;
		perspective: 1000px; // 3D effect

		.flip-front > *,
		.flip-back > * {
			margin: 0 auto;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.light {
			text-transform: uppercase;
			position: relative;
			@include caption;
			text-align: center;

			@include caption-light;
		}

		&:hover .flip-card {
			transform: rotateY(180deg);
		}

		.flip-card {
			position: relative;
			width: 100%;
			height: 100%;
			text-align: center;
			transition: transform 0.8s;
			transform-style: preserve-3d;

			.flip-front,
			.flip-back {
				position: absolute;
				width: 100%;
				height: 100%;
				@include backface-visibility;

				@include br-500;
				padding: 1rem;
			}

			.flip-front {
				background-color: $white;
				.img-cover {
					width: 11rem;
					height: 11rem;
					margin-bottom: $sp-200;
				}

				.light {
					margin-bottom: $sp-100;
					@include backface-visibility; // bc .light also exists in .flip-back
				}

				p {
					text-align: center;
				}
			}

			.flip-back {
				background-color: rgba($white, 1);
				color: $black;
				transform: rotateY(180deg);

				.light:after {
					@include underlining($black);
				}

				h6 {
					text-align: justify;
					margin: $sp-300 auto $sp-200;
				}
			}
		}
	}
	i {
		width: 1.5rem;
		height: 1.5rem;
		display: inline-block;
	}
</style>
