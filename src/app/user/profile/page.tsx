// @ts-nocheck
'use client';

import useUserStore from '@/src/store/userUserStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import '../../../../public/css/profile.css';

interface UserInfo {
  nickName: string;
}

interface FormValues {
  nickname: string;
}

export default function ProfilePage() {
  const { userInfo, resetUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    resetUserInfo: state.resetUserInfo,
  })) as UserInfo;
  const accessToken = useUserStore((state) => state.getToken());
  const [imagePreview, setImagePreview] = useState('/image/system/profile.png');
  const [imageError, setImageError] = useState<string | null>(null); // 이미지 에러
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 상태
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    console.log('토큰:', storedToken); // 디버깅: 콘솔에 토큰 출력
  }, []);

  console.log('Retrieved accessToken:', accessToken);

  // React Hook Form 설정
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nickname: userInfo?.nickName || '',
    },
  });

  // userInfo가 변경될 때 폼 값 업데이트
  useEffect(() => {
    if (userInfo) {
      setValue('nickname', userInfo.nickName);
    }
  }, [userInfo, setValue]);

  // 닉네임 유효성 검사 함수
  const validateNickname = (value: string) => {
    if (!value) {
      return '⚠️ 닉네임을 입력해 주세요.';
    } else if (value.length < 4) {
      return '⚠️ 올바르지 않은 닉네임입니다.';
    } else if (value.length > 8) {
      return '⚠️ 올바르지 않은 닉네임입니다.';
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return '⚠️ 올바르지 않은 닉네임입니다.';
    }
    return true;
  };

  //닉네임 변경 후 제출
  const onSubmit = async (data: FormValues) => {
    try {
      if (!accessToken) {
        console.error('토큰이 없습니다. 로그인 해주세요.');
        return;
      }

      const response = await fetch('/api/user/details/nickname', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ nickName: data.nickname }),
      });
      // console.log('응답 상태:', response.status);
      // console.log('응답 헤더:', response.headers);
      if (response.ok) {
        const responseData = await response.json();
        console.log('닉네임 수정 성공:', responseData);
        setIsSubmitted(true);
        useUserStore
          .getState()
          .setUserInfo({ ...userInfo, nickName: data.nickname });
      } else {
        const errorData = await response.json();
        const errorReason = errorData.errors?.[0]?.reason;
        if (errorReason === '이미 등록된 닉네임입니다.') {
          setError('nickname', {
            type: 'manual',
            message: '⚠️ 이미 등록된 닉네임입니다.',
          });
        } else {
          console.error('닉네임 수정 실패:', errorData);
          alert('닉네임 수정에 실패했습니다. 서버 관리자에게 문의하세요.');
          console.error('서버 응답 오류 메시지:', errorData);
        }
      }
    } catch (error) {
      console.error('닉네임 수정 오류:', error);
      alert('닉네임 수정 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
      // 예외 발생 시 오류 세부 사항을 콘솔에 출력
      console.error('예외 발생:', error);
    }
  };

  // 이미지 업로드 함수
  const updateProfileImage = async (imgUrl: string) => {
    // JSON 형식의 요청 본문
    const requestBody = {
      imgUrl: imgUrl,
    };

    try {
      const response = await fetch('/api/user/details/image', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
          Authorization: `Bearer ${accessToken}`, // Bearer 토큰
        },
        body: JSON.stringify(requestBody), // JSON으로 변환하여 전송
      });

      // HTTP 상태 코드와 응답 헤더 로그
      console.log('HTTP 상태 코드:', response.status);
      console.log(
        '응답 헤더:',
        JSON.stringify([...response.headers.entries()])
      );

      // 응답 본문을 텍스트 형식으로 읽어 오류 메시지 로그
      const responseText = await response.text();
      console.log('응답 본문:', responseText);

      // 응답 본문을 JSON 형식으로 파싱 시도
      try {
        const responseData = JSON.parse(responseText);
        if (response.ok) {
          console.log('이미지 업로드 성공:', responseData);
        } else {
          console.error('이미지 업로드 실패:', responseData);
          alert('이미지 업로드에 실패했습니다. 서버 관리자에게 문의하세요.');
        }
      } catch (jsonError) {
        console.error('응답 본문 JSON 파싱 오류:', jsonError);
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  // 엔터키를 눌렀을 때 폼 제출 방지
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 폼 제출 동작 방지
    }
  };

  // 커서를 다른 곳에 클릭했을 때 유효성 검사
  const handleBlur = async () => {
    await trigger('nickname');
  };

  // 이미지 미리보기와 유효성 검사
  const addPreviewImage = (file: File) => {
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSizeMB = 5;
      const maxWidth = 400;
      const maxHeight = 400;

      if (!validTypes.includes(file.type)) {
        setImageError(
          '※ 프로필 이미지는 400 * 400 pixel 이하,<br />5MB 이하의 png, jpeg, jpg 만 등록 가능합니다.'
        );
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setImageError(
          '※ 프로필 이미지는 400 * 400 pixel 이하,<br />5MB 이하의 png, jpeg, jpg 만 등록 가능합니다.'
        );
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageUrl = reader.result as string;
        const img = new window.Image();
        img.src = imageUrl;
        img.onload = () => {
          if (img.width > maxWidth || img.height > maxHeight) {
            setImageError(
              '※ 프로필 이미지는 400 * 400 pixel 이하,<br />5MB 이하의 png, jpeg, jpg 만 등록 가능합니다.'
            );
          } else {
            setImagePreview(imageUrl);
            setImageError(null);
            updateProfileImage(file);
          }
        };
      };
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addPreviewImage(file);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById(
      'profileImageInput'
    ) as HTMLInputElement;
    fileInput.click();
  };

  //로그아웃
  const handleLogout = () => {
    localStorage.removeItem('token');
    resetUserInfo();
    router.push('/user/login');
  };
  // const handleLogout = async () => {
  //   try {
  //     // const token = localStorage.getItem('token');
  //     const token2 = useUserStore((state) => state.getToken());
  //     console.log('저장된 토큰:', token2); // 콘솔에 토큰 출력
  //     if (!token2) {
  //       throw new Error('토큰이 없습니다.');
  //     }

  //     const response = await fetch('/api/user/logout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token2}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     useUserStore.getState().resetUserInfo();
  //     localStorage.removeItem('token'); // 로그아웃 후 토큰 제거
  //     router.push('/user/login');
  //   } catch (error) {
  //     console.error('로그아웃 오류:', error);
  //     alert('로그아웃 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
  //   }
  // };

  const clearError = () => {
    setImageError(null);
  };

  useEffect(() => {
    if (imageError) {
      document.body.style.overflow = 'hidden'; // 모달이 열리면 스크롤을 막습니다.
    } else {
      document.body.style.overflow = 'auto'; // 에러가 없으면 스크롤을 허용합니다.
    }
  }, [imageError]);

  return (
    <div className="subMO">
      <div className="profileCont subMO-side">
        <div className="img-box" onClick={handleClick}>
          <span className="profile-img">
            <Image
              src={imagePreview}
              alt="Profile Preview"
              className="profile-img-preview"
              width={100}
              height={100}
            />
          </span>
          <div className="input-wrap">
            <input
              type="file"
              id="profileImageInput"
              accept=".png, .jpeg, .jpg"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        {imageError && (
          <div className="image-error modal">
            <div className="modal-content">
              <button className="btn_close" onClick={clearError}>
                ×
              </button>
              <p dangerouslySetInnerHTML={{ __html: imageError }} />
            </div>
          </div>
        )}
        <div className="btn-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrap">
              <Controller
                name="nickname"
                control={control}
                rules={{ validate: validateNickname }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      className="input-nickname"
                      placeholder="영문, 숫자 조합 8자 이내"
                      {...field}
                      readOnly={isSubmitted} // 수정 불가 처리
                      onKeyDown={handleKeyPress} // 엔터키 방지
                      onBlur={handleBlur} // 포커스 아웃 시 유효성 검사
                    />
                    <button
                      type="submit"
                      className={`btn-nick-change ${isSubmitted ? 'submitted' : ''}`} // 조건부 클래스 추가
                    >
                      {isSubmitted ? '저장' : '편집'}
                    </button>
                    <div className="txt-warning">
                      <span className="txt-invalid font-12 font-red">
                        {errors.nickname?.message}
                      </span>
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              {accessToken ? (
                <button
                  type="button"
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  logout
                </button>
              ) : (
                <p>로그인 상태가 아닙니다.</p>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="pw-box subMO-side line-btm-black">
        <Link href="/user">
          <span className="font-underline">비밀번호 변경</span>
        </Link>
      </div>

      <div className="buttonCont line-btm-black">
        <div className="arrowIcon-ver dis-no">
          <Link href="/user" className="step-cont">
            <span>저장</span>
            <span>→</span>
          </Link>
        </div>
        <div className="img-box">
          <Image
            className="logo-white"
            src="/image/system/logo_white.png"
            alt="logo"
            width={50}
            height={40}
          />
        </div>
        <div className="inquiry-box">
          <div className="step-cont">
            <span>문의사항</span>
          </div>
          <form action="" className="subMO-side">
            <textarea
              name="inquiry"
              id="inquiry"
              className="inquiry-textarea"
              placeholder="문의사항에 대한 답변은 등록된 메일로 회신드리겠습니다."
            ></textarea>
            <div className="btn-box">
              <button type="submit" className="inquiry-btn font-underline">
                보내기
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="delAcountCont">
        <Link href="/user/del_account" className="delAcount-cont">
          <span className="font-underline">탈퇴하기</span>
        </Link>
      </div>
    </div>
  );
}
