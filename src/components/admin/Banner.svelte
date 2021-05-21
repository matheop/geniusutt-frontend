<script>
	import type { Event } from "$helpers/interfaces/events";

	import type { User } from "$helpers/interfaces/user";
	import Gear from "$svg/admin/Gear.svelte";
	import Trash from "$svg/admin/Trash.svelte";
	import UserDelete from "$svg/admin/UserDelete.svelte";
	import UserSettings from "$svg/admin/UserSettings.svelte";
	import { API_URL } from "env";

	export let type: "users" | "events" = "users";
	export let data: User | Event;

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
			console.log("result:", result);

			if (res.status === 200) {
				alert("data deleted");
			} else {
				alert("an error occured");
			}
		} catch (err) {
			console.error("err:", err);
		}
	};

	const getData = async (data) => {
		try {
			const res = await fetch(
				`${API_URL}/${type}/getOne/${data._id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);

			const result = await res.json();
			console.log("result:", result);

			if (res.status === 200) {
				alert("data successfully fetch");
			} else {
				alert("an error occured");
			}
		} catch (err) {
			console.error("err:", err);
		}
	};

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
		<i on:click={() => getData(data)}>
			{#if type === "users"}
				<UserSettings color={"#000"} />
			{:else}
				<Gear />
			{/if}
		</i>
		<i on:click={() => deleteData(data)}>
			{#if type === "users"}
				<UserDelete />
			{:else}
				<Trash />
			{/if}
		</i>
	</div>
</article>

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
			grid-column: 1 / 3;
			@include caption-light;
		}
		.col-2 {
			grid-column: 3 / 7;
		}
		.col-3 {
			grid-column: 7 / 9;
			justify-content: center;
		}

		.settings {
			grid-column: 9 / 13;
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
