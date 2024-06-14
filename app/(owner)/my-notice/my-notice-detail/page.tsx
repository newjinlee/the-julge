import React from 'react';
import Image from 'next/image';

const MyNoticeDetail = () => {
  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
      <div className="w-full flex flex-col items-start gap-8 mb-[60px]">
        <div className="w-full">
          <h2 className="text-orange-600 text-base font-bold">한식</h2>
          <h1 className="text-gray-900 text-2xl font-bold mb-6">진주회관</h1>
          <div className="flex flex-col bg-white p-6 rounded-xl shadow-md lg:flex-row gap-8">
            <div className="flex-none w-full lg:w-1/2 rounded-xl overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src="https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png"
                alt="진주회관"
                width={597}
                height={543}
                priority
              />
            </div>
            <div className="flex flex-col justify-between w-full lg:w-1/2">
              <div>
                <h3 className="text-orange-600 text-base font-bold">시급</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-gray-900">30,000원</span>
                  <div className="bg-orange-600 text-white text-sm rounded-full flex items-center p-2">
                    <span>기존 시급보다 200%</span>
                    <div className="w-5 h-5 relative">
                      <Image
                        src="/arrow-up-icon.png"
                        alt="arrow upper"
                        fill
                        sizes="(max-width: 20px) 100vw, 50vw"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-5 h-5 relative">
                  <Image
                    src="/clock-icon.png"
                    alt="clock"
                    fill
                    sizes="(max-width: 20px) 100vw, 50vw"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <p className="text-gray-600">2023-07-07 18:00~20:00 (2시간)</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-5 h-5 relative">
                  <Image
                    src="/location-icon.png"
                    alt="location"
                    fill
                    sizes="(max-width: 20px) 100vw, 50vw"
                    style={{ objectFit: 'contain' }}
                  />
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
      <div className="flex flex-col gap-[32px] mt-[60px]">
        <h1 className="text-The-julge-black text-2xl font-bold mb-6">신청자 목록</h1>
        <div>
          <table className="border w-full text-left">
            <thead className="bg-The-julge-red-10">
              <tr>
                <th className="px-[12px] py-[14px]">신청자</th>
                <th>소개</th>
                <th>전화번호</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-[12px] py-[20px]">전유민</td>
                <td>어쩌구저쩌구</td>
                <td>010-0000-0000</td>
                <td>거절</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyNoticeDetail;
