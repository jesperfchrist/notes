<script lang="ts">
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { ChevronsDown, ChevronsUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	const {
		elements: { root, content, trigger },
		states: { open }
	} = createCollapsible({
		defaultOpen: true
	});
</script>

<div use:melt={$root} class="pb-6">
	<div class="flex justify-around items-center">
		<h1>Create new augments</h1>
		<button use:melt={$trigger} class="btn">
			{#if $open}
				<ChevronsUp />
			{:else}
				<ChevronsDown />
			{/if}
		</button>
	</div>
</div>

{#if $open}
	<div use:melt={$content} transition:slide>
		<slot />
	</div>
{/if}