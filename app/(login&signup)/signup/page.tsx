'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router'; // next/router에서 useRouter를 임포트합니다.

export default function Page() {
  const [workType, setWorkType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false); // 성공 메시지 모달의 표시 상태

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);

    if (validateEmail(email) === true || email === '') {
      setEmailError('');
    } else {
      setEmailError('이메일 형식으로 작성해 주세요.');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    setPassword(pw);
    if (pw.length >= 8 || pw === '') {
      setPasswordError('');
    } else {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    }
  };

  const handlePasswordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw2 = e.target.value;
    if (pw2 === password || pw2 === '') {
      setPasswordValidationError('');
    } else {
      setPasswordValidationError('비밀번호가 일치하지 않습니다.');
    }
  };

  async function handleRegisterButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await axios.post('https://bootcamp-api.codeit.kr/api/5-7/the-julge/users', {
        email,
        password,
        type: workType,
      });
      setSuccessModal(true); // 성공 시 성공 메시지 모달을 표시합니다.
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setShowModal(true);
      }
    }
  }

  return (
    <div className="flex h-full justify-center flex-col items-center gap-10">
      <Link href="/notice-list">
        <Image src="/logo-big.png" height={45} width={248} alt="logo" />
      </Link>
      <form>
        <div className="flex flex-col gap-4">
          <div>
            <h1>이메일</h1>
            <input
              type="email"
              placeholder="입력"
              className={`w-[350px] h-[58px] border-solid border-2 ${emailError ? 'border-red-500' : 'border-gray-200'} rounded-md p-4 mb-1`}
              onChange={handleEmailChange}
            />
            {emailError && <h1 className="text-red-500">{emailError}</h1>}
          </div>
          <div>
            <h1>비밀번호</h1>
            <input
              type="password"
              placeholder="입력"
              className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-1"
              onChange={handlePasswordChange}
            />
            {passwordError && <h1 className="text-red-500">{passwordError}</h1>}
          </div>
          <div>
            <h1>비밀번호 확인</h1>
            <input
              type="password"
              placeholder="입력"
              className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-1"
              onChange={handlePasswordValidation}
            />
            {passwordValidationError && <h1 className="text-red-500">{passwordValidationError}</h1>}
          </div>

          <h1>회원유형</h1>
          <div className="flex justify-between mb-4">
            <div
              className={`w-[167px] h-[50px] flex justify-center items-center gap-2 border-solid border-2 rounded-3xl cursor-pointer ${
                workType === 'employee' ? 'border-[#EA3C12]' : 'border-gray-200'
              }`}
              onClick={() => setWorkType('employee')}>
              <input
                type="radio"
                id="employee"
                name="type"
                value="employee"
                className="w-[20px] h-[20px]"
                checked={workType === 'employee'}
                onChange={() => setWorkType('employee')}
              />
              <label htmlFor="employee">알바님</label>
            </div>
            <div
              className={`w-[167px] h-[50px] flex justify-center items-center gap-2 border-solid border-2 rounded-3xl cursor-pointer ${
                workType === 'employer' ? 'border-[#EA3C12]' : 'border-gray-200'
              }`}
              onClick={() => setWorkType('employer')}>
              <input
                type="radio"
                id="employer"
                name="type"
                value="employer"
                className="w-[20px] h-[20px]"
                checked={workType === 'employer'}
                onChange={() => setWorkType('employer')}
              />
              <label htmlFor="employer">사장님</label>
            </div>
          </div>

          <button
            className="w-[350px] h-[48px] bg-[#EA3C12] text-[16px] font-semibold rounded-md text-white"
            onClick={handleRegisterButton}>
            가입하기
          </button>
          <div className="flex justify-center">
            <h1>이미 가입하셨나요? </h1>
            <Link className="ml-3 text-blue-500 hover:underline" href="/login">
              로그인하기
            </Link>
          </div>
        </div>
      </form>
      {showModal && (
        <div className="absolute w-full h-full top-50 left-50  flex justify-center items-center bg-black bg-opacity-50">
          <div className=" flex flex-col justify-center items-center bg-white rounded-lg w-[327px] h-[220px] lg:w-[540px] lg:h-[250px] ">
            <p className="text-[18px] ">이미 가입된 이메일입니다.</p>
            <div className="pb-[50px]"></div>
            <button className=" w-[120px] h-[48px]  bg-[#EA3C12] rounded-md" onClick={() => setShowModal(false)}>
              확인
            </button>
          </div>
        </div>
      )}

      {successModal && (
        <div className="absolute w-full h-full top-50 left-50  flex justify-center items-center bg-black bg-opacity-50">
          <div className=" flex flex-col justify-center items-center bg-white rounded-lg w-[327px] h-[220px] lg:w-[540px] lg:h-[250px] ">
            <p className="text-[18px] ">회원가입이 완료되었습니다.</p>
            <div className="pb-[50px]"> </div>

            <Link href="/login">
              <button className=" w-[120px] h-[48px]  bg-[#EA3C12] rounded-md text-white">로그인하러 가기</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
