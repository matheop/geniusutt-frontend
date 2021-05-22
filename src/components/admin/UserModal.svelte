<script>
	/* Svelte */
	import { createEventDispatcher } from "svelte";
	import PopIn from "$components/templates/PopIn.svelte";
	import type { User } from "$helpers/interfaces/user";
	import Input from "$uikit/Input.svelte";
	import { API_URL } from "env";
	import { Alert, notifications } from "$stores/notifications";

	export let action: "create" | "update";

	export let userInfo: User;
	const dispatch = createEventDispatcher();

	let storedUser: User = JSON.parse(JSON.stringify(userInfo));

	const remove = (user?: User) => {
		if (!user) user = storedUser;
		dispatch("remove", { user });
	};

	const sendData = async (action, user) => {
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
				},
				body: JSON.stringify(user),
			});
			const result = await res.json();

			if (res.status === 200) {
				notifications.add(
					new Alert("Utilisateur modifié !", "success")
				);
				remove(result.user);
			} else {
				notifications.add(
					new Alert(
						"Oups ! Une erreur est survenue...",
						"error"
					)
				);
				console.log("user:", user);
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
