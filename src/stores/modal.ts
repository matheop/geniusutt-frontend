// Pour ajouter une modal :
//
// modal.show({
// 	title:
// 		"Vous êtes sur le point de supprimer  un produit de votre panier",
// 	desc: "Etes-vous sûr de vouloir continuer ?",
// 	btn1: "OUAIS BON OK",
// 	btn2: "eh mais tu kroi t ki en fait",
// 	action_btn1: () => modal.remove(),
// 	action_btn2: () => modal.remove(),
// });

// ==> VOIR Modal.svelte props = ModalType

interface ModalType {
	title?: string;
	desc?: string;
	btn1?: string;
	btn2?: string;
	action_btn1?: () => any;
	action_btn2?: () => any;
	action_3?: () => any;
	displayCrossBtn?: boolean;
}

import { writable } from "svelte/store";

const store = writable(null);

export const modal = {
	subscribe: store.subscribe,
	set: (mdl: ModalType) => {
		store.set(mdl);
	},
	show: (mdl: ModalType) => {
		store.update(() => mdl);
	},
	remove: () => {
		store.set(null);
	},
};
