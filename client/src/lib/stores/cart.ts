import {get, writable} from "svelte/store";
import type {Writable} from "svelte/store";
// TODO 1: Make this store persistent


const createCart = () => {
    const cart: Writable<CartItem[]> = writable([]);
    const {subscribe, set}: Writable<CartItem[]> = cart;

    return {
        subscribe,
        addProduct: (product: Product) => {
            const cartItems = get(cart);
            const cartItem = cartItems.find(cartItem => {
                if (cartItem.productId===product.id) return cartItem;
            });
            if (cartItem) cartItem.quantity++;
            else cartItems.push({productId : product.id, quantity : 1});
            set(cartItems);
        },
        removeProduct: (product: Product) => {
            const cartItems = get(cart);
            const filteredCartItems = cartItems.filter(cartItem => {
                if (cartItem.productId!==product.id) return true;
                else if (cartItem.quantity===1) return false;
                else if (cartItem.quantity>1) {
                    cartItem.quantity--;
                    return true;
                }
            })
            set(filteredCartItems);
        },
        quantity: () => {
            let totalQuantity: number = 0;
            get(cart).forEach((item) => {
                totalQuantity+=item.quantity;
            });
            return totalQuantity;
        }
    };
}

export const cart = createCart();
