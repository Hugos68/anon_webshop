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

<h1>Sign up</h1>
<form action="?/signup" method="POST" use:enhance={handleSignup}>
    <label for="email">Email</label>
    <input type="text" id="email" name="email">
    <label for="password">Password</label>
    <input type="password" id="password" name="password">
    <label for="confirm-password">Confirm password</label>
    <input type="password" id="confirm-password" name="confirmPassword">
    <button type="submit">Sign up</button>
</form>


<style>
    form {
        width: 20rem;
        display: flex;
        flex-direction: column;
    }
    form > label {
        margin-top: 1rem;
    }
    form > button {
        margin-top: 2.5rem;
    }
</style>