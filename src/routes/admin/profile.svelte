<script>
	import { Alert, notifications } from "$stores/notifications";

	import Input from "$uikit/Input.svelte";

	let isModalDisplayed: boolean = false;

	const pass = {
		oldPass: "",
		confirmNewPass: "",
		newPass: "",
	};

	const updatePassword = () => {
		if (pass.oldPass !== pass.confirmNewPass) {
			notifications.add(
				new Alert(
					"Les nouveaux mots de passe ne correspondent pas",
					"error"
				)
			);
			pass.oldPass = "";
			pass.confirmNewPass = "";
		}
	};
</script>

<section class="admin-page">
	<h2>Mon profil</h2>

	<article>
		<p>Nom : <strong>TODO</strong></p>
		<p>Email : <strong>TODO</strong></p>
		<p>Role : <strong>TODO</strong></p>

		<button
			class="outline-blue-btn"
			on:click={() => (isModalDisplayed = !isModalDisplayed)}>
			{isModalDisplayed
				? "Annuler"
				: "Changer mon mot de passe"}
		</button>
	</article>

	{#if isModalDisplayed}
		<article>
			<div class="input">
				<Input
					type="password"
					bind:value={pass.oldPass}
					placeholder="Ancien mot de passe" />
			</div>
			<div class="input">
				<Input
					type="password"
					bind:value={pass.confirmNewPass}
					placeholder="Nouveau mot de passe" />
			</div>
			<div class="input">
				<Input
					type="password"
					bind:value={pass.newPass}
					placeholder="Confirmation nouveau mot de passe" />
			</div>

			<button class="fill-blue-btn" on:click={updatePassword}>
				Changer mon mot de passe
			</button>
		</article>
	{/if}
</section>

<style lang="scss">
	section {
		& > * {
			margin-bottom: $sp-600;
		}
		article > * {
			margin-bottom: $sp-300;
		}
	}
	.input {
		width: 100%;
		max-width: 300px;
	}
</style>
