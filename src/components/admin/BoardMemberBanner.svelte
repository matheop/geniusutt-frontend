<script>
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import type { BoardMember } from "$helpers/interfaces/boardmembers";
	import { emptyMember } from "$helpers/interfaces/boardmembers";
	import { modal } from "$stores/modal";
	import { Alert, notifications } from "$stores/notifications";
	import UserDelete from "$svg/admin/UserDelete.svelte";
	import UserSettings from "$svg/admin/UserSettings.svelte";

	import { API_URL } from "env";
	import MemberModal from "./MemberModal.svelte";

	export let member: BoardMember = emptyMember;

	let storedMember: BoardMember = JSON.parse(
		JSON.stringify(member)
	);

	const dispatch = createEventDispatcher();

	let isEditDisplayed: boolean = false;

	const remove = (e) => {
		let data: BoardMember;
		if (e.detail?.member) data = e.detail.member;
		if (!!data) {
			storedMember = JSON.parse(JSON.stringify(member));
		} else {
			member = JSON.parse(JSON.stringify(storedMember));
		}
		isEditDisplayed = !isEditDisplayed;
	};

	const showDeleteModal = (data) => {
		modal.show({
			title: "Attention !",
			desc:
				"Vous êtes sur le point de supprimer un membre du bureau.<br />Êtes-vous sûr de vouloir continuer ?",
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

	const deleteData = async (data) => {
		try {
			const res = await fetch(
				`${API_URL}/board-members/delete/${data._id}`,
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
					new Alert("Membre supprimé !", "success")
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
</script>

<article>
	<div class="preview">
		<p class="col-1">
			{storedMember.name}
		</p>
		<p class="col-2">
			{storedMember.position}
		</p>
		<div class="settings">
			<i on:click={(e) => remove(e)}>
				<UserSettings color={"#000"} />
			</i>
			<i on:click={() => showDeleteModal(member)}>
				<UserDelete />
			</i>
		</div>
	</div>
	{#if isEditDisplayed}
		<div transition:slide class="edit">
			<hr />
			<MemberModal
				action="update"
				{member}
				on:remove={(e) => remove(e)} />
		</div>
	{/if}
</article>

<style lang="scss">
	article {
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

		.preview {
			@include grid-12;
			& > * {
				@include flex-y;
			}

			.col-1 {
				grid-column: 1 / 5;
				@include caption;
			}
			.col-2 {
				grid-column: 5 / 11;
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
		}

		.edit {
			hr {
				border-top: solid $border $grey-500;
				margin: $sp-300 0;
			}
		}
	}
</style>
