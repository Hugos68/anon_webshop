<script>
    import {enhance} from "$app/forms";
</script>


<main>
    <form action="?/login" method="POST" use:enhance>
        <label for="email">Email</label>
        <input type="text" id="email" name="email">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <button type="submit">Login</button>
    </form>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
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