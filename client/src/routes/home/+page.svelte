<script lang="ts">
    export let data;
</script>

<main>
    {#if data.session}
        <h1>Welcome, {data.session.user.email}</h1>
    {/if}
</main>

<style>

</style>