import { bubble, listen } from "svelte/internal";
export function getEventsAction(component) {
	return (node) => {
		console.log(node);
		const events = Object.keys(component.$$.callbacks);
		console.log(events);
		const listeners = [];
		events.forEach((event) =>
			listeners.push(
				listen(node, event, (e) => bubble(component, e))
			)
		);
		console.log(listeners);
		return {
			destroy: () => {
				listeners.forEach((listener) => listener());
			},
		};
	};
}
