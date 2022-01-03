<script context="module" lang="ts">
	import { getTodos } from '$lib/api';

	export async function load({ session }) {
		console.dir(session);
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			props: {
				todos: await getTodos(session.user.accessToken)
			}
		};
	}
</script>

<script lang="ts">
	import { session } from '$app/stores';

	export let todos;
</script>

<h1>Hello, {$session.user.username}</h1>

{#each todos as todo}
	<div>
		<h3>{todo.name}</h3>
		<p>{todo.content}</p>
	</div>
{/each}
