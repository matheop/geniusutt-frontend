<script lang="ts">
	import { isPhone } from "$stores/media";

	export let title: string;
	export let desc: string;
	export let imgUrl: string;
	export let imgSide: "left" | "right" = "left";
</script>

<article
	style="flex-direction: {imgSide === 'right' && !$isPhone
		? 'row-reverse'
		: imgSide === 'left' && !$isPhone
		? 'row'
		: ''}">
	<div class="img-cover {imgSide}">
		<img class="cover" src={imgUrl} alt={title} />
	</div>
	<div class="content">
		<h3 style="text-align: {imgSide}">{title}</h3>
		<p>{@html desc}</p>
	</div>
</article>

<style lang="scss">
	article {
		color: $white;
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

		.content {
			h3 {
				margin-bottom: $sp-200;
				@include phone {
					@include t4;
					text-align: center !important;
				}
			}
		}
	}
</style>
