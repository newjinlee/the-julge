'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';

export function NavBar() {
  // State to hold the user type
  const [userType, setUserType] = useState('');
  const router = useRouter();
  const { searchShopValue, setSearchShopValue } = useSearch();
  const [inputValue, setInputValue] = useState('');

  // Effect to update userType based on local storage value
  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type || '');
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchShopValue(inputValue);
    }
  };

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
            <Image
              src="/logo-big.png"
              height={100}
              width={100}
              style={{ width: '109px', height: 'auto' }}
              alt="logo"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-[10px] bg-gray-200 lg:w-[450px] w-[350px] h-[40px] rounded-lg px-3 text-[14px]">
            <Image
              src="/search-icon.png"
              height={20}
              width={20}
              style={{ width: '20px', height: '20px' }}
              alt="search icon"
            />
            <input
              type="text"
              placeholder="가게 이름으로 찾아보세요."
              className="bg-gray-200 w-full"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleSearch}
            />
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
                <Image
                  src="/notification-icon.png"
                  width={20}
                  height={20}
                  style={{ width: '20px', height: '20px' }}
                  alt="notify"
                />
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
                <Image
                  src="/notification-icon.png"
                  width={20}
                  height={20}
                  style={{ width: '20px', height: '20px' }}
                  alt="notify"
                />
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
