// @ts-nocheck

'use client';

import FormBtn from '@/src/components/ui/form/button/FormBtn';
import CalendarFromTo from '@/src/components/ui/form/calendar/CalendarFromTo';
import FormSelect from '@/src/components/ui/form/input/FormSelect';
import FormTextInput from '@/src/components/ui/form/input/FormTextInput';
import useUserStore from '@/src/store/userUserStore';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Params {
  tipLink: string;
  tipTitle: string;
  categoryId: string;
  actCnt: string;
  deadLine_start: string;
  deadLine_end: string;
}

export default function Page() {
  const router = useRouter();
  const getToken = useUserStore((state) => state.getToken);
  const [params, setParams] = useState<Params>({
    tipLink: '',
    tipTitle: '',
    categoryId: '1',
    actCnt: '',
    deadLine_start: '',
    deadLine_end: '',
  });

  const handleForm = (event, name) => {
    setParams({
      ...params,
      [name]: event.target.value,
    });
  };

  const handleCalendar = (e: unknown) => {
    setParams({
      ...params,
      ['deadLine_start']: e.start
        ? format(new Date(e.start), 'yyyy-MM-dd')
        : '',
      ['deadLine_end']: e.end ? format(new Date(e.end), 'yyyy-MM-dd') : '',
    });
  };

  const save = async () => {
    await axios
      .post('/api/tip/submit', params, {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        router.push('/my/doing');
      });
  };

  return (
    <div className="subMO-side">
      <div>
        <FormTextInput
          value={params.tipLink}
          label="링크를 삽입해주세요"
          placeholder=""
          onChange={(value) => handleForm(value, 'tipLink')}
          type="text"
        />
        <FormTextInput
          value={params.tipTitle}
          label="팁의 제목을 적어주세요"
          placeholder=""
          onChange={(value) => handleForm(value, 'tipTitle')}
          type="text"
        />
        <FormSelect
          value={params.categoryId}
          label="카테고리를 설정해주세요"
          onChange={(value) => handleForm(value, 'categoryId')}
        />
        <FormTextInput
          value={params.actCnt}
          label="실천 횟수를 적어주세요"
          placeholder=""
          onChange={(value) => handleForm(value, 'actCnt')}
          type="text"
        />

        <CalendarFromTo
          label={'데드라인을 설정해 주세요'}
          onChange={handleCalendar}
        />

        <FormBtn className="mt20" text="save" onClick={save} />
      </div>
    </div>
  );
}
