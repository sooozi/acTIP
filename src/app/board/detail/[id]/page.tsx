// @ts-nocheck

'use client';

import { ArrowRight, Close } from '@/src/components/icon/IconSVG';
import FormBtn from '@/src/components/ui/form/button/FormBtn';
import useUserStore from '@/src/store/userUserStore';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const accessToken = useUserStore((state) => state.getToken());
  const [modalAdd, setModalAdd] = useState(false);
  const [modalSave, setModalSave] = useState(false);
  const router = useRouter();
  const [pageItem, setPageItem] = useState({
    id: '',
    tipLink: '',
    tipTitle: '',
    categoryId: '',
    actCnt: '',
    deadLine_start: '',
    deadLine_end: '',
    categoryName: '',
    periodDate: '',
    d_day: '',
    actCnt_checked: '',
    checkedItems: [],
  });
  // const getToken = useUserStore((state) => state.getToken);

  const findItem = useCallback(async () => {
    await axios
      .get(`/api/tip/${params.id}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res) => {
        let checkItem = [];
        const actCnt = res.data.payload.actCnt;
        const actCnt_checked = res.data.payload.actCnt_checked;

        for (let i = 0; i < res.data.payload.actCnt; i++) {
          checkItem.push(i < actCnt_checked);
        }

        setPageItem({
          id: res.data.payload.id,
          tipLink: res.data.payload.tipLink,
          tipTitle: res.data.payload.tipTitle,
          categoryId: res.data.payload.categoryId,
          actCnt: actCnt,
          deadLine_start: res.data.payload.deadLine_start,
          deadLine_end: res.data.payload.deadLine_end,
          categoryName: res.data.payload.categoryName,
          periodDate: res.data.payload.periodDate,
          d_day: res.data.payload.d_day,
          actCnt_checked: actCnt_checked,
          checkedItems: checkItem,
        });
      });
  }, [params.id, accessToken]); // 의존성으로 params.id와 accessToken 추가

  const addTip = async () => {
    try {
      const response = await axios.post(
        '/api/board/submit',
        {
          tipLink: pageItem.tipLink,
          tipTitle: pageItem.tipTitle,
          categoryId: pageItem.categoryId,
          deadLine_start: pageItem.deadLine_start,
          deadLine_end: pageItem.deadLine_end,
          actCnt: pageItem.actCnt,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      setModalAdd(true);
    } catch (error) {
      console.error('Error adding tip:', error);
    }
  };

  const saveTip = () => {
    setModalSave(true);
  };

  const closeModal = () => {
    setModalAdd(false);
    setModalSave(false);
  };

  useEffect(() => {
    findItem();
  }, [findItem]);

  return (
    <div>
      <div>
        <div className="rowFull link">
          <Link href={pageItem.tipLink} target="_blank">
            <span>{pageItem.tipLink}</span>
            <div>
              <ArrowRight color="white" />
            </div>
          </Link>
        </div>
        <div className="rowFull">{pageItem.tipTitle}</div>
        <div className="rowFull">{pageItem.categoryName}</div>

        <div className="p20">
          <FormBtn text="add tip" className="mt30" onClick={addTip} />
          <FormBtn text="save tip" className="weak mt10" onClick={saveTip} />
        </div>
      </div>

      {modalAdd && (
        <div className="tempModal">
          <div>
            <div>
              <div></div>
              <div className="pointer" onClick={closeModal}>
                <Close color="white" />
              </div>
            </div>
            <div>
              <div className="mb10">saved !</div>
              <div>팁이 추가되었습니다.</div>
            </div>
          </div>
        </div>
      )}

      {modalSave && (
        <div className="tempModal">
          <div>
            <div>
              <div></div>
              <div className="pointer" onClick={closeModal}>
                <Close color="white" />
              </div>
            </div>
            <div>
              <div className="mb10">saved !</div>
              <div>팁이 저장되었습니다.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
