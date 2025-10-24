import api from "../../../api/axios"

export const cartApi = {


    add: async ({ productId, quantity }) => {
        const { data } = await api.post('/api/cart', { productId: String(productId), quantity: String(quantity) });
        return data
    }

    
}