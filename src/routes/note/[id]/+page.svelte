<script lang="ts">
	export let data: PageData;

	import type { PageData } from './$types';
	import { Trash2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
</script>

<div class="sm:w-2/3 mx-auto flex justify-between">
	<div>
		<p>
			{data.note.text}
		</p>

		<div class="my-4">
			{#each data.note.tags as t}
				<span class="rounded m-1 px-2 py-1 bg-slate-100">
					{t}
				</span>
			{/each}
		</div>



		{#if data.note.list}
			{data.note.list}
		{:else}
			<form action="?/addToList" method="post" use:enhance>
				<input type="hidden" name="id" value={data.note.id}>
				<input type="radio" name="list" id="action" value="action" />
				<label for="action">action</label>
				<br />
				<input type="radio" name="list" id="project" value="project" />
				<label for="project">project</label>
				<br />
				<input type="radio" name="list" id="calendar" value="calendar" />
				<label for="calendar">calendar</label>
				<br />
				<input type="radio" name="list" id="waiting" value="waiting" />
				<label for="waiting">waiting</label>
				<br />
				<button type="submit" class="bg-blue-500 hover:bg-blue-700">add to list</button>
			</form>
		{/if}
	</div>

	<form action="?/delete" method="post" use:enhance>
		<input type="hidden" name="id" value={data.note.id} />
		<button class="bg-red-500 hover:bg-red-700">
			<Trash2 />
		</button>
	</form>
</div>

<!-- TODO add possibiliy to categorize augments into lists -->
