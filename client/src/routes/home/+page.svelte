<script lang="ts">
    import {fly} from "svelte/transition";
    export let data;
</script>

<main>
    <div in:fly={{x: 200, duration: 1000}}>
        <h1>Subjective.</h1>
        <p in:fly={{x: 200, duration: 1500}}>Where minds <span>aren't</span> alike</p>
    </div>
    <div>
        <img>
    </div>
</main>

<style>
    h1 {
        font-size: 6rem;
        text-align: left;
    }
</style>