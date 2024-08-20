// @ts-nocheck

/* eslint-disable */
'use client';

import useUserStore from '@/src/store/userUserStore';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBtnSubmit from '../../../components/ui/form/button/FormBtnSubmit';
import FormUserInput from '../../../components/ui/form/input/FormUserInput';
import kakaoAuthURL from '../../api/login/kakao';

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

export default function LoginPage() {
  const router = useRouter();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('/api/user/login', {
        email: data.email,
        password: data.password,
      });
      console.log('Response:', response.data);
      if (response.status === 200) {
        setUserInfo({
          email: data.email,
          nickName: response.data.nickname ? response.data.nickname  : "API전달 닉네임 없음",
          accessToken: "Bearer " + response.data.accessToken,
          refreshToken: response.data.refreshToken
        });

        router.push('/my/doing');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          'Server responded with an error:',
          axiosError.response.data
        );
        console.error('Status code:', axiosError.response.status);
        console.error('s:', axiosError.response.headers);

        if (axiosError.response.status === 401) {
          // 401 상태 코드가 회원가입되지 않은 계정을 의미한다고 가정
          alert('등록되지 않은 계정입니다.');
        } else {
          alert('로그인에 실패했습니다. 다시 시도해 주세요.');
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
  //     const response = await axios.post('/api/user/login', data);

  //     if (response.status === 200) {
  //       // 요청 성공
  //       console.log(`email : ${data.email}, password : ${data.password}`);
  //       router.push('/my/doing');
  //     } else {
  //       // 요청 실패
  //       console.error('Failed to submit data');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //   }
  // };

  const handleInputChange = (value: string, fieldName: keyof FormData) => {
    setInputValues({ ...inputValues, [fieldName]: value });
    // trigger(fieldName);
    setValue(fieldName, value);
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

  const kakaoLoginHandler = () => {
    window.location.href = kakaoAuthURL;
  };

  return (
    <div className="subMO">
      <div className="subMO-top subMO-side line-btm-black">
        <h1 className="subMo-tit font-24">logindd</h1>
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

          <div className="txt_right_box">
            <Link href="/user/login/password" className="font-small-gray">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          {/* 버튼 */}
          <FormBtnSubmit text="login" />
        </form>

        {/* 하단 버튼 */}
        <div className="font-txt-center">
          <span>계정이 없으신가요?</span>
          <Link href="/user/join" className="font-highlight-underline">
            회원가입하기
          </Link>
        </div>
      </div>
      <div className="subMO-side btn-wrap">
        <span>or</span>
        <button type="button" className="btn-kakao" onClick={kakaoLoginHandler}>
          <span className="btn-innerTxt">카카오톡으로 시작하기</span>
        </button>
      </div>
    </div>
  );
}
