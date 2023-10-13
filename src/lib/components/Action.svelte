<script lang="ts">
	export let dueDate: Date;
	export let description: string;
	export let id: string;
</script>

<div class="flex border rounded bg-white border-white px-2 py-1 mx-1 my-2 justify-between gap-16">
	<div>
		<p>
			{description}
		</p>
	</div>
</div>

<slot><!-- optional fallback --></slot>
