import Link from 'next/link';

export default function ProfileRegister() {
  return (
    <>
      <h1 className="text-[28px] font-bold  mb-[25px]">내 프로필</h1>
      <div className="w-full h-[217px] rounded-lg flex flex-col justify-center items-center border-solid border-2 border-gray-200 shadow-md gap-6">
        <h1>내 프로필을 등록하고 원하는 가게에 지원해 보세요.</h1>
        <Link href="/my-profile/my-profile-register">
          <div className="md:w-[376px] md:h-[47px] w-[150px] h-[37px] bg-[#EA3C12] rounded-lg text-white flex justify-center items-center">
            내 프로필 등록하기
          </div>
        </Link>
      </div>
    </>
  );
}
