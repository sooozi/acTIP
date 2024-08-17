// @ts-nocheck

'use client';

import {
  CategoryExercise,
  CategoryBeauty,
  CategoryCook,
  CategoryStudy,
  CategoryRead,
  CategoryMoney,
  CategoryRelation,
  CategoryCompany,
  CategoryEtc,
  Search,
} from '../../../components/icon/IconSVG';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const move = (id) => {
    router.push(`/board/category/${id}`);
  };

  const moveSearch = () => {
    router.push(`/board/search`);
  };

  return (
    <>
      <div
        className="categorySearch"
        onClick={() => {
          moveSearch();
        }}
      >
        <span>궁금한 꿀팁을 검색해 보세요</span>
        <Search color="white" />
      </div>

      <div className="categoryTitle">궁금한 꿀팁의 카테고리를 선택해보세요</div>

      <div className="boardCategory">
        <div className="row">
          <div className="col-4" onClick={() => move('1')}>
            <CategoryExercise width={30} height={30} />
            <span>운동</span>
          </div>
          <div className="col-4" onClick={() => move('2')}>
            <CategoryBeauty width={30} height={30} />
            <span>뷰티&패션</span>
          </div>
          <div className="col-4" onClick={() => move('3')}>
            <CategoryCook width={30} height={30} />
            <span>요리</span>
          </div>
          <div className="col-4" onClick={() => move('4')}>
            <CategoryStudy width={30} height={30} />
            <span>공부</span>
          </div>
          <div className="col-4" onClick={() => move('5')}>
            <CategoryRead width={30} height={30} />
            <span>독서</span>
          </div>
          <div className="col-4" onClick={() => move('6')}>
            <CategoryMoney width={30} height={30} />
            <span>금융</span>
          </div>
          <div className="col-4" onClick={() => move('7')}>
            <CategoryRelation width={30} height={30} />
            <span>인간관계</span>
          </div>
          <div className="col-4" onClick={() => move('8')}>
            <CategoryCompany width={30} height={30} />
            <span>회사생활</span>
          </div>
          <div className="col-4" onClick={() => move('9')}>
            <CategoryEtc width={30} height={30} />
            <span>기타</span>
          </div>
        </div>
      </div>
    </>
  );
}
