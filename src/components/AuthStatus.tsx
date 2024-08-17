import React from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atom';

const AuthStatus: React.FC = () => {
  const auth = useRecoilValue(authState); // authState의 값을 읽기

  console.log('Current Auth State:', auth); // 현재 로그인 상태를 콘솔에 출력

  return null; // 렌더링할 UI가 없으므로 null 반환
};

export default AuthStatus;
