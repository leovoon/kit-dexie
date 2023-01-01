<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';
	import { assets } from '$app/paths';
	let files: FileList | null = null;

	export let form: ActionData;
	$: console.log(assets);
</script>

<form method="post" enctype="multipart/form-data" use:enhance>
	<input type="file" bind:files name="file" />
	<button type="submit">go</button>
</form>

{#if form?.success}
	<a href="{assets}/{form?.filename}" download>Download </a>
{/if}
