import { writable } from "svelte/store";

let Store = writable([]);

// export const customStore = {
// 	subscribe: Store.subscribe,
// 	setStore: (arr) => {
// 		Store.set(arr);
// 	},
// 	add: (elNew) => {
// 		Store.update((el) => {
// 			return [elNew, ...el];
// 		});
// 	},
// 	remove: (id) => {
// 		Store.update((els) => els.filter((el) => el.id !== id));
// 	},
// 	edit: (edited) => {
// 		Store.update((els) => {
// 			let i = els.findIndex((el) => el.id === edited.id);
// 			els[i] = edited;
// 			return els;
// 		});
// 	},
// };
