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

<form>
    <h1>Forgot Password</h1>
    <form action="?/forgotPassword" method="POST" use:enhance={handleForgotPassword}>
        <label for="email">Email</label>
        <input type="text" id="email" name="email">>
        <a href="forgot-password">Want to login?</a>
        <button type="submit">Login</button>
    </form>
</form>

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