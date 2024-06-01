'use client';
import Image from 'next/image';

import Link from 'next/link';

export function NavBar() {
  return (
    <div className="w-full h-[70px] flex items-center justify-center px-10">
      <div className="text-black w-[1000px] text-2xl flex justify-between items-center gap-4">
        <div className="flex justify-between gap-8">
          <Link className="flex items-center gap-4" href="/">
            <Image src={'/logo.png'} height={100} width={100} alt="logo"></Image>
          </Link>
          <div className="flex items-center gap-[10px] bg-gray-200 w-[450px] h-[40px] rounded-lg px-3 text-[14px]">
            <Image src={'/search-icon.png'} height={20} width={20} alt="search icon"></Image>
            <input type="text" placeholder="가게 이름으로 찾아보세요." className="bg-gray-200 w-full"></input>
          </div>
        </div>

        <div className="flex justify-between gap-5 text-[16px]">
          <Link href="/login">
            <h1>로그인</h1>
          </Link>

          <Link href="/signup">
            <h1>회원가입</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
