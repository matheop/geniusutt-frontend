<script lang="ts">
	/* Svelte*/
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";

	/* Helpers */
	import { clickOutside } from "$helpers/clickOutside";
	/* Components */
	import Triangle from "$svg/Triangle.svelte";
	import ErrorMessage from "$uikit/helpers/ErrorMessage.svelte";

	const dispatch = createEventDispatcher();

	export let error: boolean = false;
	export let items: Array<any> = [];

	export let values: Array<string>;
	export let placeholder: string;
	export let selectedValue: string;

	//validation
	export let errors: string[] = [];
	export let isFormChecked: boolean = false;
	// export let isRequired: boolean = false;

	let optionsAreDisplayed: boolean = false;
	let beenClickedOnce: boolean = false;
	let placeholderDisplayed: boolean = placeholder !== null;

	// feed by values i/o items
	if (values) {
		items = values.map((v) => {
			return {
				id: v,
				label: v,
			};
		});
	}
	//TODO mettre un warning ici si ni values ni items ne sont settés ??

	const toggleOptions = () =>
		(optionsAreDisplayed = !optionsAreDisplayed);

	const selectIsClicked = () => {
		beenClickedOnce = true;
		toggleOptions();
	};

	const checkSelectedItem = () => {
		if (beenClickedOnce) {
			selectedValue === placeholder
				? (error = true)
				: (error = false);
			if (optionsAreDisplayed === true)
				optionsAreDisplayed = false;
		}
	};

	const selectItem = (item: any, silentMode: boolean = false) => {
		selectedValue = item.label;
		if (!silentMode) {
			optionsAreDisplayed = !optionsAreDisplayed;
		}
		if (selectedValue === placeholder) {
			error = true;
		} else {
			error = false;
			placeholderDisplayed = false;
		}
		dispatch("selected", item.id);
	};

	if (selectedValue) {
		const selectedItem: any[] = items.filter((i) => {
			return i.id === selectedValue;
		});
		if (selectedItem && selectedItem.length > 0) {
			selectItem(selectedItem[0], true);
		}
	}

	$: displayError =
		(selectedValue && selectedValue !== placeholder) ||
		isFormChecked;
</script>

<div
	use:clickOutside
	on:click_outside={checkSelectedItem}
	class="select-container">
	<div
		on:click={selectIsClicked}
		class="select-input"
		class:placeholderDisplayed
		class:error={errors.length && displayError}
		class:valid={!errors.length && selectedValue}>
		{selectedValue ? selectedValue : placeholder}
		<i>
			<Triangle
				direction={optionsAreDisplayed ? "up" : "down"} />
		</i>
	</div>
	{#if errors.length && displayError}
		<ErrorMessage error={errors[0]} />
	{/if}
	{#if optionsAreDisplayed}
		<div class="select-options" transition:slide>
			{#each items as item, id}
				<div on:click={() => selectItem(item)} class="option">
					{item.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.select-container {
		position: relative;
		cursor: pointer;
		width: 100%;
		.select-input {
			display: flex;
			align-items: center;
			&.placeholderDisplayed {
				color: $grey-500;
			}
			i {
				display: flex;
				width: 0.8rem;
				height: 0.8rem;
				position: absolute;
				top: 50%;
				right: 1rem;
				transform: translateY(-50%);
			}
		}

		.select-options {
			cursor: pointer;
			padding: 0; // overwrite global.sass
			z-index: 10;
			position: absolute;
			top: 110%;
			overflow: hidden;
			overflow-y: scroll;
			max-height: 12rem;
			background-color: $white;
			@include br-300;
			@include ds-300;
			@include border($white);
			width: 100%;
			.option {
				padding: $sp-200 $sp-300;
				&:hover {
					background-color: rgba($sec-300, 0.5);
				}
			}
		}
	}
</style>
