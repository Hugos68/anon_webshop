<script>
    import {flip} from "svelte/animate";
    import ShoppingCartItem from "$lib/components/ShoppingCartItem.svelte";
    import {cart, cartQuantity, cartPrice} from "$lib/stores/cart.ts";
</script>

<div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-circle btn-ghost text-accent">
        <div class="indicator">
            <span class="indicator-item indicator-bottom indicator-start badge badge-accent">{$cartQuantity}</span>
            <svg class="w-6 h-6" viewBox="0 0 476.944 476.944" fill="currentColor"><g><path d="M84.176,379.875c-26.762,0-48.535,21.772-48.535,48.534s21.772,48.534,48.535,48.534c26.762,0,48.534-21.772,48.534-48.534                           S110.938,379.875,84.176,379.875z M84.176,446.944c-10.22,0-18.535-8.314-18.535-18.534s8.314-18.534,18.535-18.534                           c10.22,0,18.534,8.314,18.534,18.534S94.396,446.944,84.176,446.944z"/><path d="M342.707,379.875c-26.762,0-48.534,21.772-48.534,48.534s21.772,48.534,48.534,48.534                           c26.762,0,48.535-21.772,48.535-48.534S369.469,379.875,342.707,379.875z M342.707,446.944c-10.22,0-18.534-8.314-18.534-18.534                           s8.314-18.534,18.534-18.534c10.22,0,18.535,8.314,18.535,18.534S352.927,446.944,342.707,446.944z"/><path d="M413.322,0l-9.835,60H1.999l28.736,175.88c4.044,24.67,26.794,43.995,51.794,43.995h284.917l-6.557,40H50.642v30h335.73                           L438.804,30h36.141V0H413.322z M372.363,249.875H82.529c-10.174,0-20.543-8.808-22.188-18.841L37.298,90h361.271L372.363,249.875z"/></g></svg>
        </div>
    </label>

    <ul tabindex="0" class="dropdown-content gap-2 menu p-2 text-lg rounded-box bg-secondary border-4 border-accent text-accent">
        <h2 class="text-center text-2xl font-semibold">Shopping cart</h2>
        {#if $cartQuantity > 0}
            <div class="flex flex-col gap-2 flex-nowrap overflow-y-scroll max-h-96">
                {#each $cart as cartItem (cartItem.product.id)}
                    <div class="w-[min(20rem,50vw)] max-w-32 bg-primary rounded-box" animate:flip>
                        <ShoppingCartItem {cartItem} />
                    </div>
                {/each}
            </div>
            <li>
                <a class="btn btn-accent text-secondary" data-sveltekit-preload-data="hover" href="/cart">Go to Checkout</a>
            </li>
        {:else}
            <p class="text-center py-4">Your cart is empty</p>
            <li>
                <a class="btn btn-accent text-secondary" data-sveltekit-preload-data="hover" href="/shop">Go to Shop</a>
            </li>
        {/if}
    </ul>
</div>