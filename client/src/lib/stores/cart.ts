import type {Writable} from "svelte/store";
import {derived, readable, writable} from "svelte/store";
import {createCookieStorage, persist} from "@macfja/svelte-persistent-store"

const createCart = () => {
    const cart: Writable<CartItem[]> = writable([]);
    persist<CartItem[]>(cart, createCookieStorage(), "shopping-cart");
    const {subscribe, update}: Writable<CartItem[]> = cart;
    return {
        subscribe,
        addProduct: (product: Product) => {
            update(cart => {
                const cartItem: CartItem | undefined = cart.find(cartItem => {
                    if (cartItem.product.id===product.id) return cartItem;
                });
                if (cartItem) {
                    cartItem.quantity++;
                }
                else cart.push({product : product, quantity : 1});
                return cart;
            });
        },
        removeProduct: (product: Product) => {
            update(cart => {
                return cart.filter(cartItem => {
                    if (cartItem.product.id !== product.id) return true;
                    else if (cartItem.quantity === 1) return false;
                    else if (cartItem.quantity > 1) {
                        cartItem.quantity--;
                        return true;
                    }
                });
            });
        }
    }
}

export const cart = createCart();

export const cartPrice = derived(cart, (cart) => {
    let totalPrice: number = 0;
    cart.forEach(cartItem => {
        totalPrice+= cartItem.product.price * cartItem.quantity;
    });
    return totalPrice;
});

export const cartQuantity = derived(cart, (cart) => {
    let totalQuantity: number = 0;
    cart.forEach(cartItem => {
        totalQuantity+=cartItem.quantity;
    });
    return totalQuantity;
});
