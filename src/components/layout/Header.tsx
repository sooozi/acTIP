// @ts-nocheck
'use client';

import useUserStore from '@/src/store/userUserStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Close } from '../icon/IconSVG';

interface UserInfo {
  nickName: string;
}

export default function Header() {
  const pathname = usePathname();

  const router = useRouter();

  const { userInfo, resetUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    resetUserInfo: state.resetUserInfo,
  })) as UserInfo;

  const pageInfoList = [
    {
      url: '/my/doing',
      urlRegex: null,
      pageTitle: 'my',
      closeBtn: false,
      closeUrl: '',
      common: true,
      custom: true,
    },
    {
      url: '/oauth',
      urlRegex: null,
      pageTitle: 'my',
      closeBtn: false,
      closeUrl: '',
      common: true,
      custom: true,
    },
    {
      url: '/my/finish',
      urlRegex: null,
      pageTitle: 'my',
      closeBtn: false,
      closeUrl: '',
      common: true,
      custom: true,
    },
    {
      url: '/my/tip',
      urlRegex: /^\/my\/tip\/\d+$/,
      pageTitle: 'my tip',
      closeBtn: true,
      closeUrl: '/my/doing',
      common: true,
      custom: false,
    },
    {
      url: '/my/new',
      urlRegex: null,
      pageTitle: 'new tip',
      closeBtn: true,
      closeUrl: '/my/doing',
      common: true,
      custom: false,
    },
    {
      url: '/my/edit/',
      urlRegex: /^\/my\/edit\/\d+$/,
      pageTitle: 'edit tip',
      closeBtn: true,
      closeUrl: '/my/doing',
      common: true,
      custom: false,
    },
    {
      url: '/board/category',
      urlRegex: null,
      pageTitle: 'board',
      closeBtn: false,
      closeUrl: '',
      common: true,
      custom: false,
    },
    {
      url: '/board/category',
      urlRegex: /^\/board\/category\/\d+$/,
      pageTitle: 'board',
      closeBtn: true,
      closeUrl: '',
      common: true,
      custom: false,
    },
    {
      url: '/board/search',
      urlRegex: null,
      pageTitle: 'board',
      closeBtn: true,
      closeUrl: '',
      common: true,
      custom: false,
    },
    {
      url: '/board/detail/',
      urlRegex: /^\/board\/detail\/\d+$/,
      pageTitle: 'add tip',
      closeBtn: true,
      closeUrl: '/board/search',
      common: true,
      custom: false,
    },
    {
      url: '/user/profile',
      urlRegex: null,
      pageTitle: 'my',
      closeBtn: true,
      closeUrl: '/my/doing',
      common: true,
      custom: false,
    },
  ];

  const pageInfo = pageInfoList.find((page) => {
    return page.url === pathname || page.urlRegex?.test(pathname);
  });

  const isUserPath =
    pathname.includes('/user/profile') ||
    pathname.includes('/user/del_account');

  useEffect(() => {
    if (pathname === '/user/login') {
      resetUserInfo();
    }
  }, [pathname, resetUserInfo]);

  const isFixedPage = pathname === '/my/doing' || pathname === '/my/finish';

  return (
    <>
      <header>
        <div></div>
        <div>
          {pageInfo?.closeBtn ? (
            <div
              className="pointer"
              onClick={() => {
                // router.back();
                if (pageInfo.closeUrl) {
                  router.push(pageInfo.closeUrl);
                } else {
                  router.back();
                }
              }}
            >
              {pageInfo?.closeBtn && <Close />}
            </div>
          ) : (
            !isUserPath && (
              <span
                className={`fonrUnderLine pointer ${isUserPath ? 'userPath' : ''}`}
                onClick={() => {
                  if (!isUserPath) {
                    router.push('/user/profile');
                  }
                }}
              >
                {userInfo?.nickName || 'Welcome 👽'}
              </span>
            )
          )}
        </div>
      </header>
      {pageInfo?.common && (
        <div className={`page-top ${isFixedPage ? 'fixed' : ''}`}>
          <div>
            
            <div>
              <div></div>
              <div></div>
            </div>

            <div>
              <h1 className="font-24">{pageInfo?.pageTitle}</h1>
              <div>
                {pageInfo?.custom && (
                  <div
                    className="addIcon"
                    onClick={() => {
                      router.push('/my/new');
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
