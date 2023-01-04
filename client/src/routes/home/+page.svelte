<script lang="ts">
    import {fly} from "svelte/transition";
    import {onMount} from "svelte";
    const showCaseImages : string[] = [
        "butterfly-pose.png",
        "slow-down-pose.png",
        "slow-down-pose-2.png"
    ];
    let showcaseImageIndex = 0;
    const previousImage = () => {
        if (showcaseImageIndex-1 < 0) showcaseImageIndex = showCaseImages.length-1;
        else showcaseImageIndex--;
    }
    const nextImage = () => {
        if (showcaseImageIndex+1 > showCaseImages.length-1) showcaseImageIndex = 0;
        else showcaseImageIndex++;
    }
    onMount(() => {
        setInterval(() => {
            nextImage()
        }, 5000);
    })
</script>

<main class="flex justify-evenly xl:items-center xl:flex-col ">
    <div in:fly={{x: 200, duration: 1000}}>
        <h1 class="text-[10vw]">Subjective.</h1>
        <p class="mt-6" in:fly={{x: 200, duration: 1500}}>Where minds <span class="underline cursor-auto">aren't</span> alike</p>
        <a href="/shop" class="btn btn-primary mt-20 xl:hidden">Start shopping</a>
    </div>
    <div class="flex flex-row-reverse items-end" in:fly={{y: 100, delay: 250, duration: 1000}} >
        {#key showcaseImageIndex}
            <figure in:fly={{y:100, duration:500}} class="px-10 min-w-[25rem] w-[33vw] pt-10">
                <img class="rounded-xl" src="{showCaseImages[showcaseImageIndex]}" alt="{showCaseImages[showcaseImageIndex]}" />
            </figure>
        {/key}
        <a href="/shop" class="btn btn-primary mt-20 hidden xl:visible">Start shopping</a>
    </div>
</main>




