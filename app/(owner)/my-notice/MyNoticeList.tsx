'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ShopData {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

const MyNoticeList = () => {
  const [shopData, setShopData] = useState<ShopData | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await fetch(`/api/users/${userId}`);
          const userData = await response.json();
          setShopData(userData.item.shop.item);
        } else {
          console.log('no token');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserInfo();
  }, [router]);

  useEffect(() => {
    if (shopData) {
      console.log(shopData);
    }
  }, [shopData]);

  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
      <div className="w-full flex flex-col items-start gap-8 mb-[60px]">
        <div className="w-full">
          {shopData ? (
            <>
              <h1 className="text-gray-900 text-2xl font-bold mb-6">내 식당</h1>
              <div className="flex flex-col bg-The-julge-red-10 p-6 rounded-xl shadow-md lg:flex-row gap-8">
                <div className="flex-none w-full lg:w-1/2 rounded-xl overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
                    alt="가게사진"
                    width={597}
                    height={543}
                  />
                </div>
                <div className="flex flex-col justify-between gap-[12px] w-full lg:w-1/2">
                  <div>
                    <div>
                      <h3 className="text-orange-600 text-base font-bold">식당</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-2xl font-bold text-gray-900">{shopData.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="w-5 h-5 relative">
                        <Image src="/location-icon.png" alt="location" layout="fill" objectFit="contain" />
                      </div>
                      <p className="text-gray-600">{shopData.address1}</p>
                    </div>
                    <p className="mt-4 text-gray-900">{shopData.description}</p>
                  </div>
                  <div className="flex flex-row gap-[8px]">
                    <button type="button" className="w-full bg-white text-The-julge-primary py-3 rounded-md font-bold ">
                      편집하기
                    </button>
                    <button type="button" className="w-full bg-The-julge-primary text-white py-3 rounded-md font-bold">
                      신청하기
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNoticeList;
