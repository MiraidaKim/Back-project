import { create } from "zustand";


const LS_KEY = 'cartItems';
const readLS = () => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}

export const useCartStore = create((set, get) =>  ({
    items: readLS(),

    _persist() {localStorage.setItem(LS_KEY, JSON.stringify(get().items))},

    add(product, qty = 1) {
        const items = [...get().items];
        const idx = items.findIndex(i => i.id === product.id);
        if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + qty }
        else items.push({ id: product.id, title: product.title, image:product.image, qty, product})
        set({ items }); get()._persist()
    },

    setQty(id, qty) {
        const items = get().items.map(i => i.id === id ? {...i, qty} : i).filter(i => i.qty > 0) 
        set({items}); get()._persist()
    },

    remove(id) { 
        const items = get().items.filter(i => i.id !== id);
        set({ items }); get()._persist()
    },
    clear() { set({ items: [] }); get()._persist() }
}))