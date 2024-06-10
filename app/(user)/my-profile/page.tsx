import Link from 'next/link';
import ProfileCard from './ProfileCard';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-start m-0 p-0">
      <div className="lg:w-[964px] sm:w-[680px] lg:mx-[32px] w-full px-[12px] lg:my-[60px] my-[40px]">
        <h1 className="text-[28px] font-bold  mb-[25px]">내 프로필</h1>
        <div className="w-full h-[217px] rounded-lg flex flex-col justify-center items-center border-solid border-2 border-gray-200 shadow-md gap-6">
          <h1>내 프로필을 등록하고 원하는 가게에 지원해 보세요.</h1>
          <Link href="/my-profile/my-profile-register">
            <div className="md:w-[376px] md:h-[47px] w-[150px] h-[37px] bg-[#EA3C12] rounded-lg text-white flex justify-center items-center">
              내 프로필 등록하기
            </div>
          </Link>
        </div>
        <ProfileCard
          name="임상훈"
          phoneNumber="010-9802-2131"
          preferAddress="서울시 성동구"
          selfIntroduction="열심히 일하겠습니다."></ProfileCard>
      </div>
    </div>
  );
}
