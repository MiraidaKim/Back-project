import api from "../../../api/axios"

export const categoryApi = {
    list: async () => {
        const { data } = await api.get('/api/categories/');
        return data;
    },
    create: async (title) => {
        const { data } = await api.post('/api/categories/', { title });
        return data;
    }
}