<script lang="ts">
    import {fly} from "svelte/transition";
</script>

<main class="w-screen flex justify-start flex-col gap-[33vh]">
    <section class="" in:fly={{x: 200, duration: 1000}}>
        <h1 class="text-[clamp(3.75rem,15vw,12rem)]">Subjective.</h1>
        <p class="mt-6" in:fly={{x: 200, duration: 1500}}>Where minds <span class="underline cursor-auto">aren't</span> alike</p>
    </section>
    <section>
        <h2 class="text-center text-xl2">Check out our arrangement of clothing</h2>
    </section>
</main>




