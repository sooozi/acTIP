'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBottom() {
  const pathname = usePathname();

  if (pathname.includes('/user') && pathname !== '/user/profile') {
    return null;
  }

  return (
    <nav className="navBottom">
      <div>
        <Link
          href="/my/doing"
          className={
            pathname === '/my/doing' ||
            pathname === '/my/finsih' ||
            pathname === '/user/profile'
              ? 'active1'
              : ''
          }
        >
          <span className="icon-dot"></span>
          <span className="icon-cont">🛸</span>
          <span className="txt-cont">my</span>
        </Link>
      </div>
      <div>
        <Link
          href="/board/category"
          className={pathname.includes('/board') ? 'active1' : ''}
        >
          <span className="icon-dot"></span>
          <span className="icon-cont">🛸</span>
          <span className="txt-cont">board</span>
        </Link>
      </div>
    </nav>
  );
}
