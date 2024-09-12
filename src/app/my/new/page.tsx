// @ts-check

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

interface CalendarEvent {
  start: Date | null;
  end: Date | null;
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

  const handleForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: keyof Params
  ) => {
    setParams({
      ...params,
      [name]: event.target.value,
    });
  };

  const handleCalendar = (e: CalendarEvent) => {
    setParams({
      ...params,
      deadLine_start: e.start ? format(e.start, 'yyyy-MM-dd') : '',
      deadLine_end: e.end ? format(e.end, 'yyyy-MM-dd') : '',
    });
  };

  const save = async () => {
    await axios
      .post('/api/tip/submit', params, {
        headers: {
          Authorization: getToken(),
        },
      })
      .then(() => {
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
          onChange={(e) => handleForm(e, 'tipLink')}
          type="text"
        />
        <FormTextInput
          value={params.tipTitle}
          label="팁의 제목을 적어주세요"
          placeholder=""
          onChange={(e) => handleForm(e, 'tipTitle')}
          type="text"
        />
        <FormSelect
          value={params.categoryId}
          label="카테고리를 설정해주세요"
          onChange={(e) => handleForm(e, 'categoryId')}
        />
        <FormTextInput
          value={params.actCnt}
          label="실천 횟수를 적어주세요"
          placeholder=""
          onChange={(e) => handleForm(e, 'actCnt')}
          type="text"
        />

        <CalendarFromTo
          label="데드라인을 설정해 주세요"
          onChange={handleCalendar}
        />

        <FormBtn className="mt20" text="save" onClick={save} />
      </div>
    </div>
  );
}
