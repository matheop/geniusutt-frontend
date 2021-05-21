// Pour ajouter une notification :
//
// notifications.add(new Alert("Email bien ajouté", "valid"))

import { writable } from "svelte/store";

export class Alert {
	title: string;
	text: string;
	type: "error" | "success" | "warning" | "info";
	timer: number;
	id: number;

	constructor(title: string, type, text = "", timer = 4500) {
		this.title = title;
		this.text = text;
		this.type = type;
		this.timer = timer;
		this.id = Date.now();
	}
}

const list = writable([]);

export const notifications = {
	subscribe: list.subscribe,
	setStore: (arr: object[]) => {
		list.set(arr);
	},
	add: (newAlert: object) => {
		list.update((el) => {
			return [newAlert, ...el];
		});
	},
	remove: (id: number) => {
		list.update((els) => els.filter((el) => el.id !== id));
	},
};
