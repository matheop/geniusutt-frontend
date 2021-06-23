<script context="module">
	export async function load({ session }) {
		if (!!session.token && !!session.user) {
			return {
				redirect: "/admin/profile",
				status: 302,
			};
		}
		return {};
	}
</script>
