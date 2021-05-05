import { writable } from "svelte/store";

const store = writable(null);

export const form = {
	subscribe: store.subscribe,
	set: () => store.set(true),
	remove: () => store.set(null),
};
