<script lang="ts">
	export let data;
	export let form;

	import { enhance } from '$app/forms';
	import Collapsible from '$lib/components/Collapsible.svelte';
	import { Trash2 } from 'lucide-svelte';
	import { createTagsInput, melt } from '@melt-ui/svelte';

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

<Collapsible>
	<div class="grid place-items-center">
		<form action="?/create" method="post" id="create" use:enhance>
			<label for="text" class="font-bold text-xl">Text</label> <br />
			<textarea name="text" id="text" cols="30" rows="10" />
			<br />
			<button class="my-2">Create new augment</button>
			<br />
		</form>
		<div use:melt={$root}>
			<input use:melt={$input} type="text" />
			{#each $tags as t, i}
				<div
					use:melt={$tag(t)}
					class="m-1 text-black inline-block flex items-center justify-between"
				>
					<span>{t.value}</span>
					<span use:melt={$deleteTrigger(t)}>
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
	{#each data.notes as note}
		<a href={"/note/" + note.id}>
			<div class="bg-blue-200 m-8 px-8 py-4 rounded shadow flex justify-between">
				<div>
					<p>
						{note.text}
					</p>
					<div class="my-2">
						{#each note.tags as t}
							<span class="text-sm mx-1 border rounded p-1 bg-slate-100">
								{t}
							</span>
						{/each}
					</div>
				</div>

				<!-- <form action="?/delete" method="post" use:enhance>
					<input type="hidden" name="id" value={note.id} />
					<button>
						<Trash2 />
					</button>
				</form> -->
			</div>
		</a>
	{/each}
</div>
