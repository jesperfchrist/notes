<script lang="ts">
	export let data;
	export let form;

	import { enhance } from '$app/forms';
	import Collapsible from '$lib/components/Collapsible.svelte';
	import { Trash2 } from 'lucide-svelte';
	import { createTagsInput, melt } from '@melt-ui/svelte';
	import Note from '$lib/components/Note.svelte';

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		placeholder: 'add tags...',
		unique: true,
		defaultTags: ['personal']
	});
</script>

<svelte:head>
	<title>Your augments</title>
</svelte:head>

{#if form?.description}
	<p class="text-red-500">
		{form.description}
	</p>
{/if}

<Collapsible heading="Create augment">
	<div class="flex justify-center space-x-4 flex-col sm:flex-row">
		<!-- TEXT INPUT -->
		<form action="?/create" method="post" id="create" use:enhance>
			<label for="text" class="font-bold text-xl">Text</label> <br />
			<textarea name="text" id="text" cols="30" rows="10" class="my-1" />
			<br />
			<button class="my-2">Create new augment</button>
			<br />
		</form>
		<!-- TAGS INPUT -->
		<div use:melt={$root}>
			<label class="font-bold text-xl">Tags</label> <br />
			<input use:melt={$input} type="text" class="my-1" />
			{#each $tags as t, i}
				<div
					use:melt={$tag(t)}
					class="m-1 text-black inline-block flex items-center justify-between"
				>
					<span>{t.value}</span>
					<span use:melt={$deleteTrigger(t)} class="text-red-500 hover:text-red-600">
						<Trash2 />
					</span>
				</div>
				<div use:melt={$edit(t)}>{t.value}</div>
				<input form="create" type="hidden" name={'tag' + i} value={t.value} />
			{/each}
			<input form="create" type="hidden" name="tag-count" value={$tags.length} />
		</div>
	</div>
</Collapsible>

<div class="sm:w-2/3 mx-auto">
	<!-- NOTES CONTAINER -->
	{#each data.notes as { text, tags, list, id }}
		<Note {text} {tags} {id} {list} />
	{/each}
</div>
