<script>
	export let metric: number;
	export let label: string;
	export let color: "blue" | "yellow" = "blue";
</script>

<div class="grid-box {color}">
	<div class="metric">
		{metric}
	</div>

	<!-- SVG -->
	<i>
		<slot />
	</i>

	<h4>
		{label}
	</h4>
</div>

<style lang="scss">
	.grid-box {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;

		width: 13rem;
		height: 11rem;
		padding: $sp-300;
		background-color: $white;
		@include br-300;
		@include shadow(var(--box-shadow));
		@include transition($transition);

		&:hover {
			@include transition($transition);
			transform: translateY(-#{$sp-100});
		}

		.metric,
		i,
		h4 {
			margin: auto;
		}

		.metric {
			grid-row: 1;
			grid-column: 1 / 2;

			@include t2-bold;
		}
		i {
			grid-row: 1;
			grid-column: 2 / 3;

			width: $sp-500;
			height: $sp-500;
		}

		h4 {
			grid-row: 2;
			grid-column: 1 / 3;

			color: var(--color);
		}

		&.blue {
			--color: #{$prim-500};
			--box-shadow: #{$ds-500}, inset 0px 6px 0px #{$prim-500};

			&:hover {
				--box-shadow: #{$ds-700},
					inset 0px 6px 0px #{$prim-500};
			}
		}
		&.yellow {
			--color: #{$sec-500};
			--box-shadow: #{$ds-500}, inset 0px 6px 0px #{$sec-500};

			&:hover {
				--box-shadow: #{$ds-700},
					inset 0px 6px 0px #{$sec-500};
			}
		}
	}
</style>
