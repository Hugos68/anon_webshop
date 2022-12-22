<script>
    import {flip} from "svelte/animate";
    export let data;
    let {products} = data;
</script>

<main>
    <h1>Products</h1>
    <p>Find. Buy. Enjoy.</p>
    <div class="filter-banner">

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
    h1 {
        text-align: center;
    }
    main > p {
        text-align: center;
    }
    .filter-banner {
        width: 100vw;
        height: 10rem;
    }
    .products {
        margin-inline: auto;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 5rem;
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