import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';
import type { registerUserPayload, loginUserPayload, UpdatedData, AuthState } from '@/types/auth';

const useAuthStore = create(
    persist(
        (set) => ({
            //  State
            user: null,
            token: null,
            isLoading: false,
            error: null,

            // Actions 
            login: async (userData: loginUserPayload) => {
                set({ isLoading: true, error: null });
                try {
                    console.log('Login data:', userData);
                    const { data } = await api.post('/auth/login', userData);
                    set({ user: data.data.loggedInUser, token: data.data.accessToken, isLoading: false });
                    return { success: true };
                } catch (err: any) {
                    console.log('Login error:', err.response?.data);
                    const message = err.response?.data?.message ||
                        err.message ||
                        'Something went wrong';
                    set({ error: message, isLoading: false });
                    return { success: false };
                }
            },

            register: async (userData: registerUserPayload) => {
                set({ isLoading: true, error: null });
                try {
                    const { data } = await api.post('/auth/register', userData);
                    set({ user: data.data.user, token: data.data.accessToken, isLoading: false });
                    return { success: true };
                } catch (err: any) {
                    const message = err.response?.data?.message ||
                        err.message ||
                        'Something went wrong';
                    set({ error: message, isLoading: false });
                    return { success: false };
                }
            },

            updateProfile: async (userData: UpdatedData) => {
                set({ isLoading: true, error: null });
                try {
                    const { data } = await api.patch('/users/profile', userData);

                    set((state: any) => ({
                        user: { ...state.user, ...data.data },
                        isLoading: false
                    }));

                    return { success: true };
                } catch (err: any) {
                    const message =
                        err.response?.data?.message ||
                        err.message ||
                        'Something went wrong';
                    set({ error: message, isLoading: false });
                    return { success: false };
                }
            },

            logout: () => {
                set({ user: null, token: null, error: null });
            },

            clearError: () => set({ error: null }),
        }),

        {
            name: 'auth-storage',
            partialize: (state: AuthState) => ({ user: state.user, token: state.token }) as Partial<AuthState>,
        }
    )
);

export default useAuthStore;