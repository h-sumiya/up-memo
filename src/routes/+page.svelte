<script>
	export let data;
</script>

<svelte:head>
	<title>UPメモ</title>
</svelte:head>

<div class="items">
	<ul>
		{#each data.results as item}
			<li>
				<a href={`/${item.name}`}>{item.name}</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.items {
		padding: 40px;
	}
</style>
