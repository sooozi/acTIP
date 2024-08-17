'use client';

import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBtnSubmit from '../../../../components/ui/form/button/FormBtnSubmit';
import FormChkBox from '../../../../components/ui/form/FormChkBox';
import styles from '../../../../components/ui/form/input/FormTextInput.module.css';
import FormUserInput from '../../../../components/ui/form/input/FormUserInput';

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

export default function JoinKakaoPage() {
  const router = useRouter();
  const [allChecked, setAllChecked] = useState(false);

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromQuery = urlParams.get('email') || '';

    setInputValues((prevValues) => ({
      ...prevValues,
      email: emailFromQuery,
    }));
    setValue('email', emailFromQuery);
  }, [setValue]);

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

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Submitting data:', data); // 디버깅: 제출 데이터 확인

      const response = await axios.post('/api/user/signup/kakao', {
        email: data.email,
        agreeTOS: data.requiredChk01,
        agreePICU: data.requiredChk02,
        agreeMarketing: data.optionalChk,
      });
      console.log('Response:', response.data);
      if (response.status === 200) {
        router.push('/user/login');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          'Server responded with an error:',
          axiosError.response.data
        );
      } else if (axiosError.request) {
        console.error('Request did not reach the server:', axiosError.request);
      } else {
        console.error('Error setting up the request:', axiosError.message);
      }
    }
  };

  const handleInputChange = (
    value: string | boolean,
    fieldName: keyof FormData
  ) => {
    const updatedValues = { ...inputValues, [fieldName]: value };
    setInputValues({ ...inputValues, [fieldName]: value });
    setValue(fieldName, value);

    if (
      fieldName === 'requiredChk01' ||
      fieldName === 'requiredChk02' ||
      fieldName === 'optionalChk'
    ) {
      const { requiredChk01, requiredChk02, optionalChk } = updatedValues;
      setAllChecked(requiredChk01 && requiredChk02 && optionalChk);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const clearInput = (fieldName: keyof FormData) => {
    setInputValues({ ...inputValues, [fieldName]: '' });
    setValue(fieldName, '');
    trigger();
  };

  const handleAllCheck = (checked: boolean) => {
    setAllChecked(checked);
    setInputValues({
      ...inputValues,
      requiredChk01: checked,
      requiredChk02: checked,
      optionalChk: checked,
    });
    setValue('requiredChk01', checked);
    setValue('requiredChk02', checked);
    setValue('optionalChk', checked);
  };

  return (
    <div className="subMO subMO-top subMO-side">
      <h1 className="subMo-tit font-24">join us</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      >
        {/* 이메일 입력란 */}
        <FormUserInput
          id="email"
          label="카카오 계정으로 acTIP에 기입합니다."
          type="email"
          placeholder=""
          register={register}
          validationRules={{
            required: '이메일 주소를 입력해주세요.',
            pattern: {
              //공백이 포함되지 않은 &, . 이 하나씩 포함되며 연속되지 않은 이메일 형식
              value:
                /^(?!.*[@.]{2})(?!.*@.*@)(?!^[@.])(?!.*[@.]$)[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '⚠️ 올바르지 않은 이메일 주소입니다.',
            },
          }}
          errorMessage={errors.email?.message || ''}
          value={inputValues.email}
          onChange={(value) => handleInputChange(value, 'email')}
          onBlur={() => trigger('email')}
          onClear={() => clearInput('email')}
        />

        {/* 동의 체크란 */}
        <div className={styles.formChkWrap}>
          <div className={`${styles.formChkBox} ${styles.formAllChkBox}`}>
            <div className={styles.inputWrapper}>
              <input
                id="allChk"
                type="checkbox"
                checked={allChecked}
                onChange={(e) => handleAllCheck(e.target.checked)}
                className={`${styles.formCheckbox}`}
              />
              <label htmlFor="allChk">다음 약관에 모두 동의합니다.</label>
            </div>
          </div>

          <FormChkBox
            id="requiredChk01"
            label="(필수) acTIP 이용약관에 동의합니다."
            checked={inputValues.requiredChk01}
            errorMessage={errors.requiredChk01?.message || ''}
            register={register}
            validationRules={{
              required: '⚠️ 필수 약관에 동의해주세요.',
            }}
            onChange={(checked) => handleInputChange(checked, 'requiredChk01')}
            onBlur={() => trigger('requiredChk01')}
          />

          <FormChkBox
            id="requiredChk02"
            label="(필수) acTIP 개인정보 처리방침에 동의합니다."
            checked={inputValues.requiredChk02}
            errorMessage={errors.requiredChk02?.message || ''}
            register={register}
            validationRules={{
              required: '⚠️ 필수 약관에 동의해주세요.',
            }}
            onChange={(checked) => handleInputChange(checked, 'requiredChk02')}
            onBlur={() => trigger('requiredChk02')}
          />

          <FormChkBox
            id="optionalChk"
            label="(선택) acTIP 마케팅 정보 이메일 수신에 동의합니다."
            checked={inputValues.optionalChk}
            errorMessage={errors.optionalChk?.message || ''}
            register={register}
            validationRules={{}}
            onChange={(checked) => handleInputChange(checked, 'optionalChk')}
            onBlur={() => trigger('optionalChk')}
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
        <FormBtnSubmit text="join" />
        <Link href="/user/login" className="formBtnCancel">
          cancel
        </Link>
      </form>
    </div>
  );
}
