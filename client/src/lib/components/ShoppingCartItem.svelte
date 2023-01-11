<script lang="ts">
    import {cart} from "$lib/stores/cart";
    export let cartItem;
</script>

<div class="flex items-center justify-between">
    <button class="btn btn-ghost btn-circle" on:click={cart.removeProduct(cartItem.product)}>
        <svg class="w-10 h-10" viewBox="0 0 48 48"><path d="M24,3A21,21,0,1,0,45,24,21,21,0,0,0,24,3Z" fill="#f8bcc4"/><path d="M32,26H16a2,2,0,0,1,0-4H32A2,2,0,0,1,32,26Z" fill="#ee586c"/></svg>
    </button>
    <div class="card bg-secondary text-accent">
        <div class="card-body">
            <h2 class="card-title">{cartItem.product.title}</h2>
            <p class="py-8">Quantity: {cartItem.quantity}</p>
            <div class="card-actions justify-end">
                <div class="badge badge-lg">${cartItem.product.price}</div>
            </div>
        </div>
    </div>
    <button class="btn btn-ghost btn-circle" on:click={cart.addProduct(cartItem.product)}>
        <svg class="w-10 h-10" viewBox="0 0 48 48"><path d="M24,3A21,21,0,1,0,45,24,21,21,0,0,0,24,3Z" fill="#afe0f5"/><path d="M32,26H16a2,2,0,0,1,0-4H32A2,2,0,0,1,32,26Z" fill="#38b1e7"/><path d="M24,34a2,2,0,0,1-2-2V16a2,2,0,0,1,4,0V32A2,2,0,0,1,24,34Z" fill="#38b1e7"/></svg>
    </button>
</div>