<script>
	/* Svelte */
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

	export let type: "users" | "events" = "users";
	export let data: User | Event;

	const dispatch = createEventDispatcher();

	let isModalDisplayed: boolean = false;

	const showDeleteModal = (type, data) => {
		modal.show({
			title: "Attention !",
			desc:
				type === "users"
					? "Vous êtes sur le point de supprimer un utilisateur.<br />Êtes-vous sûr de vouloir continuer ?"
					: "Vous êtes sur le point de supprimer un évènement.<br />Êtes-vous sûr de vouloir continuer ?",
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
								: "Évènement"
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
		data = e.detail.user;
		isModalDisplayed = false;
	};

	// TODO: remove this
	const updateData = async (data) => {
		try {
			const res = await fetch(
				`${API_URL}/${type}/update/${data._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);

			const result = await res.json();
			console.log("result:", result);

			if (res.status === 200) {
				alert("data successfully updated");
			} else {
				alert("an error occured");
			}
		} catch (err) {
			console.error("err:", err);
		}
	};
</script>

<article>
	<div class="col-1">{data.name}</div>
	<div class="col-2">
		{type === "users" ? data.email : data.date}
	</div>
	<div class="col-3">
		{type === "users" ? data.role : data.place}
	</div>
	<div class="settings">
		<i on:click={() => (isModalDisplayed = true)}>
			{#if type === "users"}
				<UserSettings color={"#000"} />
			{:else}
				<Gear />
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
</article>

{#if isModalDisplayed && type === "users"}
	<UserModal userInfo={data} on:remove={update} />
{:else if isModalDisplayed && type === "events"}
	<UserModal eventInfo={data} on:remove={update} />
{/if}

<style lang="scss">
	article {
		@include grid-12;
		@include body1;
		width: 100%;
		padding: $sp-400;
		background-color: $grey-300;
		@include br-500;
		@include ds-300;
		@include transition($transition);

		&:hover {
			@include ds-500;
			@include transform(scale(1.02));
			@include transition($transition);
		}

		& > * {
			@include flex-y;
		}
		.col-1 {
			grid-column: 1 / 5;
			@include caption-light;
		}
		.col-2 {
			grid-column: 5 / 8;
		}
		.col-3 {
			grid-column: 8 / 10;
			justify-content: center;
		}

		.settings {
			grid-column: 10 / 13;
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
	}
</style>
