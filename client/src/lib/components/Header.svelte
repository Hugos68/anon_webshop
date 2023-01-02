<script lang="ts">
    import {page} from "$app/stores";
    import {cart} from "$lib/stores/cart.ts";
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
            <a class="underline-animation" href="/home" class:active={$page.url.pathname === '/home'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>Home</a>
            <a class="underline-animation" href="/shop" class:active={$page.url.pathname === '/shop'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>Shop</a>
            <a class="underline-animation" href="/about" class:active={$page.url.pathname === '/about'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>About</a>
        </nav>
    </div>
    <nav>
        <div class="nav-left">
            <a class="underline-animation" href="/home" class:active={$page.url.pathname === '/home'}>Home</a>
            <a class="underline-animation" href="/shop" class:active={$page.url.pathname === '/shop'}>Shop</a>
            <a class="underline-animation" href="/about" class:active={$page.url.pathname === '/about'}>About</a>
        </div>
        <div class="nav-right">
            {#if $page.data.session}
                <a class="underline-animation" href="/account" class:active={$page.url.pathname === '/account'}>Account</a>
                <a class="cart" href="/cart">
                    <svg width="32" height="32" viewBox="0 0 476.944 476.944" fill="var(--accent-color)">
                        <g><path d="M84.176,379.875c-26.762,0-48.535,21.772-48.535,48.534s21.772,48.534,48.535,48.534c26.762,0,48.534-21.772,48.534-48.534                           S110.938,379.875,84.176,379.875z M84.176,446.944c-10.22,0-18.535-8.314-18.535-18.534s8.314-18.534,18.535-18.534                           c10.22,0,18.534,8.314,18.534,18.534S94.396,446.944,84.176,446.944z"/><path d="M342.707,379.875c-26.762,0-48.534,21.772-48.534,48.534s21.772,48.534,48.534,48.534                           c26.762,0,48.535-21.772,48.535-48.534S369.469,379.875,342.707,379.875z M342.707,446.944c-10.22,0-18.534-8.314-18.534-18.534                           s8.314-18.534,18.534-18.534c10.22,0,18.535,8.314,18.535,18.534S352.927,446.944,342.707,446.944z"/><path d="M413.322,0l-9.835,60H1.999l28.736,175.88c4.044,24.67,26.794,43.995,51.794,43.995h284.917l-6.557,40H50.642v30h335.73                           L438.804,30h36.141V0H413.322z M372.363,249.875H82.529c-10.174,0-20.543-8.808-22.188-18.841L37.298,90h361.271L372.363,249.875z"/></g>
                    </svg>
                    {#if $cart.length > 0}
                        {#key $cart}
                            <div>
                                <p>{cart.quantity()}</p>
                            </div>
                        {/key}
                    {/if}
                </a>
            {:else}
                <a class="underline-animation" href="/signup" class:active={$page.url.pathname === '/signup'}>Sign up</a>
                <a class="underline-animation" href="/login" class:active={$page.url.pathname === '/login'}>Log in</a>
            {/if}
        </div>
    </nav>
</header>



<style>
    header {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 997;
        padding-inline: 2rem;
        background-color: var(--background-color);
        box-shadow: 0 0 0.25rem 0.25rem;
        display: flex;
        align-items: center;
    }

    svg {
        margin: 0;
        padding: 0;
    }

    header > nav {
        min-width: calc(100vw - 4rem);
        min-height: var(--nav-height);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    header > nav > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a {
        padding-inline: 0.5em;
        font-size: 1.5rem;
        color: var(--darker-accent-color);
    }

    a.active {
        color: var(--accent-color);
    }

    .underline-animation::after {
        content: '';
        width: inherit;
        width: 0;
        display: block;
        height: 2px;
        background-color: var(--accent-color);
        transition: width 0.25s ease-out;
        margin-inline: auto;
    }
    .underline-animation:hover::after {
        width: 100%;
    }
    .cart {
        position: relative;
    }

    .cart > div {
        position: absolute;
        background-color: var(--darker-accent-color);
        display: flex;
        justify-content: center;
        align-content: center;
        border-radius: 25rem;
        width: 22px;
        height: 22px;
        top: 20px;
        left: 2px;
    }
    .cart > div > p {
        color: var(--background-color);
        margin: 0;
        padding-inline: 0.25rem;
        font-size: 1rem;
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
        padding-inline: 2rem;
        padding-block: 0.5rem;
        width: min-content;
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