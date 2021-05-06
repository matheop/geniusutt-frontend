<script>
	export let imgUrl: string;
	export let title: string;
	export let desc: string;
	export let link: string;
	export let target_blank: boolean = false;
</script>

<div class="card">
	<div class="img">
		<img class="cover" src={imgUrl} alt={title} />
	</div>
	<h4>
		{title}
	</h4>
	<p>{@html desc}</p>
	<a href={link} target={target_blank ? "_blank" : ""}>
		Plus d'infos >
	</a>
</div>

<style lang="scss">
	.card {
		width: 17rem;
		min-height: 21rem;
		color: $white;
		@include transition($transition);

		&:hover {
			transform: scale(1.02);
			@include transition($transition);
		}

		& > * {
			margin: 0 auto 1rem;
			text-align: center;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.img {
			@include circle;
			overflow: hidden;
			width: 10rem;
			height: 10rem;
		}

		a {
			display: block;
			@include body2-sb;
			color: $sec-500;
		}
	}
</style>
