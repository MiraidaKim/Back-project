import api from '../../../api/axios';

export const productApi = {
    list: async () => {
        const { data } = await api.get('/api/products/');
        return data;
    },
    byId: async (id) => {
        const { data } = await api.get(`/api/products/${id}`) 
        return data;
    },
    create: async (dataProduct) => {
        const { data } = await api.post('/api/products/', dataProduct);
        return data;
    },
    update: async (id, dataProduct) => {
        const { data } = await api.put(`/api/products/${id}`, dataProduct);
        return data;
    },
    remove: async (id) => {
        await api.delete(`/api/products/${id}`)
    }
}