<script>
	import BoardMemberInfo from "$components/team/BoardMemberInfo.svelte";
</script>

<main class="global-container">
	<section>
		<BoardMemberInfo
			name="Paul Julien"
			position="Président"
			imgUrl="/img/paul-julien.jpeg"
			desc={`Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention,
ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin,
alors que la traduction n’était pas prévue.<br />Loin d’une traduction de vos contenus,
le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`} />

		<BoardMemberInfo
			imgSide="right"
			name="Paul Julien"
			position="Président"
			imgUrl="/img/paul-julien.jpeg"
			desc={`Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention,
	ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin,
	alors que la traduction n’était pas prévue.<br />Loin d’une traduction de vos contenus,
	le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`} />
	</section>
</main>

<style lang="scss">
	main {
		background-color: $prim-900;
		@include grid-12;

		section {
			grid-column: 2 / 12;
		}
	}
</style>
