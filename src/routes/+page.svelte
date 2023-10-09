<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>A simple sveltekit notes app</title>
</svelte:head>

<div class="grid place-items-center">
	<h1>Profile</h1>
	<p>Username: {data.username}</p>

	<form method="post" action="?/logout" use:enhance>
		<button>Sign out</button>
	</form>

	<button class="bg-blue-300">
		<a href="/notes"> > Your notes</a>
	</button>
</div>