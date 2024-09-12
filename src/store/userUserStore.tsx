/* eslint-disable */
// @ts-nocheck

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const intialState = {
  email: null,
  nickName: null,
  name: null,
  accessToken: null,
  refreshToken: null,
};

interface UserState {
  userInfo: typeof intialState;
  resetUserInfo: () => void;
  setUserInfo: (data: Partial<typeof intialState>) => void;
  getToken: () => string | null;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userInfo: intialState,
      resetUserInfo: () => set({ userInfo: intialState }),
      setUserInfo: (data) =>
        set((state) => ({ userInfo: { ...state.userInfo, ...data } })),
      getToken: () => get().userInfo.accessToken,
    }),
    {
      name: 'userStore',
    }
  )
);

export default useUserStore;
