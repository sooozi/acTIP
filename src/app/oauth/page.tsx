'use client';

import axios from 'axios';
import { useEffect } from 'react';
import DoingPage from '../my/doing/page';

export default function OauthMyPage() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    console.log('Authorization code:', code); // 이 줄 추가
    if (code) {
      axios
        .post('http://15.164.202.203:8080//api/user/login/kakao', { code })
        .then((response) => {
          console.log('응답 데이터:', response.data);
          localStorage.setItem('name', response.data.user_name); // 사용자 이름 또는 토큰 저장
        })
        .catch((error) => {
          console.error('카카오 로그인 중 오류 발생:', error);
          console.log('code:', code);

          if (error.response) {
            console.error('서버 오류 응답 데이터:', error.response.data);
            alert(`서버 오류: ${error.response.data.message}`);
          } else if (error.request) {
            console.error('서버로부터 응답이 없음:', error.request);
            alert('서버로부터 응답을 받지 못했습니다.');
          } else {
            console.error('요청 설정 중 오류 발생:', error.message);
            alert('요청 설정 중 오류가 발생했습니다.');
          }
        });
    } else {
      console.error('쿼리 파라미터에 인증 코드가 없습니다.');
    }
  }, []);

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const code = queryParams.get('code');
  //   console.log(`Received code: ${code}`);

  //   // 서버 URL
  //   const apiUrl = `${process.env.API_URI}/oauth/kakaoLogin`;

  //   // 요청 데이터
  //   const data = {
  //     code: code,
  //   };

  //   axios
  //     .post(apiUrl, data)
  //     .then((response) => {
  //       console.log('Response data:', response.data);
  //       alert('Success!');
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);

  //       if (error.response) {
  //         // 서버 응답이 있는 경우
  //         console.error('Server responded with:', error.response.data);
  //         alert(`Error: ${error.response.data.message}`);
  //       } else if (error.request) {
  //         // 요청이 전송되었지만 응답을 받지 못한 경우
  //         console.error('No response received:', error.request);
  //         alert('No response received from the server.');
  //       } else {
  //         // 요청을 설정하는 동안 에러가 발생한 경우
  //         console.error('Request setup error:', error.message);
  //         alert('Error occurred during the request setup.');
  //       }
  //     });
  // }, []);

  return (
    <>
      <DoingPage />
    </>
  );
}
