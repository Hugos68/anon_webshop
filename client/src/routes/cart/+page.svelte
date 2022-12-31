<script lang="ts">
    import {cart} from "$lib/stores/cart";
</script>

<h1>Shopping cart</h1>
{#each $cart as cartItem}
    <div class="cartListing">
        <p class="title">{cartItem.product.title}</p>
        <div class="quantity-controls">
            <button class="subtract" on:click={() => cart.removeProduct(cartItem.product)}><svg viewBox="0 0 16 16"><path fill="#000000" fill-rule="evenodd" d="M3.5 7.75A.75.75 0 014.25 7h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z" clip-rule="evenodd"/></svg></button>
            <p>{cartItem.quantity}</p>
            <button class="add" on:click={() => {cart.addProduct(cartItem.product)}}><svg viewBox="0 0 1024 1024"><path d="M576.477 448.471l349.649.621c35.346.041 63.967 28.728 63.926 64.074s-28.728 63.967-64.074 63.926l-349.429-.621.194 349.647c.013 35.346-28.63 64.01-63.977 64.023s-64.01-28.63-64.023-63.977l-.195-349.921-349.622-.621C63.58 575.581 34.959 546.894 35 511.548s28.728-63.967 64.074-63.926l349.402.621-.194-349.361c-.013-35.346 28.63-64.01 63.977-64.023s64.01 28.63 64.023 63.977l.194 349.635z"/></svg></button>
        </div>
    </div>
{/each}
{#key $cart}
    <div>
        <p>Total: ${cart.price()}</p>
    </div>
{/key}

<style>
    .title {
        font-size: 1.5rem;
    }
    .cartListing {
        display: flex;
        gap: 2rem;
    }
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .quantity-controls > button {
        min-width: unset;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
    }
    .subtract {
        background-color: #ff9999;
    }
    .add {
        background-color: #99ff99;
    }

</style>