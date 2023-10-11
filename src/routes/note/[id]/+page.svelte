<script lang="ts">
	import type { PageData } from './$types';
	import { Trash2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
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
	</div>

	<form action="?/delete" method="post" use:enhance>
		<input type="hidden" name="id" value={data.note.id} />
		<button class="bg-red-500 hover:bg-red-700">
			<Trash2 />
		</button>
	</form>
</div>

<!-- TODO add possibiliy to categorize augments into lists -->
