<script lang="ts">
	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { db, type Image } from '../database/db';
	import { liveQuery } from 'dexie';
	import { browser } from '$app/environment';

	let text = '';
	let files: FileList;
	let status = '';
	let images = liveQuery(() => (browser ? db.images.toArray() : []));

	$: fileBlob = files && files[0];
	$: previousUploaded = $images && $images[0];
	// $: imagesIds = $images ? [...$images.map((image) => image.id)] : [];

	async function addImage() {
		if (!text) {
			alert('Title required');
			return;
		}
		if (!files) {
			alert('No file selected');
			return;
		}
		try {
			const id = await db.images.add({
				name: text,
				image: fileBlob
			});

			status = `Successfully added. Got image ${id} with size: ${fileBlob?.size / 1000}kb`;
		} catch (error) {
			console.log(error);
			status = `Failed to add`;
		}
	}

	async function deleteAll() {
		try {
			await db.images.clear();

			status = `Successfully deleted ALL`;
		} catch (error) {
			status = `Failed to delete`;
		}
	}

	async function deleteSingle(id: number | undefined) {
		try {
			if (!id) {
				alert('does not seems right, how did you get here?');
				return;
			}
			await db.images.delete(id);
			status = `Successfully deleted ${id}`;
		} catch (error) {
			status = `Failed to delete`;
		}
	}
</script>

<h1>upload image</h1>
<p>
	Status: {status}
</p>

<fieldset>
	<legend>The form</legend>
	<input type="text" name="title" bind:value={text} placeholder="Give a title" />
	<input accept="image/*" type="file" name="image" bind:files />
	<button on:click={addImage}>Upload ↗️</button>
</fieldset>

<fieldset>
	<legend>Preview</legend>

	{#if files}
		{#each Array.from(files) as file}
			<div>
				<h2>{file.name}</h2>
				<img src={URL.createObjectURL(file)} width={100} height={100} alt={file.name} />
			</div>
		{/each}
	{/if}
</fieldset>

<fieldset>
	<legend>Stored</legend> <button on:click={deleteAll}>Delete all 🗑</button>

	{#if $images}
		{#each $images as image (image.id)}
			<li>
				Title: {image.name}
				<img src={URL.createObjectURL(image.image)} width={100} height={100} alt={image.name} />
				<button on:click={() => deleteSingle(image.id)}>❌</button>
			</li>
		{/each}
	{/if}
</fieldset>

<ul />
