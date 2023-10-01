<script>
	import '../app.postcss';

	export let data;
</script>

<nav class="flex justify-between p-4 text-xl">
	<a href="/">notes</a>
	{#if !data.session}
		<a href="/login" class="bg-slate-200 rounded">login</a>
	{/if}
</nav>

<slot />

<footer />
