<script lang="ts">
    import {fly} from "svelte/transition";
    export let data;
    const images : string[] = [
        "slow-down-pose-2.png",
        "slow-down-pose.png",
        "butterfly-pose.png"
    ]
    let imagesIndex = 0;
    const previousImage = () => {
        if (imagesIndex-1 < 0) imagesIndex = images.length-1;
        else imagesIndex--;
    }
    const nextImage = () => {
        if (imagesIndex+1 > images.length-1) imagesIndex = 0;
        else imagesIndex++;
    }

</script>

<div in:fly={{x: 200, duration: 1000}}>
    <h1 class="text-accent text-9xl" >Subjective.</h1>
    <p class="text-accent mt-6" in:fly={{x: 200, duration: 1500}}>Where minds <span class="underline cursor-auto">aren't</span> alike</p>
    <a class="btn btn-primary mt-48" href="/shop">Checkout our product line</a>
</div>
<div class="flex items-center">
    <button class="btn btn-primary btn-circle" on:click={previousImage}>&lt</button>
    {#key imagesIndex}
        <img in:fly class="w-96" src="{images[imagesIndex]}" alt={images[imagesIndex]}>
    {/key}
    <button class="btn btn-primary btn-circle" on:click={nextImage}>&gt</button>
</div>


