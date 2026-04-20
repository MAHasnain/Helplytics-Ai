// store/requestStore.js
import { create } from 'zustand';
import api from '@/lib/axios';

const useRequestStore = create((set) => ({
  requests: [],
  request: null,
  isLoading: false,
  error: null,

  getRequests: async (filters = {}) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/requests', { params: filters });
      set({ requests: data.data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message, isLoading: false });
    }
  },

  getRequestById: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get(`/requests/${id}`);
      set({ request: data.data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message, isLoading: false });
    }
  },

  createRequest: async (formData) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/requests', formData);
      set((state) => ({ requests: [data.data, ...state.requests], isLoading: false }));
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message, isLoading: false });
      return { success: false };
    }
  },

  offerHelp: async (id) => {
    try {
      await api.post(`/requests/${id}/help`);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  },

  markSolved: async (id) => {
    try {
      await api.patch(`/requests/${id}/solve`);
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  },
}));

export default useRequestStore;