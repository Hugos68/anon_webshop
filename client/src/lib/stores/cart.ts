import {writable} from "svelte/store";

interface cartitem {
    itemId: number,
    quantity:number
}

// TODO 1: Make this store persistent
// TODO 2: Types for this script

export const cart =  writable([]);

export const addProductToCart = (product) => {
    let cartItems = [];
    cart.subscribe(cart => {
        cartItems = cart;
    })
    cartItems.forEach((cartItem) => {
        if (cartItem.id === product.id) {
            cartItem.quanity+=1;
            cart.set(cartItems);
            return;
        }
    });
    cartItems.push({
        id: product.id,
        quanity: 1,
    });
    cart.set(cartItems);
    console.log(cartItems);
}