<script>
	import Calendar from "$svg/events/calendar.svelte";

	export let eventInfo: string[];
	export let flex: "between" | "inline" = "between";
</script>

<div class="event-info {flex}">
	{#each eventInfo as info}
		<p>
			<i>
				<Calendar />
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
			gap: $sp-100;
			justify-content: space-between;
		}
		&.inline {
			gap: $sp-300;
		}

		p {
			@include flex-y;
		}

		i {
			width: 1.5rem;
			margin-right: $sp-100;
		}
	}
</style>
