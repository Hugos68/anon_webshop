<script>
    import {fly} from "svelte/transition";
    import {    filterHandler, createSearchStore} from "$lib/stores/search.ts";
    import {onDestroy} from "svelte";
    import ProductModal from "$lib/components/ProductModal.svelte";

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
</script>

<section class="flex flex-col items-center gap-12">
    <h1 class="text-xl">Shop</h1>
    <p class="text-[clamp(2rem,9vw,5rem)] font-bold">
        <span>Find.</span>
        <span>Buy.</span>
        <span>Enjoy.</span>
    </p>
    <div class="form-control">
        <div class="input-group">
            <input  class="input all:unset bg-primary text-accent w-[clamp(15rem,50vw,30rem)]" type="text" placeholder="Search…" bind:value={$searchStore.search}/>
            <span class="bg-accent">
                <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 512 512"><path id="Path_16" data-name="Path 16" d="M497.914,497.913a48.085,48.085,0,0,1-68.008,0L345.043,413.05a222.6,222.6,0,0,1-120.659,35.717C100.469,448.767,0,348.313,0,224.383S100.469,0,224.384,0C348.315,0,448.768,100.452,448.768,224.383A222.872,222.872,0,0,1,413.05,345.059l84.864,84.863A48.066,48.066,0,0,1,497.914,497.913Zm-273.53-433.8A160.274,160.274,0,1,0,384.658,224.382,160.271,160.271,0,0,0,224.384,64.109Z" fill-rule="evenodd"/></svg>
            </span>
        </div>
    </div>
    {#if $searchStore.filtered.length > 0}
        <p class="mt-10 mb-4">Showing {$searchStore.filtered.length}/{$searchStore.data.length} products</p>
    {:else}
        <p class="mt-10 mb-4">No results matching your search criteria</p>
    {/if}
</section>
<section class="flex flex-wrap justify-evenly gap-6 flex-auto">
    {#each $searchStore.filtered as product (product.id)}
        <ProductModal {product} showAddToCartButton>
            <div in:fly={{delay : product.id*50}} class="card max-h-[30rem] min-w-[16.5rem] max-w-[20rem] bg-primary shadow-xl">
                <figure><img src="{product.thumbnail}" alt="{product.thumbnail}" /></figure>
                <div class="flex justify-between">
                    <div class="badge badge-secondary m-6">{product.category}</div>
                    <div class="badge badge-accent   m-6">${product.price}</div>
                </div>

                <div class="card-body">
                    <h2 class="card-title">{product.title}</h2>
                    <p>{product.description}</p>
                </div>
            </div>
        </ProductModal>
    {/each}
</section>

<input type="checkbox" id="my-modal-5" class="modal-toggle" />
