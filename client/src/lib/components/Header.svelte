<script>
    import {page} from "$app/stores";
</script>

<header>
    <label for="checkbox" class="hamburger">
        <svg width="32px" height="32px" viewBox="0 0 18 18" style="color: var(--accent-color)">
            <path fill="#494c4e" d="M17 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"/>
        </svg>
    </label>
    <input type="checkbox" id="checkbox">
    <nav>
        <div class="nav-left">
            <a href="/home">Home</a>
            <a href="/shop">Shop</a>
            <a href="/about">About</a>
        </div>
        <div class="nav-right">
            {#if $page.data.session}
                <a href="/account">Account</a>
            {:else}
                <a href="/signup">Sign up</a>
                <a href="/login">Log in</a>
            {/if}
        </div>
    </nav>

</header>



<style>
    header {
        padding-inline: 2rem;
        background-color: var(--background-color);
        box-shadow: 0 0 0.25rem 0.25rem;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        transition: transform 1s ease-in-out;
    }

    nav {
        min-height: var(--nav-height);
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    header > nav > div > a {
        padding: 0.5em;
        font-size: 1.5rem;
        color: var(--accent-color);
    }

    .hamburger {
        cursor: pointer;
        display: none;
        position: absolute;
        top: 2.75rem;
    }

    #checkbox {
        display: none;
    }

    @media (max-width: 800px) {
        header > nav > div > a {
            display: none;
        }
        .hamburger {
            display: block;
        }
        header > nav > a:nth-child(3) {
            margin-right: 0;
        }
        header > nav {
            gap: 5rem;
            justify-content: center;
            transition: all 0.2s ease;
        }
        #checkbox:checked ~ nav > div > a{
            display: block;
        }
    }
</style>