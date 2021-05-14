<svg
	width="196"
	height="189"
	viewBox="0 0 196 189"
	fill="none"
	xmlns="http://www.w3.org/2000/svg">
	<circle
		class="star-lg"
		cx="94.5"
		cy="94.5"
		r="62.5"
		fill="#7087E2"
		fill-opacity="0.5" />
	<circle
		class="star-md"
		cx="56"
		cy="140"
		r="15"
		fill="#7087E2"
		fill-opacity="0.5" />
	<circle
		cx="153"
		cy="39"
		r="7"
		fill="#FCE572"
		fill-opacity="0.5" />
	<circle
		class="star-xs"
		cx="162.5"
		cy="41.5"
		r="1.5"
		fill="#FCE572"
		fill-opacity="0.5" />
</svg>

<style lang="scss">
	.star-lg {
		@include animation(slide-top 7s ease infinite alternate both);
	}
	.star-md {
		@include animation(slide-x 10s ease infinite alternate both);
	}
	.star-xs {
		@include animation(circle 6s linear infinite both);
	}

	@include anim(slide-top) {
		0% {
			@include transform(translateY(0));
		}
		100% {
			@include transform(translateY(2rem));
		}
	}

	@include anim(slide-x) {
		0% {
			@include transform(translateX(0));
		}
		33% {
			@include transform(translateX(-1rem));
		}
		100% {
			@include transform(translateX(2rem));
		}
	}

	@include anim(circle) {
		0% {
			@include transform(
				rotate(0deg) translate(-20px) rotate(0deg)
			);
		}
		100% {
			@include transform(
				rotate(360deg) translate(-20px) rotate(-360deg)
			);
		}
	}
</style>
