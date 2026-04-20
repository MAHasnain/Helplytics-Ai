import { create } from 'zustand';
import api from '@/lib/axios';
import { UserState } from '@/types/auth';

const useUserStore = create<UserState>((set) => ({
  
  leaderboard: [],
  dashboard: null,
  isLoading: false,

  getLeaderboard: async () => {
    try {
      const { data } = await api.get('/users/leaderboard');
      set({ leaderboard: data.data });
    } catch (err) { console.log(err); }
  },

  getDashboard: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/users/dashboard');
      set({ dashboard: data.data, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  completeOnboarding: async (formData: any) => {
    try {
      await api.post('/users/onboarding', formData);
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  },
}));

export default useUserStore;