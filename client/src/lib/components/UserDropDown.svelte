<script>
    import {enhance} from "$app/forms"
    import {page} from "$app/stores";

    let theme = $page.data.theme;
    const toggleTheme = () => theme==="dark" ? theme="light" : theme="dark";
    const submitUpdateTheme = ({action}) => {
        const theme = action.searchParams.get('theme');
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    };
</script>

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