import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const sendCodeToBackend = async () => {
      const { code } = router.query;

      if (code) {
        try {
          // 인가 코드를 백엔드로 전송
          await axios.post('http://15.164.202.203:8080/api/user/login/kakao', {
            code,
          });

          // 전송 성공 시 /my/doing 페이지로 리다이렉트
          router.push('/my/doing');
        } catch (error) {
          console.error('Failed to send code to backend:', error);
          // 오류가 발생하면 적절한 오류 처리를 할 수 있습니다.
        }
      }
    };

    sendCodeToBackend();
  }, [router]);

  return <div>Redirecting...</div>;
};

export default CallbackPage;
