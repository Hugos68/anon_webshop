<script lang="ts">
    import {cart} from "$lib/stores/cart.ts";
    export let cartItem;
</script>

<div class="flex items-center justify-between">

    <div class="card w-full text-accent">
        <div class="card-body">
            <h2 class="card-title">{cartItem.product.title}</h2>
            <p class="truncate">{cartItem.product.description}</p>
            <div class="flex items-center">
                <button class="w-8 h-8 btn btn-ghost btn-circle" on:click={cart.removeProduct(cartItem.product)}>
                    <svg viewBox="0 0 48 48"><path d="M24,3A21,21,0,1,0,45,24,21,21,0,0,0,24,3Z" fill="#f8bcc4"/><path d="M32,26H16a2,2,0,0,1,0-4H32A2,2,0,0,1,32,26Z" fill="#ee586c"/></svg>
                </button>
                <span class="px-1" >{cartItem.quantity}</span>
                <button class="w-8 h-8 btn btn-ghost btn-circle" on:click={cart.addProduct(cartItem.product)}>
                    <svg viewBox="0 0 48 48"><path d="M24,3A21,21,0,1,0,45,24,21,21,0,0,0,24,3Z" fill="#afe0f5"/><path d="M32,26H16a2,2,0,0,1,0-4H32A2,2,0,0,1,32,26Z" fill="#38b1e7"/><path d="M24,34a2,2,0,0,1-2-2V16a2,2,0,0,1,4,0V32A2,2,0,0,1,24,34Z" fill="#38b1e7"/></svg>
                </button>
            </div>
            <div class="badge badge-lg ml-auto">${cartItem.product.price}</div>
        </div>
    </div>

</div>