// @ts-nocheck
'use client';

import useUserStore from '@/src/store/userUserStore';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBtnSubmit from '../../../components/ui/form/button/FormBtnSubmit';
import FormChkBox from '../../../components/ui/form/FormChkBox';
import styles from '../../../components/ui/form/input/FormTextInput.module.css';

interface FormData {
  email: string;
  name: string;
  phone: string;
  password: string;
  passwordChk: string;
  requiredChk01: boolean;
  requiredChk02: boolean;
  optionalChk: boolean;
}

export default function DelAccountPage() {
  const accessToken = useUserStore((state) => state.getToken());
  const router = useRouter();
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [inputValues, setInputValues] = useState<FormData>({
    email: '',
    name: '',
    phone: '',
    password: '',
    passwordChk: '',
    requiredChk01: false,
    requiredChk02: false,
    optionalChk: false,
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      // DELETE 메서드 사용
      const response = await axios.delete('/api/user/details/delete', {
        headers: {
          Authorization: `${accessToken}`,
        },
        data: {
          agreeTOS: data.requiredChk01,
        },
      });

      // console.log('Submitting data:', data); // 디버깅: 제출 데이터 확인
      // console.log('응답 상태:', response.status);
      // console.log('응답 헤더:', response.headers);
      // console.log('Response:', response.data);

      if (response.status === 200) {
        setModalVisible(true);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // 더 자세한 오류 정보 출력
      if (axiosError.response) {
        // 서버가 응답을 보낸 경우
        console.error('Server responded with an error:');
        console.error('Status Code:', axiosError.response.status);
        console.error('Headers:', axiosError.response.headers);
        console.error('Data:', axiosError.response.data);
      } else if (axiosError.request) {
        // 요청이 서버에 도달하지 못한 경우
        console.error('Request did not reach the server:');
        console.error('Request:', axiosError.request);
      } else {
        // 요청을 설정하는 중에 발생한 오류
        console.error('Error setting up the request:');
        console.error('Message:', axiosError.message);
      }

      // 추가 디버깅 정보를 출력
      console.error('Config:', axiosError.config);
    }
  };

  const handleInputChange = (
    value: string | boolean,
    fieldName: keyof FormData
  ) => {
    setInputValues({ ...inputValues, [fieldName]: value });
    setValue(fieldName, value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const closeModal = () => {
    router.push('/user/login');
  };

  return (
    <div className="subMO subMO-top subMO-side">
      <h1 className="subMo-tit font-24">😲 delete account</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      >
        {/* 동의 체크란 */}
        <div className={styles.formChkWrap}>
          <FormChkBox
            id="requiredChk01"
            label="위 내용을 모두 확인하였고, 모든 정보 삭제에 동의합니다."
            checked={inputValues.requiredChk01}
            errorMessage={errors.requiredChk01?.message || ''}
            register={register}
            validationRules={{
              required: '⚠️ 약관에 동의해주세요.',
            }}
            onChange={(checked) => handleInputChange(checked, 'requiredChk01')}
            onBlur={() => trigger('requiredChk01')}
          />

          <div className={styles.txtWarning}>
            {(errors.requiredChk01 || errors.requiredChk02) && (
              <span className="txt-invalid font-12 font-red">
                {errors.requiredChk01?.message || errors.requiredChk02?.message}
              </span>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <FormBtnSubmit text="confirm" />
        <Link href="/user/profile" className="formBtnCancel">
          cancel
        </Link>
      </form>
      {/* 모달창 */}
      {isModalVisible && (
        <div className="image-error modal">
          <div className="modal-content">
            <button className="btn_close" onClick={closeModal}>
              ×
            </button>
            <Image
              src="/image/system/modal_logo01.png"
              alt="모달 로고 이미지"
              className="modal-logo-img"
              width={110}
              height={52}
            />
            <p>
              <span className="modal-txtBold">See you again</span>
              탈퇴가 완료되었습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
