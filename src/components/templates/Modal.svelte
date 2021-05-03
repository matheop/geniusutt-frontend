<script>
	import { modal } from "$stores/modal";

	/* Svelte */
	import { fade, fly } from "svelte/transition";

	export let title: string;
	export let desc: string;

	export let btn1: string = "Annuler";
	export let btn2: string = "Confirmer";
	export let action_btn1: () => {};
	export let action_btn2: () => {};
	export let action_3: () => {} = action_btn1;

	export let displayCrossBtn: boolean = false;

	const checkTargetId = (e) => {
		if (e.target.id === "modalBlur") {
			modal.remove();
			action_3();
		}
	};
</script>

<div
	transition:fade={{ duration: 400 }}
	id="modalBlur"
	on:click={(e) => checkTargetId(e)}>
	<div
		in:fly={{ delay: 250, y: 200, duration: 400 }}
		out:fly={{ y: 200 }}
		id="modal">
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
			<button class="fill-blue" on:click={action_btn2}
				>{btn2}</button>
		</div>
	</div>
</div>

<style lang="scss">
	#modalBlur {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 99999;
		background-color: rgba($black, 0.3);
		@include flex;

		#modal {
			position: relative;
			background-color: $white;
			border-radius: $br-500;
			padding: $sp-400 $sp-500;
			max-width: 90%;
			z-index: 10000;

			@include min-tablet {
				max-width: 600px;
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
		}
	}
</style>
