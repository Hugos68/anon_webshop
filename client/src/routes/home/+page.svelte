<script lang="ts">
    export let data;
</script>

<main>
    <h1>
        Welcome, {#if data.session} {data.session.user.email} {:else} Guest {/if}
    </h1>
</main>

<style>

</style>