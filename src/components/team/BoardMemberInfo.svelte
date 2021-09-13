<script>
	import { API_URL } from "env";
	import { isPhone } from "$stores/media";

	export let name: string;
	export let position: string;
	export let imgUrl: string;
	export let desc: string;
	export let imgSide: "left" | "right" = "left";
</script>

<article>
	<h2 style="text-align: {imgSide}">
		{name}
		{@html $isPhone ? "<br/>" : " – "}
		<span>{position}</span>
	</h2>
	<hr />
	<div
		class="flex-content"
		style="flex-direction: {imgSide === 'right' && !$isPhone
			? 'row-reverse'
			: imgSide === 'left' && !$isPhone
			? 'row'
			: ''}">
		<div class="img-cover {imgSide}">
			<img
				class="cover"
				src={`${API_URL}/${imgUrl}`}
				alt={name} />
		</div>
		<p>{@html desc}</p>
	</div>
</article>

<style lang="scss">
	article {
		width: 100%;
		color: $white;
		background-color: $prim-900;

		h2 {
			@include phone {
				text-align: center !important;

				span {
					@include t4;
				}
			}
		}

		hr {
			border: 1px solid $white;
			margin: $sp-200 0;
		}

		.flex-content {
			@include flex-y;
			text-align: justify;
			flex-direction: column;

			.img-cover {
				min-width: 11rem;
				width: 11rem;
				height: 11rem;

				@include phone {
					margin-bottom: $sp-200;
				}

				@include min-tablet {
					&.left {
						margin-right: $sp-300;
					}
					&.right {
						margin-left: $sp-300;
					}
				}
			}
		}
	}
</style>
