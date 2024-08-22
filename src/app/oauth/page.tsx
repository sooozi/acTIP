// @ts-nocheck
'use client';

//https://data-jj.tistory.com/53
//https://dygreen.tistory.com/entry/React-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EB%8B%A4-%ED%95%98%EA%B8%B0-%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8F%AC%ED%95%A8

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import DoingPage from '../my/doing/page';

// export default function OauthMyPage() {
//   // const queryParams = new URLSearchParams(window.location.search);
//   // const code = queryParams.get('code');
//   const [code, setCode] = useState<string | null>(null);
//   const router = useRouter();
//   let isSuccessed = false;
//   console.log('Received code:', code);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       new URL(window.location.href).searchParams.get('code') &&
//         setCode(new URL(window.location.href).searchParams.get('code'));
//       console.log(code);
//       // 1. 인가코드 추출
//     }
//   }, []);
//   const kakaoLogin = async () => {
//     // 3. 추출된 인가코드로 백엔드에 로그인 요청
//     try {
//       const res = await axios.get(
//         `http://15.164.202.203:8080/api/user/login/kakao?code=${code}`
//       );
//       if (res.status === 200) {
//         // 로그인 성공 시 로직 처리
//         isSuccessed = true;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     if (isSuccessed) {
//       router.replace('/');
//     }
//   };
//   useEffect(() => {
//     code !== null && kakaoLogin();
//     // 2. 인가코드 추출되면 kakaoLogin 로직 실행
//   }, [code]);

//   return (
//     <>
//       <DoingPage />
//     </>
//   );
// }

// 'use client';

import { useEffect } from 'react';
import DoingPage from '../my/doing/page';

export default function OauthMyPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  console.log('Authorization code:', code); // 이 줄 추가

  // const url = `http://15.164.202.203:8080/api/user/login/kakao?code=${code}`;
  // window.open(url, '_blank'); // 새 탭에서 링크 열기

  // const headers = {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // };

  useEffect(() => {
    if (code) {
      fetch(`http://15.164.202.203:8080/api/user/login/kakao?code=${code}`, {
        method: 'GET',
        // headers: headers,
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Response data:', data);
          if (data.result) {
            console.log('User ID:', data.result.user_id);
            console.log('JWT:', data.result.jwt);
          } else {
            console.error('Unexpected response structure:', data);
          }
        })
        .catch((error) => {
          console.error('오류 발생:', error.message);
          console.error('Error details:', error);
        });
    } else {
      console.error('Authorization code is missing');
    }
  }, [code]);

  return (
    <>
      <DoingPage />
    </>
  );
}
