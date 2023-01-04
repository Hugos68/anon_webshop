<script lang="ts">
    import {fly} from "svelte/transition";
    export let data;
</script>

<div in:fly={{x: 200, duration: 1000}}>
    <h1 class="text-accent text-9xl" >Subjective.</h1>
    <p class="text-accent mt-6" in:fly={{x: 200, duration: 1500}}>Where minds <span class="underline cursor-auto">aren't</span> alike</p>
    <a class="btn btn-primary mt-20" href="/shop">Checkout our product line</a>
</div>
<img class="max-w-2xl" in:fly={{y: 100, duration: 1250}} src="slow-down-pose-2.png" alt="slow_down_pose">
