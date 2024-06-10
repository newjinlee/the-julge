import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { JobCard } from '@/components/JobCard';
import { getRecentJobs, saveRecentJob } from '@/utils/localStorageHelper';

type Job = {
  shopId: string;
  id: string;
  image: string;
  title: string;
  time: string;
  location: string;
  wage: string;
  alarm: boolean;
  percentage: string;
};

const RecentJobs = () => {
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    const jobs = getRecentJobs();
    setRecentJobs(jobs);
  }, []);

  const handleClick = (job: Job) => {
    saveRecentJob(job);
    router.push('/notice-list/notice-detail?shopId=${job.shopId}&id=${job.id}');
  };

  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline w-fit mx-auto py-[60px] pb-[120px]">
      <div className="max-w-[964px] mx-auto">
        <h2 className="text-2xl font-bold mb-6">최근에 본 공고</h2>
        <div className="flex flex-wrap gap-3.5">
          {recentJobs.map(job => (
            <div key={job.id} onClick={() => handleClick(job)}>
              <JobCard
                key={job.id}
                shopId={job.shopId}
                id={job.id}
                image={job.image}
                title={job.title}
                time={job.time}
                location={job.location}
                wage={job.wage}
                alarm={job.alarm}
                percentage={job.percentage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentJobs;
