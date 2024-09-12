// @ts-nocheck

'use client';

import ProgressBar from '@/src/components/ui/progress/ProgressBar';
import Tab from '@/src/components/ui/tab/Tab';
import useUserStore from '@/src/store/userUserStore';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const getToken = useUserStore((state) => state.getToken);
  const [pageItem, setPageItem] = useState([]);

  const tabItems = [
    { name: 'doing', url: '/my/doing' },
    { name: 'finish', url: '/my/finish' },
  ];

  const findItem = useCallback(async () => {
    try {
      const res = await axios.get('/api/tip/doing?pageSize=15', {
        headers: {
          Authorization: getToken(),
        },
      });
      let itemList = res.data.payload.contents.map((item) => ({
        id: item.id,
        title: item.tipTitle,
        progress: item.presentPercent,
        dDay: item.d_day,
      }));
      setPageItem(itemList);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [getToken]); // getToken을 의존성에 추가

  useEffect(() => {
    findItem();
  }, [findItem]); // findItem을 의존성 배열에 추가

  return (
    <div className="subMO">
      <div className="tab-wrap">
        <Tab items={tabItems} />
      </div>

      <div className="cont-pdt50">
        {pageItem &&
          pageItem.map((item, index) => {
            return (
              <Link
                href={`/my/tip/${item.id}`}
                className="myItem"
                key={'doding' + index}
              >
                <div className="flex-c-sb">
                  <div>{item.title}</div>
                  <div>{item.progress + '%'}</div>
                </div>
                <div>
                  <ProgressBar percentage={item.progress} />
                </div>
                <div>
                  <div className="btn-dday">{'D - ' + item.dDay}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
