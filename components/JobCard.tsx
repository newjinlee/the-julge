import Image from 'next/image';
import { useRouter } from  'next/router';
import { saveRecentJob } from '@/utils/localStorageHelper';

type JobCardProps = {
  id: string,
  image: string;
  title: string;
  time: string;
  location: string;
  wage: string;
  alarm: boolean;
  percentage: string;
};

export function JobCard({ id, image, title, time, location, wage, alarm = false, percentage }: JobCardProps) {
  const router = useRouter();
  
  const handleClick = () => {
    const job = { id, image, title, time, location, wage, alarm, percentage };
    saveRecentJob(job);
    router.push(`/notice-detail/${id}`);
  };
  
  return (
    <div onClick={handleClick} className="flex w-[312px] h-[349px] rounded-md shadow-lg flex-col p-[16px] border-solid border-2 border-gray-200 justify-between">
      <Image src={image} height={160} width={280} alt="logo"></Image>
      <div className="flex-col flex gap-[8px]">
        <h1 className="text-[20px] font-semibold">{title}</h1>
        <div className="h-[22px] flex gap-[6px] items-center">
          <Image src="/clock-icon.png" height={20} width={20} alt="clock icon"></Image>
          <h1 className="text-[14px]">{time}</h1>
        </div>
        <div className="h-[22px] flex gap-[6px] items-center">
          <Image src="/location-icon.png" height={20} width={20} alt="location icon"></Image>
          <h1 className="text-[14px]">{location}</h1>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <h1 className="text-[24px] font-semibold">{wage}</h1>
        {alarm && (
          <div className="flex justify-center items-center w-[159px] h-[36px] bg-red-400 text-[14px] px-[12px] gap-[3px] text-white rounded-3xl">
            <h1>기존 시급보다 {percentage}</h1>
            <Image src="/arrow-up-icon.png" height={14} width={14} alt="arrow up icon"></Image>
          </div>
        )}
      </div>
    </div>
  );
}
