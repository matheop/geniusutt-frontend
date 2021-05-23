<script context="module">
	import { API_URL } from "env";

	export async function load({ fetch }) {
		try {
			const res = await fetch(`${API_URL}/contacts/getAll`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});

			const result = await res.json();

			if (res.status === 200) {
				return {
					props: { contacts: result.forms },
				};
			} else {
				return {
					status: res.status,
					error: new Error(result),
				};
			}
		} catch (error) {
			console.error("error:", error);
		}
	}
</script>

<script>
	import Banner from "$components/admin/Banner.svelte";
	import type { ContactForm } from "$helpers/interfaces/contact-forms";

	export let contacts: ContactForm[];

	const removeEvent = (i) => {
		contacts = contacts.filter(
			(contact) => contact._id !== contacts[i]._id
		);
	};
</script>

<h3>Contacts</h3>
{#await contacts}
	<p>Chargement...</p>
{:then}
	{#each contacts as contact, i}
		<Banner
			type="contacts"
			on:delete={() => removeEvent(i)}
			data={contact} />
	{/each}
{:catch err}
	<p>{err}</p>
{/await}
