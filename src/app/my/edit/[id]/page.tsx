// @ts-nocheck

'use client';

import FormBtn from '@/src/components/ui/form/button/FormBtn';
import CalendarFromTo from '@/src/components/ui/form/calendar/CalendarFromTo';
import FormSelect from '@/src/components/ui/form/input/FormSelect';
import FormTextInput from '@/src/components/ui/form/input/FormTextInput';
import useUserStore from '@/src/store/userUserStore';
import axios from 'axios';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const getToken = useUserStore((state) => state.getToken);

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

  const handleForm = (event, name) => {
    setPageItem({
      ...pageItem,
      [name]: event.target.value,
    });
  };

  const handleCalendar = (e: unknown) => {
    setPageItem({
      ...pageItem,
      ['deadLine_start']: e.start
        ? format(new Date(e.start), 'yyyy-MM-dd')
        : '',
      ['deadLine_end']: e.end ? format(new Date(e.end), 'yyyy-MM-dd') : '',
    });
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

  const update = async () => {
    await axios
      .put(`/api/tip/${params.id}`, pageItem, {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        router.push('/my/tip/' + params.id);
      });
  };

  useEffect(() => {
    findItem();
  }, []);

  return (
    <div className="subMO-side">
      <div>
        <FormTextInput
          value={pageItem.tipLink}
          label="링크를 삽입해주세요"
          placeholder=""
          onChange={(value) => handleForm(value, 'tipLink')}
          type="text"
        />
        <FormTextInput
          value={pageItem.tipTitle}
          label="팁의 제목을 적어주세요"
          placeholder=""
          onChange={(value) => handleForm(value, 'tipTitle')}
          type="text"
        />
        <FormSelect
          value={pageItem.categoryId}
          label="카테고리를 설정해주세요"
          onChange={(value) => handleForm(value, 'categoryId')}
        />
        <FormTextInput
          value={pageItem.actCnt}
          label="실천 횟수를 적어주세요"
          placeholder=""
          onChange={(value) => handleForm(value, 'actCnt')}
          type="text"
        />

        <CalendarFromTo
          label={'데드라인을 설정해 주세요'}
          onChange={handleCalendar}
          start={pageItem.deadLine_start}
          end={pageItem.deadLine_end}
        />

        <FormBtn className="mt20" text="save" onClick={update} />
      </div>
    </div>
  );
}
