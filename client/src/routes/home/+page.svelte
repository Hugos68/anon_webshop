<script lang="ts">
    import {fly} from "svelte/transition";
    export let data;
</script>

<main>
    <div in:fly={{x: 200, duration: 1000}}>
        <h1>Subjective.</h1>
        <p in:fly={{x: 200, duration: 1500}}>Where minds <span>aren't</span> alike</p>
    </div>
    <img in:fly={{y: 100, duration: 1250}} src="slow-down-pose-2.png" alt="slow_down_pose">
</main>

<style>
    main {
        display: flex;
    }
    h1 {
        font-size: 6rem;
        text-align: left;
    }
    img {
        max-width: 35vw;
        margin-left: auto;
    }
</style>