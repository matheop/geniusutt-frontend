<script lang="ts">
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

	let imgPreview: ArrayBuffer | string = null;

	/* Image handling */
	const removeImgUrl = () => {
		member.imgUrl = null;
		imgPreview = null;
	};

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		member.imgUrl = image;
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			imgPreview = e.target.result;
		};
	};

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

		const formData = new FormData();

		// Mandatory fields
		formData.append("name", member.name);
		formData.append("position", member.position);
		formData.append("shortDesc", member.shortDesc);
		formData.append("longDesc", member.longDesc);
		formData.append("image", member.imgUrl);

		let isEmptyField: boolean = false;
		for (var pair of formData.entries()) {
			if (!pair[1] || pair[1] === "null") isEmptyField = true;
		}
		// Optional field
		formData.append("linkedin", member.linkedin);

		if (isEmptyField) {
			notifications.add(
				new Alert(
					"Erreur dans le formulaire !",
					"error",
					"Un ou plusieurs champs sont incomplets"
				)
			);
			return;
		}

		try {
			const res = await fetch(
				`${API_URL}/board-members/${route}`,
				{
					method: method,
					headers: {
						"Access-Control-Allow-Origin": "*",
						Authorization: "Bearer " + $session.token,
					},
					body: formData,
				}
			);
			const result = await res.json();

			if ([200, 201].includes(res.status)) {
				const text =
					action === "create" ? "ajouté" : "modifié";
				notifications.add(
					new Alert(`Membre ${text} !`, "success")
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

<p class="label">Nom complet* :</p>
<div class="input">
	<Input bind:value={member.name} placeholder="Mathéo Pierini" />
</div>
<p class="label">Position* :</p>
<div class="input">
	<Input bind:value={member.position} placeholder="Président" />
</div>
<p class="label">Mini-Description* (70-100 caractères):</p>
<div class="input">
	<TextArea bind:value={member.shortDesc} placeholder="..." />
</div>
<p class="label">
	Description du rôle et du pôle* (200-400 caractères) :
</p>
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

<div class="input">
	{#if !!member.imgUrl}
		<span class="tag" on:click={(e) => removeImgUrl(e)}
			>Supprimer</span>
	{/if}
	<input
		type="file"
		name="image"
		on:change={(e) => onFileSelected(e)} />
</div>
{#if imgPreview}
	<img class="img-preview" src={imgPreview} alt={member.name} />
{/if}

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
