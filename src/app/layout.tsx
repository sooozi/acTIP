import '@/public/css/index.css';
import Header from '@/src/components/layout/Header';
import NavBottom from '@/src/components/layout/NavBottom';
import type { Metadata } from 'next';
import MainMO from '../components/layout/MainMO';
import MainPC from '../components/layout/MainPC';

export const metadata: Metadata = {
  title: 'acTIP',
  icons: {
    icon: '/image/system/favicon.ico',
  },
};

declare global {
  interface Window {
    Kakao: unknown;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 스크립트 추가 */}
        <script
          defer
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
        ></script>
        {/* JavaScript SDK 추가하기 */}
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.js"
        ></script>

        {/* 메타 태그 추가 */}
        <meta
          name="description"
          content="acTIP을 통해 SNS 콘텐츠를 분류, 정리하고 실천까지 해보세요."
        />
        <meta
          name="keywords"
          content="SNS,SNS콘텐츠,콘텐츠저장,콘텐츠보관,콘텐츠정리,플래너,액션,정보콘텐츠,꿀팁콘텐츠,콘텐츠실천,액팁,acTIPswyg,기획자,개발자,메타콘텐츠"
        />
        <meta property="og:site_name" content="acTIP" />
        <meta property="og:title" content="acTIP" />
        <meta
          property="og:description"
          content="acTIP을 통해 SNS 콘텐츠를 분류, 정리하고 실천까지 해보세요. "
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.actip.com" />
        <meta
          property="og:image"
          content="https://www.acTIP.com/public/image/system/logo_color.png"
        />
        <meta name="twitter:title" content="acTIP" />

        {/* 아이콘 추가 */}
        {/* IOS */}
        <link rel="apple-touch-icon" href="/image/system/logo_color.png" />
        {/* ANDROID */}
        <link rel="shortcut icon" href="/image/system/logo_color.png" />
      </head>
      <body>
        <main>
          <MainPC></MainPC>
          <MainMO>
            <Header></Header>
            {children}
            <NavBottom></NavBottom>
          </MainMO>
        </main>
      </body>
    </html>
  );
}
