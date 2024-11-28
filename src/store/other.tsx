import { create } from 'zustand';

interface otherStoreType {
  phone: string;
  setPhone: (phone: string) => void;
}

export const otherStore = create<otherStoreType>((set) => ({
  phone: '',
  setPhone: (phone) => set({ phone }),
}));