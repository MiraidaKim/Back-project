import axios from 'axios';
import { useAuthStore } from '../utils/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://nu.tipo.lol",
  headers: {'Content-Type': 'application/json'}
})

api.interceptors.request.use((config) => {
    const {accessToken} = useAuthStore.getState();
    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

let isRefreshing = false;
let queue = []
const processQueue = (error, token = null) => {
    queue.forEach(p => (error ? p.reject(error) : p.resolve(token)))
    queue = []
}

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.response?.status;
        if (!original || original._retry) throw error;

        const {status} = error.response?.status;
        if (status === 401) {
            original._retry = true;
            const {refreshToken } = useAuthStore.getState();
            if (!refreshToken) {
                useAuthStore.getState().logout();
                return api(original)
            }
            try {
                if (isRefreshing) {
                    const newAccess = await new Promise((resolve, reject) => {
                        queue.push({resolve, reject})
                    });
                    original.headers.Authorization = `Bearer ${newAccess}`;
                    return api(original)
                }
                isRefreshing = true;
                const resp = await axios.post(
                    `${api.defaults.baseURL}/api/auth/refresh`,
                    {refreshToken},
                );
                const {accessToken, refreshToken: newRefresh} = resp.data;
                useAuthStore.getState().updateTokens({accessToken, refreshToken: newRefresh});
                processQueue(null, accessToken);
                original.headers.Authorization = `Bearer ${accessToken}`;
                return api(original);
            } catch (e) {
                processQueue(e, null)
                useAuthStore.getState().logout();
                throw e
            } finally {
                isRefreshing = false
            }
        }
        throw error;
    }
)  

export default api