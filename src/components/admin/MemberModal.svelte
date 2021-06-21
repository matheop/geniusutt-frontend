<script>
	import { session } from "$app/stores";
	import { createEventDispatcher } from "svelte";
	import type { BoardMember } from "$helpers/interfaces/boardmembers";
	import { emptyMember } from "$helpers/interfaces/boardmembers";
	import { Alert, notifications } from "$stores/notifications";
	import Input from "$uikit/Input.svelte";
	import TextArea from "$uikit/TextArea.svelte";
	import { API_URL } from "env";

	export let member: BoardMember = emptyMember;
	export let action: "create" | "update";

	const dispatch = createEventDispatcher();

	const sendData = async (
		action: "update" | "create",
		member: BoardMember
	) => {
		let route: string;
		let method: "POST" | "PUT";

		if (action === "create") {
			route = "create";
			method = "POST";
		} else {
			route = `update/${member._id}`;
			method = "PUT";
		}

		try {
			const res = await fetch(
				`${API_URL}/board-members/${route}`,
				{
					method: method,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						Authorization: "Bearer " + $session.token,
					},
					body: JSON.stringify(member),
				}
			);
			const result = await res.json();

			if ([200, 201].includes(res.status)) {
				const text =
					action === "create" ? "ajouté" : "modifié";
				notifications.add(
					new Alert(`Évènement ${text} !`, "success")
				);
				dispatch("remove", { member: result.member });
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
			notifications.add(
				new Alert(
					"Oups ! Une erreur est survenue...",
					"error"
				)
			);
		}
	};
</script>

<p class="label">Nom complet :</p>
<div class="input">
	<Input bind:value={member.name} placeholder="Mathéo Pierini" />
</div>
<p class="label">Position :</p>
<div class="input">
	<Input bind:value={member.position} placeholder="Président" />
</div>
<p class="label">Mini-Description :</p>
<div class="input">
	<TextArea bind:value={member.shortDesc} placeholder="..." />
</div>
<p class="label">Description du rôle et du pôle :</p>
<div class="input">
	<TextArea
		rows={7}
		bind:value={member.longDesc}
		placeholder="..." />
</div>
<p class="label">URL LinkedIn :</p>
<div class="input">
	<Input
		bind:value={member.linkedin}
		placeholder="https://www.linkedin.com/in/..." />
</div>

<div class="btn-box">
	<button
		class="outline-blue-btn"
		on:click={() => dispatch("remove")}>
		Annuler</button>
	<button
		class="fill-blue-btn"
		on:click={() => sendData(action, member)}>
		{action === "create" ? "Ajouter" : "Modifier"}
	</button>
</div>

<style lang="scss">
	.label {
		@include caption-sb;
		margin-bottom: $sp-100;
		margin-left: $sp-100;
	}
	.input {
		margin-bottom: $sp-400;
	}

	.btn-box {
		@include flex;

		@include phone {
			flex-direction: column;
		}

		button {
			width: $sp-1000;

			&:first-of-type {
				margin-right: 0;
				margin-bottom: $sp-200;

				@include min-tablet {
					margin-right: $sp-200;
					margin-bottom: 0;
				}
			}
		}
	}
</style>
