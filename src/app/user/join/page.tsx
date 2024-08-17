'use client';

import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBtnSubmit from '../../../components/ui/form/button/FormBtnSubmit';
import FormChkBox from '../../../components/ui/form/FormChkBox';
import FormPhoneInput from '../../../components/ui/form/input/FormPhoneInput';
import styles from '../../../components/ui/form/input/FormTextInput.module.css';
import FormUserInput from '../../../components/ui/form/input/FormUserInput';

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

export default function JoinPage() {
  const router = useRouter();
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
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
  const {
    register,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    setPasswordsMatch(inputValues.password === inputValues.passwordChk);
  }, [inputValues]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('/api/user/signup', {
        email: data.email,
        password: data.password,
        rePassword: data.passwordChk,
        name: data.name,
        phone: data.phone,
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
        if (axiosError.response.status === 409) {
          // 이미 가입된 사용자일 때 409 상태 코드를 가정
          alert('이미 가입된 회원입니다. 로그인 페이지로 이동합니다.');
          router.push('/user/login');
        } else {
          // 다른 서버 오류 처리
          console.error('서버 오류 발생:', axiosError.response.data);
        }
      } else if (axiosError.request) {
        console.error('Request did not reach the server:', axiosError.request);
      } else {
        console.error('Error setting up the request:', axiosError.message);
      }
    }
  };

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     // const response = await axios.post('/api/user/signup', data);
  //     const response = await axios.post(
  //       'http://15.164.202.203:8080/api/user/signup',
  //       data
  //     );

  //     if (response.status === 200) {
  //       // 요청 성공
  //       console.log(
  //         `email : ${data.email}, name: ${data.name}, phone : ${data.phone}, password : ${data.password}, passwordChk: ${data.passwordChk}`
  //       );
  //       router.push('/user/login');
  //     } else {
  //       // 요청 실패
  //       console.error('Failed to submit data');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //   }
  // };

  const handleInputChange = (
    value: string | boolean,
    fieldName: keyof FormData
  ) => {
    const updatedValues = { ...inputValues, [fieldName]: value };
    setInputValues({ ...inputValues, [fieldName]: value });
    setValue(fieldName, value);

    if (fieldName === 'password' || fieldName === 'passwordChk') {
      const newValues = { ...inputValues, [fieldName]: value };
      setPasswordsMatch(newValues.password === newValues.passwordChk);
    }

    // 개별 체크박스 상태 변경 시 allChecked 상태 업데이트
    if (
      fieldName === 'requiredChk01' ||
      fieldName === 'requiredChk02' ||
      fieldName === 'optionalChk'
    ) {
      const { requiredChk01, requiredChk02, optionalChk } = updatedValues;
      setAllChecked(requiredChk01 && requiredChk02 && optionalChk);
    }

    // trigger(fieldName);
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
          label="이메일 주소"
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

        {/* 비밀번호 확인 */}
        <FormUserInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자 조합 8자 이상"
          register={register}
          validationRules={{
            required: '비밀번호를 입력해주세요.',
            pattern: {
              //영문, 숫자 포함 8자 이상
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: '⚠️ 숫자와 영문을 조합하여 8자 이상으로 적어주세요.',
            },
          }}
          errorMessage={errors.password?.message || ''}
          value={inputValues.password}
          onChange={(value) => handleInputChange(value, 'password')}
          onBlur={() => trigger('password')}
          onClear={() => clearInput('password')}
        />

        {/* 비밀번호 재확인 */}
        <div className={styles.formInputBox}>
          <label htmlFor="passwordChk">비밀번호 재확인</label>
          <div className={styles.inputWrapper}>
            <input
              id="passwordChk"
              type="password"
              placeholder=""
              {...register('passwordChk', {
                required: '비밀번호를 입력해주세요.',
                validate: (value) =>
                  value === getValues('password') ||
                  '⚠️ 비밀번호가 일치하지 않습니다.',
              })}
              onChange={(e) => handleInputChange(e.target.value, 'passwordChk')}
              onBlur={() => trigger('passwordChk')}
              className={`${styles.formTextInput} ${errors.passwordChk ? 'is-invalid' : ''}`}
            />
            {inputValues.passwordChk && (
              <>
                <button
                  type="button"
                  className={`${styles.clearButton} visible`}
                  onClick={() => clearInput('passwordChk')}
                >
                  &times;
                </button>
                {passwordsMatch && <span className={styles.iconGrnChk}></span>}
              </>
            )}
          </div>
        </div>
        <div className={styles.txtWarning}>
          {errors.passwordChk && (
            <span className="txt-invalid font-12 font-red">
              {errors.passwordChk.message}
            </span>
          )}
        </div>

        {/* 이름 입력란 */}
        <FormUserInput
          id="name"
          label="이름"
          type="text"
          placeholder=""
          register={register}
          validationRules={{
            required: '이름을 입력해주세요.',
            minLength: {
              value: 1,
              message: '최소 1자 이상 입력할 수 있습니다.',
            },
            maxLength: {
              value: 30,
              message: '최대 30자까지 입력할 수 있습니다.',
            },
            pattern: {
              // 한글 또는 영문만 입력 가능
              value: /^(?=.*[a-zA-Z]+$)|(?=.*[가-힣]+$)/,
              message: '⚠️ 이름을 잘못 작성하였습니다.',
            },
          }}
          errorMessage={errors.name?.message || ''}
          value={inputValues.name}
          onChange={(value) => handleInputChange(value, 'name')}
          onBlur={() => trigger('name')}
          onClear={() => clearInput('name')}
        />

        {/* 전화번호 입력란 */}
        <FormPhoneInput
          id="phone"
          label="연락처"
          type="tel"
          placeholder="-없이 번호만 입력해주세요."
          register={register}
          validationRules={{
            required: '연락처를 입력해주세요.',
            pattern: {
              // 010시작 하이픈 숫자4 하이픈 숫자4
              value: /^010-\d{4}-\d{4}$/,
              message: '⚠️ 올바르지 않은 연락처입니다.',
            },
          }}
          errorMessage={errors.phone?.message || ''}
          value={inputValues.phone}
          onChange={(value) => handleInputChange(value, 'phone')}
          onBlur={() => trigger('phone')}
          onClear={() => clearInput('phone')}
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

          {/* <div className={styles.formChkBox}>
            <div className={styles.inputWrapper}>
              <input
                id="requiredChk01"
                type="checkbox"
                {...register('requiredChk01', {
                  required: '⚠️ 필수 약관에 동의해주세요.',
                })}
                onChange={(e) =>
                  handleInputChange(e.target.checked, 'requiredChk01')
                }
                onBlur={() => trigger('requiredChk01')}
                className={`${styles.formCheckbox} ${errors.requiredChk01 ? 'is-invalid' : ''}`}
              />
              <label htmlFor="requiredChk01">
                (필수) acTIP 이용약관에 동의합니다.
              </label>
            </div>
          </div> */}

          {/* <div className={styles.formChkBox}>
            <div className={styles.inputWrapper}>
              <input
                id="requiredChk02"
                type="checkbox"
                {...register('requiredChk02', {
                  required: '⚠️ 필수 약관에 동의해주세요.',
                })}
                onChange={(e) =>
                  handleInputChange(e.target.checked, 'requiredChk02')
                }
                onBlur={() => trigger('requiredChk02')}
                className={`${styles.formCheckbox} ${errors.requiredChk02 ? 'is-invalid' : ''}`}
              />
              <label htmlFor="requiredChk02">
                (필수) acTIP 개인정보 처리방침에 동의합니다.
              </label>
            </div>
          </div> */}

          {/* <div className={styles.formChkBox}>
            <div className={styles.inputWrapper}>
              <input
                id="optionalChk"
                type="checkbox"
                {...register('optionalChk')}
                onChange={(e) =>
                  handleInputChange(e.target.checked, 'optionalChk')
                }
                className={`${styles.formCheckbox}`}
              />
              <label htmlFor="optionalChk">
                (선택) acTIP 마케팅 정보 이메일 수신에 동의합니다.
              </label>
            </div>
          </div> */}

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
