<script lang="ts">
	import { getEventsAction } from "$helpers/getEventsAction";
	import { current_component } from "svelte/internal";
	const events = getEventsAction(current_component);

	let isFocused: boolean = false;
	const onFocus = () => (isFocused = true);
	const onBlur = () => (isFocused = false);

	/* Components */
	import ErrorMessage from "$uikit/helpers/ErrorMessage.svelte";

	export let value: string = "";
	export let placeholder: string = "Message";
	export let rows: number = 5;
	export let maxChars: number = 500;

	let warning: boolean = false;

	//validation
	let isInputClicked: boolean = false;
	export let errors: string[] = [];
	export let isFormChecked: boolean = false;

	$: chars = maxChars - value.length;

	$: chars < 100 ? (warning = true) : (warning = false);

	$: displayError = isInputClicked || isFormChecked;
</script>

<div class="text-message" class:isFocused>
	<input
		on:focus={onFocus}
		on:blur={onBlur}
		use:events
		type="text"
		class="subject"
		placeholder="Objet" />

	<hr />

	<textarea
		use:events
		on:focus={onFocus}
		on:blur={onBlur}
		{rows}
		{placeholder}
		bind:value
		on:input={() => (isInputClicked = true)} />
	<!-- class:valid={!errors.length && value} -->
	<!-- class:error={errors.length && displayError} -->

	<span class:warning>
		Caractères restants: {chars} / {maxChars}
	</span>
</div>
{#if errors.length && displayError}
	<ErrorMessage error={errors[0]} />
{/if}

<style lang="scss">
	.text-message {
		background-color: $white;
		position: relative;
		width: 100%;
		padding: 0;
		padding-bottom: $sp-300;
		@include br-300;
		@include ds-300;
		@include border($white);
		@include transition("0.3s border ease, 0.3s box-shadow ease");

		&.isFocused {
			@include ds-500;
			@include transition(0.3s box-shadow ease);
		}

		input,
		textarea {
			@include box-shadow(none);
			@include border(none);
			border-radius: none;
		}

		hr {
			height: 2px;
			margin: 0 $sp-200;
			background-color: $grey-400;
		}

		span {
			color: $grey-700;
			position: absolute;
			@include body2;
			right: $sp-300;
			bottom: $sp-100;

			&.warning {
				color: $error;
			}
		}
	}
</style>
