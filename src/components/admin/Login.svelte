<script>
	import { fly } from "svelte/transition";
	import { API_URL } from "env";

	import Input from "$uikit/Input.svelte";
	import PopIn from "$components/templates/PopIn.svelte";
	import { Alert, notifications } from "$stores/notifications";
	import { session } from "$app/stores";

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
				var expiryDate = new Date();
				expiryDate.setHours(expiryDate.getHours() + 1);
				$session.user = data.payload.user;
				$session.token = data.token;
				$session.expiryDate = expiryDate;
				localStorage.setItem(
					"user",
					JSON.stringify(data.payload.user)
				);
				localStorage.setItem("token", data.token);
				localStorage.setItem(
					"expiryDate",
					expiryDate.toISOString()
				);
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
