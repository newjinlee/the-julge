import React from 'react';
import Image from 'next/image';

const JobDetail = () => {
  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
      <div className="w-full px-10 py-8 flex flex-col items-start gap-8">
        <div className="w-full bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-orange-600 text-base font-bold">한식</h2>
          <h1 className="text-gray-900 text-2xl font-bold mb-6">진주회관</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-none w-full lg:w-1/2 rounded-xl overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
                alt="진주회관"
                width={597}
                height={543}/>
            </div>
            <div className="flex flex-col justify-between w-full lg:w-1/2">
              <div>
                <h3 className="text-orange-600 text-base font-bold">시급</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-gray-900">30,000원</span>
                  <div className="bg-orange-600 text-white text-sm rounded-full flex items-center p-2">
                    <span>기존 시급보다 200%</span>
                    <div className="w-5 h-5 relative">
                      <Image src="/arrow-up-icon.png" alt="arrow upper" layout="fill" objectFit="contain" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-5 h-5 relative">
                  <Image src="/clock-icon.png" alt="clock" layout="fill" objectFit="contain" />
                </div>
                <p className="text-gray-600">2023-07-07 18:00~20:00 (2시간)</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-5 h-5 relative">
                  <Image src="/location-icon.png" alt="location" layout="fill" objectFit="contain" />
                </div>
                <p className="text-gray-600">서울시 중구</p>
              </div>
              <p className="mt-4 text-gray-900">끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.</p>
              <div className="mt-6">
                <button type="button" className="w-full bg-orange-600 text-white py-3 rounded-md font-bold">
                  신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-8 bg-zinc-100 rounded-xl flex-col justify-start items-start gap-8 inline-flex">
          <h3 className="text-gray-900 text-lg font-bold">공고 설명</h3>
          <p className="text-gray-600 mt-2">
            기존 알바 친구가 그만둬서 새로운 친구를 구했는데, 그 사이에 하루가 비네요. 급해서 시급도 높였고 그렇게 바쁜
            날이 아니라서 괜찮을거예요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
