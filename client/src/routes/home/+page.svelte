<script lang="ts">
    import {fly} from "svelte/transition";
</script>


<section class="mr-auto" in:fly={{x: 200, duration: 1000}}>
    <h1 class="text-[clamp(3.75rem,15vw,12rem)]">Subjective.</h1>
    <p class="mt-6" in:fly={{x: 200, duration: 1500}}>Where minds <span class="underline cursor-auto">aren't</span> alike</p>
</section>





