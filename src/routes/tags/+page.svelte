<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let tags: string[] = [];
	
	data.notes.forEach((
		note: {
			text: string,
			tags: string[],
			id: string
		}) => {
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

		{#each data.notes.filter(note => note.tags.includes(tag)) as note}
			<a href={'/note/' + note.id}>
				<div class="bg-blue-200 m-8 px-8 py-4 rounded shadow flex justify-between">
						<p>
							{note.text}
						</p>
				</div>
			</a>
		{/each}
	{/each}
</div>