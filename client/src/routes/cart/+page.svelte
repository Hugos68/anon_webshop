<script lang="ts">
    import {flip} from "svelte/animate";
    import ShoppingCartItem from "$lib/components/ShoppingCartItem.svelte";
    import ProductModal from "$lib/components/ProductModal.svelte";
    import {cart, cartPrice, cartQuantity} from "$lib/stores/cart.js";
</script>


<main class="flex flex-col items-center gap-12">
    <h1 class="text-4xl">Shopping cart</h1>
    <div class="flex justify-center md:flex-col md:items-center gap-[5vw]">
        <div class="card w-[max(19rem,25vw)] bg-primary shadow-xl">
            <div class="card-body gap-6">
                <h2 class="card-title">Content</h2>
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
        <div class="card w-[max(19rem,25vw)] h-96 bg-primary shadow-xl">
            <div class="card-body">
                <h2 id="checkout" class="card-title">Checkout</h2>
                <p>Fill out the following information to checkout</p>
                <div class="card-actions justify-between items-end">
                    <div class="badge badge-lg p-4">Total: ${$cartPrice}</div>
                    <button class="btn btn-accent">Checkout</button>
                </div>
            </div>
        </div>
    </div>

</main>
