<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { Menu, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	const {
		elements: { menu, item, trigger, arrow },
		states: { open }
	} = createDropdownMenu();
</script>

<button use:melt={$trigger}>
	{#if !$open}
		<Menu />
	{:else}
		<X />
	{/if}
</button>
<div
	use:melt={$menu}
	class="bg-slate-500 p-2 text-white"
	transition:fly={{ duration: 1500, y: -10 }}
>
	<div use:melt={$item}>Item 1</div>
	<div use:melt={$item}>Item 2</div>
	<div use:melt={$item}>Item 3</div>
	<div use:melt={$arrow} />
</div>
