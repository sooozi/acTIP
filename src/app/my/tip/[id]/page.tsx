// @ts-nocheck

'use client';

import { ArrowRight } from '@/src/components/icon/IconSVG';
import FormBtn from '@/src/components/ui/form/button/FormBtn';
import useUserStore from '@/src/store/userUserStore';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
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
  const getToken = useUserStore((state) => state.getToken);

  const editTip = () => {
    router.push(`/my/edit/${params.id}`);
  };

  const findItem = async () => {
    await axios
      .get(`/api/tip/${params.id}`, {
        headers: {
          Authorization: getToken(),
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
  };

  const changeChecked = async (index) => {
    let newCheckedItems = [...pageItem.checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];

    setPageItem({
      ...pageItem,
      actCnt_checked: newCheckedItems.filter((value) => value).length,
      checkedItems: newCheckedItems,
    });

    await axios
      .patch(
        `/api/tip/${params.id}/actCnt`,
        {
          tipId: params.id,
          tipCntChecked: newCheckedItems.filter((value) => value).length,
        },
        {
          headers: {
            Authorization: getToken(),
          },
        }
      )
      .then((res) => {
        // Do Nothing
      });
  };

  const deleteTip = async () => {
    await axios
      .delete(`/api/tip/${params.id}`, {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        router.push('/my/doing');
      });
  };

  useEffect(() => {
    findItem();
  }, []);

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
        <div className="rowFull">{pageItem.periodDate}</div>
        <div className="rowFull checkBox">
          <div className="flex-c-sb w-100">
            <span>{'D' + pageItem.d_day}</span>
            <span>{pageItem.actCnt_checked + '/' + pageItem.actCnt}</span>
          </div>
          <div className="checkBoxWrapper">
            {pageItem.checkedItems.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    id={index + 'check'}
                    type="checkbox"
                    checked={item}
                    onChange={() => changeChecked(index)}
                  />
                  <label htmlFor={index + 'check'}></label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p20">
          <FormBtn text="edit" className="mt30" onClick={editTip} />
          <FormBtn text="delete" className="weak mt10" onClick={deleteTip} />
        </div>
      </div>
    </div>
  );
}
