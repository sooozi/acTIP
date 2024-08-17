'use client';

import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBtnSubmit from '../../../../components/ui/form/button/FormBtnSubmit';
import FormPhoneInput from '../../../../components/ui/form/input/FormPhoneInput';
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

export default function PasswordPage() {
  const router = useRouter();
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
      const response = await axios.get('/api/user/details/pw', {
        params: {
          email: data.email,
          name: data.name,
          phone: data.phone,
        },
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

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     const response = await axios.get('/api/user/details/pw', {
  //       params: data,
  //     });

  //     if (response.status === 200) {
  //       console.log(
  //         `email : ${data.email}, name: ${data.name}, phone : ${data.phone}`
  //       );
  //       router.push('/user/login/password_chk');
  //     } else {
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

  return (
    <div className="subMO subMO-top subMO-side">
      <h1 className="subMo-tit font-24">forgot password?</h1>
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

        {/* 버튼 */}
        <FormBtnSubmit text="next" />
        <Link href="/user/login" className="formBtnCancel">
          cancel
        </Link>
      </form>
    </div>
  );
}
