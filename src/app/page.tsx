'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckBox } from '../components/icon/IconSVG';
import LoginPage from './user/login/page';

export default function Home() {
  return (
    <>
      <div className="page-mo-root">
        <div className="mo-main-txt">
          <span className="font-color-white font-20 line-15">
            We exist to help you
          </span>
          <br />
          <span className="font-color-white font-20 line-15">with </span>
          <span className="d-inline-block p-relative top5">
            <CheckBox color="#00e01f" />
          </span>
          <span className="font-highlight-underline font-20 line-15 ml5">
            everyTIP
          </span>
          <span className="font-color-white font-20 line-15">
            {' '}
            you aim for.
          </span>
        </div>
        <Image
          className="mo-main-img"
          src="/image/system/logo_color.png"
          alt="logo"
          width={140}
          height={114}
        />
        <Link href="/user/login">
          <h1 className="mo-main-logoTit font-highlight font-20">
            [ start → ]
          </h1>
        </Link>
      </div>
      <div className="page-pc-root">
        <LoginPage />
      </div>
    </>
  );
}
