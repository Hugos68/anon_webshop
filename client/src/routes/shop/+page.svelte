<script>
    import {flip} from "svelte/animate";
    import Slider from '@bulatdashiev/svelte-slider';

    export let data;
    let {products} = data;
    let search = "";
    let priceRange = [0, 10000];

    async function filter() {
        products.forEach(product => {
            const searchArea = product.description + product.title;
        });
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
        <div class="filter-section">
            <p>Filter:</p>
            <div class="price-range">
                <p>Price range:</p>
                <Slider max="10000" step="10" range bind:value={priceRange}/>
                <p>${priceRange[0]} - ${priceRange[1]}</p>
            </div>

        </div>
        <div class="search">
            <p>Search:</p>
            <input class="search-bar" placeholder="Example: Christmas presents..." type="search" bind:value={search}>
        </div>
    </div>
    <div class="products">
        {#each products as product (product.id)}
            <div class="product-listing" animate:flip={{duration:500}}>
                <p class="title">{product.title}</p>
                <img loading="lazy" src="{product.thumbnail}" alt='{product.title.replace(" ", "_")}_image'>
                <p class="description">{product.description}</p>
                <div class="price-card-container">
                    <p class="price">${product.price}</p>
                    <button class="add-to-card-button">Add to card</button>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
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
        gap: 10vw;
    }
    .filter-banner > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .filter-banner > div > .price-range {
        width: 20rem;
    }
    .products {
        margin-inline: auto;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 3rem;
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

</style>