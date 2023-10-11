<script>
	import { enhance } from '$app/forms';
	import '../app.postcss';

	export let data;
</script>

<nav class="flex justify-between p-4">
	<a href="/" class="text-3xl font-black uppercase">Augments</a>
	{#if !data.session}
		<a href="/login" class="bg-slate-200 rounded">login</a>
	{:else}
		<form method="post" action="?/logout" use:enhance>
			<button>Sign out</button>
		</form>
	{/if}
</nav>

<div class="min-h-screen">
	<slot />
</div>

<footer class="text-center my-4 text-sm">this is the footer</footer>
