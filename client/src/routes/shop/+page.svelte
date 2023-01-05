<script>
    import {flip} from "svelte/animate";
    import {fly} from "svelte/transition";
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

    let index = 0;
</script>

<section class="text-center">
    <h1 class="text-4xl">Shop</h1>
    <p class="">
        <span>Find.</span>
        <span>Buy.</span>
        <span>Enjoy.</span>
    </p>
    <input class="mt-20" placeholder="Search..." type="search" bind:value={$searchStore.search} >
    {#if $searchStore.filtered.length > 0}
        <p class="mt-10 mb-4">Showing {$searchStore.filtered.length}/{$searchStore.data.length} products</p>
    {:else}
        <p class="mt-10 mb-4">No results matching your search criteria</p>
    {/if}
</section>
<div class="flex flex-wrap justify-evenly gap-6 flex-auto">
    {#each $searchStore.filtered as product (product.id)}
        <div animate:flip={{duration: 250}}>
            <label class="cursor-pointer" for="product-modal-{product.id}" >
                <div in:fly={{delay : product.id*50}} class="card max-h-[30rem] min-w-[16.5rem] max-w-[20rem] bg-primary shadow-xl">
                    <figure><img src="{product.thumbnail}" alt="{product.thumbnail}" /></figure>
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
            </label>
            <input  type="checkbox" id="product-modal-{product.id}" class="modal-toggle " />
            <label for="product-modal-{product.id}" class="modal cursor-pointer">
                <div class="card min-lg:card-side max-h-[30rem]     bg-primary shadow-xl mx-12">
                    <figure class="relative">
                        <img src="{product.thumbnail}" alt="{product.thumbnail}"/>
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">{product.title}</h2>
                        <p>{product.description}</p>
                        <div class="card-actions justify-between items-center">
                            <div class="badge badge-lg">${product.price}</div>
                            <button class="btn btn-secondary" on:click={addToShoppingCart(product)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </label>
        </div>
    {/each}
</div>
<input type="checkbox" id="my-modal-5" class="modal-toggle" />
