<script lang="ts">
    import {flip} from "svelte/animate";
    import ShoppingCartItem from "$lib/components/ShoppingCartItem.svelte";
    import ProductModal from "$lib/components/ProductModal.svelte";
    import {cart, cartPrice, cartQuantity} from "$lib/stores/cart.js";
</script>


<main class="flex md:flex-col gap-6">
    <div class="card w-[min(20rem, 25vw)] bg-primary shadow-xl">
        <div class="card-body gap-6">
            <h2 class="card-title">Shopping cart</h2>
            {#if $cartQuantity > 0}
                {#each $cart as cartItem (cartItem.product.id)}
                    <div animate:flip>
                        <ProductModal product={cartItem.product}>
                            <ShoppingCartItem {cartItem} />
                        </ProductModal>
                    </div>
                {/each}
            {:else}
                <h2 class="card-title">You have 0 products</h2>
                <a href="/shop" class="btn">Go to shop</a>
            {/if}
        </div>
    </div>
    <div class="card w-[min(20rem, 25vw)] max-h-96 bg-primary shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Checkout</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-between items-end">
                <div class="badge badge-lg p-6">Total: ${$cartPrice}</div>
                <button class="btn btn-accent">Checkout</button>
            </div>
        </div>
    </div>
</main>
