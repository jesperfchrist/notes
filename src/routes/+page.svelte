<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>A simple sveltekit notes app</title>
</svelte:head>

<div class="grid place-items-center">
	<h1>Hey {data.username}</h1>

	<button class="bg-blue-300 font-bold">
		<a href="/notes"> Your notes</a>
	</button>

	<h2 class="font-bold">Use the GTD system by David Allen</h2>

	<ol class="list-decimal">
		<li>Capture</li>
		<li>Clarify</li>
		<li>Organize</li>
		<li>Review</li>
		<li>Engage</li>
	</ol>

	<h3 class="text-xl font-bold mt-8">Capture</h3>

	<p>
		Write everything down to safe your thoughts.
		Then you can reflect on them and define your next steps.
		Sort them and add tasks to them.
	</p>

</div>
