<script lang="ts">
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		multiple: true
	});

	export let items: [
		{
			id: String;
			text: String;
		}
	];
	export let tag: String;
</script>

<div {...$root}>
	{#each items as { id, text }}
		<div use:melt={$item(id)}>
			<h2 class="flex">
				<button use:melt={$trigger(id)}>
					{tag}
				</button>
			</h2>
			{#if $isSelected(id)}
				<div use:melt={$content(id)} transition:slide>
					<div class="px-5 py-4">
						{text}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
