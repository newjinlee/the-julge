'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="flex h-full justify-center flex-col items-center gap-10">
      <Image src={'/logo-big.png'} height={45} width={248} alt="logo"></Image>
      <form>
        <div className="flex flex-col gap-4">
          <h1>이메일</h1>
          <input
            type="email"
            placeholder="입력"
            className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-3"></input>
          <h1>비밀번호</h1>
          <input
            type="password"
            placeholder="입력"
            className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-4"></input>

          <h1>비밀번호 확인</h1>
          <input
            type="password"
            placeholder="입력"
            className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-4"></input>

          <h1>회원유형</h1>
          <div className="flex justify-between mb-4">
            <div
              className={`w-[167px] h-[50px] flex justify-center items-center gap-2 border-solid border-2 rounded-3xl cursor-pointer ${
                selectedType === 'user' ? 'border-[#EA3C12]' : 'border-gray-200'
              }`}
              onClick={() => setSelectedType('user')}>
              <input
                type="radio"
                id="user"
                name="type"
                value="user"
                className="w-[20px] h-[20px]"
                checked={selectedType === 'user'}
                onChange={() => setSelectedType('user')}
              />
              <label htmlFor="user">알바님</label>
            </div>
            <div
              className={`w-[167px] h-[50px] flex justify-center items-center gap-2 border-solid border-2 rounded-3xl cursor-pointer ${
                selectedType === 'owner' ? 'border-[#EA3C12]' : 'border-gray-200'
              }`}
              onClick={() => setSelectedType('owner')}>
              <input
                type="radio"
                id="owner"
                name="type"
                value="owner"
                className="w-[20px] h-[20px]"
                checked={selectedType === 'owner'}
                onChange={() => setSelectedType('owner')}
              />
              <label htmlFor="owner">사장님</label>
            </div>
          </div>

          <button className="w-[350px] h-[48px] bg-[#EA3C12] text-[16px] font-semibold rounded-md text-white">
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
    </div>
  );
}
