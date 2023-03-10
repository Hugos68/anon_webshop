<script lang="ts">
    import {onMount} from 'svelte';
    import {supabaseClient} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';
    import {page} from "$app/stores";
    import {Toaster} from "svelte-french-toast";
    import '../app.css';
    import {enhance} from "$app/forms";
    import {fly} from "svelte/transition"
    import ShoppingCartDropDown from "$lib/components/ShoppingCartDropDown.svelte";
    import UserDropDown from "$lib/components/UserDropDown.svelte";

    let navbar : HTMLInputElement | null;
    const toggleNavBar = () => {
        if (navbar) navbar.checked = !navbar.checked;
    }

    onMount(() => {
        navbar = document.getElementById("navbar-toggle") as HTMLInputElement | null;
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
        const pageRoute = $page.route.id || "";
        const pageRouteWithoutSlash = pageRoute.replace("/", "");
        pageTitle = pageRouteWithoutSlash.charAt(0).toUpperCase() + pageRouteWithoutSlash.substring(1)+" - Subjective";
    }

    const acceptAllCookies: ConsentCookie = {
        required : true,
        functional : true,
        personalized : true
    }
    const currentCookies: ConsentCookie  = {
        required : true,
        functional : false,
        personalized : false
    }
    let innerWidth = 0;
    $: if (innerWidth > 1000 && navbar && navbar.checked) {
        toggleNavBar();
    }
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<svelte:window bind:innerWidth />


<div class="drawer">
    <input id="navbar-toggle" type="checkbox" class="drawer-toggle" />
    {#key $page.route.id}
        <div class="drawer-content scroll-pt-24">
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
                            <ShoppingCartDropDown />
                            <UserDropDown />
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
<!--            FOOTER-->
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
                    <a href="/legal#privacy-policy" class="link link-hover">Privacy policy</a>
                    <a href="/legal#terms-of-use" class="link link-hover">Terms of use</a>
                    <a href="/legal#copyright" class="link link-hover">Copright</a>
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
                <a data-sveltekit-preload-data="hover" class="underline-animation text-xl w-fit" href="/home" class:active={$page.url.pathname === '/home'} on:click={toggleNavBar}>Home</a>
                <a data-sveltekit-preload-data="hover" class="underline-animation text-xl w-fit" href="/shop" class:active={$page.url.pathname === '/shop'} on:click={toggleNavBar}>Shop</a>
                <a data-sveltekit-preload-data="hover" class="underline-animation text-xl w-fit" href="/about" class:active={$page.url.pathname === '/about'} on:click={toggleNavBar}>About</a>
            </div>
            <p class="text-sm mt-auto">&#169 Subjective, All rights reserved</p>
        </nav>
    </div>
</div>


{#if (!$page.data.consentCookie && !($page.route.id || "").startsWith("/legal"))}

    <!--CONSENT COOKIES POPUP-->
    <input type="checkbox" checked id="consent-cookies-popup" class="modal-toggle"/>
    <div class="modal">
        <div class="modal-box bg-primary">
            <h3 class="font-bold text-lg">Cookies</h3>
            <p class="py-4">By clicking ???Accept??? or "Accept All", you agree Subjective can store cookies on your device and disclose
                information in accordance with our <a class="link" href="/legal#cookies">Cookie Policy</a>.
            </p>
            <div class="flex flex-col">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text text-accent">Essential Cookies</span>
                        <input class="checkbox checkbox-accent" type="checkbox" disabled checked />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text text-accent">Functional Cookies</span>
                        <input class="checkbox checkbox-accent" type="checkbox" bind:checked={currentCookies.functional} />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text text-accent">Personalized Cookies</span>
                        <input class="checkbox checkbox-accent" type="checkbox" bind:checked={currentCookies.personalized} />
                    </label>
                </div>
            </div>
            <form class="modal-action" method="POST" use:enhance>
                <button formaction="/?/setCookieConsent&cookies={JSON.stringify(currentCookies)}" type="submit">
                    <label for="consent-cookies-popup" class="btn bg-secondary btn-ghost text-accent">Accept</label>
                </button>
                <button formaction="/?/setCookieConsent&cookies={JSON.stringify(acceptAllCookies)}" type="submit">
                    <label class="btn" for="consent-cookies-popup">Accept All</label>
                </button>
            </form>
        </div>
    </div>
{/if}

<!--TOASTER FOR CREATING TOASTS-->
<Toaster />