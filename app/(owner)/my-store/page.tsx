'use client';
import { ShopData } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MyStoreInfo from '../my-notice/MyStoreInfo';
import MyNoticeList from '../my-notice/MyNoticeList';

export default function Page() {
  const router = useRouter();

  const [shopData, setShopData] = useState<ShopData | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchShopInfo = async () => {
      try {
        // 가게 정보
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setShopData(userData.item.shop);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchShopInfo();
  }, [router]);

  const handleButtonClick = () => {
    router.push('/my-store/my-store-register');
  };

  return (
    <>
      {shopData ? (
        <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
          <div className="w-full flex flex-col items-start gap-8 mb-[60px]">
            <MyStoreInfo shopData={shopData} />
          </div>
          <div className="w-full flex flex-col items-start gap-8 mb-[60px]">
            <MyNoticeList shopData={shopData} />
          </div>
        </div>
      ) : (
        <div className="relative max-w-[964px] h-full mx-auto py-[60px] px-[12px] md:py-[60px] md:px-5">
          <h1 className="font-bold text-2xl mb-7">내 가게</h1>
          <div className="w-full lg:max-w-[965px] md:w-full sm:w-full h-[217px] flex flex-col items-center justify-center gap-6 border border-gray-300 rounded-lg lg:px-8 md:px-0">
            <p className="sm:text-sm">내 가게를 소개하고 공고도 등록해 보세요.</p>
            <div className="bg-red-500 text-white font-bold border rounded-md px-5 lg:px-[137px] md:px-[137px] py-2 lg:py-3 md:py-3">
              <button onClick={handleButtonClick}>가게 등록하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
