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

  // Use useCallback to memoize the findItem function
  const findItem = useCallback(async () => {
    await axios
      .get('/api/tip/finish?pageSize=15', {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        let itemList = [];
        res.data.payload.contents.forEach((item) => {
          itemList.push({
            id: item.id,
            title: item.tipTitle,
            progress: item.presentPercent,
            dDay: item.d_day,
          });
        });

        setPageItem(itemList);
      });
  }, [getToken]);

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
