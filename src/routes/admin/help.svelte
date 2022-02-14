<script lang="ts">
	import Seo from "$components/templates/SEO.svelte";
</script>

<Seo title="Admin | Aide" url="https://www.geniusutt.fr/admin/help" />

<!-- Désolé j'ai un peu fait cette page à l'arrache j'avoue -->

<section class="admin-page">
	<h2>❓ Aide et Assistance</h2>
	<p>
		Voici une page dédiée à l'assistance pour utiliser le site
		sans souci et le plus indépendemment possible.
	</p>
	<p>
		Chaque onglet disponible dans la partie administrative sera
		donc détaillée ici.
	</p>

	<section class="page">
		<h3>Prérequis</h3>

		<p>
			Il y a 2 rôles disctints pour l'administration de ce site
			internet.
		</p>
		<ul>
			<li>Les Administrateurs (ou Admins)</li>
			<li>Les Modérateurs (ou Modos)</li>
		</ul>
		<p>
			Les <strong>Admins</strong> ont accès à l'entrièreté des fonctionnalités,
			chacune correspondant à une page. Celles-ci sont :
		</p>
		<ul>
			<li>Gestion des utilisateurs</li>
			<li>Gestion des événements</li>
			<li>Gestion des contacts par formulaire</li>
			<li>Gestion des membres du bureau de l'asso</li>
			<li>Accès à la page information (ici-même)</li>
		</ul>
		<p>
			Les <strong>Modos</strong> ont quant à eux un accès un peu
			réduit :
		</p>
		<ul>
			<li>Gestion des événements</li>
			<li>Gestion des contacts par formulaire</li>
			<li>Accès à la page information (ici-même)</li>
		</ul>
		<p>
			Les sections suivantes serviront maintenant à expliquer
			les différentes pages et leurs fonctionnalités.
		</p>
	</section>

	<section class="page">
		<h3>1. Page Utilisateurs</h3>

		<p>
			Cette page n'est accessible qu'aux <strong>Admins</strong
			>.
		</p>
		<p>Elle permet :</p>
		<ul>
			<li>
				De voir les utilisateurs et leurs informations
				associées (Nom, adresse mail, rôle), triés par rôle
			</li>
			<li>
				D'ajouter, de modifier ou de supprimer un utilisateur
			</li>
		</ul>

		<h4>✅ Validation du formulaire</h4>
		<p>
			<strong>Tous les champs sont obligatoires.</strong> Pour être
			sûr de valider le formulaire, veuillez bien respecter les conditions
			suivantes :
		</p>
		<ul>
			<li>Nom : Faites-vous plaiz'</li>
			<li>
				Email : Bon, je pense que vous savez écrire un email
			</li>
			<li>
				Rôle : UNIQUEMENT "<strong>Admin</strong>" ou "<strong
					>Modo</strong
				>" (sinon ça marche ap)
			</li>
		</ul>
	</section>

	<section class="page">
		<h3 id="event-validation">2. Page Evénements</h3>
		<p>Cette page est accessible à tous.</p>
		<p>Elle permet :</p>
		<ul>
			<li>
				De voir les événéments et leurs informations, triés
				chronologiquement
			</li>
			<li>
				D'ajouter, de modifier ou de supprimer un événement
			</li>
			<li>
				D'avoir un aperçu de l'événément sur le site internet
				accessible au public (créer ou éditer un évent pour
				cela)
			</li>
		</ul>

		<h4>✅ Validation du formulaire</h4>
		<p>
			<strong
				>Tous les champs sont obligatoires SAUF "URL de
				l'événement".</strong> Pour être sûr de valider le formulaire,
			veuillez bien respecter les conditions suivantes :
		</p>
		<ul>
			<li>Nom : Faites-vous plaiz'</li>
			<li>
				Lieu : <strong>Obligatoire</strong>, donc même si
				c'est en ligne indiquez-le ("Zoom", "en ligne"...)
			</li>
			<li>
				Date : UNIQUEMENT <strong>JJ/MM/AAAA</strong>
			</li>
			<li>Horaire(s) : un peu plus complexe :</li>
			<ol>
				<li>12h</li>
				<li>8h30</li>
				<li>16h-18h</li>
				<li>16h-20h30</li>
				<li>etc...</li>
			</ol>
			<li>Description : 20-360 caractères</li>
			<li>
				URL de l'événement : <strong>Optionnel</strong>,
				correspond à l'évent Facebook associé s'il y en a un
			</li>
			<li>
				<span class="warning">Image</span> : fichiers
				<strong
					>PNG, JPG ou JPEG, et en format paysage</strong>
				<br />
				(⚠️l'aperçu n'apparait pas à l'édition mais est toujours
				présent
				<strong
					>[cf. la présence du bouton "Supprimer" ou non]</strong>
				vous pouvez tester avec le bouton "Visualiser" ⚠️)
			</li>
		</ul>
	</section>

	<section class="page">
		<h3>3. Formulaires de Contact</h3>
		<p>Cette page est accessible à tous.</p>
		<p>
			Elle permet de gérer les formulaires de contact entrants.
			Il y a une case à cocher qui permet d'indiquer si la
			personne a été recontactée ou non.
		</p>
	</section>

	<section class="page">
		<h3>4. Membres du bureau</h3>
		<p>
			Cette page n'est accessible qu'aux <strong>Admins</strong
			>.
		</p>
		<p>Elle permet :</p>
		<ul>
			<li>
				De voir les membres du bureau actuel et leurs
				informations associées.
			</li>
			<li>
				D'ajouter, de modifier ou de supprimer un membre du
				bureau
			</li>
			<li>
				⚠️ Ils s'afficheront dans l'ordre d'apparition dans la
				liste
			</li>
		</ul>

		<h4>✅ Validation du formulaire</h4>
		<p>
			<strong
				>Tous les champs sont obligatoires SAUF "URL
				LinkedIn".</strong
			>Pour être sûr de valider le formulaire, veuillez bien
			respecter les conditions suivantes :
		</p>
		<ul>
			<li>Nom & Poste : Pas de contrainte</li>
			<li>
				Mini-Description : entre 70 et 100 caractères max
				(c'est + une question d'affichae qu'autre chose à vrai
				dire)
			</li>
			<li>
				Description du rôle et du pôle : entre 200 et 400
				(idem)
			</li>
			<li>
				URL LinkedIn : Optionnel, attend uniquement un URL
				LinkedIn, tout simplement
			</li>
			<li>
				<span class="warning">Image</span> : fichiers
				<strong>PNG, JPG ou JPEG</strong>
				en
				<strong>format CARRÉ</strong>
				<br />
				(⚠️l'aperçu n'apparait pas à l'édition mais est toujours
				présent
				<strong
					>[cf. la présence du bouton "Supprimer" ou non]</strong>
				vous pouvez tester avec le bouton "Visualiser" ⚠️)
			</li>
		</ul>
	</section>

	<section class="page">
		<h3>🔥 Super Sayan Aid 🔥</h3>
		<p>
			Si vous vous retrouvez dans l'impasse et que <strong
				>personne dans l'association n'est en mesure de vous
				aider</strong
			>, vous pouvez me contacter directement au : +33 7 87 28
			17 91 ( SVP abusez-pas 🥲)
		</p>
	</section>
</section>

<style lang="scss">
	.page {
		margin-top: $sp-600;
		border-bottom: 1px solid $grey-500;
	}
	h2 {
		margin-bottom: $sp-400;
	}
	h4 {
		margin-top: $sp-400;
		margin-bottom: $sp-300;
	}
	p,
	ul {
		margin-bottom: $sp-300;
		list-style-position: inside;
	}
	ol {
		margin-left: $sp-300;
	}
	li {
		margin-bottom: $sp-200;
	}
	.warning {
		color: $danger-700;
		font-weight: bold;
	}
</style>
