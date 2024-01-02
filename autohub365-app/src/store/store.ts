import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ICar } from '../types';

interface State {
  userToken: string | null;
  setUserToken: (userToken: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

export const useStore = create<State>()(
  devtools((set) => ({
    userToken: null,
    setUserToken: (userToken) => set(() => ({ userToken })),
    userId: null,
    setUserId: (userId) => set(() => ({ userId })),
  }))
);
