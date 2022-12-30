import {get, writable} from "svelte/store";
import type {Writable} from "svelte/store";
// TODO 1: Make this store persistent


const createCart = () => {
    const cart: Writable<CartItem[]> = writable([]);
    const {subscribe, set}: Writable<CartItem[]> = cart;

    return {
        subscribe,
        addProduct: (product: Product) => {
            const tempCart = get(cart);
            let productAlreadyInCart;
            tempCart.forEach((cartItem: CartItem) => {
                if (cartItem.productId===product.id) {
                    cartItem.quantity+=1;
                    productAlreadyInCart = true;
                }
            });
            if (!productAlreadyInCart)  {
                tempCart.push({
                    productId: product.id,
                    quantity : 1,
                });
            }
            set(tempCart);
        },
        removeProduct: (product: Product) => {
            const tempCart = get(cart);
            tempCart.forEach((cartItem: CartItem) => {
                if (cartItem.productId===product.id) {
                    tempCart.splice(tempCart.indexOf(cartItem, 1));
                    return;
                }
            });
            set(tempCart);
        },
        quantity: () => {
            if (get(cart).length < 1) return 0;
            get(cart).reduce((acc, item) => {
                acc.quantity+=item.quantity
                return acc;
            });
            let quantity: number = 0;
            get(cart).forEach((item) => {
                quantity+=item.quantity;
            });
            return quantity;
        }
    };
}

export const cart = createCart();
