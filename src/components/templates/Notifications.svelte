<script>
	/* Svelte */
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";

	/* Helpers */
	import { notifications } from "$stores/notifications";
</script>

<div id="notifications">
	{#each $notifications as alert (alert.id)}
		<div
			animate:flip
			in:fly={{ x: -200, delay: 100 }}
			out:fly={{ x: 200, delay: 100 }}
			on:introend={() => {
				setTimeout(() => {
					notifications.remove(alert.id);
				}, alert.timer);
			}}
			class="alert {alert.type}">
			<div class="content">
				<div class="text">
					<p>{alert.title}</p>
					{#if alert.text !== undefined && alert.text !== ""}
						<p class="subtitle">{alert.text}</p>
					{/if}
				</div>
				<i
					class="cross"
					on:click={() => notifications.remove(alert.id)} />
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	#notifications {
		z-index: 100100;
		position: fixed;
		top: 6rem;
		right: 1rem;
		@include phone {
			top: 4rem;
		}
		@include screen-max-xs {
			width: 100%;
			top: 0;
			right: 0;
		}

		.alert {
			// Une notification
			background-color: $white;
			position: relative;
			padding: 0.5rem 1rem;
			min-height: 3.5rem;
			width: 20rem;
			border-left: 4px solid $prim-500;
			@include ds-500;
			@include br-300;
			&.success {
				//Couleurs selon alerte
				border-color: $success;
				p,
				.cross {
					color: $success;
				}
			}
			&.error {
				border-color: $danger-500;
				p,
				.cross {
					color: $danger-500;
				}
			}
			&.warning {
				border-color: $warning;
			}
			p,
			.cross {
				color: $warning;
			}
			&.info {
				border-color: $info;
				p,
				.cross {
					color: $info;
				}
			}

			.content {
				// contenu (text / icon / etc)
				@include flex-y;
				justify-content: space-between;
				margin: 0 auto;
				min-height: 2.5em;
				.text {
					@include fs0;
					font-weight: bold;
					.subtitle {
						color: grey;
						font-weight: normal;
					}
				}
				.cross {
					height: 1rem;
					width: 1rem;
					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
