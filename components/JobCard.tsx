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
};

export function JobCard({ id, startsAt, hourlyPay, workhour, closed = false, shop }: JobCardProps) {
  function convertToKoreanTime(utcTime: string, workhour: number): string {
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

  const handleSaveId = () => {
    localStorage.setItem('notice_id', id);
    localStorage.setItem('shop_id', shop.item.id);
  };

  const startsTime = convertToKoreanTime(startsAt, workhour);
  return (
    <div
      className={`flex flex-col w-[171px] md:w-[312px] h-[261px] md:h-[349px] gap-[12px] md:gap-[20px] p-[12px] md:p-[16px] rounded-[12px] border ${
        closed
          ? 'border-[var(--The-julge-gray-20,#E5E4E7)] bg-[var(--The-julge-gray-10,#F4F4F5)]'
          : 'border-[var(--The-julge-gray-20,#E5E4E7)] bg-[var(--The-julge-white,#FFF)]'
      } cursor-pointer`}
      onClick={handleSaveId}>
      <div className="flex justify-center items-center rounded-lg overflow-hidden relative">
        <Image
          className={closed ? 'brightness-50' : ''}
          src={shop.item.imageUrl}
          height={310}
          width={282}
          alt="공고 이미지"
          loader={({ src }) => src}
        />
        {closed && (
          <p className="absolute top-50% left-50% text-white text-center font-spoqa font-bold text-[28px] leading-normal tracking-[0.56px] z-0">
            마감 완료
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 self-stretch">
        <h1
          className={`font-['Spoqa Han Sans Neo'] font-bold text-base leading-5 md:text-xl ${closed ? 'text-[#A3A3A3]' : ''}`}>
          {shop.item.name}
        </h1>
        <div className="h-[22px] flex gap-[6px] items-center">
          <Image src="/clock-icon.png" height={20} width={20} alt="clock icon"></Image>
          <h1
            className={`flex-1 font-['Spoqa Han Sans Neo'] text-xs font-normal leading-4 md:text-sm md:leading-6 ${closed ? 'text-[var(--The-julge-gray-50,#A3A3A3)]' : ''}`}>
            {startsTime} ({workhour}시간)
          </h1>
        </div>
        <div className="h-[22px] flex gap-[6px] items-center">
          <Image src="/location-icon.svg" height={20} width={20} alt="location icon"></Image>
          <h1
            className={`font-['Spoqa Han Sans Neo'] text-xs font-normal leading-4 md:text-sm md:leading-6 ${closed ? 'text-[var(--The-julge-gray-50,#A3A3A3)]' : ''}`}>
            {shop.item.address1}
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between md:items-center md:self-stretch">
        <h1
          className={`font-['Spoqa Han Sans Neo'] text-lg font-bold leading-4 md:text-2xl md:leading-6 ${closed ? 'text-[var(--The-julge-gray-50,#A3A3A3)]' : ''}`}>
          {hourlyPay.toLocaleString()}원
        </h1>
        {hourlyPay > shop.item.originalHourlyPay && (
          <div className="flex items-center gap-0.5">
            <h1
              className={`text-[#FF4040] md:text-[#FFF] font-['Spoqa Han Sans Neo'] h-[5px] text-xs font-normal leading-4 ${closed ? 'md:bg-[#E5E4E7]' : 'md:bg-red-400'}
              md:flex md:h-9 md:px-3 md:items-center md:gap-1.5 md:rounded-full`}>
              기존 시급보다 {((hourlyPay / shop.item.originalHourlyPay) * 100).toFixed(0)}%
              <Image src="/arrow-up-icon.svg" height={14} width={14} alt="arrow up icon"></Image>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
