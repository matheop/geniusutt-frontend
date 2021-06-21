<script context="module">
	import { API_URL } from "env";

	export async function load({ fetch, session }) {
		try {
			const res = await fetch(`${API_URL}/contacts/getAll`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + session.token,
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
	import Seo from "$components/templates/SEO.svelte";

	export let contacts: ContactForm[];

	let contactedForms: ContactForm[];
	let notContactedForms: ContactForm[];

	// TODO: sort en fonction des dates

	$: if (contacts) {
		contactedForms = contacts.filter(
			(contact) => contact.contacted === true
		);
		notContactedForms = contacts.filter(
			(contact) => contact.contacted === false
		);
	}

	const remove = (i) => {
		contacts = contacts.filter(
			(contact) => contact._id !== contacts[i]._id
		);
	};
</script>

<Seo title="Admin | Contacts" url="TODO" image="TODO" />

<section class="admin-page">
	<h2>Contacts</h2>
	<div class="banners">
		{#await contacts}
			<p>Chargement...</p>
		{:then}
			<h4>Personnes non recontactées</h4>
			{#if notContactedForms.length}
				{#each notContactedForms as contact, i}
					<Banner
						type="contacts"
						on:delete={() => remove(i)}
						data={contact} />
				{/each}
			{:else}
				<p>Aucun contact en attente.</p>
			{/if}
			<h4>Personnes recontactées</h4>
			{#each contactedForms as contact, i}
				<Banner
					type="contacts"
					on:delete={() => remove(i)}
					data={contact} />
			{/each}
		{:catch err}
			<p>{err}</p>
		{/await}
	</div>
</section>

<style lang="scss">
	h2 {
		margin-bottom: $sp-500;
	}
</style>
