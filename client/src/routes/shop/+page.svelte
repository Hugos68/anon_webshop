<script>
    import {flip} from "svelte/animate";

    export let data;
    let {products} = data;
    let search = "";
</script>

<main>
    <div class="top-header">
        <div class="shopping-cart-icon">
            <svg width="48px" height="48px" viewBox="0 0 476.944 476.944" fill="var(--accent-color)" xml:space="preserve">
            <g>
                <path d="M84.176,379.875c-26.762,0-48.535,21.772-48.535,48.534s21.772,48.534,48.535,48.534c26.762,0,48.534-21.772,48.534-48.534
                    S110.938,379.875,84.176,379.875z M84.176,446.944c-10.22,0-18.535-8.314-18.535-18.534s8.314-18.534,18.535-18.534
                    c10.22,0,18.534,8.314,18.534,18.534S94.396,446.944,84.176,446.944z"/>
                <path d="M342.707,379.875c-26.762,0-48.534,21.772-48.534,48.534s21.772,48.534,48.534,48.534
                    c26.762,0,48.535-21.772,48.535-48.534S369.469,379.875,342.707,379.875z M342.707,446.944c-10.22,0-18.534-8.314-18.534-18.534
                    s8.314-18.534,18.534-18.534c10.22,0,18.535,8.314,18.535,18.534S352.927,446.944,342.707,446.944z"/>
                <path d="M413.322,0l-9.835,60H1.999l28.736,175.88c4.044,24.67,26.794,43.995,51.794,43.995h284.917l-6.557,40H50.642v30h335.73
                    L438.804,30h36.141V0H413.322z M372.363,249.875H82.529c-10.174,0-20.543-8.808-22.188-18.841L37.298,90h361.271L372.363,249.875z"
                />
            </g>
            </svg>
        </div>
        <h1>Products</h1>
        <p>Find. Buy. Enjoy.</p>
    </div>

    <div class="filter-banner">
        <input type="search" bind:value={search}>
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

    .top-header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2rem;
    }
    .shopping-cart-icon {
        margin-left: auto;
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