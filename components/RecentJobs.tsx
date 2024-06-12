// src/components/RecentJobs.tsx
import { useEffect, useState } from 'react';
import { getRecentJobs } from '../utils/localStorageHelper';
import { JobCard } from './JobCard';

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

  useEffect(() => {
    const jobs = getRecentJobs();
    setRecentJobs(jobs);
  }, []);

  return (
    <div>
      <h2>최근에 본 공고</h2>
      <div className="flex flex-wrap">
        {recentJobs.map((job) => (
          <JobCard
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
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
