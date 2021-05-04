<script>
	export let img: string;
	export let title: string;
	export let desc: string;
	export let link: string;
	export let target_blank: boolean = false;
</script>

<div class="card">
	<div class="img">
		<img src={img} alt={title} />
	</div>
	<h4>
		{title}
	</h4>
	<p>{desc}</p>
	<a href={link} target={target_blank ? "_blank" : ""}>
		Plus d'infos >
	</a>
</div>

<style lang="scss">
	.card {
		width: 17rem;
		min-height: 21rem;
		color: $white;

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

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		a {
			display: block;
			color: $sec-500;
		}
	}
</style>
