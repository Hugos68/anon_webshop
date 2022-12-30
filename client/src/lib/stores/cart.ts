import {writable} from "svelte/store";
import type {Writable} from "svelte/store";

interface CartItem {
    id: number
    quantity:number
}

interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string,
    images: []
}

// TODO 1: Make this store persistent

export const cart: Writable<CartItem[]> = writable([]);

export const addProductToCart = (product: Product) => {
    let cartItems: CartItem[] = [];
    cart.subscribe(cart => {
        cartItems = cart;
    })
    let itemAlreadyExists;
    cartItems.forEach((cartItem) => {
        if (cartItem.id === product.id) {
            cartItem.quantity+=1;
            console.log(cartItem);
            cart.set(cartItems);
            itemAlreadyExists= true;
        }
    });
    if (!itemAlreadyExists) {
        cartItems.push({
            id: product.id,
            quantity: 1,
        });
        cart.set(cartItems);
    }
}