// @ts-nocheck

'use client';

import useUserStore from '@/src/store/userUserStore';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../system/Spinner';

interface PagingScrollProps {
  url: string;
  size?: number;
  PageItem: React.FC<{ data: unknown }>;
}

export default function PagingScroll({
  url,
  size = 20,
  PageItem,
}: PagingScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const getToken = useUserStore((state) => state.getToken);

  const [cursor, setCursor] = useState<string>('');
  const [pageItem, setPageItem] = useState<unknown[]>([]);
  const [pageLast, setPageLast] = useState<boolean>(false);
  const [pagingState, setPagingState] = useState<'idle' | 'loading'>('idle');

  const search = (refresh = false) => {
    setPagingState('loading');
    setPagingState('idle');
    axios
      .get(url + `&pageSize=8&cursor=${cursor ? cursor : ''}`, {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        let itemList = [];
        setCursor(res.data.payload.nextCursor);
        res.data.payload.contents.forEach((item) => {
          itemList.push(item);
        });

        if (res.data.payload.contents.length === 0) {
          setPageLast(true);
        }

        if (refresh) {
          setPageItem(itemList);
        } else {
          setPageItem([...pageItem, ...itemList]);
        }

        setPagingState('idle');
      });
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !pageLast) {
        search();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, pageLast, cursor, search]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      search(true);
      setCursor('');
      setPageLast(false);
      setPageItem([]);
    }
  }, [url]);

  return (
    <div>
      {pageItem.length === 0 && pagingState === 'idle' && (
        <div className="noItem">
          <div>검색결과에 해당하는 팁이 없습니다.</div>
        </div>
      )}

      {pageItem.map((item, index) => {
        return <PageItem key={index} data={item} />;
      })}

      <div>
        {pagingState === 'loading' && <Spinner />}
        {!pageLast && <div ref={ref}></div>}
      </div>
    </div>
  );
}
