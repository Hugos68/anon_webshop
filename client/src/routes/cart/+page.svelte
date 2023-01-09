<script lang="ts">
    import {cart} from "$lib/stores/cart";
    import {flip} from "svelte/animate";

    console.log($cart);
</script>


<main class="flex md:flex-col gap-6">
    <div class="card w-[min(20rem, 25vw)] bg-primary  shadow-xl">
        <div class="card-body gap-6">
            <h2 class="card-title">Shopping cart</h2>
            {#key $cart}
                {#if cart.quantity() > 0}
                    {#each $cart as cartItem (cartItem.product.id)}
                        <div class="flex items-center justify-between" animate:flip={{duration: 250}}>
                            <button class="btn btn-ghost btn-circle" on:click={cart.removeProduct(cartItem.product)}>
                                <svg class="w-10 h-10" viewBox="0 0 48 48"><path d="M24,3A21,21,0,1,0,45,24,21,21,0,0,0,24,3Z" fill="#f8bcc4"/><path d="M32,26H16a2,2,0,0,1,0-4H32A2,2,0,0,1,32,26Z" fill="#ee586c"/></svg>
                            </button>
                            <div class="card bg-secondary text-accent">
                                <div class="card-body">
                                    <h2 class="card-title">{cartItem.product.title}</h2>
                                    <p>Amount: {cartItem.quantity}</p>
                                </div>
                            </div>
                            <button class="btn btn-ghost btn-circle" on:click={cart.addProduct(cartItem.product)}>
                                <svg class="w-10 h-10" viewBox="0 0 48 48"><path d="M24,3A21,21,0,1,0,45,24,21,21,0,0,0,24,3Z" fill="#afe0f5"/><path d="M32,26H16a2,2,0,0,1,0-4H32A2,2,0,0,1,32,26Z" fill="#38b1e7"/><path d="M24,34a2,2,0,0,1-2-2V16a2,2,0,0,1,4,0V32A2,2,0,0,1,24,34Z" fill="#38b1e7"/></svg>
                            </button>
                        </div>
                    {/each}
                {:else}
                    <h2 class="card-title">You have 0 products</h2>
                    <a href="/shop" class="btn">Go to shop</a>
                {/if}
            {/key}
        </div>
    </div>
    <div class="card w-[min(20rem, 25vw)] bg-primary shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Checkout</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Purchase</button>
            </div>
        </div>
    </div>
</main>
