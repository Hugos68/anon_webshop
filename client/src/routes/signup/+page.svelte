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

<main class="flex flex-col justify-center items-center">
    <h1 class="text-black dark:text-slate-300 text-4xl my-10">Sign up</h1>
    <form class="flex flex-col" action="?/signup" method="POST" use:enhance={handleSignup}>
        <label class="mt-4 mb-2" for="email">Email</label>
        <input type="text" id="email" name="email">
        <label class="mt-4 mb-2" for="password">Password</label>
        <input type="password" id="password" name="password">
        <label class="mt-4 mb-2"  for="confirm-password">Confirm password</label>
        <input type="password" id="confirm-password" name="confirmPassword">
        <button class="btn btn-primary mt-16" type="submit">Sign up</button>
    </form>
</main>

