<script lang="ts">
	/* Svelte */
	import { session } from "$app/stores";
	import { createEventDispatcher } from "svelte";
	import PopIn from "$components/templates/PopIn.svelte";
	import Input from "$uikit/Input.svelte";
	import { API_URL } from "env";
	import { Alert, notifications } from "$stores/notifications";
	import { emptyEvent } from "$helpers/interfaces/events";
	import type { Event } from "$helpers/interfaces/events";
	import TextArea from "$uikit/TextArea.svelte";
	import EventDesktop from "$components/events/EventDesktop.svelte";
	import { isEmptyObject } from "$helpers/validation";
	import { dateValidator, scheduleValidator } from "$helpers/regex";

	export let action: "create" | "update";

	export let eventInfo: Event = emptyEvent;

	const dispatch = createEventDispatcher();

	let storedEvent: Event = JSON.parse(JSON.stringify(eventInfo));

	let isEventDisplayed: boolean = false;

	const remove = (event?: Event) => {
		if (!event && action !== "create") {
			event = storedEvent;
			removeImgUrl();
		}
		dispatch("remove", { event });
	};

	/* Image handling */
	const removeImgUrl = () => {
		eventInfo.imgUrl = null;
		imgPreview = null;
	};

	let imgPreview: ArrayBuffer | string = null;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		eventInfo.imgUrl = image;
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			imgPreview = e.target.result;
		};
	};

	const sendData = async (action, event: Event): Promise<void> => {
		// Validity Check
		const updatedEvent: Event = (({
			name,
			date,
			schedule,
			place,
			desc,
			imgUrl,
		}) => ({
			name,
			date,
			schedule,
			place,
			desc,
			imgUrl,
		}))(event);

		if (isEmptyObject(updatedEvent)) {
			notifications.add(
				new Alert(
					"Erreur dans le formulaire !",
					"error",
					"Un ou plusieurs champs sont incomplets"
				)
			);
			return;
		}
		if (
			!event.eventUrl.match(
				/^(https:\/\/www\.facebook\.com\/events|\s*$)/g
			)
		) {
			notifications.add(
				new Alert(
					"Mauvais URL Facebook",
					"error",
					"L'URL devrait ressembler à <strong>'https://www.facebook.com/events'</strong>"
				)
			);
			return;
		}
		if (!event.date.match(dateValidator)) {
			notifications.add(
				new Alert(
					"Mauvais format de date",
					"error",
					"Veuillez respecter le format <strong>JJ/MM/AAAA</strong>"
				)
			);
			return;
		}
		if (!event.schedule.match(scheduleValidator)) {
			notifications.add(
				new Alert(
					"Mauvais format d'horaire",
					"error",
					"Consulter l'aide si besoin"
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
			route = `update/${event._id}`;
			method = "PUT";
		}

		const formData = new FormData();

		// Mandatory fields
		formData.append("name", eventInfo.name);
		formData.append("date", eventInfo.date);
		formData.append("schedule", eventInfo.schedule);
		formData.append("place", eventInfo.place);
		formData.append("desc", eventInfo.desc);
		formData.append("image", eventInfo.imgUrl);

		let isEmptyField: boolean = false;
		for (var pair of formData.entries()) {
			if (!pair[1] || pair[1] === "null") isEmptyField = true;
		}
		// Optional field
		formData.append("eventUrl", eventInfo.eventUrl);

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
			const res = await fetch(`${API_URL}/events/${route}`, {
				method: method,
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + $session.token,
				},
				body: formData,
			});
			const result = await res.json();

			if ([200, 201].includes(res.status)) {
				const text =
					action === "create" ? "ajouté" : "modifié";
				notifications.add(
					new Alert(`Évènement ${text} !`, "success")
				);
				remove(result.event);
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

<PopIn maxWidth={"80vw"} on:out-popin={() => remove()}>
	<section>
		<div id="cross" on:click={() => remove()}>&#10005;</div>

		<p class="title">
			{action === "create"
				? "Ajout d'un évent"
				: "Modification"}
		</p>

		<div class="row">
			<div class="col">
				<p class="label">Nom* :</p>
				<div class="input">
					<Input
						bind:value={eventInfo.name}
						placeholder="TEDxUTTroyes 2021" />
				</div>
			</div>

			<div class="col">
				<p class="label">Lieu* :</p>
				<div class="input">
					<Input
						bind:value={eventInfo.place}
						placeholder="M500" />
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col">
				<p class="label">Date* (JJ/MM/AAAA) :</p>
				<div class="input">
					<Input
						bind:value={eventInfo.date}
						placeholder="08/05/2021" />
				</div>
			</div>

			<div class="col">
				<p class="label">
					Horaire(s) [
					<a
						href="/admin/help#event-validation"
						rel="external">voir Aide</a>
					] :
				</p>
				<div class="input">
					<Input
						bind:value={eventInfo.schedule}
						placeholder="16h-20h" />
				</div>
			</div>
		</div>

		<p class="label">URL de l'évènement :</p>
		<div class="input">
			<Input
				bind:value={eventInfo.eventUrl}
				placeholder="https://www.facebook.com/events/..." />
		</div>
		<p class="label">Description* (min. 20 caractères) :</p>
		<div class="input">
			<TextArea
				bind:value={eventInfo.desc}
				maxChars={360}
				placeholder="Il était une fois..." />
		</div>

		<p class="label">
			Image* [
			<a href="/admin/help#event-validation" rel="external"
				>voir Aide</a>
			] :
		</p>
		<div class="input">
			{#if !!eventInfo.imgUrl}
				<span class="tag" on:click={(e) => removeImgUrl(e)}
					>Supprimer</span>
			{/if}
			<input
				type="file"
				name="image"
				on:change={(e) => onFileSelected(e)} />
		</div>
		{#if imgPreview}
			<img
				class="img-preview"
				src={imgPreview}
				alt={eventInfo.name} />
		{/if}

		<div class="btn-box">
			<button
				class="outline-blue-btn"
				on:click={() => (isEventDisplayed = true)}>
				Visualiser</button>
			<button
				class="fill-blue-btn"
				on:click={() => sendData(action, eventInfo)}>
				{action === "create" ? "Valider" : "Modifier"}
			</button>
		</div>
	</section>
</PopIn>

{#if isEventDisplayed}
	<PopIn
		maxWidth="74vw"
		on:out-popin={() => (isEventDisplayed = false)}>
		<EventDesktop event={eventInfo} {imgPreview} />
	</PopIn>
{/if}

<style lang="scss">
	section {
		overflow-y: scroll;
		background-color: $white;
		border-radius: $br-500;
		padding: $sp-400 $sp-500;
	}
	.title {
		@include t3-sb;
		text-align: center;
		margin: $sp-400 0;
	}

	.row {
		@include flex-y;
		justify-content: space-between;

		.col {
			width: 49%;
		}
	}

	.label {
		@include caption-sb;
		margin-bottom: $sp-100;
		margin-left: $sp-100;

		a {
			color: $danger-500;
		}
	}
	.input {
		margin-bottom: $sp-400;
		position: relative;
	}

	.tag {
		cursor: pointer;
		position: absolute;
		z-index: 10;
		right: $sp-200;
		top: 0.8rem;
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
