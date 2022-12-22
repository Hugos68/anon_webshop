<script lang="ts">
    export let data;
</script>

<main>
    <h1>
        Welcome, {#if data.session} {data.session.user.email} {:else} Guest {/if}
    </h1>
</main>

<style>
    main {
        margin-top: 12.5vh;
    }
    h1 {
        text-align: center;
    }
</style>