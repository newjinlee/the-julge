'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShopData } from '@/types';
import { useRouter } from 'next/navigation';

interface MyStoreInfoProps {
  shopData: ShopData;
}

const MyStoreInfo: React.FC<MyStoreInfoProps> = ({ shopData }) => {
  const router = useRouter();

  return (
    <div className="w-full">
      {shopData ? (
        <>
          <h1 className="text-gray-900 text-2xl font-bold mb-6">내 가게</h1>
          <div className="flex flex-col bg-The-julge-red-10 p-6 rounded-xl shadow-md lg:flex-row gap-8">
            <div className="flex-none w-full lg:w-1/2 rounded-xl overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
                alt="가게사진"
                width={597}
                height={543}
                priority
              />
            </div>
            <div className="flex flex-col justify-between gap-[12px] w-full lg:w-1/2">
              <div>
                <div>
                  <h3 className="text-orange-600 text-base font-bold">식당</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-2xl font-bold text-gray-900">{shopData.item.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="w-5 h-5 relative">
                    <Image
                      src="/location-icon.png"
                      alt="location"
                      fill
                      sizes="(max-width: 20px) 100vw, 50vw"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <p className="text-gray-600">{shopData.item.address1}</p>
                </div>
                <p className="mt-4 text-gray-900">{shopData.item.description}</p>
              </div>
              <div className="flex flex-row gap-[8px]">
                <button
                  type="button"
                  className="w-full bg-white text-The-julge-primary py-3 rounded-md font-bold border border-The-julge-primary">
                  편집하기
                </button>
                <button
                  type="button"
                  className="w-full bg-The-julge-primary text-white py-3 rounded-md font-bold"
                  onClick={() => router.push('/my-notice/my-notice-register')}>
                  공고 등록하기
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyStoreInfo;
