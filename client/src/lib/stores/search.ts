import {writable} from "svelte/store";
import type {Writable} from "svelte/store";

export const createSearchStore = (data: Product[]) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: ''
    }) satisfies Writable<SearchStore>
    return { subscribe, set, update };
}

export const filterHandler = (store: SearchStore) => {
    const searchTerm = store.search.toLowerCase() || "";
    store.filtered = store.data.filter((item:any) => {
        return item.searchTerms.toLowerCase().trim().includes(searchTerm.trim());
    });
}
