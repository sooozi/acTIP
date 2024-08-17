'use client';

import FormTextSearch from '@/src/components/ui/form/FormTextSearch';
import TipListObject from '@/src/components/ui/tip/TipListObject';
import { getAxios } from '@/src/utils/axiosUtils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface TipItem {
  id: number;
  tipName: string;
}

function SelectPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [keyword, setKeyword] = useState<string>('');
  const [tipList, setTipList] = useState<TipItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const search = () => {
    router.push(`/tip/select?keyword=${keyword}`);
  };

  useEffect(() => {
    setKeyword(params.get('keyword') ? (params.get('keyword') as string) : '');
    getAxios(
      `/api/tip${params.get('keyword') ? '?keyword=' + params.get('keyword') : ''}`
    ).then((res) => {
      setTipList(res.data.items);
    });
  }, [params]);

  return (
    <div>
      <h2>팁 목록페이지</h2>
      <FormTextSearch
        value={keyword}
        placeholder="검색어를 입력해보세요?"
        onClick={search}
        onChange={handleInputChange}
      />

      <div>
        {tipList &&
          tipList.map((item: TipItem, index: number) => {
            return (
              <div key={index}>
                <TipListObject tipId={item.id} tipName={item.tipName} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default function page() {
  return (
    <Suspense>
      <SelectPage />
    </Suspense>
  );
}
