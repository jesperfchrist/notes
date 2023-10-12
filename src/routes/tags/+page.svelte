<script lang="ts">
	import Note from '$lib/components/Note.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let tags: string[] = [];

	data.notes.forEach((note: { text: string; tags: string[]; id: string }) => {
		note.tags.forEach((tag) => {
			if (!tags.includes(tag)) {
				tags.push(tag);
			}
		});
	});

	console.table(tags);
</script>

<div class="w-2/3 mx-auto">
	{#each tags as tag}
		<h1>
			{tag}
		</h1>

		{#each data.notes.filter((note) => note.tags.includes(tag)) as { text, tags, id }}
			<Note {text} {tags} {id} />
		{/each}
	{/each}
</div>
