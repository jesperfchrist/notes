<script lang="ts">
	export let text: string;
	export let tags: string[];
	export let id: string;
</script>

<!-- TODO figure out how to implement this with actions/forms working -->

<a href={'/note/' + id}>
	<div class="bg-blue-200 m-8 px-8 py-4 rounded shadow flex justify-between">
		<div>
			<p>
				{text}
			</p>
			<div class="my-2">
				{#each tags as t}
					<span class="text-sm mx-1 border rounded p-1 bg-slate-100">
						{t}
					</span>
				{/each}
			</div>
		</div>
	</div>
</a>
