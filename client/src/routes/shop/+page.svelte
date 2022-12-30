<script>
    import {flip} from "svelte/animate";
    import Slider from '@bulatdashiev/svelte-slider';
    import {createSearchStore, filterHandler} from "$lib/stores/search.ts";
    import {onDestroy} from "svelte";
    import {cart, addProductToCart} from "$lib/stores/cart.ts";
    import toast from "svelte-french-toast";
    import {TOAST_STYLE} from "../../app_constants.ts";

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

    const maxPrice = $searchStore.priceRange[1];

    const addToShoppingCart = async (product) => {
        if (!data.session) {
            toast.error("You must be logged in before purchasing products");
            return;
        }
        // TODO: Add product to shopping cart
        addProductToCart(product);
        toast.success('Item added to cart', TOAST_STYLE);
    }
</script>

<main>
    <div class="top-header">
        <h1>Products</h1>
        <div class="catchy-text">
            <p>Find.</p>
            <p>Buy.</p>
            <p>Enjoy.</p>
        </div>
    </div>
    <div class="filter-banner">
        <div class="search">
            <p>Search:</p>
            <input class="search-bar" placeholder="Example: Flying Wooden Bird..." type="search" bind:value={$searchStore.search}>
        </div>
        <div class="price-range">
            <p>Price range: ${$searchStore.priceRange[0]} - ${$searchStore.priceRange[1]}</p>
            <Slider class="test" max="{maxPrice}" step="10" range bind:value={$searchStore.priceRange}/>
        </div>
    </div>
    <div class="product-section">
        {#if $searchStore.filtered.length > 0}
            <p>Showing {$searchStore.filtered.length}/{$searchStore.data.length} products</p>
        {:else}
            <p>No results matching your search criteria</p>
        {/if}
        <div class="products">
            {#each $searchStore.filtered as product (product.id)}
                <div class="product-listing" animate:flip={{duration:250}}>
                    <p class="title">{product.title}</p>
                    <img loading="lazy" src="{product.thumbnail}" alt='{product.title.replace(" ", "_")}_image'>
                    <p class="description">{product.description}</p>
                    <div class="price-card-container">
                        <p class="price">${product.price}</p>
                        <button class="add-to-card-button" on:click={addToShoppingCart(product)}>Add to cart</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>

</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10vh;
        padding-inline: 2rem;
    }
    .top-header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .top-header > .catchy-text {
        display: flex;
        gap: 1.5rem;
    }
    .filter-banner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 10rem;
        max-width: 75vw;
        gap: 2rem;
    }
    .filter-banner > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 15rem;
    }
    .search > input {
        width: 15rem;
    }
    .product-section > p {
        text-align: center;
    }
    .products {
        margin-inline: auto;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 3rem;
        max-width: 100%;
    }
    .product-listing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        max-width: min-content;
        padding: 1rem;
        border: var(--accent-color) solid 0.1rem;
        border-radius: 1.5rem;
    }
    .product-listing > .title {
        font-size: 1.5rem;
        font-weight: bolder;
        z-index: 1;
    }
    .product-listing > .price-card-container > .price {
        padding: 0.5rem;
        border: lightblue solid 0.25rem;
        border-radius: 1.5rem;
    }
    .product-listing > .price-card-container > .add-to-card-button {
        padding: 0.5rem;
        border: lightgreen solid 0.25rem;
        border-radius: 1.5rem;
    }
    .price-card-container {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 2.5rem;
    }
    .product-listing > img {
        max-height: 10rem;
        width: available;
        filter: brightness(75%);
        border-radius: 1rem;
    }
    @media (max-width: 800px) {
        .filter-banner {
            flex-direction: column;
        }
    }
</style>