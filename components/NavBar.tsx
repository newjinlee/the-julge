'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function NavBar() {
  // State to hold the user type
  const [userType, setUserType] = useState('');

  // Effect to update userType based on local storage value
  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type || '');
  }, []);

  return (
    <div className="w-full h-[70px] flex items-center justify-center px-10">
      <div className="text-black w-[1000px] text-2xl flex justify-between items-center gap-4">
        <div className="flex justify-between gap-8">
          <Link className="flex items-center gap-4" href="/">
            <Image src="/logo.png" height={100} width={100} alt="logo" />
          </Link>
          <div className="flex items-center gap-[10px] bg-gray-200 w-[450px] h-[40px] rounded-lg px-3 text-[14px]">
            <Image src="/search-icon.png" height={20} width={20} alt="search icon" />
            <input type="text" placeholder="가게 이름으로 찾아보세요." className="bg-gray-200 w-full" />
          </div>
        </div>

        <div className="flex justify-between gap-5 text-[16px]">
          {userType === 'employee' && (
            <>
              <Link href="/profile">
                <h1>내 프로필</h1>
              </Link>
              <Link href="/logout">
                <h1>로그아웃</h1>
              </Link>
              <Link href="/notifications">
                <h1>알림</h1>
              </Link>
            </>
          )}
          {userType === 'employer' && (
            <>
              <Link href="/my-store">
                <h1>내 가게</h1>
              </Link>
              <Link href="/logout">
                <h1>로그아웃</h1>
              </Link>
              <Link href="/notifications">
                <h1>알림</h1>
              </Link>
            </>
          )}
          {!userType && ( // Show these links if no userType is set (i.e., not logged in)
            <>
              <Link href="/login">
                <h1>로그인</h1>
              </Link>
              <Link href="/signup">
                <h1>회원가입</h1>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
