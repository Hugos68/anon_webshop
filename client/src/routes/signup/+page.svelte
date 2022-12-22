<script>
    import {enhance} from "$app/forms";
    import toast from "svelte-french-toast";
    import {TOAST_STYLE} from "../../app_constants.ts";

    async function handleSignup() {
        return async ({ result }) => {
            if (result.type === 'redirect') {
                toast.success('Successfully signed up!', TOAST_STYLE);
            }
        };
    }
</script>


<main>
    <h1>Sign up</h1>
    <form action="?/signup" method="POST" use:enhance={handleSignup}>
        <label for="email">Email</label>
        <input type="text" id="email" name="email">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <button type="submit">Sign up</button>
    </form>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 12.5vh;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    form > button {
        margin-top: 2.5rem;
    }
</style>