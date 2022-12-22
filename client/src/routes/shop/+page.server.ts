import type {PageServerLoad} from "./$types";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals}) => {

    const productsResponse = await fetch('https://dummyjson.com/products');
    if (!productsResponse.ok) throw redirect(302, '/home');

    return {
        products: (await productsResponse.json())['products']
    }
}