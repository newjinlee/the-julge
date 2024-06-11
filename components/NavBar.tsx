'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function NavBar() {
  // State to hold the user type
  const [userType, setUserType] = useState('');
  const router = useRouter();

  // Effect to update userType based on local storage value
  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type || '');
  }, []);

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Clear the local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');

    // Redirect the user to the login page
    router.push('/login');
  };

  return (
    <div className="w-full h-[70px] flex items-center justify-center px-10">
      <div className="text-black w-[1000px] text-2xl flex justify-between items-center gap-4">
        <div className="flex justify-between gap-8">
          <Link className="flex items-center gap-4" href="/notice-list">
            <Image src="/logo.png" height={100} width={100} alt="logo" />
          </Link>
          <div className="flex items-center gap-[10px] bg-gray-200 w-[450px] h-[40px] rounded-lg px-3 text-[14px]">
            <Image src="/search-icon.png" height={20} width={20} alt="search icon" />
            <input type="text" placeholder="가게 이름으로 찾아보세요." className="bg-gray-200 w-full" />
          </div>
        </div>

        <div className="flex justify-between gap-5 text-[16px] items-center">
          {userType === 'employee' && (
            <>
              <Link href="/my-profile">
                <h1>내 프로필</h1>
              </Link>
              <button onClick={handleLogOut}> 로그아웃</button>
              <Link href="/notifications">
                <Image src="/notification-icon.png" width={20} height={20} alt="notify"></Image>
              </Link>
            </>
          )}
          {userType === 'employer' && (
            <>
              <Link href="/my-store">
                <h1>내 가게</h1>
              </Link>
              <button onClick={handleLogOut}> 로그아웃</button>
              <Link href="/notifications">
                <Image src="/notification-icon.png" width={20} height={20} alt="notify"></Image>
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
