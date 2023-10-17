<script lang="ts">
  import { enhance } from "$app/forms";

  export let note_id: string;
</script>

<!-- TODO:refactor this to reflect GTD workflow for categorization-->

<form action="?/addToList" method="post" use:enhance>
	<input type="hidden" name="id" value={note_id} />
	<input type="radio" name="list" id="action" value="action" />
	<label for="action">action</label>
	<br />
	<input type="radio" name="list" id="project" value="project" />
	<label for="project">project</label>
	<br />
	<input type="radio" name="list" id="calendar" value="calendar" />
	<label for="calendar">calendar</label>
	<br />
	<input type="radio" name="list" id="waiting" value="waiting" />
	<label for="waiting">waiting</label>
	<br />
	<button type="submit" class="bg-blue-500 hover:bg-blue-700">add to list</button>
</form>

