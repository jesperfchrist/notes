<script>
	export let data;

	console.log(data);
</script>

<form action="?/create" method="post" class="">
	<label for="text">Text</label> <br />
	<textarea name="text" id="text" cols="30" rows="10" />

	<button>Create new augment</button>
</form>

{#each data.notes as note}
	<p class="bg-blue-200 m-8 px-8 py-4 rounded shadow">
		{note.text}
	</p>
{/each}
