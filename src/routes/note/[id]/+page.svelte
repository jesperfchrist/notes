<script lang="ts">
	export let data: PageData;

	import { Plus, Trash, Trash2 } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Action from '$lib/components/Action.svelte';
	import Collapsible from '$lib/components/Collapsible.svelte';
	import Note from '$lib/components/Note.svelte';
	import ListsForm from '$lib/components/ListsForm.svelte';
</script>

<div class="sm:w-2/3 mx-auto flex justify-between">
	<div>
    <Note id={data.note.id} text={data.note.text} tags={data.note.tags} list={data.note.list} />
		<!-- TODO:add GTD workflow for guidance on how to categorize your incompletes/stuff/notes/augments -->
		{#if data.note.list}
			{#if data.note.list === 'action'}
				<h3>Actions</h3>
				{#if data.actions}
					{#each data.actions as action}
						<Action 
                dueDate={action.dueDate} 
                description={action.description} 
                id={action.id}
              >
              <!-- CREATE STEP -->
							<form action="?/createStep" method="post" use:enhance>
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
							<div>
								{#if action.steps}
									<!-- STEPS -->
									{#each action.steps as s}
										<!-- STEP -->
										<div class="flex justify-around inline-block w-2/3">
                      <div>
  											<input type="checkbox" id={s.id} bind:checked={s.done} />
  											<span class={s.done ? 'line-through' : ''}>
											  	{s.achievementDescription}
											  </span>
                      </div>
											<!-- DELETE STEP -->
											<form action="?/deleteStep" method="post" use:enhance>
												<input type="hidden" name="step_id" value={s.id} />
												<input type="hidden" value={action.id} name="action_id" />
												<button type="submit" class="hover:bg-red-500">
													<Trash class="text-white h-4 w-4" />
												</button>
											</form>
										</div>
									{/each}
								{/if}
							</div>
						</Action>
					{/each}
				{/if}

				<!-- TODO:fixme bug on first action to add -->
				<Collapsible heading="add actions">
					<form action="?/createAction" method="post" class="container mx-2" use:enhance>
						<label for="description">Description</label> <br />
						<textarea name="description" id="description" placeholder="What is this about?" />
						<br />

						<!-- <label for="dueDate">Due Date</label> <br /> -->
						<!-- <input type="datetime" name="dueDate" id="dueDate" placeholder="dd:mm:yyyy-12:00" /> -->
						<!-- <br /> -->

						<label for="achievementDescription">First step</label>
						<br />
						<textarea
							name="achievementDescription"
							id="achievementDescription"
							placeholder="How will the completed task look like?"
						/>
            <br />
						<button type="submit" class="bg-slate-500">create action</button>
					</form>
				</Collapsible>
			{/if}
	  {:else}
      <ListsForm note_id={data.note.id} />
		{/if}
	</div>

	<form action="?/delete" method="post" use:enhance>
		<input type="hidden" name="id" value={data.note.id} />
		<button class="bg-red-500 hover:bg-red-700">
			<Trash2 />
		</button>
	</form>
</div>
