<script>
    import {flip} from "svelte/animate";
    import {createSearchStore, filterHandler} from "$lib/stores/search.ts";
    import {onDestroy} from "svelte";
    import toast from "svelte-french-toast";
    import {TOAST_STYLE} from "../../app_constants.ts";
    import {cart} from "$lib/stores/cart.ts";

    export let data;

    const searchProducts = data.products.map((product) => ({
        ...product,
        ...product,
        searchTerms: `${product.title} ${product.description} ${product.brand} ${product.category}`,
    }));

    const searchStore = createSearchStore(searchProducts);

    const unsubscribe = searchStore.subscribe((model) => filterHandler(model));

    onDestroy(() => {
        unsubscribe();
    });

    const addToShoppingCart = (product) => {
        if (!data.session) {
            toast.error('You must be logged in before purchasing products', TOAST_STYLE);
            return;
        }
        cart.addProduct(product);
        toast.success('Item added to cart', TOAST_STYLE);
    }
</script>

<main>

    <section class="mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl mt-10">Products</h1>
        <div class="flex gap-4 mt-4">
            <p>Find.</p>
            <p>Buy.</p>
            <p>Enjoy.</p>
        </div>
        <input class="mt-20" placeholder="Search..." type="search" bind:value={$searchStore.search} >
        {#if $searchStore.filtered.length > 0}
            <p class="mt-10 mb-4">Showing {$searchStore.filtered.length}/{$searchStore.data.length} products</p>
        {:else}
            <p class="mt-10 mb-4">No results matching your search criteria</p>
        {/if}
    </section>

    <div class="mx-auto flex justify-evenly flex-wrap gap-6">
        {#each $searchStore.filtered as product (product.id)}
            <div class="card w-96 bg-primary shadow-xl" animate:flip={{duration: 250}}>
                <figure><img src="{product.thumbnail}" alt="Shoes" /></figure>
                <div class="badge badge-secondary m-6">{product.category}</div>
                <div class="card-body">
                    <h2 class="card-title">{product.title}</h2>
                    <p>{product.description}</p>
                    <div class="card-actions justify-between items-center">
                        <div class="badge badge-lg">${product.price}</div>
                        <button class="btn btn-secondary" on:click={addToShoppingCart(product)}>Add to cart</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>