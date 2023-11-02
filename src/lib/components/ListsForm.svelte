<script lang="ts">
	import { enhance } from '$app/forms';
	import { BookMarked, Box, Calendar, Hourglass, Loader, Presentation, Trash } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let actionable: string;
	let steps: string;

	export let note_id: string;
</script>

<!-- TODO:refactor to make transition smoother -->
<!-- TODO: Add description to list types or info hover to give more context for decision -->

<form action="?/addToList" method="post" use:enhance>
	<input type="hidden" name="id" value={note_id} />

	<!-- Is it actionable? steps : Trash/Maybe/Someday -->
	<h2>Is this augment an actionable item?</h2>
	<label for="isActionable">
		<input type="radio" name="actionable" id="isActionable" value="yes" bind:group={actionable} /> Yes
	</label>
	<br />
	<label for="notActionable">
		<input type="radio" name="actionable" id="notActionable" value="no" bind:group={actionable} /> No
	</label>
	<br />

	{#if actionable == 'yes'}
		<div transition:fade>
			<!-- Multiple steps? Projects : minutes -->
			<h2>Does this action include more than one step to complete?</h2>
			<label for="nSteps">
				<input type="radio" name="steps" id="nSteps" value="yes" bind:group={steps} /> Yes
			</label>
			<br />
			<label for="oneStep">
				<input type="radio" name="steps" id="oneStep" value="no" bind:group={steps} /> No
			</label>
			<br />
		</div>
		{#if steps == 'yes'}
			<div transition:fade>
				<button type="submit" name="list" value="project" class="bg-purple-500 hover:bg-purple-700 flex place-items-center"
					>create new project <Presentation class="ml-4 h-4 w-4 my-auto" />
				</button>
			</div>
		{:else if steps == 'no'}
		<div transition:fade>
			<!--  TODO: Less than 2 minutes? just do it : Delegate/Wait : Calendar -->
			<button type="submit" name="list" value="waiting" class="bg-slate-500 hover:bg-slate-700 flex place-items-center"
				>move to waiting <Hourglass class="ml-4 h-4 w-4 my-auto" />
			</button>
			<button type="submit" name="list" value="calendar" class="bg-blue-500 hover:bg-blue-700 flex place-items-center"
				>create calendar event <Calendar class="ml-4 h-4 w-4 my-auto" />
			</button>
			<br />
		</div>
		{/if}
	{:else if actionable == 'no'}
	<div transition:fade>
		<button type="submit" name="list" value="trash" class="bg-red-500 hover:bg-red-700 flex place-items-center"
			>move to trash <Trash class="ml-4 h-4 w-4 my-auto" />
		</button>
		<button type="submit" name="list" value="someday" class="bg-yellow-500 hover:bg-yellow-700 flex place-items-center"
			>move to someday <Box class="ml-4 h-4 w-4 my-auto" />
		</button>
		<button type="submit" name="list" value="reference" class="bg-green-500 hover:bg-green-700 flex place-items-center"
			>create reference <BookMarked class="ml-4 h-4 w-4 my-auto" />
		</button>
		</div>
	{/if}
</form>
