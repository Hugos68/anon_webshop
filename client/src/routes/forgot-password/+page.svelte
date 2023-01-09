<script lang="ts">
    import {enhance} from "$app/forms";
    import toast from "svelte-french-toast";
    import {TOAST_STYLE} from "../../app_constants";
    import type {ActionResult} from "@sveltejs/kit";

    const handleForgotPassword = () => {
        return async ({ result }: ActionResult) => {
            if (result.type === 'success') toast.success("Successfully send email to reset password.", TOAST_STYLE);
            else if (result.type === 'error') toast.error(result.data.message, TOAST_STYLE);
        };
    };
</script>

<main class="flex flex-col">
    <h1 class="text-center text-4xl mb-10">Forgot Password</h1>
    <form class="flex flex-col" action="?/forgotPassword" method="POST" use:enhance={handleForgotPassword}>
        <label class="mt-4 mb-2" for="email">Email</label>
        <input class="input bg-primary text-accent h-10" type="text" id="email" name="email">
        <a class="mt-4 text-center" href="/login">Want to login?</a>
        <button class="btn btn-primary mt-8" type="submit">Send reset link</button>
    </form>
</main>