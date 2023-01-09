<script>
    import { page } from '$app/stores';
</script>

<main class="flex flex-col items-end">
    <h1 class="font-semibold text-8xl">{$page.status}</h1>
    <p>Error: {$page.error ? $page.error.message : "Oops, something went wrong..."}</p>
</main>
