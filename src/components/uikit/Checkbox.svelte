<script lang="ts">
	import Checked from "$svg/admin/Checked.svelte";

	/* Svelte */
	import { createEventDispatcher } from "svelte";
	import ErrorMessage from "./helpers/ErrorMessage.svelte";
	/* Components */

	/* SVG - Icons */

	const dispatch = createEventDispatcher();

	export let label: string = "";
	export let datacy: string;

	export let isChecked: boolean = false;
	export let isFormChecked: boolean = false;
	export let errors: string[] = [];

	let isCheckboxClicked: boolean = false;

	const toggleCheck = () => {
		isChecked = !isChecked;
		dispatch("toggle-check", isChecked);
	};

	$: displayError = isCheckboxClicked || isFormChecked;
</script>

<div on:click={toggleCheck} class="checkbox-container">
	<div
		class="checkbox"
		class:isChecked
		data-cy={datacy}
		class:error={errors.length && displayError}
		class:valid={!errors.length && isChecked}>
		{#if isChecked}
			<i>
				<Checked />
			</i>
		{/if}
	</div>
	<p>{label}</p>
</div>

{#if errors.length && displayError}
	<ErrorMessage error={errors[0]} />
{/if}

<style lang="scss">
	.checkbox-container {
		cursor: pointer;
		width: 100%;
		@include flex-y;

		& > * {
			margin-left: $sp-200;
		}

		.checkbox {
			position: relative;
			min-width: 1.2rem;
			height: 1.2rem;
			background-color: $white;
			border-radius: 3px;
			transition: background-color 0.2s ease;

			&.isChecked {
				background-color: $prim-500;
				transition: background-color 0.2s ease;
			}

			&.error {
				border: 1px solid $danger-500;
			}

			i {
				position: absolute;
				width: 100%;
				height: 100%;
			}

			p {
				@include caption-sb;
			}
		}
	}
</style>
