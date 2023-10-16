<script lang="ts">
	import Note from '$lib/components/Note.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const lists = ['action', 'calendar', 'project', 'waiting'];
</script>

{#each lists as list}
	<h1>{list}</h1>
	{#each data.notes.filter((note) => note.list === list) as { text, tags, id }}
		<Note {text} {tags} {id} {list} />
	{/each}
{/each}
