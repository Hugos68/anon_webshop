<script>
    import {enhance} from "$app/forms";
</script>


<main>
    <form action="?/signup" method="POST" use:enhance>
        <label for="email">Email</label>
        <input type="text" id="email" name="email">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <button type="submit">Sign up</button>
    </form>
</main>