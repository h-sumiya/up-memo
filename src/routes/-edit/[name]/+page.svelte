<script>
	import { browser } from '$app/environment';
	import { apiKey } from '$lib/store.js';
	import Markdown from "svelte-exmarkdown";
	import { gfmPlugin } from "svelte-exmarkdown/gfm";
	const plugins = [gfmPlugin()];

	export let data;
	let md = data.data;

	const save = async () => {
		const url = `/-edit/${data.name}`;
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"x-api-key": $apiKey,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data: md }),
		});
		if (res.ok) {
			location.href = `/-edit`;
		} else {
			alert("Failed to save");
		}
	};

	let area;
	const resize = (_) => {
		if (browser && area) {
			area.style.height = "calc(1em + 2px)";
			area.style.height = (area.scrollHeight + 100) + "px";
		}
	};
	$: resize(md);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
	<div class="left">
		<textarea bind:value={md} bind:this={area}></textarea>
	</div>
	<div class="right">
		<Markdown {md} {plugins} />
	</div>
</div>

<div class="save">
	<button on:click={save}>Save</button>
</div>

<style>
	.container {
		width: 100%;
		padding: 20px;
	}

	.right {
		width: 48%;
		float: right;
	}

	.left {
		width: 48%;
		float: left;
		padding: 10px;
		background-color: black;
	}

	textarea {
		width: 100%;
		resize: none;
		color: white;
		background-color: transparent;
		border: none;
		height: calc(1em + 102px);
	}

	textarea:focus {
		outline: none;
	}

	.save {
		position: fixed;
		bottom: 100px;
		right: 100px;
		width: 50px;
		height: 50px;
		background-color: black;
		border: none;
		border-radius: 50%;
	}

	button {
		width: 100%;
		height: 100%;
		background-color: transparent;
		color: white;
		border: none;
	}

	button:focus {
		outline: none;
	}
</style>
