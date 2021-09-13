<script>
	import PopIn from "./PopIn.svelte";

	export let title: string;
	export let desc: string;

	export let btn1: string = "Annuler";
	export let btn2: string = "Confirmer";
	export let action_btn1: () => {};
	export let action_btn2: () => {};
	export let action_3: () => {} = action_btn2;

	export let displayCrossBtn: boolean = false;
</script>

<PopIn on:out-popin={() => action_3()}>
	<section>
		{#if displayCrossBtn}
			<div id="cross" on:click={action_3}>&#10005;</div>
		{/if}
		<p class="title">{title}</p>
		<p>
			{@html desc}
		</p>
		<div class="btn-box">
			<button class="outline-danger" on:click={action_btn1}
				>{btn1}</button>
			<button class="fill-blue-btn" on:click={action_btn2}
				>{btn2}</button>
		</div>
	</section>
</PopIn>

<style lang="scss">
	section {
		background-color: $white;
		border-radius: $br-500;
		padding: $sp-400 $sp-500;
	}
	.title {
		@include t3-sb;
	}

	.title,
	p {
		text-align: center;
		margin: $sp-400 0;
	}

	#cross {
		position: absolute;
		top: $sp-200;
		right: $sp-200;
		@include flex;
		cursor: pointer;
		color: $grey-700;
		@include transition(color 0.4s ease);

		&:hover {
			color: $danger-500;
			@include transition(color 0.4s ease);
		}
	}

	.btn-box {
		@include flex;

		@include phone {
			flex-direction: column;
		}

		button {
			width: $sp-1000;

			&:first-of-type {
				margin-right: 0;
				margin-bottom: $sp-200;

				@include min-tablet {
					margin-right: $sp-200;
					margin-bottom: 0;
				}
			}
		}
	}
</style>
