<script context="module">
	export function load({ error, status, session }) {
		session.token = "";
		session.user = false;
		return {
			props: {
				status: `${status}`,
				error: `${error.message}`,
			},
		};
	}
</script>

<script>
	export let status;
	export let error;
</script>

<h1>{status}</h1>
<p>{error}</p>

<style lang="scss">
	* {
		color: $white;
	}
</style>
