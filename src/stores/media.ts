import { writable, derived } from "svelte/store";

function createCustomMedia() {
	const { subscribe, set, update } = writable("lg");
	return {
		set,
		subscribe,
		up: (width: number) => update(() => defaultCalc(width)),
	};
}

function listenIfiOS() {
	const { subscribe, set, update } = writable(false);
	return {
		set,
		subscribe,
		up: () => update(() => isIPhone()),
	};
}

function defaultCalc(width: number) {
	if (width > 1800) return "2xl";
	if (width > 1280 && width <= 1800) return "xl";
	if (width > 1024 && width <= 1280) return "lg";
	if (width > 767 && width <= 1024) return "md";
	if (width > 480 && width <= 767) return "sm";
	return "xs";
}

function isIPhone(): boolean {
	return /iPhone/.test(navigator.userAgent) && !window.MSStream;
}

export const media = createCustomMedia();

export const isPhone = derived(media, ($media) =>
	["xs", "sm"].includes($media)
);

export const isTablet = derived(media, ($media) =>
	["sm", "md"].includes($media)
);

export const isIOS = listenIfiOS();
