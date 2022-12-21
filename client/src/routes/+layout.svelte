<script lang="ts">
    import {onMount} from 'svelte';
    import {supabaseClient} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';
    import Header from "$lib/components/Header.svelte";

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

<Header />
<slot />

<style>
    :global(:root) {
        --nav-height: 7.5rem;
        --background-color: #121212;
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
        color: inherit;
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

    :global(input) {
        background-color: var(--background-color);
        color: var(--accent-color);
    }
</style>