// @ts-nocheck

'use client';

import useUserStore from '@/src/store/userUserStore';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const search = useCallback((refresh = false) => {
    if (pagingState === 'loading') return; // Prevent multiple simultaneous requests

      setPagingState('loading');
      axios
        .get(url + `&pageSize=${size}&cursor=${cursor ? cursor : ''}`, {
          headers: {
            Authorization: getToken(),
          },
        })
        .then((res) => {
          let itemList = res.data.payload.contents || [];
          setCursor(res.data.payload.nextCursor || '');
          setPageLast(itemList.length === 0);

          if (refresh) {
            setPageItem(itemList);
          } else {
            setPageItem((prevItems) => [...prevItems, ...itemList]);
          }

          setPagingState('idle');
        })
        .catch((err) => {
          console.error('API 요청 오류:', err);
          setPagingState('idle');
        });
    },
    [url, cursor, pagingState, getToken, size]
  );

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
  }, [pageLast, search]);

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
