<script>
	import { form } from "$stores/contact-form";
	import PopIn from "$components/templates/PopIn.svelte";

	import Cross from "$svg/Cross.svelte";
	import PaperPlane from "$svg/PaperPlane.svelte";

	import Input from "./Input.svelte";
	import TextMessage from "./TextMessage.svelte";

	const remove = () => form.remove();
</script>

<PopIn on:out-popin={remove} maxWidth="800px">
	<section class="form">
		<div class="popin-cross" on:click={remove}>
			<Cross />
		</div>

		<h1>Contact</h1>
		<!-- ROW 1 -->
		<div class="info">
			<div class="lastname">
				<Input
					placeholder="Nom*"
					autocomplete="family-name"
					isRequired={true} />
			</div>
			<div class="firstname">
				<Input
					placeholder="Prénom*"
					autocomplete="given-name"
					isRequired={true} />
			</div>
		</div>
		<!-- ROW 2 -->
		<div class="info">
			<div class="email">
				<Input
					placeholder="email@exemple.fr*"
					autocomplete="email"
					isRequired={true} />
			</div>
			<div class="organization">
				<Input placeholder="Organisation" />
			</div>
		</div>
		<!-- ROW 3 -->
		<div class="message">
			<TextMessage placeholder="Votre message..." />
		</div>

		<button class="fill-blue-btn">
			C'est parti !
			<i>
				<PaperPlane />
			</i>
		</button>
	</section>
</PopIn>

<style lang="scss">
	.form {
		position: relative;
		background-color: $white;
		border-radius: $br-500;
		padding: $sp-500 $sp-300;
		max-height: 95vh;
		overflow-y: scroll;

		@include min-tablet {
			padding: $sp-600 $sp-700;
		}

		h1 {
			color: $black;
			text-align: center;
			text-transform: uppercase;
			margin-bottom: $sp-400;

			@include min-tablet {
				margin-bottom: $sp-600;
			}
		}

		.info > div {
			margin-bottom: $sp-400;
			width: 100%;

			@include min-tablet {
				&:first-of-type {
					margin-right: $sp-400;
				}
			}
		}
		.message {
			margin-bottom: $sp-500;
		}

		@include min-tablet {
			.info {
				display: flex;
			}
		}

		button {
			margin: auto;
			@include icon-btn(1.5rem, 1rem);
		}
	}
</style>
