<script>
    import { page } from '$app/stores';
</script>

<main>
    <h1>{$page.status}: {$page.error.message}</h1>
</main>


<style>
    main {
        margin-top: 12.5vh;
    }
    h1 {
        text-align: center;
    }
</style>