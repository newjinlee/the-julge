export default function Page() {
  return (
    <div className="relative max-w-[964px] h-full mx-auto py-[60px] px-[12px] md:py-[60px] md:px-5">
      <h1 className="font-bold text-2xl mb-7">내 가게</h1>
      <div className="w-full lg:max-w-[965px] md:w-full sm:w-full h-[217px] flex flex-col items-center justify-center gap-6 border border-gray-300 rounded-lg lg:px-8 md:px-0">
        <p className="sm:text-sm">내 가게를 소개하고 공고도 등록해 보세요.</p>
        <div className="bg-red-500 text-white font-bold border rounded-md px-5 lg:px-[137px] md:px-[137px] py-2 lg:py-3 md:py-3">
          <button>가게 등록하기</button>
        </div>
      </div>
    </div>
  );
}
