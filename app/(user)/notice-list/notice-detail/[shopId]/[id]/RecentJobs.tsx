'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import JobCardForRecentSearch from './JobCardForRecentSearch';
import { getRecentJobs, saveRecentJob } from '@/utils/localStorageHelper';
import { fetchJobDetails } from '@/utils/api';

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
  const pathname = usePathname();

  useEffect(() => {
    const loadRecentJobs = async () => {
      const storedJobs = getRecentJobs();
      const jobsWithDetails = await Promise.all(
        storedJobs.map(async job => {
          try {
            const jobDetails = await fetchJobDetails(job.shop.item.id, job.id);
            return jobDetails;
          } catch (error) {
            console.error(`Failed to fetch job details for job ${job.id}`, error);
            return null;
          }
        }),
      );
      setRecentJobs(jobsWithDetails.filter(job => job !== null) as Job[]);
    };

    loadRecentJobs();
  }, []);

  useEffect(() => {
    const handleRouteChange = async (url: string) => {
      const segments = url.split('/');
      const shopId = segments[segments.length - 2];
      const jobId = segments[segments.length - 1];

      try {
        const jobDetails = await fetchJobDetails(shopId, jobId);
        saveRecentJob(jobDetails);
        setRecentJobs(getRecentJobs());
      } catch (error) {
        console.error('Failed to save recent job', error);
      }
    };

    handleRouteChange(pathname);
    const handlePathnameChange = () => handleRouteChange(window.location.pathname);

    window.addEventListener('popstate', handlePathnameChange);
    return () => {
      window.removeEventListener('popstate', handlePathnameChange);
    };
  }, [pathname, router]);

  const handleClick = (job: Job) => {
    router.push(`/notice-list/notice-detail/${job.shop.item.id}/${job.id}`);
  };

  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline w-fit mx-auto py-[60px] pb-[120px]">
      <div className="box-border m-0 p-0 border-none text-decoration-none select-none outline-none font-inherit align-baseline flex flex-col items-start justify-start max-w-[964px] gap-8">
        <h2 className="text-2xl font-bold text-left">최근에 본 공고</h2>
        {recentJobs.length === 0 ? (
          <p className="text-center text-gray-500">최근에 본 공고가 없습니다</p>
        ) : (
          <div className="flex flex-wrap gap-3.5">
            {recentJobs.map(job => (
              <div key={job.id} onClick={() => handleClick(job)}>
                <JobCardForRecentSearch
                  key={job.id}
                  id={job.id}
                  startsAt={job.startsAt}
                  hourlyPay={job.hourlyPay}
                  workhour={job.workhour}
                  closed={job.closed}
                  shop={job.shop}
                  currentUserApplication={job.currentUserApplication}
                  onClick={() => handleClick(job)}
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
