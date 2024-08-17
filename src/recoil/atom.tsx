import { atom } from 'recoil';

// authState 타입 정의
interface AuthState {
  isLoggedIn: boolean;
  user: { id: string; name: string } | null;
}

export const authState = atom<AuthState>({
  key: 'authState', // 고유한 키값
  default: {
    isLoggedIn: false,
    user: null,
  },
});
