<script>
    import Markdown from "svelte-exmarkdown";
    import { gfmPlugin } from "svelte-exmarkdown/gfm";
    const plugins = [gfmPlugin()];

    export let data;
    let md = data.data;
    let name = data.name;
    console.log(JSON.stringify(data));
</script>

<svelte:head>
    <title>{name}</title>
</svelte:head>

<div class="container">
    <Markdown {md} {plugins} />
</div>

<style>
    .container {
        width: 100%;
        padding: 20px;
    }
</style>
