import Link from 'next/link';
import Image from 'next/image';

type ProfileCardProps = { name: string; phoneNumber: string; preferAddress: string; bio: string };

export default function ProfileCard({ name, phoneNumber, preferAddress, bio }: ProfileCardProps) {
  return (
    <div className="w-full flex justify-between">
      <h1 className="text-[28px] font-bold  mb-[25px]"> 내 프로필</h1>
      <div className="sm:w-full lg:w-[665px] lg:h-[256px] lg:p-[32px] lg:text-[16px] text-[14px]  h-[196px] p-[20px] bg-[#FFEBE7] rounded-xl flex ] justify-between">
        <div className="flex flex-col lg:gap-[12px] gap-[8px]">
          <div>
            <h1 className="text-[16px] font-semibold text-[#EA3C12]">이름</h1>
            <h1 className="md:text-[28px] text-[24px] font-semibold">{name}</h1>
          </div>

          <div className="flex gap-[6px]">
            <Image src={'/phone-icon.png'} height={20} width={20} alt="location"></Image>

            <h1 className="text-[#7D7986]  ">{phoneNumber}</h1>
          </div>
          <div className="flex gap-[6px]">
            <Image src={'/location-icon.png'} height={20} width={20} alt="location"></Image>
            <h1 className="text-[#7D7986] ">선호지역 {preferAddress}</h1>
          </div>
          <h1 className="my-[10px]">{bio}</h1>
        </div>
        <Link href="/my-profile/my-profile-edit">
          <div className="flex justify-center items-center md:w-[169px] md:h-[48px] w-[108px] h-[37px] md:text-[16px] text-[14px] bg-white font-bold text-[#EA3C12]  border-solid border-[1px] border-[#EA3C12] rounded-md">
            편집하기
          </div>
        </Link>
      </div>
    </div>
  );
}
