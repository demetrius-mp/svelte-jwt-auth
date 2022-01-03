<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';

	let username: string;
	let password: string;
	let error: boolean = false;

	async function submit() {
		const response = await fetch('auth/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			error = true;
			return;
		}

		const user = await response.json();

		$session.user = user;
		goto('/');
	}
</script>

<form on:submit|preventDefault={submit}>
	<input type="text" placeholder="username" bind:value={username} />
	<input type="password" placeholder="password" bind:value={password} />
	<button type="submit">Submit</button>
</form>
{#if error}
	<div style="color: red">
		<p>Invalid credentials</p>
	</div>
{/if}
