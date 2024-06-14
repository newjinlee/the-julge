import Image from 'next/image';

type JobCardProps = {
  id: string;
  startsAt: string;
  hourlyPay: number;
  workhour: number;
  closed: boolean;
  shop: {
    item: {
      id: string; // shop_id
      name: string;
      category: string;
      address1: string;
      address2: string;
      description: string;
      imageUrl: string;
      originalHourlyPay: number;
    };
    href: string;
  };
  currentUserApplication: any | null;
  onClick: () => void;
};

export function JobCard({
  id,
  startsAt,
  hourlyPay,
  workhour,
  closed,
  shop,
  currentUserApplication,
  onClick,
}: JobCardProps) {
  function convertToKoreanTime(utcTime, workhour) {
    if (isNaN(Date.parse(utcTime))) {
      return 'Invalid time value';
    }

    const utcDate = new Date(utcTime);

    const startHours = utcDate.getUTCHours();
    let endHours = startHours + Math.floor(workhour);
    const minutes = (workhour % 1) * 60;

    // 24시간이 넘어갔을 때 새벽 시간으로 변환
    if (endHours >= 24) {
      endHours -= 24;
      utcDate.setUTCDate(utcDate.getUTCDate() + 1);
    }

    return `${utcDate.toISOString().slice(0, 16).replace('T', ' ')}~${String(endHours).padStart(2, '0')}:${String(Math.round(minutes)).padStart(2, '0')}`;
  }

  const startsTime = convertToKoreanTime(startsAt, workhour);
  return (
    // <div
    //   className="flex w-[312px] h-[349px] rounded-md shadow-lg flex-col p-[16px] border-solid border-2 border-gray-200 justify-between cursor-pointer"
    //   onClick={onClick}>
    //   <Image src={shop.item.imageUrl} height={160} width={280} alt="logo"></Image>
    //   <div className="flex-col flex gap-[8px]">
    //     <h1 className="text-[20px] font-semibold">{shop.item.name}</h1>
    //     <div className="h-[22px] flex gap-[6px] items-center">
    //       <Image src="/clock-icon.svg" height={20} width={20} alt="clock icon"></Image>
    //       <h1 className="text-[14px]">{new Date(startsAt).toLocaleString()}</h1>
    //     </div>
    //     <div className="h-[22px] flex gap-[6px] items-center">
    //       <Image src="/location-icon.svg" height={20} width={20} alt="location icon"></Image>
    //       <h1 className="text-[14px]">{shop.item.address1}</h1>
    //     </div>
    //   </div>
    //   <div className="flex w-full justify-between">
    //     <h1 className="text-[24px] font-semibold">{hourlyPay.toLocaleString()}원</h1>
    //     {hourlyPay > shop.item.originalHourlyPay && (
    //       <div className="flex justify-center items-center w-[159px] h-[36px] bg-red-400 text-[14px] px-[12px] gap-[3px] text-white rounded-3xl">
    //         <h1>기존 시급보다 {((hourlyPay / shop.item.originalHourlyPay) * 100).toFixed(0)}%</h1>
    //         <Image src="/arrow-up-icon.svg" height={14} width={14} alt="arrow up icon"></Image>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div
      className="flex flex-col w-[312px] h-[349px] gap-[20px] p-[16px] rounded-[12px] border border-[var(--The-julge-gray-20,#E5E4E7)] bg-[var(--The-julge-white,#FFF)] cursor-pointer"
      onClick={onClick}>
      <div className="flex justify-center items-center rounded-lg overflow-hidden">
        <Image src={shop.item.imageUrl} height={310} width={282} alt="공고 이미지" loader={({ src }) => src} />
      </div>
      <div className="flex-col flex gap-[8px]">
        <h1 className="text-[20px] font-semibold">{shop.item.name}</h1>
        <div className="h-[22px] flex gap-[6px] items-center">
          <Image src="/clock-icon.png" height={20} width={20} alt="clock icon"></Image>
          <h1 className="text-[14px]">
            {startsTime} ({workhour}시간)
          </h1>
        </div>
        <div className="h-[22px] flex gap-[6px] items-center">
          <Image src="/location-icon.svg" height={20} width={20} alt="location icon"></Image>
          <h1 className="text-[14px]">{shop.item.address1}</h1>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <h1 className="text-[24px] font-semibold">{hourlyPay.toLocaleString()}원</h1>
        {hourlyPay > shop.item.originalHourlyPay && (
          <div className="flex justify-center items-center w-[159px] h-[36px] bg-red-400 text-[14px] px-[12px] gap-[3px] text-white rounded-3xl">
            <h1>기존 시급보다 {((hourlyPay / shop.item.originalHourlyPay) * 100).toFixed(0)}%</h1>
            <Image src="/arrow-up-icon.svg" height={14} width={14} alt="arrow up icon"></Image>
          </div>
        )}
      </div>
    </div>
  );
}
