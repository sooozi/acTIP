'use client';

import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBtnSubmit from '../../../../components/ui/form/button/FormBtnSubmit';
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

export default function PasswordChkPage() {
  const router = useRouter();
  const [passwordsMatch, setPasswordsMatch] = useState(false);
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
      const response = await axios.patch('/api/user/details/pw', {
        password: data.password,
        passwordRe: data.passwordChk,
      });
      console.log('Response:', response.data);
      if (response.status === 200) {
        router.push('/user/login/password_chk');
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

  const handleInputChange = (value: string, fieldName: keyof FormData) => {
    setInputValues({ ...inputValues, [fieldName]: value });
    setValue(fieldName, value);

    if (fieldName === 'password' || fieldName === 'passwordChk') {
      const newValues = { ...inputValues, [fieldName]: value };
      setPasswordsMatch(newValues.password === newValues.passwordChk);
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

  return (
    <div className="subMO subMO-top subMO-side">
      <h1 className="subMo-tit font-24">password setting</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      >
        {/* 비밀번호 확인 */}
        <FormUserInput
          id="password"
          label="비밀번호 확인"
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
                  '⚠️ 비밀번호가 맞지 않습니다.',
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

        {/* 버튼 */}
        <FormBtnSubmit text="save" />
        <Link href="/user/login" className="formBtnCancel">
          cancel
        </Link>
      </form>
    </div>
  );
}
