interface CartItem {
    product: Product
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

interface ConsentCookie {
    necessary : boolean,
    personalized : boolean
}

interface SearchStore {
    data: Product[],
    filtered: Product[],
    search: string
}