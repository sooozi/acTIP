// .env 파일에서 환경 변수 가져오기
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

// Kakao OAuth URL 생성
const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
console.log(REDIRECT_URI);

// 생성된 Kakao OAuth URL 내보내기
export default kakaoAuthURL;
