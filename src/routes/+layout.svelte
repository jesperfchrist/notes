<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { fade, fly } from 'svelte/transition';
	import '../app.postcss';

	export let data;
</script>

<nav class="flex justify-between p-4">
	<a href="/" class="text-3xl font-black uppercase">Augments</a>
	{#if !data.session}
		<a href="/login" class="bg-slate-200 rounded">login</a>
	{:else}
		<div>
			<Dropdown />
		</div>
	{/if}
</nav>

<div class="min-h-screen mx-4">
	<slot />
</div>

<footer class="text-center my-4 text-sm">
	<p>this is the footer</p>
</footer>
