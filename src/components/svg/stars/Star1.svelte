<svg
	width="558"
	height="557"
	viewBox="0 0 558 557"
	fill="none"
	xmlns="http://www.w3.org/2000/svg">
	<circle
		class="star-lg"
		cx="278.5"
		cy="278.5"
		r="246.5"
		fill="#7087E2"
		fill-opacity="0.5" />
	<circle
		class="star-md"
		cx="88"
		cy="428"
		r="41"
		fill="#7087E2"
		fill-opacity="0.5" />
	<circle
		class="star-sm-1"
		cx="503.5"
		cy="364.5"
		r="22.5"
		fill="#fce572"
		fill-opacity="0.5" />
	<circle
		class="star-sm-2"
		cx="327.5"
		cy="116.5"
		r="22.5"
		fill="#FFFFFF"
		fill-opacity="0.5" />
</svg>

<style lang="scss">
	.star-lg {
		@include animation(
			slide-top 10s ease infinite alternate both
		);
	}
	.star-md {
		@include animation(slide-tr 7s ease infinite alternate both);
	}
	.star-sm-1 {
		@include animation(
			slide-left 4s ease infinite alternate both
		);
	}
	.star-sm-2 {
		@include animation(circle 7s ease infinite reverse both);
	}

	// STAR LG
	@-webkit-keyframes slide-top {
		0% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		100% {
			-webkit-transform: translateY(-2rem);
			transform: translateY(-2rem);
		}
	}
	@keyframes slide-top {
		0% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		100% {
			-webkit-transform: translateY(-2rem);
			transform: translateY(-2rem);
		}
	}

	@-webkit-keyframes slide-tr {
		0% {
			-webkit-transform: translateY(0) translateX(0);
			transform: translateY(0) translateX(0);
		}
		100% {
			-webkit-transform: translateY(-100px) translateX(100px);
			transform: translateY(-100px) translateX(100px);
		}
	}
	@keyframes slide-tr {
		0% {
			-webkit-transform: translateY(0) translateX(0);
			transform: translateY(0) translateX(0);
		}
		100% {
			-webkit-transform: translateY(-100px) translateX(100px);
			transform: translateY(-100px) translateX(100px);
		}
	}

	@-webkit-keyframes slide-left {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
		100% {
			-webkit-transform: translateX(-100px);
			transform: translateX(-100px);
		}
	}
	@keyframes slide-left {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
		100% {
			-webkit-transform: translateX(-100px);
			transform: translateX(-100px);
		}
	}

	@-webkit-keyframes circle {
		0% {
			transform: rotate(0deg) translate(-165px) rotate(0deg);
		}
		100% {
			transform: rotate(360deg) translate(-165px)
				rotate(-360deg);
		}
	}
	@keyframes circle {
		0% {
			transform: rotate(0deg) translate(-165px) rotate(0deg);
		}
		100% {
			transform: rotate(360deg) translate(-165px)
				rotate(-360deg);
		}
	}
</style>
