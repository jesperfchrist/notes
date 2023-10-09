<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid place-items-center">
	<h1>Profile</h1>
	<p>User id: {data.userId}</p>
	<p>Username: {data.username}</p>

	<form method="post" action="?/logout" use:enhance>
		<button>Sign out</button>
	</form>

	<button>
		<a href="/notes">Your notes</a>
	</button>
</div>