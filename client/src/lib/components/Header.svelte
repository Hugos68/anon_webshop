<script>
    import {page} from "$app/stores";
</script>

<nav>
    <a href="/home">Home</a>
    <a href="/shop">Shop</a>
    <a href="/about">About</a>
    {#if $page.data.session}
        <a href="/account">Account</a>
    {:else}
        <a href="/signup">Sign up</a>
        <a href="/login">Log in</a>
    {/if}
</nav>

<style>

    nav {
        height: var(--nav-height);
        padding-inline: 2rem;
        background-color: var(--background-color);
        box-shadow: 0 0 0.25rem 0.25rem;

        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    nav>a {
        padding: 0.5em;
        font-size: 1.5rem;
        color: var(--accent-color);
    }

    nav>a:nth-child(3) {
        margin-right: auto;
    }
</style>