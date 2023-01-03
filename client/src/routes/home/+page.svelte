<script lang="ts">
    import {fly} from "svelte/transition";
    export let data;
</script>

<main class="flex justify-center mb-5 mt-20">
    <div in:fly={{x: 200, duration: 1000}}>
        <h1 class="text-black dark:text-slate-300 text-9xl" >Subjective.</h1>
        <p class="text-slate-300 mt-2" in:fly={{x: 200, duration: 1500}}>Where minds <span class="underline" >aren't</span> alike</p>
    </div>
    <img class="max-w-2xl" in:fly={{y: 100, duration: 1250}} src="slow-down-pose-2.png" alt="slow_down_pose">
</main>