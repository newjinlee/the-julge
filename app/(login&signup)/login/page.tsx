'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (validateEmail(value) === true || value === '') {
      setEmailError('');
    } else {
      setEmailError('이메일 형식으로 작성해 주세요.');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    if (pw.length >= 8 || pw === '') {
      setPasswordError('');
    } else {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    }
  };

  return (
    <div className="flex h-full justify-center flex-col items-center gap-10">
      <Image src={'/logo-big.png'} height={45} width={248} alt="logo"></Image>

      <form>
        <div className="flex flex-col gap-4">
          <div>
            <h1>이메일</h1>
            <input
              type="text"
              placeholder="입력"
              className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-3"
              onChange={handleEmailChange}></input>
            {emailError && <h1 className="text-red-500">{emailError}</h1>}
          </div>

          <div>
            <h1>비밀번호</h1>
            <input
              type="password"
              placeholder="입력"
              className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-4"
              onChange={handlePasswordChange}></input>
            {passwordError && <h1 className="text-red-500">{passwordError}</h1>}
          </div>

          <button className="w-[350px] h-[48px] bg-[#EA3C12] text-[16px] font-semibold rounded-md text-white">
            로그인하기
          </button>
          <div className="flex justify-center">
            <h1>회원이 아니신가요? </h1>
            <Link className="ml-3 text-blue-500 hover:underline" href="/signup">
              회원가입
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
