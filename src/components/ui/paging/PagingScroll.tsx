// @ts-nocheck

'use client';

import { useEffect, useRef, useState } from 'react';
import Spinner from '../system/Spinner';
import axios from 'axios';
import useUserStore from '@/src/store/userUserStore';

interface PagingScrollProps {
  url: unknown;
  size: unknown;
  PageItem: unknown;
}

export default function PagingScroll({
  url,
  size = 20,
  PageItem,
}: PagingScrollProps) {
  const ref = useRef(null);
  const isInitialMount = useRef(true);
  const getToken = useUserStore((state) => state.getToken);

  const [cursor, setCursor] = useState('');
  const [pageItem, setPageItem] = useState([]);
  const [pageLast, setPageLast] = useState(false);
  const [pagingState, setPagingState] = useState();

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
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !pageLast) {
          search();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, pageLast, cursor]);

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
