<script>
	import { API_URL } from "env";
	import PopIn from "$components/templates/PopIn.svelte";
	import type { Event } from "$helpers/interfaces/events";
	import Cross from "$svg/Cross.svelte";
	import Info from "$svg/Info.svelte";
	import EventInfo from "./utils/EventInfo.svelte";

	export let event: Event;

	let showInfo: boolean = false;
	let maxHeight: string = "90vh";
</script>

<article on:click={() => (showInfo = true)}>
	<div class="info">
		<h4>{event.name}</h4>
		<p>{event.date}</p>
		<i>
			<Info />
		</i>
	</div>
</article>

{#if showInfo}
	<PopIn {maxHeight} on:out-popin={() => (showInfo = false)}>
		<section class="event-card" style="max-height: {maxHeight}">
			<div
				class="popin-cross"
				on:click={() => (showInfo = false)}>
				<Cross />
			</div>

			<div class="img-cover">
				<img
					class="cover"
					src={`${API_URL}/${event.imgUrl}`}
					alt={event.name} />
			</div>

			<h3>{event.name}</h3>

			<div>
				<EventInfo
					eventInfo={[
						event.date,
						event.schedule,
						event.place,
					]} />
			</div>

			<p>{event.desc}</p>
			{#if event.upcoming && !!event.eventUrl}
				<a
					href={event.eventUrl}
					target="_blank"
					class="no-deco">
					<button class="fill-blue-btn">
						Je participe !
					</button>
				</a>
			{/if}
		</section>
	</PopIn>
{/if}

<style lang="scss">
	article {
		width: 100%;
		background-color: $white;
		padding: $sp-200;
		@include br-500;
		cursor: pointer;

		.info {
			@include flex-y;
			justify-content: space-between;
			// margin-bottom: $sp-200;

			h4 {
				width: 60%;
			}
			p {
				@include body2;
			}
			i {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}

	section {
		position: relative;
		background-color: $white;
		@include br-500;
		padding: $sp-300;
		overflow-y: scroll;

		& > *:not(:last-child) {
			margin-bottom: $sp-200;
		}

		.img-cover {
			width: 100%;
			@include mx(auto);
		}

		h3 {
			text-align: center;
		}

		p {
			@include body2;
		}

		button {
			display: block;
			margin: auto;
		}
	}
</style>
