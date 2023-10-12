<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<svelte:head>
	<title>A simple sveltekit notes app</title>
</svelte:head>

<!-- TODO maybe move loading the notes into here or layout and attach to context in a store -->
<!-- thus reducing network traffick and only syncing to db when necessary -->
<!-- but when is it necessary to fetch and sync? -->

<div class="grid place-items-center">
	<h1>Hey {data.username}</h1>

	<button class="bg-blue-500 hover:bg-blue-700 font-bold">
		<a href="/notes"> Your notes</a>
	</button>

	<button class="bg-blue-500 hover:bg-blue-700 font-bold">
		<a href="/tags"> Your tags</a>
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
		Write everything down to safe your thoughts. Then you can reflect on them and define your next
		steps. Sort them and add tasks to them.
	</p>

	<h3 class="text-xl font-bold mt-8">Clarify</h3>
	<p>
		Revisit your notes and reflect on them. Do you need to create a todo out of your note or a
		calendar event? Make
	</p>

	<h3 class="text-xl font-bold">Organize</h3>
	<p />

	<h3 class="text-xl font-bold">Review</h3>
	<p />

	<h3 class="text-xl font-bold">Engage</h3>
	<p />

	<h2 class="text-xl font-bold">There are 4 main lists</h2>
	<ol class="list-decimal">
		<li>action list</li>
		<li>project list</li>
		<li>calendar</li>
		<li>wating for</li>
	</ol>

	<form method="post" action="?/logout" use:enhance>
		<button>Sign out</button>
	</form>
</div>
