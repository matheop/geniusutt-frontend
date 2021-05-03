<script>
	import { modal } from "$stores/modal";
	import Input from "$uikit/Input.svelte";
	import Select from "$uikit/Select.svelte";
	import TextArea from "$uikit/TextArea.svelte";
	import TextMessage from "$uikit/TextMessage.svelte";

	const name: string = "WORLD";

	const selectArray = ["test", "test"];

	const showModal = () => {
		console.log("in");
		modal.show({
			title: "Attention !",
			desc:
				"Vous êtes sur le point de supprimer un utilisateur.<br />Êtes-vous sûr de vouloir continuer ?",
			btn1: "Confirmer",
			btn2: "Annuler",
			action_btn1: () => modal.remove(),
			action_btn2: () => modal.remove(),
			displayCrossBtn: true,
		});
	};
</script>

<main class="global-container">
	<h1>Hello, {name}!</h1>

	<section>In main</section>
</main>

<section class="global-container">
	<div>
		<h2>BUTTONS</h2>
		<button class="fill-blue">Primary Fill</button>
		<button class="outline-blue">Primary Outline</button>
		<button class="fill-yellow">Secondary Fill</button>
		<button class="outline-yellow">Secondary Outline</button>
		<button class="link">Link Button</button>
	</div>
	<div>
		<h2>LINKS</h2>
		<a href="#">default</a>
		<a href="#" class="yellow-link">yell</a>
		<a href="#" class="header-link">Header Link</a>
	</div>

	<div>
		<h2>INPUTS</h2>
		<Input
			placeholder="placeholder"
			type="email"
			autocomplete="email" />

		<hr />
		<Select placeholder="Test" values={selectArray} />

		<hr />
		<TextArea />

		<hr />
		<TextMessage />

		<hr />
	</div>

	<div>
		<h2>MODAL</h2>

		<button class="outline-blue" on:click={showModal}
			>Show Modal</button>
	</div>
</section>

<style lang="scss">
	main {
		background-color: $prim-500;
		section {
			background-color: $sec-500;
		}
		h1 {
			text-align: center;
		}
	}

	section {
		width: 100%;
		background-color: $grey-300;

		div {
			margin: 2rem 0;

			& > :global(*) {
				margin: $sp-100;
			}
		}
	}
</style>
