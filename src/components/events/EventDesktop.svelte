<script lang="ts">
	import type { Event } from "$helpers/interfaces/events";
	import { API_URL } from "env";

	import EventInfo from "./utils/EventInfo.svelte";

	export let event: Event;
	export let imgPreview: ArrayBuffer | string;
</script>

<article class="event-card">
	<div class="img-div">
		<img
			class="cover"
			src={imgPreview ?? `${API_URL}/${event.imgUrl}`}
			alt={event.name} />
	</div>
	<div class="info">
		<h2>{event.name}</h2>
		<p>{event.desc}</p>

		<div class="event-info">
			<EventInfo
				flex="inline"
				eventInfo={[
					event.date,
					event.schedule,
					event.place,
				]} />
		</div>

		<div class="footer">
			{#if event.upcoming && event.eventUrl}
				<a
					href={event.eventUrl}
					target="_blank"
					class="no-deco">
					<button class="fill-blue-btn">
						Je participe !
					</button>
				</a>
			{/if}
			{#if event.eventUrl}
				<a
					href={event.eventUrl}
					target="_blank"
					rel="external"
					class="no-deco">
					<button class="outline-blue-btn">
						En savoir +
					</button>
				</a>
			{/if}
		</div>
	</div>
</article>

<style lang="scss">
	article {
		@include grid-12;
		background-color: $white;
		color: $black;
		@include br-900;
		@include transition($transition);
		overflow: hidden;
		height: 23rem;

		&:hover {
			transform: scale(1.01);
			@include transition($transition);
		}

		.img-div {
			grid-column: 1 / 6;
		}

		.info {
			grid-column: 6 / -1;
			padding: $sp-400 0;
			padding-right: $sp-400;

			display: grid;
			grid-template-rows: 2rem 9.5rem 1.7rem 3rem;
			gap: $sp-200;

			h2 {
				grid-row: 1 / 2;
			}
			p {
				grid-row: 2 / 3;
			}
			.event-info {
				grid-row: 3 / 4;
			}
			.footer {
				grid-row: 4 / 5;
			}

			.footer {
				@include flex-y;

				a:first-child {
					margin-right: $sp-300;
				}
			}
		}
	}
</style>
