<script>
    import { apiKey } from "$lib/store.js";

    export let data;

    async function del(name) {
        const url = `-edit/${name}`;
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "x-api-key": $apiKey,
            },
        });
        if (res.ok) {
            data.results = data.results.filter((item) => item.name !== name);
        } else {
            alert("Failed to delete");
        }
    }

    async function newPage(name) {
        if (!name) {
            return;
        }
        location.href = `/-edit/${name}`;
    }

    let name = "";
</script>

<svelte:head>
    <title>Edit</title>
</svelte:head>

<div class="ma"></div>
<span class="name">APIKEY</span><input type="text" bind:value={$apiKey} />
<br />
<span class="name">New</span><input type="text" bind:value={name} /><button
    on:click={() => newPage(name)}>Create</button
>

<div class="items">
    <ul>
        {#each data.results as item}
            <li>
                <div class="item">
                    <a href={`/-edit/${item.name}`}>{item.name}</a>
                    <button on:click={() => del(item.name)}>Delete</button>
                </div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .ma {
        margin: 20px;
    }

    span.name {
        margin: 0 40px 0 40px;
    }

    button {
        margin: 0 20px;
    }

    .items {
        padding: 40px;
    }
</style>
