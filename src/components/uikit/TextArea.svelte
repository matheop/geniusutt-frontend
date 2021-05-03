<script lang="ts">
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

<div class="textarea">
	<textarea
		{rows}
		{placeholder}
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		bind:value
		on:input={() => (isInputClicked = true)} />

	<span class:warning
		>Caractères restants: {chars} / {maxChars}</span>
</div>
{#if errors.length && displayError}
	<ErrorMessage error={errors[0]} />
{/if}

<style lang="scss">
	.textarea {
		position: relative;
		width: 100%;
		padding-bottom: $sp-300;

		span {
			color: $grey-700;
			position: absolute;
			@include body2;
			right: $sp-300;
			bottom: 0;

			&.warning {
				color: $error;
			}
		}
	}
</style>
