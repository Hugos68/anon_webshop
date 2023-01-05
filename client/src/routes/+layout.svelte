<script lang="ts">
    import {onMount} from 'svelte';
    import {supabaseClient} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';
    import {page} from "$app/stores";
    import {cart} from "$lib/stores/cart.ts";
    import {Toaster} from "svelte-french-toast";
    import '../app.css';
    import {enhance} from "$app/forms";

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
</script>

<Toaster />
<div class="drawer sticky">
    <input id="navbar-toggle" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
        <header class="w-full navbar bg-primary text-accent px-[5vw]">
            <nav class="flex justify-between w-full">
                <div class="flex-none min-lg:hidden">
                    <label for="navbar-toggle" class="btn btn-square btn-ghost">
                        <svg viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                </div>
                <div class="flex gap-5 lg:hidden">
                    <a class="underline-animation"  href="/home" class:active={$page.url.pathname === '/home'}>Home</a>
                    <a class="underline-animation"  href="/shop" class:active={$page.url.pathname === '/shop'}>Shop</a>
                    <a class="underline-animation"  href="/about" class:active={$page.url.pathname === '/about'}>About</a>
                </div>
                <div class="flex gap-5">
                    {#if $page.data.session}
                        <a class="relative btn btn-circle btn-ghost text-accent" href="/cart">
                            <svg class="w-6 h-6" viewBox="0 0 476.944 476.944" fill="currentColor"><g><path d="M84.176,379.875c-26.762,0-48.535,21.772-48.535,48.534s21.772,48.534,48.535,48.534c26.762,0,48.534-21.772,48.534-48.534                           S110.938,379.875,84.176,379.875z M84.176,446.944c-10.22,0-18.535-8.314-18.535-18.534s8.314-18.534,18.535-18.534                           c10.22,0,18.534,8.314,18.534,18.534S94.396,446.944,84.176,446.944z"/><path d="M342.707,379.875c-26.762,0-48.534,21.772-48.534,48.534s21.772,48.534,48.534,48.534                           c26.762,0,48.535-21.772,48.535-48.534S369.469,379.875,342.707,379.875z M342.707,446.944c-10.22,0-18.534-8.314-18.534-18.534                           s8.314-18.534,18.534-18.534c10.22,0,18.535,8.314,18.535,18.534S352.927,446.944,342.707,446.944z"/><path d="M413.322,0l-9.835,60H1.999l28.736,175.88c4.044,24.67,26.794,43.995,51.794,43.995h284.917l-6.557,40H50.642v30h335.73                           L438.804,30h36.141V0H413.322z M372.363,249.875H82.529c-10.174,0-20.543-8.808-22.188-18.841L37.298,90h361.271L372.363,249.875z"/></g></svg>
                            {#if $cart.length > 0}
                                {#key $cart}
                                    <div class="absolute bg-accent flex justify-center items-center rounded-full w-6 h-5 top-6 right-6">
                                        <p class="text-secondary px-0.5" >{cart.quantity()}</p>
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
                                    <a class="btn btn-primary text-transform capitalize font-semibold " href="/account" class:active={$page.url.pathname === '/account'}>My Account</a>
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
                        <a class="underline-animation" href="/signup" class:active={$page.url.pathname === '/signup'}>Sign up</a>
                        <a class="underline-animation" href="/login" class:active={$page.url.pathname === '/login'}>Log in</a>
                    {/if}
                </div>
            </nav>
        </header>
        <main class="px-[max(1rem,10vw)] py-[max(6rem,15vh)] flex justify-center flex-wrap">
            <slot />
        </main>
    </div>
    <div class="drawer-side">
        <label for="navbar-toggle" class="drawer-overlay"></label>
        <nav class="menu py-4 px-8 w-[min(75vw,20rem)] bg-primary flex flex-col gap-8">
            <p class="text-2xl font-semibold">Subjective</p>
            <div class="flex flex-col gap-4">
                <a class="underline-animation text-xl w-fit" href="/home" class:active={$page.url.pathname === '/home'} on:click={() => {
                      document.getElementById("navbar-toggle").checked = false;
            }}>Home</a>
                <a class="underline-animation text-xl w-fit" href="/shop" class:active={$page.url.pathname === '/shop'} on:click={() => {
                          document.getElementById("navbar-toggle").checked = false;
            }}>Shop</a>
                <a class="underline-animation text-xl w-fit" href="/about" class:active={$page.url.pathname === '/about'} on:click={() => {
                        document.getElementById("navbar-toggle").checked = false;
            }}>About</a>
            </div>
            <p class="mt-auto">&#169 Subjective, All rights reserved</p>
        </nav>
    </div>
</div>


