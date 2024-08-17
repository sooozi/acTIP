/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URI: process.env.API_URI,
    REACT_APP_REST_API_KEY: process.env.REACT_APP_REST_API_KEY,
    REACT_APP_REDIRECT_URI: process.env.REACT_APP_REDIRECT_URI,
  },
  async rewrites() {
    return [
      {
        source: '/api/user/signup',
        destination: 'http://15.164.202.203:8080/api/user/signup',
      },
      {
        source: '/api/user/login',
        destination: 'http://15.164.202.203:8080/api/user/login',
      },
      {
        source: '/api/user/details/nickname',
        destination: 'http://15.164.202.203:8080/api/user/details/nickname',
      },
      {
        source: '/api/user/details/image',
        destination: 'http://15.164.202.203:8080/api/user/details/image',
      },
      {
        source: '/api/user/details/pw',
        destination: 'http://15.164.202.203:8080/api/user/details/pw',
      },
      {
        source: '/api/user/details/delete',
        destination: 'http://15.164.202.203:8080/api/user/details/delete',
      },
      {
        source: '/api/user/logout',
        destination: 'http://15.164.202.203:8080/api/user/logout',
      },
      {
        source: '/api/user/signup/kakao',
        // destination: 'http://15.164.202.203:8080/api/user/login/kakao',
        destination: 'http://15.164.202.203:8080/api/user/signup/kakao',
      },
      {
        source: '/api/tip',
        destination: 'http://15.164.202.203:8080/api/tip',
      },
      {
        source: '/api/tip/submit',
        destination: 'http://15.164.202.203:8080/api/tip/submit',
      },
      {
        source: '/api/tip/doing',
        destination: 'http://15.164.202.203:8080/api/tip/doing',
      },
      {
        source: '/api/tip/finish',
        destination: 'http://15.164.202.203:8080/api/tip/finish',
      },
      {
        source: '/api/tip/:id',
        destination: 'http://15.164.202.203:8080/api/tip/:id',
      },
      {
        source: '/api/tip/:id/actCnt',
        destination: 'http://15.164.202.203:8080/api/tip/:id/actCnt',
      },
      {
        source: '/api/board/search',
        destination: 'http://15.164.202.203:8080/api/board/search',
      },
      {
        source: '/api/board/category/:id',
        destination: 'http://15.164.202.203:8080/api/board/category/:id',
      },
      {
        source: '/api/board/submit',
        destination: 'http://15.164.202.203:8080/api/board/submit',
      },
    ];
  },
};

module.exports = nextConfig;
