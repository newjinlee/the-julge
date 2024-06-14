import Image from 'next/image';

type JobCardProps = {
  shopId: string;
  id: string;
  image: string;
  name: string;
  startsAt: string;
  time: number;
  location: string;
  wage: number;
  alarm: boolean;
  percentage: string;
};

export function JobCard({ image, name, startsAt, time, location, wage, alarm = false, percentage }: JobCardProps) {
  function convertToKoreanTime(utcTime, time) {
    if (isNaN(Date.parse(utcTime))) {
      return 'Invalid time value';
    }

    const utcDate = new Date(utcTime);

    const startHours = utcDate.getUTCHours();
    let endHours = startHours + Math.floor(time);
    const minutes = (time % 1) * 60;

    // 24시간이 넘어갔을 때 새벽 시간으로 변환
    if (endHours >= 24) {
      endHours -= 24;
      utcDate.setUTCDate(utcDate.getUTCDate() + 1);
    }

    return `${utcDate.toISOString().slice(0, 16).replace('T', ' ')}~${String(endHours).padStart(2, '0')}:${String(Math.round(minutes)).padStart(2, '0')}`;
  }

  const startsTime = convertToKoreanTime(startsAt, time);

  return (
    <div className="flex flex-col w-[312px] h-[349px] gap-[20px] p-[16px] rounded-g bg-white border border-gray-200 cursor-pointer">
      <div className="flex justify-center items-center rounded-lg overflow-hidden">
        <Image src={image} height={310} width={282} alt="공고 이미지" loader={({ src }) => src} />
      </div>
      <div className="flex-col flex gap-[8px]">
        <h1 className="text-[20px] font-semibold">{name}</h1>
        <div className="h-[22px] flex gap-[6px] items-center">
          <Image src="/clock-icon.png" height={20} width={20} alt="clock icon"></Image>
          <h1 className="text-[14px]">
            {startsTime} ({time}시간)
          </h1>
        </div>
        <div className="h-[22px] flex gap-[6px] items-center">
          <Image src="/location-icon.png" height={20} width={20} alt="location icon"></Image>
          <h1 className="text-[14px]">{location}</h1>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <h1 className="text-[24px] font-semibold">{wage}원</h1>
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
