<script>
	import { fly } from "svelte/transition";
	import { API_URL } from "env";

	import cookie from "cookie";

	import Input from "$uikit/Input.svelte";
	import PopIn from "$components/templates/PopIn.svelte";
	import { Alert, notifications } from "$stores/notifications";
	import { page, session } from "$app/stores";
	import { goto } from "$app/navigation";

	let email: string = "matheo.pierini1@gmail.com";
	let pass: string = "80WgvtS&>vx";

	const login = async (email, password) => {
		try {
			const res = await fetch(`${API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			console.log("data:", data);

			if (res.status === 422) {
				notifications.add(
					new Alert("Connexion impossible", "error")
				);
			} else if (![200, 201].includes(res.status)) {
				notifications.add(
					new Alert("Identifiants invalides", "error")
				);
			} else {
				if (!$session) $session = {};
				$session.user = data.payload.user;
				$session.token = data.token;

				const tokenCookie = cookie.serialize(
					"token",
					$session.token,
					{
						maxAge: 60 * 60 * 4, // 4 hours
					}
				);

				const userCookie = cookie.serialize(
					"user",
					JSON.stringify($session.user),
					{
						maxAge: 60 * 60 * 4, // 4 hours
					}
				);

				document.cookie = tokenCookie;
				document.cookie = userCookie;

				if ($page.path === "/admin") goto("/admin/profile");
			}
		} catch (err) {
			console.error("err:", err);
		}
	};
</script>

<PopIn maxWidth="400px">
	<section transition:fly>
		<h3>Connexion</h3>
		<Input
			bind:value={email}
			type="email"
			placeholder="exemple@genius.fr" />
		<Input
			bind:value={pass}
			type="password"
			placeholder="*********" />
		<button
			class="outline-blue-btn"
			on:click={() => login(email, pass)}>
			Se connecter
		</button>
	</section>
</PopIn>

<style lang="scss">
	section {
		background-color: $white;
		border-radius: $br-500;
		padding: $sp-400 $sp-500;

		& > :global(*:not(:last-child)) {
			margin-bottom: $sp-400;
		}

		h3 {
			text-align: center;
		}

		button {
			margin: auto;
			width: $sp-1000;
		}
	}
</style>
