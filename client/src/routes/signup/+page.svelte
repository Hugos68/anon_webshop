<script lang="ts">
    import {applyAction, enhance} from "$app/forms";
    import toast from "svelte-french-toast";
    import {TOAST_STYLE} from "../../app_constants.js";
    import type {ActionResult} from "@sveltejs/kit";

    const handleSignup = () => {
        return async ({ result }: ActionResult) => {
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

<main class="flex flex-col">
    <h1 class="text-center text-4xl mb-10">Sign up</h1>
    <form class="flex flex-col" action="?/signup" method="POST" use:enhance={handleSignup}>
        <label class="mt-4 mb-2" for="email">Email</label>
        <input class="input bg-primary text-accent h-10" type="text" id="email" name="email">
        <label class="mt-4 mb-2" for="password">Password</label>
        <input class="input bg-primary text-accent h-10" type="password" id="password" name="password">
        <label class="mt-4 mb-2"  for="confirm-password">Confirm password</label>
        <input class="input bg-primary text-accent h-10" type="password" id="confirm-password" name="confirmPassword">
        <a class="mt-4 text-center" href="/login">Already have an account?</a>
        <button class="btn btn-primary mt-16" type="submit">Sign up</button>
    </form>
</main>



