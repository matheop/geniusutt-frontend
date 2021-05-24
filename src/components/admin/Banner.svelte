<script>
	/* Svelte */
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import type { Event } from "$helpers/interfaces/events";
	import type { User } from "$helpers/interfaces/user";
	import { modal } from "$stores/modal";
	import { Alert, notifications } from "$stores/notifications";
	import Gear from "$svg/admin/Gear.svelte";
	import Trash from "$svg/admin/Trash.svelte";
	import UserDelete from "$svg/admin/UserDelete.svelte";
	import UserSettings from "$svg/admin/UserSettings.svelte";
	import { API_URL } from "env";
	import UserModal from "./UserModal.svelte";
	import EventModal from "./EventModal.svelte";
	import type { ContactForm } from "$helpers/interfaces/contact-forms";
	import Info from "$svg/Info.svelte";
	import Checkbox from "$uikit/Checkbox.svelte";

	export let type: "users" | "events" | "contacts" = "users";
	export let data: User | Event | ContactForm;

	const dispatch = createEventDispatcher();

	let isModalDisplayed: boolean = false;

	const showDeleteModal = (type, data) => {
		modal.show({
			title: "Attention !",
			desc:
				type === "users"
					? "Vous êtes sur le point de supprimer un utilisateur.<br />Êtes-vous sûr de vouloir continuer ?"
					: type === "events"
					? "Vous êtes sur le point de supprimer un évènement.<br />Êtes-vous sûr de vouloir continuer ?"
					: "Vous êtes sur le point de supprimer un message.<br />Êtes-vous sûr de vouloir continuer ?",
			btn1: "Confirmer",
			btn2: "Annuler",
			action_btn1: () => {
				deleteData(data);
				modal.remove();
			},
			action_btn2: () => {
				modal.remove();
			},
			displayCrossBtn: true,
		});
	};

	// TODO: DESTrOY compo
	const deleteData = async (data) => {
		try {
			const res = await fetch(
				`${API_URL}/${type}/delete/${data._id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);

			const result = await res.json();

			if (res.status === 200) {
				notifications.add(
					new Alert(
						`${
							type === "users"
								? "Utilisateur"
								: type === "events"
								? "Évènement"
								: "Message"
						} supprimé !`,
						"success"
					)
				);
				dispatch("delete");
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

	const update = (e) => {
		if (e.detail.user) data = e.detail.user;
		if (e.detail.event) data = e.detail.event;
		isModalDisplayed = false;
	};

	const updateContact = async (e) => {
		const contacted: boolean = e.detail;

		try {
			const res = await fetch(
				`${API_URL}/contacts/update-state/${data._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify({
						contacted,
					}),
				}
			);

			const result = await res.json();
			console.log("result:", result);

			if (res.status === 200) {
				data.contacted = contacted;
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

<article class:contacted={data.contacted}>
	<div class="col-1">
		{type === "contacts"
			? data.lastname + " " + data.firstname
			: data.name}
	</div>
	<div class="col-2">
		{type === "events" ? data.date : data.email}
	</div>
	<div class="col-3">
		{type === "users"
			? data.role
			: type === "events"
			? data.place
			: data.date}
	</div>
	<div class="settings">
		<i on:click={() => (isModalDisplayed = !isModalDisplayed)}>
			{#if type === "users"}
				<UserSettings color={"#000"} />
			{:else if type === "events"}
				<Gear />
			{:else}
				<Info />
			{/if}
		</i>
		<i on:click={() => showDeleteModal(type, data)}>
			{#if type === "users"}
				<UserDelete />
			{:else}
				<Trash />
			{/if}
		</i>
	</div>
	{#if isModalDisplayed && type === "contacts"}
		<div transition:slide class="form-info">
			<h4>Objet : {data.subject}</h4>
			<p>{data.message}</p>
			<Checkbox
				label="Recontacté"
				isChecked={data.contacted}
				on:toggle-check={updateContact} />
		</div>
	{/if}
</article>

{#if isModalDisplayed && type === "users"}
	<UserModal userInfo={data} on:remove={update} />
{:else if isModalDisplayed && type === "events"}
	<EventModal eventInfo={data} on:remove={update} />
{/if}

<style lang="scss">
	article {
		@include grid-12;
		@include body1;
		width: 100%;
		padding: $sp-300 $sp-400;
		background-color: $grey-300;
		@include br-500;
		@include ds-300;
		@include transition($transition);

		&:hover {
			@include ds-500;
			@include transform(scale(1.02));
			@include transition($transition);
		}

		&.contacted {
			background-color: rgba($prim-300, 0.2);
		}

		& > * {
			@include flex-y;
		}
		.col-1 {
			grid-column: 1 / 4;
			@include caption-light;
		}
		.col-2 {
			grid-column: 4 / 8;
			justify-content: center;
		}
		.col-3 {
			grid-column: 8 / 11;
			justify-content: center;
		}

		.settings {
			grid-column: 11 / 13;
			justify-content: flex-end;

			i {
				cursor: pointer;
				width: 2rem;

				&:first-child:hover {
					:global(path) {
						fill: $prim-700;
					}
				}

				&:last-child {
					margin-left: $sp-300;

					&:hover {
						:global(path) {
							fill: $danger-700;
						}
					}
				}
			}
		}

		.form-info {
			display: block;
			grid-row: 2;
			grid-column: 1 / -1;

			& > * {
				text-align: left;

				&:not(:last-child) {
					margin-bottom: $sp-200;
				}
			}

			p {
				padding: $sp-200;
				background-color: $white;
				@include br-300;
			}
		}
	}
</style>
