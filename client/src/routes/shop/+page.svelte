<script>
    import {flip} from "svelte/animate";
    import Slider from '@bulatdashiev/svelte-slider';
    import {createSearchStore, filterHandler} from "$lib/stores/search.ts";
    import {onDestroy} from "svelte";

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
            <input class="search-bar" placeholder="Example: Christmas presents..." type="search" bind:value={$searchStore.search}>
        </div>
        <div class="price-range">
            <p>Price range: ${$searchStore.priceRange[0]} - ${$searchStore.priceRange[1]}</p>
            <Slider class="test" max="{maxPrice}" step="10" range bind:value={$searchStore.priceRange}/>
        </div>
    </div>
    <div class="products">
        {#if $searchStore.filtered.length > 0}
            {#each $searchStore.filtered as product (product.id)}
                <div class="product-listing" animate:flip={{duration:250}}>
                    <p class="title">{product.title}</p>
                    <img loading="lazy" src="{product.thumbnail}" alt='{product.title.replace(" ", "_")}_image'>
                    <p class="description">{product.description}</p>
                    <div class="price-card-container">
                        <p class="price">${product.price}</p>
                        <button class="add-to-card-button">Add to card</button>
                    </div>
                </div>
            {/each}
        {:else}
            <p class="no-results">No results</p>
        {/if}

    </div>
</main>

<style>
    main {
        margin-top: 5vh;
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
    .products {
        margin-inline: auto;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 3rem;
        width: 100%;
    }
    .no-results {
        font-size: 2rem;
    }
    .product-listing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        width: min-content;
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
        max-width: inherit;
        filter: brightness(75%);
        border-radius: 1rem;
    }
    @media (max-width: 800px) {
        .filter-banner {
            flex-direction: column;
        }
    }
</style>