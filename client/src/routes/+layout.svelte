<script lang="ts">
    import {onMount} from 'svelte';
    import {supabaseClient} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';
    import {page} from "$app/stores";
    import {cart} from "$lib/stores/cart.ts";
    import {Toaster} from "svelte-french-toast";
    import '../app.css';
    import {enhance} from "$app/forms";
    import {fly} from "svelte/transition"

    import type {SubmitFunction} from  "$app/forms";

    let theme = $page.data.theme;
    const toggleTheme = () => {
        if (theme==="dark") theme="light";
        else theme="dark";
    }
    const submitUpdateTheme: SubmitFunction = ({action}) => {
        const theme = action.searchParams.get('theme');
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

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
    let pageTitle;
    $: {
        const pageRoute:string = $page.route.id || "";
        const pageRouteWithoutSlash = pageRoute.replace("/", "");
        pageTitle = pageRouteWithoutSlash.charAt(0).toUpperCase() + pageRouteWithoutSlash.substring(1)+" - Subjective";
    }

</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<Toaster />
<div class="drawer">
    <input id="navbar-toggle" type="checkbox" class="drawer-toggle" />
    {#key $page.route.id}
        <div class="drawer-content">
    <!--        HEADER-->
            <header class="w-full navbar bg-primary px-[5vw] top-0 z-[999] sticky">
                <nav class="flex justify-between w-full">
                    <div class="flex-none min-lg:hidden">
                        <label for="navbar-toggle" class="btn btn-square btn-ghost text-accent">
                            <svg viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div class="flex gap-5 lg:hidden">
                        <a data-sveltekit-preload-data="hover" class="underline-animation"  href="/home" class:active={$page.url.pathname === '/home'}>Home</a>
                        <a data-sveltekit-preload-data="hover" class="underline-animation"  href="/shop" class:active={$page.url.pathname === '/shop'}>Shop</a>
                        <a data-sveltekit-preload-data="hover" class="underline-animation"  href="/about" class:active={$page.url.pathname === '/about'}>About</a>
                    </div>
                    <div class="flex gap-5">
                        {#if $page.data.session}
                            <a data-sveltekit-preload-data="hover" class="relative btn btn-circle btn-ghost text-accent" href="/cart">
                                <svg class="w-6 h-6" viewBox="0 0 476.944 476.944" fill="currentColor"><g><path d="M84.176,379.875c-26.762,0-48.535,21.772-48.535,48.534s21.772,48.534,48.535,48.534c26.762,0,48.534-21.772,48.534-48.534                           S110.938,379.875,84.176,379.875z M84.176,446.944c-10.22,0-18.535-8.314-18.535-18.534s8.314-18.534,18.535-18.534                           c10.22,0,18.534,8.314,18.534,18.534S94.396,446.944,84.176,446.944z"/><path d="M342.707,379.875c-26.762,0-48.534,21.772-48.534,48.534s21.772,48.534,48.534,48.534                           c26.762,0,48.535-21.772,48.535-48.534S369.469,379.875,342.707,379.875z M342.707,446.944c-10.22,0-18.534-8.314-18.534-18.534                           s8.314-18.534,18.534-18.534c10.22,0,18.535,8.314,18.535,18.534S352.927,446.944,342.707,446.944z"/><path d="M413.322,0l-9.835,60H1.999l28.736,175.88c4.044,24.67,26.794,43.995,51.794,43.995h284.917l-6.557,40H50.642v30h335.73                           L438.804,30h36.141V0H413.322z M372.363,249.875H82.529c-10.174,0-20.543-8.808-22.188-18.841L37.298,90h361.271L372.363,249.875z"/></g></svg>
                                {#if $cart.length > 0}
                                    {#key $cart}
                                        <div class="absolute bg-accent flex justify-center items-center rounded-full h-5 top-6 right-6">
                                            <p class="text-secondary px-2">{cart.quantity()}</p>
                                        </div>
                                    {/key}
                                {/if}
                            </a>
                            <div class="dropdown dropdown-end">
                                <label tabindex="0" class="btn btn-circle btn-ghost text-accent">
                                    <svg class="w-6 h-6" viewBox="0 0 30.586 30.586" fill="currentColor"><g transform="translate(-546.269 -195.397)"><path d="M572.138,221.245a15.738,15.738,0,0,0-21.065-.253l-1.322-1.5a17.738,17.738,0,0,1,23.741.28Z"/><path d="M561.464,204.152a4.96,4.96,0,1,1-4.96,4.96,4.966,4.966,0,0,1,4.96-4.96m0-2a6.96,6.96,0,1,0,6.96,6.96,6.96,6.96,0,0,0-6.96-6.96Z"/><path d="M561.562,197.4a13.293,13.293,0,1,1-13.293,13.293A13.308,13.308,0,0,1,561.562,197.4m0-2a15.293,15.293,0,1,0,15.293,15.293A15.293,15.293,0,0,0,561.562,195.4Z"/></g></svg>
                                </label>
                                <ul tabindex="0" class="dropdown-content gap-2 menu p-2 text-lg w-36 rounded-box bg-secondary text-accent">
                                    <li>
                                        <a data-sveltekit-preload-data="hover" class="btn btn-primary text-transform capitalize font-semibold " href="/account" class:active={$page.url.pathname === '/account'}>My Account</a>
                                    </li>
                                    <li>
                                        <form class="p-0" method="POST" use:enhance={submitUpdateTheme}>
                                            <button formaction="/?/setTheme&theme={theme}" class="btn btn-primary h-full w-full text-transform capitalize" on:click={toggleTheme} type="submit">Theme: {theme}</button>
                                        </form>
                                    </li>
                                    <li>
                                        <form class="p-0" action="/logout" method="POST">
                                            <button class="btn border-0 hover:bg-red-900 w-[100%] font-semibold bg-red-500 text-transform capitalize" type="submit">Logout</button>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        {:else}
                            <a data-sveltekit-preload-data="hover" class="btn btn-sm btn-ghost bg-secondary text-accent" href="/signup" class:active={$page.url.pathname === '/signup'}>Sign up</a>
                            <a data-sveltekit-preload-data="hover" class="btn btn-sm bg-accent text-secondary" href="/login" class:active={$page.url.pathname === '/login'}>Log in</a>
                        {/if}
                    </div>
                </nav>
            </header>
    <!--        CONTENT-->

                <main in:fly={{y:25, duration: 500}} class="min-h-[max(100vh,100%)] px-[max(1rem,10vw)] py-[max(6rem,15vh)] flex items-center flex-col">
                    <slot />
                </main>
    <!--        FOOTER-->
            <footer class="footer p-10 bg-primary">
                <div>
                    <svg class="h-6 w-6 text-neutral" fill="currentColor" viewBox="0 0 24 24"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                    <p>Subjective Production.<br/>Branding clothes like never before</p>
                </div>
                <div>
                    <span class="footer-title text-neutral">Services</span>
                    <a href="/branding" class="link link-hover">Branding</a>
                    <a href="/design" class="link link-hover">Design</a>
                    <a href="/marketing" class="link link-hover">Marketing</a>
                    <a href="/advertisement" class="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span class="footer-title text-neutral">Company</span>
                    <a href="/about" class="link link-hover">About us</a>
                    <a href="/contact" class="link link-hover">Contact</a>
                    <a href="jobs" class="link link-hover">Jobs</a>
                </div>
                <div>
                    <span class="footer-title text-neutral">Legal</span>
                    <a href="/terms-of-use" class="link link-hover">Terms of use</a>
                    <a href="/privacy-policy" class="link link-hover">Privacy policy</a>
                    <a href="/cookie-policy" class="link link-hover">Cookie policy</a>
                </div>
            </footer>
        </div>
    {/key}
<!--    SIDEBAR-->
    <div class="drawer-side">
        <label for="navbar-toggle" class="drawer-overlay"></label>
        <nav class="menu py-3 px-8 w-[min(75vw,17.5rem)] bg-primary flex flex-col gap-8">
<!--            TODO: Add logo, incorporate slogan-->
            <div>
                <p class="text-xl font-semibold">Subjective</p>
                <p class="text-sm">Where minds aren't alike</p>
            </div>
            <div class="flex flex-col gap-4">
                <a data-sveltekit-preload-data="hover" class="underline-animation text-xl w-fit" href="/home" class:active={$page.url.pathname === '/home'} on:click={() => {
                      document.getElementById("navbar-toggle").checked = false;
            }}>Home</a>
                <a data-sveltekit-preload-data="hover" class="underline-animation text-xl w-fit" href="/shop" class:active={$page.url.pathname === '/shop'} on:click={() => {
                          document.getElementById("navbar-toggle").checked = false;
            }}>Shop</a>
                <a data-sveltekit-preload-data="hover" class="underline-animation text-xl w-fit" href="/about" class:active={$page.url.pathname === '/about'} on:click={() => {
                        document.getElementById("navbar-toggle").checked = false;
            }}>About</a>
            </div>
            <p class="text-sm mt-auto">&#169 Subjective, All rights reserved</p>
        </nav>
    </div>
</div>



