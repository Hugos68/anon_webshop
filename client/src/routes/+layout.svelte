<script lang="ts">
    import {onMount} from 'svelte';
    import {supabaseClient} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';
    import Header from "$lib/components/Header.svelte";
    import {Toaster} from "svelte-french-toast";
    import '../app.css';

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
<main class="flex justify-center mb-5 mt-20">
    <slot />
</main>
