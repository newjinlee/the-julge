'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import MyStoreInfo from './MyStoreInfo';
import MyNoticeList from './MyNoticeList';
import { ShopData } from '@/types';

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

  if (!shopData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {shopData && (
        <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
          <div className="w-full flex flex-col items-start gap-8 mb-[60px]">
            <MyStoreInfo shopData={shopData} />
          </div>
          <div className="w-full flex flex-col items-start gap-8 mb-[60px]">
            <MyNoticeList shopData={shopData} />
          </div>
        </div>
      )}
    </>
  );
}
