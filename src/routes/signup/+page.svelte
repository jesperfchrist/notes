<script>
	import { enhance } from '$app/forms';
</script>

<h1>Sign up!</h1>

<form method="post" use:enhance>
	<label for="Username">Username</label>
	<input type="text" name="username" /> <br />

	<label for="password">Password</label>
	<input type="password" name="password" id="password" /> <br />

	<button class="px-4 py-2 rounded bg-slate-400">Rein da!</button>
</form>
