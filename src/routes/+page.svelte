<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import mermaid from 'mermaid';

	export let data;

	onMount(() => {
		mermaid.init();
	});
</script>

<svelte:head>
	<title>A simple sveltekit notes app</title>
</svelte:head>

<!-- TODO maybe move loading the notes into here or layout and attach to context in a store -->
<!-- thus reducing network traffick and only syncing to db when necessary -->
<!-- but when is it necessary to fetch and sync? -->

<!-- TODO refactor this, and create unified wording -->
<!-- maybe add cms or data filing system -->

<div class="w-2/3 mx-auto">
	<h1>Hey {data.username}</h1>

	<button class="bg-blue-500 hover:bg-blue-700 font-bold">
		<a href="/notes"> Your notes</a>
	</button>

	<button class="bg-blue-500 hover:bg-blue-700 font-bold">
		<a href="/tags"> Your tags</a>
	</button>

	<button class="bg-green-600 hover:bg-green-700 font-bold">
		<a href="/docs">Read the Docs</a>
	</button>

	<h1>AUGMENTS</h1>
	<p>a note app built with</p>

	<ul class="list-disc mx-6 my-2">
		<li>SvelteKit</li>
		<li>Lucia</li>
		<li>Mongoose</li>
	</ul>

	<p>following the GTD system by David Allen.</p>

	<h2>GTD & AUGMENTS</h2>
	<p>
		The basic idea is to <mark> help your mind organizing itself </mark>
		with a few guidelines, a workspace and a 5 step workflow to follow up on your augments.
	</p>
	<h3>WORKSPACE & TOOLS</h3>
	<p>
		The basic setup for the <mark>workspace</mark> is the inbox/your notes section, a trash can, a reference
		section, lists, a calendar.
	</p>
	<p>
		These tools dont necessarily need to be digital, but while be provided here and added to the
		workflow.
	</p>

	<h3>WRITING AUGMENTS</h3>
	<p>
		In your inbox create a note/augment that is something thats causing you stress or that you are
		just thinking about. Allen calls these
		<mark>"open loops", "incompletes", "stuff"</mark>, I refer to them as
		<mark>notes/augments</mark>
		to broaden the term a little.
	</p>

	<h4>GUIDELINES</h4>
	<p>Allen offers a few guidelines to help creat e more actionable steps out your augments.</p>

	<ol class="list-decimal mx-6 my-2">
		<li>Define the augment/note, just write it down.</li>
		<li>Add a description when the succesfull outcome is achieved and you can consider it done.</li>
		<li>If necessary add steps to approach the completion.</li>
		<li>After completion reflect on process/emotions.</li>
	</ol>

	<h3>WORKFLOWS</h3>
	<p>
		These are also embedded to the workflow that helps one to clear your head, but still have an
		organized system that offers you a backbone for your daily life.
	</p>

	<ol class="list-decimal mx-6 my-2">
		<li>Capture</li>
		<li>Clarify</li>
		<li>Organize</li>
		<li>Reflect</li>
		<li>Engange</li>
	</ol>

	<p>
		After creating an augment use this flow to assign to the right spot in your workflow/workspace.
	</p>
	<pre class="mermaid">
			graph TD
					A[Inbox] --- B(Is it actionable?)
					B --> |Yes| C[One or multiple steps?]
					B --> |No| D[Trash, Maybe/Someday, References ]
					C --> |multiple steps| E[Projects]
					C --> |one step| F[Less than 2 minutes?]
					F --> |yes| G[Just do it]
					F --> |no| H[delegate or wait]
					F --> |defer it| I["Calendar (decide on completion date)"]
	</pre>

	<form method="post" action="?/logout" use:enhance>
		<button>Sign out</button>
	</form>
</div>
