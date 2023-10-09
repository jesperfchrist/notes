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

<div class="min-h-screen">
	<slot />
</div>

<footer class="text-center my-4 text-sm">
	this is the footer
</footer>