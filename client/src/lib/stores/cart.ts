import {derived, get, writable} from "svelte/store";
import type {Writable} from "svelte/store";
import {persist, createCookieStorage} from "@macfja/svelte-persistent-store"

const createCart = () => {
    const cart: Writable<CartItem[]> = writable([]);
    persist<CartItem[]>(cart, createCookieStorage(), "shopping-cart");
    const {subscribe, update}: Writable<CartItem[]> = cart;
    return {
        subscribe,
        addProduct: (product: Product) => {
            update(cartItems => {
                const cartItem = cartItems.find(cartItem => {
                    if (cartItem.product.id===product.id) return cartItem;
                });
                if (cartItem) cartItem.quantity++;
                else cartItems.push({product : product, quantity : 1});
                return cartItems;
            });
        },
        removeProduct: (product: Product) => {
            update(cartItems => {
                    return cartItems.filter(cartItem => {
                        if (cartItem.product.id !== product.id) return true;
                        else if (cartItem.quantity === 1) return false;
                        else if (cartItem.quantity > 1) {
                            cartItem.quantity--;
                            return true;
                        }
                    })
            });
        },
        quantity: () => {
            let totalQuantity: number = 0;
            get(cart).forEach((item) => {
                totalQuantity+=item.quantity;
            });
            return totalQuantity;
        },
        price: () => {
            let totalPrice: number = 0;
            get(cart).forEach((item) => {
                totalPrice+=(item.product.price * item.quantity);
            });
            return totalPrice;
        }
    }
}

export const cart = createCart();
