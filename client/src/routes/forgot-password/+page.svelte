<script lang="ts">
    import {enhance} from "$app/forms";
    import toast from "svelte-french-toast";
    import {TOAST_STYLE} from "../../app_constants";

    const handleForgotPassword = ({ form, data, action, cancel }) => {
        return async ({ result }) => {
            if (result.type === 'success') toast.success("Successfully send email to reset password.", TOAST_STYLE);
            else if (result.type === 'error') toast.error(result.data.message, TOAST_STYLE);
        };
    };
</script>

<main class="flex flex-col justify-center items-center">
    <h1 class="text-4xl my-10">Forgot Password</h1>
    <form action="?/forgotPassword" method="POST" use:enhance={handleForgotPassword}>
        <label class="mt-4 mb-2" for="email">Email</label>
        <input type="text" id="email" name="email">
        <a href="/login">Want to login?</a>
        <button class="btn btn-primary mt-8" type="submit">Send reset link</button>
    </form>
</main>

<style>
    form {
        width: 20rem;
        display: flex;
        flex-direction: column;
    }
    form > a {
        margin-top: 1rem;
        margin-inline: auto;
    }
    form > label {
        margin-top: 1rem;
    }
    form > button {
        margin-top: 2.5rem;
    }
</style>