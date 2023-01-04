<script lang="ts">
    import type {PageData} from "./$types";

    export let data: PageData;
    console.log(data);
</script>

<h1 class="text-center text-4xl mt-20">Welcome {data.session.user.email}</h1>