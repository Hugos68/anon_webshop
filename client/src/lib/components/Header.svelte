<script lang="ts">
    import {page} from "$app/stores";
    import {cart} from "$lib/stores/cart.ts";
</script>


<header class="bg-white dark:bg-zinc-800 sticky h-20 top-0 left-0 z-[997] px-8 drop-shadow-md flex items-center">

    <nav class="flex items-center justify-between min-w-full py-4">
        <input class="z-[999] hidden peer" type="checkbox" id="hamburger-checkbox">
        <label class="relative hidden md:block z-[999] mr-auto cursor-pointer text-black dark:text-slate-300 group" for="hamburger-checkbox">
            <svg class="w-10 h-10 absolute [.peer:checked~.group_&]:opacity-0 [.peer:checked~.group_&]:rotate-[360deg] transition-opacity-transform duration-300 ease-in-out" viewBox="0 0 18 18" fill="currentColor">
                <path d="M17 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"/>
            </svg>
            <svg class="w-10 h-10 [.peer:not(:checked)~.group_&]:opacity-0 [.peer:not(:checked)~.group_&]:rotate-[-360deg] transition-opacity-transform duration-300 ease-in-out" viewBox="0 0 16 16"  fill="currentColor">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
        </label>
        <div class="md:peer-checked:translate-x-0 md:peer:checked:drop-shadow-sm bg-white dark:bg-zinc-800 z-[998] absolute top-0 left-0 w-[20em] max-w-[75vw] min-h-[100vh] translate-x-[-100%] transition-transform ease-in-out duration-200">
            <nav class="ml-8 mt-[6rem] flex flex-col">
                <a class="underline-animation text-black dark:text-slate-300 text-2xl px-2 py-1 w-min" href="/home" class:active={$page.url.pathname === '/home'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>Home</a>
                <a class="underline-animation text-black dark:text-slate-300 text-2xl px-2 py-1 w-min" href="/shop" class:active={$page.url.pathname === '/shop'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>Shop</a>
                <a class="underline-animation text-black dark:text-slate-300 text-2xl px-2 py-1 w-min" href="/about" class:active={$page.url.pathname === '/about'} on:click={() => {
                document.getElementById("hamburger-checkbox").checked = false;
            }}>About</a>
            </nav>
        </div>
        <div class="flex items-center justify-center md:hidden">
            <a class="underline-animation text-black dark:text-slate-300 text-2xl px-2" href="/home" class:active={$page.url.pathname === '/home'}>Home</a>
            <a class="underline-animation text-black dark:text-slate-300 text-2xl px-2" href="/shop" class:active={$page.url.pathname === '/shop'}>Shop</a>
            <a class="underline-animation text-black dark:text-slate-300 text-2xl px-2" href="/about" class:active={$page.url.pathname === '/about'}>About</a>
        </div>
        <div class="flex items-center justify-center">
            {#if $page.data.session}
                <a class="relative text-black dark:text-slate-300" href="/cart">
                    <svg class="w-10 h-10" viewBox="0 0 476.944 476.944" fill="currentColor"><g><path d="M84.176,379.875c-26.762,0-48.535,21.772-48.535,48.534s21.772,48.534,48.535,48.534c26.762,0,48.534-21.772,48.534-48.534                           S110.938,379.875,84.176,379.875z M84.176,446.944c-10.22,0-18.535-8.314-18.535-18.534s8.314-18.534,18.535-18.534                           c10.22,0,18.534,8.314,18.534,18.534S94.396,446.944,84.176,446.944z"/><path d="M342.707,379.875c-26.762,0-48.534,21.772-48.534,48.534s21.772,48.534,48.534,48.534                           c26.762,0,48.535-21.772,48.535-48.534S369.469,379.875,342.707,379.875z M342.707,446.944c-10.22,0-18.534-8.314-18.534-18.534                           s8.314-18.534,18.534-18.534c10.22,0,18.535,8.314,18.535,18.534S352.927,446.944,342.707,446.944z"/><path d="M413.322,0l-9.835,60H1.999l28.736,175.88c4.044,24.67,26.794,43.995,51.794,43.995h284.917l-6.557,40H50.642v30h335.73                           L438.804,30h36.141V0H413.322z M372.363,249.875H82.529c-10.174,0-20.543-8.808-22.188-18.841L37.298,90h361.271L372.363,249.875z"/></g></svg>
                    {#if $cart.length > 0}
                        {#key $cart}
                            <div class="absolute bg-black dark:bg-slate-300 flex justify-center rounded-full w-6 h-6 top-5 right-5">
                                <p class="text-slate-300 dark:text-black m-0 px-0.5" >{cart.quantity()}</p>
                            </div>
                        {/key}
                    {/if}
                </a>
                <a class="text-black dark:text-slate-300 text-2xl px-2" href="/account" class:active={$page.url.pathname === '/account'}>
                    <svg class="w-10 h-10" viewBox="0 0 30.586 30.586" fill="currentColor"><g transform="translate(-546.269 -195.397)"><path d="M572.138,221.245a15.738,15.738,0,0,0-21.065-.253l-1.322-1.5a17.738,17.738,0,0,1,23.741.28Z"/><path d="M561.464,204.152a4.96,4.96,0,1,1-4.96,4.96,4.966,4.966,0,0,1,4.96-4.96m0-2a6.96,6.96,0,1,0,6.96,6.96,6.96,6.96,0,0,0-6.96-6.96Z"/><path d="M561.562,197.4a13.293,13.293,0,1,1-13.293,13.293A13.308,13.308,0,0,1,561.562,197.4m0-2a15.293,15.293,0,1,0,15.293,15.293A15.293,15.293,0,0,0,561.562,195.4Z"/></g></svg>
                </a>
            {:else}
                <a class="underline-animation text-black dark:text-slate-300 text-2xl px-2" href="/signup" class:active={$page.url.pathname === '/signup'}>Sign up</a>
                <a class="underline-animation text-black dark:text-slate-300 text-2xl px-2" href="/login" class:active={$page.url.pathname === '/login'}>Log in</a>
            {/if}
        </div>
    </nav>
</header>
