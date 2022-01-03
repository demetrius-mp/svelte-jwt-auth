<script lang="ts">
	import { session } from '$app/stores';
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit
	<a href="https://kit.svelte.dev">kit.svelte.dev</a>
	to read the documentation
</p>

{#if $session.user}
	<a rel="external" href="/auth/logout">
		<button>Logout</button>
	</a>
	<a href="/profile"> My Profile </a>
{:else}
	<a href="/login">
		<button>Login with JWT</button>
	</a>
{/if}
