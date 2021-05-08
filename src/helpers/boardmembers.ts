export interface BoardMember {
	name: string;
	position: string;
	desc: string;
	imgUrl: string;
	linkedin?: string;
	imgSide?: "left" | "right";
}

export const boardmembers: BoardMember[] = [
	{
		name: "Paul Julien",
		position: "Président",
		desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
				Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
		imgUrl: "/img/paul-julien.jpeg",
		linkedin: "https://www.linkedin.com/in/paul-julien0704/",
		imgSide: "left",
	},
	{
		name: "Salomé Bompart",
		position: "VP Je sais pas quoi",
		desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
				Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
		imgUrl: "/img/paul-julien.jpeg",
		linkedin: "https://www.linkedin.com/in/paul-julien0704/",
		imgSide: "right",
	},
	{
		name: "Julien Auffret",
		position: "VP Coaching",
		desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
				Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
		imgUrl: "/img/paul-julien.jpeg",
		linkedin: "https://www.linkedin.com/in/paul-julien0704/",
		imgSide: "left",
	},
	{
		name: "Oscar Benoit",
		position: "Respo TEDxUTTroyes",
		desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
				Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
		imgUrl: "/img/paul-julien.jpeg",
		linkedin: "https://www.linkedin.com/in/paul-julien0704/",
		imgSide: "right",
	},
	{
		name: "Julien Elhmaouni",
		position: "VP Partenariat",
		desc: `Lorem ipsum sit amet. Vous l’avez peut-être déjà vu sans y prêter attention, ou peut-être faites-vous partie des gens qui se sont étonnés de voir le contenu de leur site en latin, alors que la traduction n’était pas prévue.
				Loin d’une traduction de vos contenus, le lorem ipsum est le petit nom qu’on donne au texte de substitution ou faux-texte.`,
		imgUrl: "/img/paul-julien.jpeg",
		linkedin: "https://www.linkedin.com/in/paul-julien0704/",
		imgSide: "left",
	},
];
