import React from 'react';
import { JobCard } from '@/components/JobCard';

const RecentJobs = () => {
  const recentJobsData = [
    {
      image: 'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png',
      title: '진주회관',
      time: '2023-07-07 18:00~20:00 (2시간)',
      location: '서울시 중구',
      wage: '30,000원',
      alarm: true,
      percentage: '200%',
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
  ];

  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline w-fit mx-auto py-[60px] pb-[120px]">
      <div className="max-w-[964px] mx-auto">
        <h2 className="text-2xl font-bold mb-6">최근에 본 공고</h2>
        <div className="flex flex-wrap gap-3.5">
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
  );
};

export default RecentJobs;
