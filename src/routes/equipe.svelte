<script>
	import BoardMemberInfo from "$components/team/BoardMemberInfo.svelte";
	import { isPhone } from "$stores/media";

	interface BoardMember {
		name: string;
		position: string;
		desc: string;
		imgUrl: string;
		imgSide: "left" | "right";
	}

	const boardmembers: BoardMember[] = [
		{
			name: "Paul Julien",
			position: "Président",
			desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
					Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
			imgUrl: "/img/paul-julien.jpeg",
			imgSide: "left",
		},
		{
			name: "Salomé Bompart",
			position: "VP Je sais pas quoi",
			desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
					Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
			imgUrl: "/img/paul-julien.jpeg",
			imgSide: "right",
		},
		{
			name: "Julien Auffret",
			position: "VP Coaching",
			desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
					Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
			imgUrl: "/img/paul-julien.jpeg",
			imgSide: "left",
		},
		{
			name: "Oscar Benoit",
			position: "Respo TEDxUTTroyes",
			desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
					Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
			imgUrl: "/img/paul-julien.jpeg",
			imgSide: "right",
		},
		{
			name: "Julien Elhmaouni",
			position: "VP Partenariat",
			desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
					Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
			imgUrl: "/img/paul-julien.jpeg",
			imgSide: "left",
		},
	];
</script>

<main class="global-container">
	<section>
		<h1>le bureau {$isPhone ? "" : " – Genius Utt"}</h1>

		{#each boardmembers as m}
			<BoardMemberInfo
				imgSide={m.imgSide}
				name={m.name}
				position={m.position}
				imgUrl={m.imgUrl}
				desc={m.desc} />
		{/each}
	</section>
</main>

<style lang="scss">
	main {
		@include grid-12;
		--mb: #{$sp-700};

		@include phone {
			--mb: #{$sp-500};
		}

		section {
			grid-column: 2 / -2;
			@include py(var(--mb));

			& > :global(*:not(:last-child)) {
				margin-bottom: var(--mb);
			}

			h1 {
				text-align: center;
			}
		}
	}
</style>
