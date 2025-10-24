const LS_KEYS = {
    ACCESS: 'accessToken',
    REFRESH: 'refreshToken',
    USER: 'authUser'
}

export const storage = {
    saveTokens: ({accessToken, refreshToken}) => {
        if (accessToken) localStorage.setItem(LS_KEYS.ACCESS, accessToken);
        if (refreshToken) localStorage.setItem(LS_KEYS.REFRESH, refreshToken);
    },
    saveUser: (user) => {
        localStorage.setItem(LS_KEYS.USER, JSON.stringify(user ?? null));
    },
    getAccess: () => localStorage.getItem(LS_KEYS.ACCESS),
    getRefresh: () => localStorage.getItem(LS_KEYS.REFRESH),
    getUser: () => {
        try {
            return JSON.parse(localStorage.getItem(LS_KEYS.USER) || 'null');
        } catch {
            return null
        }
    },
    clearAll: () => {
        localStorage.removeItem(LS_KEYS.ACCESS);
        localStorage.removeItem(LS_KEYS.REFRESH);
        localStorage.removeItem(LS_KEYS.USER);
    }
}