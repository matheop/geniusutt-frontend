<script lang="ts">
	/* Helpers */
	import type { ValidationProperty } from "$helpers/interfaces/index";
	import ErrorMessage from "$uikit/helpers/ErrorMessage.svelte";

	export let value: string = "";
	export let type: "text" | "email" | "password" | "tel" | "file" =
		"text";
	export let placeholder: string = "";
	export let autocomplete: string = "";
	export let name: string = "";

	//validation
	let isInputClicked: boolean = false;
	// export let validation: ValidationProperty;
	export let errors: string[] = [];
	export let isFormChecked: boolean = false;
	export let isRequired: boolean = false;

	$: displayError = isInputClicked || isFormChecked;
</script>

{#if type === "text"}
	<input
		type="text"
		{placeholder}
		bind:value
		{autocomplete}
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		required={isRequired}
		on:input={() => (isInputClicked = true)} />
{:else if type === "email"}
	<input
		type="email"
		{placeholder}
		bind:value
		autocomplete="email"
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		required={isRequired}
		on:input={() => (isInputClicked = true)} />
{:else if type === "tel"}
	<input
		type="text"
		{placeholder}
		bind:value
		autocomplete="tel"
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		on:input={() => (isInputClicked = true)} />
{:else if type === "password"}
	<input
		type="password"
		{placeholder}
		bind:value
		autocomplete="password"
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		required={isRequired}
		on:input={() => (isInputClicked = true)} />
{:else if type === "file"}
	<input
		id="file"
		type="file"
		{placeholder}
		bind:value
		{name}
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		required={isRequired}
		accept="image/png, image/jpeg, image/jpg"
		on:input={() => (isInputClicked = true)} />
{/if}
{#if errors.length && displayError}
	<ErrorMessage error={errors[0]} />
{/if}
