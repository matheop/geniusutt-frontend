<script>
	import PopIn from "$components/templates/PopIn.svelte";
	import Cross from "$svg/Cross.svelte";
	import Calendar from "$svg/events/calendar.svelte";
	import Info from "$svg/Info.svelte";

	export let name: string;
	export let desc: string;
	export let date: string;
	export let imgUrl: string;
	export let videoUrl: string = "to";
	export let eventInfo: string[] = [date, "Dev Perso"];
	export let tags: string[] = ["Conférence", "Dev Perso"];

	// TODO: gestion auto avec moment
	export let upcomingEvent: boolean = true;
	let showInfo: boolean = false;
	let maxHeight: string = "90vh";
</script>

<article on:click={() => (showInfo = true)}>
	<div class="info">
		<h4>{name}</h4>
		<p>{date}</p>
		<i>
			<Info />
		</i>
	</div>
	<div class="tags">
		{#each tags as tag}
			<span class="tag">{tag}</span>
		{/each}
	</div>
</article>

{#if showInfo}
	<PopIn {maxHeight} on:out-popin={() => (showInfo = false)}>
		<section style="max-height: {maxHeight}">
			<div class="cross" on:click={() => (showInfo = false)}>
				<Cross />
			</div>
			<div class="img-cover">
				<img class="cover" src={imgUrl} alt={name} />
			</div>

			<h3>{name}</h3>
			<div class="info">
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
			<p>{desc}</p>
			{#if !!videoUrl}
				<button class="link video">Voir la vidéo</button>
			{/if}
			{#if upcomingEvent}
				<button class="fill-blue">S'inscrire</button>
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
			margin-bottom: $sp-200;

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

		.tags {
			@include flex-y;
			flex-wrap: wrap;
			gap: $sp-50;
			.tag {
				color: $white;
				background-color: $success;
			}
		}
	}

	section {
		position: relative;
		background-color: $white;
		border-radius: $br-500;
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

		.info {
			@include flex-y;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: $sp-100;
			@include body1;

			p {
				@include flex-y;
			}

			i {
				width: 1.5rem;
				margin-right: $sp-100;
			}
		}
		p {
			text-align: justify;
			@include body2;
		}

		button {
			display: block;
			margin: auto;

			&.video {
				color: $black;
				text-decoration: underline;
			}
		}

		.cross {
			position: absolute;
			top: $sp-300;
			right: $sp-300;
			width: 1.5rem;
			height: 1.5rem;
		}
	}
</style>
