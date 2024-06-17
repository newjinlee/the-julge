'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import JobCardForRecentSearch from '@/components/JobCardForRecentSearch';
import { getRecentJobs, saveRecentJob } from '@/utils/localStorageHelper';
import { fetchJobDetails } from '@/utils/api';
import { NoticeDetailData } from '@/types/notices';

const RecentJobs = () => {
  const [recentJobs, setRecentJobs] = useState<NoticeDetailData['item'][]>([]);
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
            return null;
          }
        }),
      );
      setRecentJobs(jobsWithDetails.filter(job => job !== null) as NoticeDetailData['item'][]);
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
          return null;
      }
    };

    handleRouteChange(pathname);
    const handlePathnameChange = () => handleRouteChange(window.location.pathname);

    window.addEventListener('popstate', handlePathnameChange);
    return () => {
      window.removeEventListener('popstate', handlePathnameChange);
    };
  }, [pathname, router]);

  const handleClick = (job: NoticeDetailData['item']) => {
    localStorage.setItem('notice_id', job.id);
    localStorage.setItem('shop_id', job.shop.item.id);
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
                job={job}
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
