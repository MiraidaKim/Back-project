import { create } from "zustand";
import { storage } from '../utils/storage'

export const useAuthStore = create((set) => ({
    accessToken: storage.getAccess() || null,
    refreshToken: storage.getRefresh() || null,
    user: storage.getUser() || null,
    isHydrated: true,

    setSession: ({ accessToken, refreshToken, user}) => {
        storage.saveTokens({ accessToken, refreshToken})
        storage.saveUser(user);
        set({ accessToken, refreshToken, user })
    },

    updateTokens: ({ accessToken, refreshToken }) => {
        storage.saveTokens({accessToken, refreshToken});
        set({ accessToken, refreshToken })
    },

    logout: () => {
        storage.clearAll();
        set({ accessToken: null, refreshToken: null, user: null })
    }
})) 