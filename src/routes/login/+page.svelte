<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<h1>Login</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<button class="px-4 py-2 rounded bg-slate-400">Rein da!</button>
</form>
<a href="/signup">Create an account</a>

{#if form?.message}
	<p class="text-red-700">
		{form.message}
	</p>
{/if}
