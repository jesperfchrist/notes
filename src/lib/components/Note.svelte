<script lang="ts">
	export let text: string;
	export let tags: string[];
	export let id: string;
</script>

<!-- TODO figure out how to implement this with actions/forms working -->

<a href={'/note/' + id}>
	<div class="bg-green-900 text-white m-8 px-8 py-4 rounded shadow flex justify-between">
		<div>
			<p>
				{text}
			</p>
			<div class="my-2">
				{#each tags as t}
					<span class="text-sm mx-1 rounded p-1 bg-green-500 text-black">
						{t}
					</span>
				{/each}
			</div>
		</div>
	</div>
</a>
