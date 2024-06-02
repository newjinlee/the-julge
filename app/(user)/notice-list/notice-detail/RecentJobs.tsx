import React from 'react';
import { JobCard } from '../../../../components/JobCard';

const RecentJobs = () => {
  const recentJobsData = [
    {
      image: 'https://via.placeholder.com/310x282',
      title: '수리 에스프레소 샵',
      time: '2023-01-02 15:00~18:00 (3시간)',
      location: '서울시 송파구',
      wage: '10,000원',
      alarm: true,
      percentage: '30%',
    },
    {
      image: 'https://via.placeholder.com/310x282',
      title: '별빛카페',
      time: '2023-01-02 15:00~18:00 (3시간)',
      location: '서울시 마포구',
      wage: '9,900원',
      alarm: false,
      percentage: '100%',
    },
    {
      image: 'https://via.placeholder.com/310x282',
      title: '커피바다',
      time: '2023-01-02 15:00~18:00 (3시간)',
      location: '서울시 광진구',
      wage: '11,000원',
      alarm: true,
      percentage: '100%',
    },
    {
      image: 'https://via.placeholder.com/310x282',
      title: '해피버거',
      time: '2023-01-02 15:00~18:00 (3시간)',
      location: '서울시 도봉구',
      wage: '9,500원',
      alarm: false,
      percentage: '100%',
    },
    {
      image: 'https://via.placeholder.com/310x282',
      title: '정원식당',
      time: '2023-01-02 15:00~18:00 (3시간)',
      location: '서울시 동대문구',
      wage: '10,000원',
      alarm: true,
      percentage: '50%',
    },
    {
      image: 'https://via.placeholder.com/310x282',
      title: '우리동네카페',
      time: '2023-01-02 15:00~18:00 (3시간)',
      location: '서울시 강남구',
      wage: '9,500원',
      alarm: true,
      percentage: '100%',
    },
  ];

  return (
    <div className="w-[1440px] h-[976px] px-[238px] pt-[60px] pb-[120px] bg-neutral-50 flex-col justify-start items-start gap-2 inline-flex">
      <div className="flex-col justify-start items-start gap-8 flex">
        <div className="text-gray-900 text-[28px] font-bold font-['Spoqa Han Sans Neo'] tracking-wide">최근에 본 공고</div>
        <div className="flex-col justify-start items-start gap-8 flex">
          <div className="flex justify-start items-start gap-3.5 inline-flex">
            {recentJobsData.map((job, index) => (
              <JobCard
                key={index}
                image={job.image}
                title={job.title}
                time={job.time}
                location={job.location}
                wage={job.wage}
                alarm={job.alarm}
                percentage={job.percentage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentJobs;
