<script lang="ts">
    import toast from "svelte-french-toast";
    import {TOAST_STYLE} from "../../app_constants";
    import {cart} from "$lib/stores/cart";
    import {page} from "$app/stores";

    export let product;

    export let showAddToCartButton;

    const addToShoppingCart = (product) => {
        if (!$page.data.session) {
            toast.error('You must be logged in before purchasing products', TOAST_STYLE);
            return;
        }
        cart.addProduct(product);
        toast.success('Item added to cart', TOAST_STYLE);
    }
</script>

<label class="cursor-pointer" for="product-modal-{product.id}">
    <slot />
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
                {#if showAddToCartButton}
                    <button class="btn btn-secondary" on:click={addToShoppingCart(product)}>Add to cart</button>
                {/if}
            </div>
        </div>
    </div>
</label>