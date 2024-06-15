import React, { useEffect, useState } from 'react';
import { convertToKoreanTime } from '@/utils/timeChangeHelper';
import { Job } from '@/types/job'

type JobCardProps = {
  job: Job;
  onClick: () => void;
};

const JobCardForRecentSearch: React.FC<JobCardProps> = ({ job, onClick }) => {
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    setStartTime(convertToKoreanTime(job.startsAt, job.workhour));
  }, [job.startsAt, job.workhour]);

  if (!job.shop || !job.shop.item) {
    return null;
  }

  return (
    <div
      className="w-[312px] h-auto p-4 bg-white rounded-xl border border-zinc-200 flex flex-col justify-start items-start gap-5"
      onClick={onClick}>
      <div className="w-full h-40 rounded-xl overflow-hidden justify-center items-center flex">
        <img className="w-full h-full object-cover" src={job.shop.item.imageUrl} alt={job.shop.item.name} />
      </div>
      <div className="flex flex-col justify-between items-start gap-4 flex-grow">
        <div className="flex flex-col justify-start items-start gap-2">
          <div className="text-gray-900 text-xl font-bold font-['Spoqa Han Sans Neo']">{job.shop.item.name}</div>
          <div className="justify-start items-center gap-1.5 inline-flex">
            <div className="w-5 h-5 relative">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_0_3739)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0001 0C15.5226 0 20.0001 4.47754 20.0001 10C20.0001 15.5225 15.5226 20 10.0001 20C4.47766 20 0.00012207 15.5225 0.00012207 10C0.00012207 4.47754 4.47766 0 10.0001 0ZM8.6134 4.96745H9.83573C10.0587 4.96745 10.2426 5.15137 10.2426 5.37435V10.0846H14.5411C14.7657 10.0846 14.948 10.2686 14.948 10.4915V11.7139C14.948 11.9385 14.7641 12.1208 14.5411 12.1208H8.20487V5.37435C8.20487 5.14974 8.38879 4.96745 8.6134 4.96745ZM10.0001 2.27051C14.2693 2.27051 17.7296 5.73079 17.7296 10C17.7296 14.2692 14.2693 17.7295 10.0001 17.7295C5.73092 17.7295 2.27063 14.2692 2.27063 10C2.27063 5.73242 5.73092 2.27051 10.0001 2.27051Z"
                    fill="#F48A71"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_3739">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">
              {startTime} ({job.workhour}시간)
            </div>
          </div>
          <div className="justify-start items-center gap-1.5 inline-flex">
            <div className="w-5 h-5 relative">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.6424 2.3595C14.8828 1.59292 13.9955 0.99871 13.0036 0.592131C10.0186 -0.626815 6.61864 0.0713425 4.34292 2.36266C2.83335 3.88686 2.00012 5.82739 2.00012 7.83396C2.00012 9.83738 2.83283 11.78 4.34292 13.3026L5.17354 14.1324C6.84052 15.7929 8.27805 17.2266 9.51144 19.2195L9.99123 20L10.4741 19.2195C11.7075 17.2266 13.1451 15.7929 14.8092 14.1342L15.6421 13.3C18.7861 10.1305 18.7861 5.52923 15.6424 2.3595ZM12.4739 10.695C11.1035 12.0787 8.88209 12.0787 7.51138 10.695C6.1412 9.31607 6.1412 7.0766 7.51138 5.69502C8.88209 4.31607 11.1035 4.31607 12.4739 5.69502C13.8413 7.0766 13.8413 9.31554 12.4739 10.695Z"
                  fill="#F48A71"
                />
              </svg>
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['Spoqa Han Sans Neo'] leading-snug">
              {job.shop.item.address1}
            </div>
          </div>
        </div>
        <div className="self-stretch gap-3 flex justify-between items-center">
          <div className="text-gray-900 text-2xl font-bold font-['Spoqa Han Sans Neo'] tracking-wide">
            {job.hourlyPay.toLocaleString('ko-KR')}원
          </div>
          <div className="w-[168px] p-3 bg-red-500 rounded-[20px] justify-start items-center gap-1.5 flex">
            <div className="justify-start items-center gap-0.5 flex">
              <div className="justify-start items-start flex">
                <div className="text-white text-sm font-bold font-['Spoqa Han Sans Neo']">
                  <span>기존 시급보다 {((job.hourlyPay / job.shop.item.originalHourlyPay) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-5 h-5 flex justify-center items-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.5001 16.6668H7.50011V10.0001H3.46678L10.0001 3.4668L16.5334 10.0001H12.5001V16.6668Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardForRecentSearch;
