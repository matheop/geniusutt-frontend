<script>
	import Calendar from "$svg/events/calendar.svelte";
	import Clock from "$svg/events/Clock.svelte";
	import MapPointer from "$svg/events/MapPointer.svelte";
	import type { SvelteComponent } from "svelte";

	export let eventInfo: string[];
	export let flex: "between" | "inline" = "between";

	const icons: typeof SvelteComponent[] = [
		Calendar,
		Clock,
		MapPointer,
	];
</script>

<div class="event-info {flex}">
	{#each eventInfo as info, i}
		<p>
			<i>
				<svelte:component this={icons[i]} />
			</i>
			<span>
				{info}
			</span>
		</p>
	{/each}
</div>

<style lang="scss">
	.event-info {
		@include flex-y;
		flex-wrap: wrap;
		@include body1;

		&.between {
			gap: $sp-200;
			justify-content: space-between;
		}
		&.inline {
			gap: $sp-400;
		}

		p {
			@include flex-y;
		}

		i {
			display: flex;
			width: 1.5rem;
			height: 1.5rem;
			margin-right: $sp-100;
		}
	}
</style>
