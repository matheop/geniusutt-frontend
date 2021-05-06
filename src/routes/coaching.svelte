<script>
	import ObjectiveBanner from "$components/coaching/ObjectiveBanner.svelte";

	interface Objective {
		title: string;
		desc: string;
		imgUrl: string;
		imgSide: "left" | "right";
	}

	const objectives: Objective[] = [
		{
			title: "Identifier les porteurs de projet",
			desc:
				"Notre premier rôle est d’identifier les étudiants porteurs de projet au sein de l’UTT. Pour cela, nous communiquons sur nos réseaux et organisons en chaque début de semestre un événement prévu à cet effet.",
			imgUrl: "/img/coaching/idea.jpeg",
			imgSide: "left",
		},
		{
			title:
				"Mettre en place des formations et séances de Coaching",
			desc:
				"Une fois les projets connus, notre objectif est de fournir aux étudiants toute la connaissance et toute la ressource nécessaires pour pouvoir avancer sur leur projet. Cela passe évidemment par des formations (Elevator Pitch, Communication...) et des séances de coaching personnalisé !",
			imgUrl: "/img/coaching/idea.jpeg",
			imgSide: "right",
		},
		{
			title: "Participer aux financements des projets",
			desc:
				"Grâce à l’UTT et aux différents partenaires de Genius Coaching, nous proposons également des financements pour faciliter le développement des projets.",
			imgUrl: "/img/coaching/idea.jpeg",
			imgSide: "left",
		},
		{
			title: "Accompagner au quotidien",
			desc:
				"Être présent en cas de besoin et répondre aux interrogations des porteurs de projet. Voici notre ultime mission. C’est pourquoi nous nous efforçons d’être au plus proche et d’accompagner chaque projet indiviuellement.",
			imgUrl: "/img/coaching/idea.jpeg",
			imgSide: "right",
		},
	];
</script>

{#each objectives as { title, desc, imgUrl, imgSide }}
	<ObjectiveBanner {title} {desc} {imgUrl} {imgSide} />
{/each}
