<script lang="ts">
  import { Trash } from "lucide-svelte";
  import { enhance } from "$app/forms";
  
	export let dueDate: Date;
	export let description: string;
  export let id: string;
</script>

<div class="flex rounded bg-slate-400 border-white px-2 py-1 mx-1 my-2 justify-between gap-16">
	<div>
		<p>
			{description}
		</p>
	</div>
	<!-- DELETE ACTION -->
		<form action="?/deleteAction" method="post" use:enhance>
			<input type="hidden" value={id} name="id" />
			<button type="submit" class="bg-red-500 hover:bg-red-700">
				<Trash class="w-4 h-4" />
			</button>
		</form>
</div>

<slot><!-- optional fallback --></slot>
