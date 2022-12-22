<script lang="ts">
    import {onMount} from 'svelte';
    import {supabaseClient} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';
    import Header from "$lib/components/Header.svelte";
    import {Toaster} from "svelte-french-toast";

    onMount(() => {
        const {
            data: {subscription}
        } = supabaseClient.auth.onAuthStateChange(() => {
            invalidateAll();
        });
        return () => {
            subscription.unsubscribe();
        }
    });
</script>

<Toaster />
<Header />
<slot />

<style>
    :global(:root) {
        --nav-height: 7.5rem;
        --background-color: #121212;
        --lighter-background-color: #191919;
        --accent-color: #dadada
    }

    @font-face {
        font-family: poppins;
        src: url(Poppins-Regular.ttf);
        font-weight: bold;
        font-style: normal;
    }

    :global(a) {
        text-decoration: none;
    }
    :global(h1, h2, h3, h4, h5, a, p) {
        color: var(--accent-color);
    }

    :global(body) {
        min-height: 100vh;
        margin: 0;
        background-color: var(--background-color);
        font-family: poppins, serif;
    }

    :global(label) {
        color: var(--accent-color);
    }

    :global(input, button) {
        border: var(--accent-color) solid 2px;
        background-color: rgba(0,0,0,0);
        color: var(--accent-color);
        padding: 0.5rem;
        min-width: 12.5rem;
        transition: border-radius 0.25s ease-in-out;
        border-radius: 0.25rem;
    }
    :global(input:focus) {
        outline:none;
        border-radius: 0.75rem;
    }
    :global(button:hover) {
        cursor: pointer;
    }

    /*
     * Disables the yellow background on autofill
     */
    :global(input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active) {
        -webkit-box-shadow: 0 0 0 30px var(--background-color) inset;
    }
</style>