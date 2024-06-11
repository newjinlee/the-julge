'use client';
import Image from 'next/image';
import Link from 'next/link';

export function PostCard() {
  return (
    <div className="flex flex-col gap-[20px] p-[16px] rounded-lg bg-white border border-gray-200">
      <div className="flex justify-center items-center rounded-lg overflow-hidden">
        <Image src={'/listTest.png'} height={310} width={282} alt="공고 이미지" />
      </div>
      <div className="flex flex-col items-start gap-[4px] self-stretch">
        <div className="flex flex-col items-start gap-[8px]">
          <h1 className="text-[var(--The-julge-black,#111322)] font-['Spoqa Han Sans Neo'] text-[20px] font-bold leading-normal">
            도토리 식당
          </h1>
          <p className="text-[var(--The-julge-gray-50,#7D7986)] font-['Spoqa Han Sans Neo'] text-[14px] font-normal leading-22">
            2023-01-02 15:00~18:00 (3시간)
          </p>
          <p className="text-[var(--The-julge-gray-50,#7D7986)] font-['Spoqa Han Sans Neo'] text-[14px] font-normal leading-[22px]">
            서울시 송파구
          </p>
        </div>
        <div className="flex justify-between items-center self-stretch">
          <p className="text-[var(--The-julge-black,#111322)] font-['Spoqa Han Sans Neo'] text-[24px] font-bold leading-normal tracking-[0.48px]">
            15000원
          </p>
        </div>
      </div>
    </div>
  );
}
