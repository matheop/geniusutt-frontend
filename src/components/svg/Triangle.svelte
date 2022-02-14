<script lang="ts">
	export let direction: string = "down";
</script>

<svg
	width="15"
	height="16"
	class={direction}
	viewBox="0 0 15 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg">
	<path
		d="M13.4129 0.5L7.11613 14.762L0.819391 0.499999L13.4129 0.5Z"
		stroke="#01122C" />
</svg>

<style lang="scss">
	.down,
	.up {
		@include transition(transform 0.3s ease);
	}
	.down {
		transform: rotate(0deg);
	}
	.up {
		transform: rotate(180deg);
	}
</style>
