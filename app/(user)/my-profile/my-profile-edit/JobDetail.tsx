import React from 'react';

const JobDetail = () => {
  return (
    <div className="w-[1440px] h-[734px] px-[238px] py-[60px] bg-neutral-50 flex-col justify-start items-start gap-2 inline-flex">
      <div className="h-[614px] relative">
        <div className="w-[963px] h-[148px] p-8 left-0 top-[466px] absolute bg-zinc-100 rounded-xl flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch h-[84px] flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch text-gray-900 text-base font-bold font-['Spoqa Han Sans Neo'] leading-tight">공고 설명</div>
            <div className="self-stretch text-gray-900 text-base font-normal font-['Spoqa Han Sans Neo'] leading-relaxed">
              기존 알바 친구가 그만둬서 새로운 친구를 구했는데, 그 사이에 하루가 비네요. <br />
              급해서 시급도 높였고 그렇게 바쁜 날이 아니라서 괜찮을거예요.
            </div>
          </div>
        </div>
        <div className="w-[216.78px] h-[62px] left-0 top-0 absolute flex-col justify-start items-start gap-2 inline-flex">
          <div className="text-orange-600 text-base font-bold font-['Spoqa Han Sans Neo'] leading-tight">식당</div>
          <div className="text-gray-900 text-[28px] font-bold font-['Spoqa Han Sans Neo'] tracking-wide">도토리 식당</div>
        </div>
        <div className="w-[963px] h-[356px] p-6 left-[1px] top-[86px] absolute bg-white rounded-xl border border-zinc-200 justify-between items-start inline-flex">
          <div className="rounded-xl justify-center items-center flex">
            <img className="w-[596.75px] h-[542.85px]" src="https://via.placeholder.com/597x543" alt="공고 이미지" />
          </div>
          <div className="w-[346px] self-stretch pt-4 flex-col justify-between items-start inline-flex">
            <div className="h-[230px] flex-col justify-start items-start gap-3 flex">
              <div className="flex-col justify-start items-start gap-2 flex">
                <div className="text-orange-600 text-base font-bold font-['Spoqa Han Sans Neo'] leading-tight">시급</div>
                <div className="w-[293px] justify-start items-center gap-2 inline-flex">
                  <div className="text-gray-900 text-[28px] font-bold font-['Spoqa Han Sans Neo'] tracking-wide">15,000원</div>
                  <div className="w-[159px] p-3 bg-orange-600 rounded-[20px] justify-start items-center gap-1.5 flex">
                    <div className="justify-start items-center gap-0.5 flex">
                      <div className="pt-0.5 justify-start items-start gap-2 flex">
                        <div className="w-[113px] text-center text-white text-sm font-bold font-['Spoqa Han Sans Neo']">기존 시급보다 50%️️</div>
                      </div>
                      <div className="w-5 h-5 relative" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-start items-center gap-1.5 inline-flex">
                <div className="w-5 h-5 relative" />
                <div className="text-zinc-500 text-base font-normal font-['Spoqa Han Sans Neo'] leading-relaxed">2023.01.02 15:00~18:00 (3시간)</div>
              </div>
              <div className="justify-start items-center gap-1.5 inline-flex">
                <div className="w-5 h-5 relative" />
                <div className="text-zinc-500 text-base font-normal font-['Spoqa Han Sans Neo'] leading-relaxed">서울시 송파구</div>
              </div>
              <div className="self-stretch text-gray-900 text-base font-normal font-['Spoqa Han Sans Neo'] leading-relaxed">
                알바하기 편한 너구리네 라면집!<br />
                라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.
              </div>
            </div>
            <div className="self-stretch px-[136px] py-3.5 bg-orange-600 rounded-md justify-center items-center gap-2 inline-flex">
              <div className="text-center text-white text-base font-bold font-['Spoqa Han Sans Neo'] leading-tight">신청하기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
