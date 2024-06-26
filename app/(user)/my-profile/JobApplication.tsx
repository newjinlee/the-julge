import Link from 'next/link';

export default function JobApplication() {
  return (
    <>
      <h1 className="text-[28px] font-bold  mb-[25px]">신청내역</h1>
      <div className="w-full h-[217px] rounded-lg flex flex-col justify-center items-center border-solid border-2 border-gray-200 shadow-md gap-6">
        <h1>아직 신청내역이 없어요.</h1>
        <Link href="/notice-list">
          <div className="md:w-[376px] md:h-[47px] w-[150px] h-[37px] bg-[#EA3C12] rounded-lg text-white flex justify-center items-center">
            공고보러가기
          </div>
        </Link>
      </div>
    </>
  );
}
