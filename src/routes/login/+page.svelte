<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<h1>Login</h1>
<form method="post" use:enhance>
	<div class="mx-auto">
		<label for="username">Username</label>
		<input name="username" id="username" />
	</div>

	<div>
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
	</div>

	<button>Rein da!</button>
</form>
<a href="/signup">Create an account</a>

{#if form?.message}
	<p class="text-red-700">
		{form.message}
	</p>
{/if}
