<script>
	/* Svelte */
	import { session } from "$app/stores";
	import { createEventDispatcher } from "svelte";
	import PopIn from "$components/templates/PopIn.svelte";
	import { emptyUser } from "$helpers/interfaces/user";
	import type { User } from "$helpers/interfaces/user";
	import Input from "$uikit/Input.svelte";
	import { API_URL } from "env";
	import { Alert, notifications } from "$stores/notifications";
	import { isEmptyObject, isValidEmail } from "$helpers/validation";
	import { Role } from "$helpers/enums";

	export let action: "create" | "update";

	export let userInfo: User = emptyUser;

	const dispatch = createEventDispatcher();

	let storedUser: User = JSON.parse(JSON.stringify(userInfo));

	const remove = (user?: User) => {
		if (!user && action !== "create") user = storedUser;
		dispatch("remove", { user });
	};

	const sendData = async (action, user) => {
		const updatedUser: User = (({ name, email, role }) => ({
			name,
			email,
			role,
		}))(user);

		if (isEmptyObject(updatedUser)) {
			notifications.add(
				new Alert(
					"Attention, un des champs est incomplet !",
					"error"
				)
			);
			return;
		}
		if (!isValidEmail(user.email)) {
			notifications.add(
				new Alert("Attention, mail incorrect !", "error")
			);
			return;
		}
		if (!Object.values(Role).includes(user.role)) {
			notifications.add(
				new Alert(
					"Attention, role incorrect !",
					"error",
					"Doit correspondre strictement à <strong>Admin</strong> ou <strong>Modo</strong>."
				)
			);
			return;
		}

		let route: string;
		let method: "POST" | "PUT";

		if (action === "create") {
			route = "create";
			method = "POST";
		} else {
			route = `update/${user._id}`;
			method = "PUT";
		}

		try {
			const res = await fetch(`${API_URL}/users/${route}`, {
				method: method,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + $session.token,
				},
				body: JSON.stringify(user),
			});
			const result = await res.json();

			if ([200, 201].includes(res.status)) {
				const text =
					action === "create" ? "ajouté" : "modifié";
				notifications.add(
					new Alert(`Utilisateur ${text} !`, "success")
				);
				remove(result.user);
			} else {
				if (res.status === 409) {
					notifications.add(
						new Alert(
							"Oups, erreur !",
							"error",
							"Utilisateur déjà existant"
						)
					);
				} else {
					notifications.add(
						new Alert(
							"Oups ! Une erreur est survenue...",
							"error",
							"Veuillez réessayer plus tard"
						)
					);
				}
			}
		} catch (err) {
			console.error("err:", err);
			notifications.add(
				new Alert(
					"Oups ! Une erreur est survenue...",
					"error"
				)
			);
		}
	};
</script>

<PopIn on:out-popin={() => remove()}>
	<section>
		<div id="cross" on:click={() => remove()}>&#10005;</div>

		<p class="title">
			{action === "create"
				? "Ajout d'un utilisateur"
				: "Modification"}
		</p>

		<div class="input">
			<Input
				bind:value={userInfo.name}
				placeholder="Nom complet (ou pseudo stylé)" />
		</div>
		<div class="input">
			<Input bind:value={userInfo.email} placeholder="Email" />
		</div>
		<div class="input">
			<Input bind:value={userInfo.role} placeholder="Role" />
		</div>

		<button
			class="fill-blue-btn"
			on:click={() => sendData(action, userInfo)}>
			{action === "create" ? "Valider" : "Modifier"}
		</button>
	</section>
</PopIn>

<style lang="scss">
	section {
		background-color: $white;
		border-radius: $br-500;
		padding: $sp-400 $sp-500;
	}
	.title {
		@include t3-sb;
		text-align: center;
		margin: $sp-400 0;
	}

	.input {
		margin-bottom: $sp-400;
	}

	#cross {
		position: absolute;
		top: $sp-200;
		right: $sp-200;
		@include flex;
		cursor: pointer;
		color: $grey-700;
		@include transition(color 0.4s ease);

		&:hover {
			color: $danger-500;
			@include transition(color 0.4s ease);
		}
	}

	button {
		margin: auto;
		width: $sp-1000;
	}
</style>
