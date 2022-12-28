import { writable} from "svelte/store";

export const createSearchStore = (data : object) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: '',
        priceRange : [0, 2000]
    });
    return { subscribe, set, update };
}

export const filterHandler = (store:any) => {
    const searchTerm = store.search.toLowerCase() || "";
    store.filtered = store.data.filter((item:any) => {
        const includesSearchTerm = item.searchTerms.toLowerCase().includes(searchTerm);
        const withinPriceRange = item.price > store.priceRange[0] && item.price < store.priceRange[1];
        return includesSearchTerm && withinPriceRange;
    });
}
