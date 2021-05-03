<script lang="ts">
	/* Svelte*/
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";

	/* Helpers */
	import { clickOutside } from "$helpers/clickOutside";
	import Arrow from "svg/icons/Arrow.svelte";

	const dispatch = createEventDispatcher();

	export let error: boolean = false;
	export let items: Array<any> = [];

	export let values: Array<string>;
	export let placeholder: string;
	export let selectedValue: string;

	export let datacy: string;

	//validation
	export let errors: string[] = [];
	export let isFormChecked: boolean = false;
	// export let isRequired: boolean = false;

	let optionsAreDisplayed: boolean = false;
	let beenClickedOnce: boolean = false;
	let placeholderDisplayed: boolean = placeholder != null;

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
		data-cy={datacy}
		class:placeholderDisplayed
		class:error={errors.length && displayError}
		class:valid={!errors.length && selectedValue}>
		{selectedValue ? selectedValue : placeholder}
		<i>
			<Arrow direction={optionsAreDisplayed ? "up" : "down"} />
		</i>
	</div>
	<!-- {#if errors.length && displayError}
		<p class="input-error" transition:slide={{ duration: 500 }}>
			{errors[0]}
		</p>
	{/if} -->
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
		.select-input {
			position: relative;
			display: flex;
			align-items: center;

			&.error {
				border: solid 0.5px $error;
			}
			&.placeholderDisplayed {
				color: $grey-300;
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
			.option {
				padding: 0.5rem 1rem;
				&:hover {
					background-color: $prim-500;
				}
			}
		}
	}
</style>
