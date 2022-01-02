<script context="module">
	import { API_URL } from "env";
	moment().format();

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

			for (const form of result.forms) {
				form.date = moment(form.date).format("DD/MM/YYYY");
			}

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
	import moment from "moment";

	export let contacts: ContactForm[];

	let contactedForms: ContactForm[];
	let notContactedForms: ContactForm[];

	contacts = contacts.sort(
		(a, b) =>
			moment(b.date, "DD/MM/YYYY") -
			moment(a.date, "DD/MM/YYYY")
	);

	$: if (contacts) {
		contactedForms = contacts.filter(
			(contact) => contact.contacted === true
		);
		notContactedForms = contacts.filter(
			(contact) => contact.contacted === false
		);
	}

	const remove = (e) => {
		const cid = e.detail.id;
		contacts = contacts.filter((contact) => contact._id !== cid);
	};
</script>

<Seo
	title="Admin | Contacts"
	url="https://www.geniusutt.fr/admin/contact-forms" />

<section class="admin-page">
	<h2>Contacts</h2>
	<div class="banners">
		{#await contacts}
			<p>Chargement...</p>
		{:then}
			<h4>Personnes non recontactées</h4>
			{#if notContactedForms.length}
				{#each notContactedForms as contact}
					<Banner
						type="contacts"
						on:delete={(e) => remove(e)}
						data={contact} />
				{/each}
			{:else}
				<p>Aucun contact en attente.</p>
			{/if}
			<h4>Personnes recontactées</h4>
			{#each contactedForms as contact}
				<Banner
					type="contacts"
					on:delete={(e) => remove(e)}
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
