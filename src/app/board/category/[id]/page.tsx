// @ts-nocheck

'use client';

import PagingScroll from '@/src/components/ui/paging/PagingScroll';
import Link from 'next/link';
import {
  AddBtn,
  BookMark,
  CategoryBeauty,
  CategoryCompany,
  CategoryCook,
  CategoryEtc,
  CategoryExercise,
  CategoryMoney,
  CategoryRead,
  CategoryRelation,
  CategoryStudy,
} from '../../../../components/icon/IconSVG';

export default function page({ params }: { params: { id: string } }) {
  const category = {
    '1': {
      name: '운동',
      icon: <CategoryExercise />,
    },
    '2': {
      name: '뷰티&패션',
      icon: <CategoryBeauty />,
    },
    '3': {
      name: '요리',
      icon: <CategoryCook />,
    },
    '4': {
      name: '공부',
      icon: <CategoryStudy />,
    },
    '5': {
      name: '독서',
      icon: <CategoryRead />,
    },
    '6': {
      name: '금융',
      icon: <CategoryMoney />,
    },
    '7': {
      name: '인간관계',
      icon: <CategoryRelation />,
    },
    '8': {
      name: '회사생활',
      icon: <CategoryCompany />,
    },
    '9': {
      name: '기타',
      icon: <CategoryEtc />,
    },
  };

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

  return (
    <div>
      <div className="categoryListTitle">
        {category[params.id].icon}　{category[params.id].name}
      </div>

      <div>
        <PagingScroll
          url={`/api/board/category/${params.id}?temp=temp`}
          PageItem={pageItemTemplate}
        />
      </div>
    </div>
  );
}
