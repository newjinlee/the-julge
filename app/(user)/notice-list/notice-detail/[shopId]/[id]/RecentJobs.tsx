'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobCard } from '@/components/JobCard';
import { getRecentJobs, saveRecentJob } from '@/utils/localStorageHelper';

type Job = {
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
    router.push(`/notice-list/notice-detail/${job.shop.item.id}/${job.id}`);
  };

  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline w-fit mx-auto py-[60px] pb-[120px]">
      <div className="max-w-[964px] mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-left">최근에 본 공고</h2>
        {recentJobs.length === 0 ? (
          <p className="text-center text-gray-500">최근에 본 공고가 없습니다</p>
        ) : (
          <div className="flex flex-wrap gap-3.5">
            {recentJobs.map((job) => (
              <div key={job.id} onClick={() => handleClick(job)}>
                <JobCard
                  key={job.id}
                  shopId={job.shop.item.id}
                  id={job.id}
                  image={job.shop.item.imageUrl}
                  title={job.shop.item.name}
                  time={`${new Date(job.startsAt).toLocaleString()} (${job.workhour}시간)`}
                  location={job.shop.item.address1}
                  wage={`${job.hourlyPay.toLocaleString()}원`}
                  alarm={job.hourlyPay > job.shop.item.originalHourlyPay}
                  percentage={`${((job.hourlyPay / job.shop.item.originalHourlyPay) * 100).toFixed(0)}%`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJobs;
