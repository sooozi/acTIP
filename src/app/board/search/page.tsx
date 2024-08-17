// @ts-nocheck

'use client';

import { AddBtn, BookMark, Search } from '@/src/components/icon/IconSVG';
import PagingScroll from '@/src/components/ui/paging/PagingScroll';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [keyword, setKeyword] = useState([]);

  const pageItemTemplate = (params) => {
    return (
      <Link
        href={`/board/detail/${params.data.id}`}
        className="categoryListItem"
      >
        <div>
          <div>{params.data.title}</div>
          <div>
            <AddBtn width={24} height={24} />
          </div>
        </div>

        <div className="btn-dday">{params.data.categoryName}</div>

        <div>
          <BookMark width={20} height={20} />
        </div>
      </Link>
    );
  };

  const keywordChange = (event) => {
    setKeyword(event?.target.value);
  };

  return (
    <div>
      <div className="categorySearch mb0">
        <input value={keyword} type="text" onChange={keywordChange} />
        <Search color="white" />
      </div>

      <div>
        <PagingScroll
          url={`/api/board/search?keyword=${keyword}`}
          PageItem={pageItemTemplate}
        />
      </div>
    </div>
  );
}
