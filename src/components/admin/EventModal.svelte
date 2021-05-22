<script>
	/* Svelte */
	import { createEventDispatcher } from "svelte";
	import PopIn from "$components/templates/PopIn.svelte";
	import Input from "$uikit/Input.svelte";
	import { API_URL } from "env";
	import { Alert, notifications } from "$stores/notifications";
	import type { Event } from "$helpers/interfaces/events";
	import TextArea from "$uikit/TextArea.svelte";
	import EventDesktop from "$components/events/EventDesktop.svelte";

	export let action: "create" | "update";

	export let eventInfo: Event;
	const dispatch = createEventDispatcher();

	let storedEvent: Event = JSON.parse(JSON.stringify(eventInfo));

	let isEventDisplayed: boolean = false;

	const remove = (event?: Event) => {
		if (!event) event = storedEvent;
		dispatch("remove", { event });
	};

	const sendData = async (action, event: Event): Promise<void> => {
		let route: string;
		let method: "POST" | "PUT";

		if (action === "create") {
			route = "create";
			method = "POST";
		} else {
			route = `update/${event._id}`;
			method = "PUT";
		}

		try {
			const res = await fetch(`${API_URL}/events/${route}`, {
				method: method,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(event),
			});
			const result = await res.json();

			if (res.status === 200) {
				notifications.add(
					new Alert("Évènement modifié !", "success")
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
				<p class="label">Nom :</p>
				<div class="input">
					<Input
						bind:value={eventInfo.name}
						placeholder="Nom de l'évènement" />
				</div>
			</div>

			<div class="col">
				<p class="label">Lieu :</p>
				<div class="input">
					<Input
						bind:value={eventInfo.place}
						placeholder="Lieu" />
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col">
				<p class="label">Date(s) :</p>
				<div class="input">
					<Input
						bind:value={eventInfo.date}
						placeholder="Date(s)" />
				</div>
			</div>

			<div class="col">
				<p class="label">Horaire(s) :</p>
				<div class="input">
					<Input
						bind:value={eventInfo.schedule}
						placeholder="Horaire(s)" />
				</div>
			</div>
		</div>

		<p class="label">Description :</p>
		<div class="input">
			<TextArea
				bind:value={eventInfo.desc}
				placeholder="Description" />
		</div>

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
		<EventDesktop event={eventInfo} />
	</PopIn>
{/if}

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
