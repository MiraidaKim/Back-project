import api from "../../../api/axios"

export const authApi = {
    register: async (payload) => {
        const { data } = await api.post(`/api/auth/register`, payload);
        return data
    },

    
    login: async (payload) => {
        const { data } = await api.post(`/api/auth/login`, payload);
        return data; 
    },


    logout: async (refreshToken) => {
        try {
            await api.post(`/api/auth/logout`, { refreshToken });
        } catch (e) {
            console.error('Logout error', e);
        }
    }
}