import React from "react";

const RecentJobs = () => {
  return (
    <div className="w-[1440px] h-[976px] px-[238px] pt-[60px] pb-[120px] bg-neutral-50 flex-col justify-start items-start gap-2 inline-flex">
    <div className="flex-col justify-start items-start gap-8 flex">
        <div className="text-gray-900 text-[28px] font-bold font-['Spoqa Han Sans Neo'] tracking-wide">최근에 본 공고</div>
        <div className="flex-col justify-start items-start gap-8 flex">
            <div className="justify-start items-start gap-3.5 inline-flex">
                <div className="p-4 bg-white rounded-xl border border-zinc-200 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="w-[280px] h-40 relative rounded-xl">
                        <div className="w-[310px] h-[282px] left-[-14px] top-[-63px] absolute bg-black/opacity-70" />
                        <div className="left-[84px] top-[63px] absolute text-center text-stone-300 text-[28px] font-bold font-['Spoqa Han Sans Neo'] tracking-wide">마감 완료</div>
                    </div>
                    <div className="h-[137px] flex-col justify-start items-start gap-4 flex">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-stone-300 text-xl font-bold font-['Spoqa Han Sans Neo']">수리 에스프레소 샵</div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-stone-300 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">2023-01-02 15:00~18:00 (3시간)</div>
                            </div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-stone-300 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">서울시 송파구</div>
                            </div>
                        </div>
                        <div className="self-stretch justify-between items-center inline-flex">
                            <div className="text-stone-300 text-2xl font-bold font-['Spoqa Han Sans Neo'] tracking-wide">10,000원</div>
                            <div className="w-[159px] p-3 bg-zinc-200 rounded-[20px] justify-start items-center gap-1.5 flex">
                                <div className="justify-start items-center gap-0.5 flex">
                                    <div className="pt-0.5 justify-start items-start gap-2 flex">
                                        <div className="text-center text-white text-sm font-bold font-['Spoqa Han Sans Neo']">기존 시급보다 30%️️</div>
                                    </div>
                                    <div className="w-5 h-5 relative" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-zinc-200 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="rounded-xl justify-center items-center inline-flex">
                        <img className="w-[310px] h-[282px]" src="https://via.placeholder.com/310x282" />
                    </div>
                    <div className="self-stretch h-[137px] flex-col justify-start items-start gap-4 flex">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-gray-900 text-xl font-bold font-['Spoqa Han Sans Neo']">별빛카페</div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-zinc-500 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">2023-01-02 15:00~18:00 (3시간)</div>
                            </div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-zinc-500 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">서울시 마포구</div>
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-20 inline-flex">
                            <div className="text-gray-900 text-2xl font-bold font-['Spoqa Han Sans Neo'] tracking-wide">9,900원</div>
                            <div className="w-[168px] p-3 opacity-0 bg-red-500 rounded-[20px] justify-start items-center gap-1.5 flex">
                                <div className="justify-start items-center gap-0.5 flex">
                                    <div className="pt-0.5 justify-start items-start gap-2 flex">
                                        <div className="text-center text-white text-sm font-bold font-['Spoqa Han Sans Neo']">기존 시급보다 100%️️</div>
                                    </div>
                                    <div className="w-5 h-5 px-[3.47px] pt-[3.47px] pb-[3.33px] justify-center items-center flex" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-zinc-200 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="rounded-xl justify-center items-center inline-flex">
                        <img className="w-[310px] h-[282px]" src="https://via.placeholder.com/310x282" />
                    </div>
                    <div className="self-stretch h-[137px] flex-col justify-start items-start gap-4 flex">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-gray-900 text-xl font-bold font-['Spoqa Han Sans Neo']">커피바다</div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-zinc-500 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">2023-01-02 15:00~18:00 (3시간)</div>
                            </div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-zinc-500 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">서울시 광진구</div>
                            </div>
                        </div>
                        <div className="self-stretch justify-between items-center inline-flex">
                            <div className="text-gray-900 text-2xl font-bold font-['Spoqa Han Sans Neo'] tracking-wide">11,000원</div>
                            <div className="w-[168px] p-3 bg-red-500 rounded-[20px] justify-start items-center gap-1.5 flex">
                                <div className="justify-start items-center gap-0.5 flex">
                                    <div className="pt-0.5 justify-start items-start gap-2 flex">
                                        <div className="text-center text-white text-sm font-bold font-['Spoqa Han Sans Neo']">기존 시급보다 100%️️</div>
                                    </div>
                                    <div className="w-5 h-5 relative" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="justify-start items-start gap-3.5 inline-flex">
                <div className="p-4 bg-white rounded-xl border border-zinc-200 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="rounded-xl justify-center items-center inline-flex">
                        <img className="w-[310px] h-[282px]" src="https://via.placeholder.com/310x282" />
                    </div>
                    <div className="self-stretch h-[137px] flex-col justify-start items-start gap-4 flex">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-gray-900 text-xl font-bold font-['Spoqa Han Sans Neo']">해피버거</div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-zinc-500 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">2023-01-02 15:00~18:00 (3시간)</div>
                            </div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-zinc-500 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">서울시 도봉구</div>
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-20 inline-flex">
                            <div className="text-gray-900 text-2xl font-bold font-['Spoqa Han Sans Neo'] tracking-wide">9,500원</div>
                            <div className="w-[168px] p-3 opacity-0 bg-red-500 rounded-[20px] justify-start items-center gap-1.5 flex">
                                <div className="justify-start items-center gap-0.5 flex">
                                    <div className="pt-0.5 justify-start items-start gap-2 flex">
                                        <div className="text-center text-white text-sm font-bold font-['Spoqa Han Sans Neo']">기존 시급보다 100%️️</div>
                                    </div>
                                    <div className="w-5 h-5 px-[3.47px] pt-[3.47px] pb-[3.33px] justify-center items-center flex" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-zinc-200 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="w-[280px] h-40 relative rounded-xl">
                        <div className="w-[310px] h-[282px] left-[-14px] top-[-63px] absolute bg-black/opacity-70" />
                        <div className="left-[84px] top-[63px] absolute text-center text-stone-300 text-[28px] font-bold font-['Spoqa Han Sans Neo'] tracking-wide">지난 공고</div>
                    </div>
                    <div className="h-[137px] flex-col justify-start items-start gap-4 flex">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-stone-300 text-xl font-bold font-['Spoqa Han Sans Neo']">정원식당</div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-stone-300 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">2023-01-02 15:00~18:00 (3시간)</div>
                            </div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-stone-300 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">서울시 동대문구</div>
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-20 inline-flex">
                            <div className="text-stone-300 text-2xl font-bold font-['Spoqa Han Sans Neo'] tracking-wide">10,000원</div>
                            <div className="w-[76px] p-3 opacity-0 bg-zinc-200 rounded-[20px] justify-start items-center gap-1.5 flex">
                                <div className="justify-start items-center gap-0.5 flex">
                                    <div className="pt-0.5 justify-start items-start gap-2 flex">
                                        <div className="text-center text-white text-sm font-bold font-['Spoqa Han Sans Neo']">50%</div>
                                    </div>
                                    <div className="w-5 h-5 px-[3.47px] pt-[3.47px] pb-[3.33px] justify-center items-center flex" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-zinc-200 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="w-[280px] h-40 relative rounded-xl">
                        <div className="w-[310px] h-[282px] left-[-14px] top-[-63px] absolute bg-black/opacity-70" />
                        <div className="left-[84px] top-[63px] absolute text-center text-stone-300 text-[28px] font-bold font-['Spoqa Han Sans Neo'] tracking-wide">지난 공고</div>
                    </div>
                    <div className="h-[137px] flex-col justify-start items-start gap-4 flex">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-stone-300 text-xl font-bold font-['Spoqa Han Sans Neo']">우리동네카페</div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-stone-300 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">2023-01-02 15:00~18:00 (3시간)</div>
                            </div>
                            <div className="justify-start items-center gap-1.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="text-stone-300 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">서울시 강남구</div>
                            </div>
                        </div>
                        <div className="self-stretch justify-between items-center inline-flex">
                            <div className="text-stone-300 text-2xl font-bold font-['Spoqa Han Sans Neo'] tracking-wide">9,500원</div>
                            <div className="w-[168px] p-3 bg-zinc-200 rounded-[20px] justify-start items-center gap-1.5 flex">
                                <div className="justify-start items-center gap-0.5 flex">
                                    <div className="pt-0.5 justify-start items-start gap-2 flex">
                                        <div className="text-center text-white text-sm font-bold font-['Spoqa Han Sans Neo']">기존 시급보다 100%️️</div>
                                    </div>
                                    <div className="w-5 h-5 relative" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default RecentJobs;