<script>
	import { fly } from "svelte/transition";
	import { Alert, notifications } from "$stores/notifications";

	import Input from "$uikit/Input.svelte";
	import { logout } from "$helpers/auth";
	import { API_URL } from "env";
	import { session } from "$app/stores";

	let isModalDisplayed: boolean = false;

	const pass = {
		oldPass: "",
		newPass: "",
		confirmNewPass: "",
	};

	const updatePassword = () => {
		if (pass.newPass !== pass.confirmNewPass) {
			notifications.add(
				new Alert(
					"Les nouveaux mots de passe ne correspondent pas",
					"error"
				)
			);
			pass.newPass = "";
			pass.confirmNewPass = "";
		} else {
			changePassword();
		}
	};

	const changePassword = async () => {
		try {
			const res = await fetch(
				`${API_URL}/users/change-password/${$session.user._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						Authorization: "Bearer " + $session.token,
					},
					body: JSON.stringify({
						oldPassword: pass.oldPass,
						newPassword: pass.newPass,
					}),
				}
			);

			const result = await res.json();

			if (res.status === 200) {
				notifications.add(
					new Alert("Password modifié !", "success")
				);
			} else {
				notifications.add(
					new Alert(
						"Oups ! Une erreur est survenue...",
						"error"
					)
				);
			}
		} catch (err) {
			console.error("err:", err);
		}
	};
</script>

<section class="admin-page">
	<h2>Mon profil</h2>

	<button class="outline-danger" on:click={logout}>
		Déconnexion
	</button>

	<article>
		<p>Nom : <strong>{$session.user.name}</strong></p>
		<p>Email : <strong>{$session.user.email}</strong></p>
		<p>Role : <strong>{$session.user.role}</strong></p>

		<button
			class="outline-blue-btn"
			on:click={() => (isModalDisplayed = !isModalDisplayed)}>
			{isModalDisplayed
				? "Annuler"
				: "Changer mon mot de passe"}
		</button>
	</article>

	{#if isModalDisplayed}
		<article transition:fly class="pass">
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

		.pass {
			width: fit-content;
			padding: $sp-300;
			@include br-500;
			@include ds-500;
			background-color: $grey-300;

			button {
				margin: auto;
			}
		}
	}
	.input {
		width: 300px;
	}
</style>
