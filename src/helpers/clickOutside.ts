export function clickOutside(node): unknown {
	const handleClick = (event): void => {
		if (
			node &&
			!node.contains(event.target) &&
			!event.defaultPrevented
		) {
			node.dispatchEvent(
				new CustomEvent("click_outside", node)
			);
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy(): void {
			document.removeEventListener("click", handleClick, true);
		},
	};
}
