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

const useUserStore = create(
  persist(
    (set, get) => ({
      userInfo: intialState,
      resetUserInfo: (data) => set((state) => ({ userInfo: intialState })),
      setUserInfo: (data) =>
        set((state) => ({ userInfo: { ...state.userInfo, ...data } })),
      getToken: () => get().userInfo.accessToken
    }),
    {
      name: 'userStore',
    }
  )
);

export default useUserStore;
