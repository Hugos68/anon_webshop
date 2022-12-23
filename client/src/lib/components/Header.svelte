<script>
    import {page} from "$app/stores";
</script>

<header>
    <input type="checkbox" id="hamburger-checkbox">
    <label for="hamburger-checkbox" class="hamburger-icon">
        <svg class="hamburger" width="32px" height="32px" viewBox="0 0 18 18" fill="currentColor">
            <path d="M17 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"/>
        </svg>
        <svg class="cross" width="32px" height="32px" viewBox="0 0 16 16"  fill="currentColor">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
        </svg>
    </label>

    <div class="hamburger-menu">
        <nav>
            <a href="/home" class:active={$page.url.pathname === '/home'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>Home</a>
            <a href="/shop" class:active={$page.url.pathname === '/shop'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>Shop</a>
            <a href="/about" class:active={$page.url.pathname === '/about'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>About</a>
        </nav>
    </div>
    <nav>
        <div class="nav-left">
            <a href="/home" class:active={$page.url.pathname === '/home'}>Home</a>
            <a href="/shop" class:active={$page.url.pathname === '/shop'}>Shop</a>
            <a href="/about" class:active={$page.url.pathname === '/about'}>About</a>
        </div>
        <div class="nav-right">
            {#if $page.data.session}
                <a href="/account" class:active={$page.url.pathname === '/account'}>Account</a>
            {:else}
                <a href="/signup" class:active={$page.url.pathname === '/signup'}>Sign up</a>
                <a href="/login" class:active={$page.url.pathname === '/login'}>Log in</a>
            {/if}
        </div>
    </nav>
</header>



<style>
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 997;
        padding-inline: 2rem;
        background-color: var(--background-color);
        box-shadow: 0 0 0.25rem 0.25rem;
        display: flex;
        align-items: center;
    }

    header > nav {
        min-width: calc(100vw - 4rem);
        min-height: var(--nav-height);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    a {
        padding-inline: 0.5em;
        font-size: 1.5rem;
        color: var(--darker-accent-color);
    }

    a.active {
        color: var(--accent-color);
    }

    #hamburger-checkbox {
        z-index: 999;
        display: none;
    }

    .hamburger-icon {
        z-index: 999;
        cursor: pointer;
        display: none;
        color: var(--accent-color);
    }

    .hamburger, .cross {
        top: calc(var(--nav-height)/8 * 2.75);
        position: absolute;
        transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
    }

    .hamburger-menu {
        z-index: 998;
        position: absolute;
        top: 0;
        left: 0;
        width: 20em;
        max-width: 75vw;
        height: 100vh;
        background-color: var(--background-color);
        transform: translateX(-100%);
        transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
    }

    .hamburger-menu > nav {
        display: flex;
        flex-direction: column;
        margin-top: var(--nav-height);
    }

    .hamburger-menu > nav > a {
        font-size: 2rem;
        padding-inline: 2rem;
        padding-block: 0.5rem;
    }

    @media (max-width: 800px) {
        header > nav > .nav-left {
            display: none;
        }
        header > nav {
            justify-content: flex-end;
        }
        .hamburger-icon {
            display: block;
        }
        #hamburger-checkbox:checked ~ .hamburger-menu {
            transform: translateX(0%);
            box-shadow: 0 0 1rem 0.25rem;
        }
        #hamburger-checkbox:checked ~ .hamburger-icon > .hamburger {
            opacity: 0;
            transform: rotate(360deg);
        }
        #hamburger-checkbox:not(:checked) ~ .hamburger-icon > .cross {
            opacity: 0;
            transform: rotate(-360deg);
        }
    }
    @media (max-width: 400px) {
        header > nav > .nav-right {
            display: flex;
            flex-direction: column-reverse;
            align-items: flex-end;
        }
    }
</style>