<script lang="ts">
    import {applyAction, enhance} from "$app/forms";
    import toast from "svelte-french-toast";
    import {TOAST_STYLE} from "../../app_constants.ts";

    async function handleSignup() {
        return async ({ result }) => {
            await applyAction(result);
            if (result.type === 'redirect') {
                toast.success('Success! Please verify your email', TOAST_STYLE);
            }
            else {
                toast.error(result.data.message, TOAST_STYLE);
            }
        };
    }
</script>

<main class="flex flex-col items-center justify-center mb-5 mt-20">
    <h1 class="text-black dark:text-slate-300 text-4xl my-10">Sign up</h1>
    <form class="flex flex-col" action="?/signup" method="POST" use:enhance={handleSignup}>
        <label class="text-black dark:text-slate-300 mt-4" for="email">Email</label>
        <input class="focus:outline-0 p-0.5" type="text" id="email" name="email">
        <label class="text-black dark:text-slate-300 mt-4" for="password">Password</label>
        <input class="focus:outline-0 p-0.5" type="password" id="password" name="password">
        <label class="text-black dark:text-slate-300 mt-4"  for="confirm-password">Confirm password</label>
        <input class="focus:outline-0 p-0.5" type="password" id="confirm-password" name="confirmPassword">
        <button class="mt-8 border-2 p-2 text-black dark:text-slate-300" type="submit">Sign up</button>
    </form>
</main>

