'use client';

import { useEffect } from 'react';
import DoingPage from '../my/doing/page';

export default function OauthMyPage() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    console.log('Authorization codesss:', code); // 이 줄 추가

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    useEffect(() => {
    fetch(`http://15.164.202.203:8080//api/user/login/kakao?code=${code}`, {
      method: "POST", // 
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.result.user_id);
        console.log(data.result.jwt);
      })
      .catch((error) => {
        console.error("오류 발생", error); //
      });
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
