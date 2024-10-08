import '@/public/css/index.css';
import Header from '@/src/components/layout/Header';
import NavBottom from '@/src/components/layout/NavBottom';
import type { Metadata } from 'next';
import MainMO from '../components/layout/MainMO';
import MainPC from '../components/layout/MainPC';

export const metadata: Metadata = {
  title: 'Actip',
  icons: {
    icon: '/image/system/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
