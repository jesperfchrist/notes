<script lang="ts">
	export let data: PageData;

	import type { PageData } from './$types';
	import { Plus, Trash, Trash2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import Action from '$lib/components/Action.svelte';
	import Collapsible from '$lib/components/Collapsible.svelte';
</script>

<div class="sm:w-2/3 mx-auto flex justify-between">
	<div>
		<p>
			{data.note.text}
		</p>

		<div class="my-4">
			{#each data.note.tags as t}
				<span class="rounded m-1 px-2 py-1 bg-slate-600">
					{t}
				</span>
			{/each}
		</div>

		<!-- TODO add GTD workflow for guidance on how to categorize your incompletes/stuff/notes/augments -->
		{#if data.note.list}
			{#if data.note.list === 'action'}
				<h3>Actions</h3>
				{#if data.actions}
					{#each data.actions as action}
						<Action dueDate={action.dueDate} description={action.description} id={action.id}>
							<div>
								{#if action.steps}
									{#each action.steps as s}
										<div class="flex justify-around inline-block w-2/3">
											<input type="checkbox" id={s.id} bind:checked={s.done} />
											<span class={s.done ? 'line-through' : ''}>
												{s.achievementDescription}
											</span>
											<form action="?/deleteStep" method="post">
												<input type="hidden" name="id" value={s.id} />
												<button type="submit">
													<Trash class="text-white h-4 w-4" />
												</button>
											</form>
										</div>
									{/each}
								{/if}
								<form action="?/createStep" method="post">
									<div class="flex bg-slate-300 rounded">
										<input
											type="text"
											class="bg-slate-300"
											name="step"
											placeholder="add new step..."
										/>
										<input type="hidden" value={action.id} name="id" />
										<button type="submit">
											<Plus class="text-white h-4 w-4" />
										</button>
									</div>
								</form>
								<form action="?/deleteAction" method="post">
									<input type="hidden" value={action.id} />
									<button type="button" class="bg-red-500 hover:bg-red-700">
										<Trash class="w-4 h-4" />
									</button>
								</form>
							</div>
						</Action>
					{/each}
				{/if}
				<Collapsible heading="add actions">
					<form action="?/createAction" method="post" class="container mx-2" use:enhance>
						<label for="description">description</label> <br />
						<textarea name="description" id="description" placeholder="What is this about?" />
						<br />

						<label for="dueDate">Due Date</label> <br />
						<input type="datetime" name="dueDate" id="dueDate" placeholder="dd:mm:yyyy-12:00" />
						<br />

						<label for="achievementDescription">achievement Description</label>
						<br />
						<textarea
							name="achievementDescription"
							id="achievementDescription"
							placeholder="How will the completed task look like?"
						/> <br />

						<button type="submit" class="bg-slate-500">create action</button>
					</form>
				</Collapsible>
			{/if}
		{:else}
			<form action="?/addToList" method="post" use:enhance>
				<input type="hidden" name="id" value={data.note.id} />
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
		{/if}
	</div>

	<form action="?/delete" method="post" use:enhance>
		<input type="hidden" name="id" value={data.note.id} />
		<button class="bg-red-500 hover:bg-red-700">
			<Trash2 />
		</button>
	</form>
</div>
