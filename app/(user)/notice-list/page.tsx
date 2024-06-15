'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { JobCard } from '@/components/JobCard';

interface JobsResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  address: string[];
  keyword?: string;
  items: {
    item: {
      id: string;
      hourlyPay: number;
      startsAt: string;
      workhour: number;
      description: string;
      closed: boolean;
      shop: {
        item: {
          id: string;
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
    links: any[];
  }[];
  links: {
    rel: string;
    description: string;
    method: string;
    href: string;
  }[];
}

async function fetchJobs(
  address?: string[],
  keyword?: string,
  offset: number = 0,
  limit: number = 10,
): Promise<JobsResponse> {
  try {
    const response: AxiosResponse<JobsResponse> = await axios.get(
      'https://bootcamp-api.codeit.kr/api/0-1/the-julge/notices',
      {
        params: {
          offset,
          limit,
          address,
          keyword,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function Page() {
  const [jobs, setJobs] = useState<JobsResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobs(undefined, undefined, (currentPage - 1) * 6, 6);
        setJobs(data);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (jobs) {
    jobs.items.forEach(item => {
      console.log(item.item);
    });
  }

  const getDisplayedPages = () => {
    const pagesToShow = 6;
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <>
      <div className="flex flex-col items-start w-100% px-[238px] py-[60px] bg-[var(--The-julge-red-10,#FFEBE7)] gap-[32px]">
        <h1 className=" text-[28px] font-bold leading-normal tracking-[0.56px] text-[var(--The-julge-black,#111322)]">
          맞춤 공고
        </h1>
        {jobs && (
          <div className="grid grid-cols-3 gap-[14px] justify-start">
            {jobs.items.slice(0, 3).map(item => (
              <JobCard
                key={item.item.id}
                startsAt={item.item.startsAt}
                hourlyPay={item.item.hourlyPay}
                workhour={item.item.workhour}
                closed={item.item.closed}
                shop={item.item.shop}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col w-100% px-[238px] py-[60px] gap-[40px]">
        <div className="flex justify-start">
          <h1 className="text-[var(--The-julge-black,#111322)] font-['Spoqa Han Sans Neo'] text-[28px] font-bold leading-normal tracking-[0.56px]">
            전체 공고
          </h1>
        </div>
        {jobs && (
          <div className="grid grid-cols-3 gap-[14px] justify-start">
            {jobs.items.map(item => (
              <JobCard
                key={item.item.id}
                startsAt={item.item.startsAt}
                hourlyPay={item.item.hourlyPay}
                workhour={item.item.workhour}
                closed={item.item.closed}
                shop={item.item.shop}
              />
            ))}
          </div>
        )}
        <div className="flex w-100% px-3 justify-center items-center">
          <div className="flex items-center gap-[20px]">
            <button
              className={`px-[12px] py-[8px] ${
                currentPage <= 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'bg-[var(--The-julge-white,#FFF)] text-[var(--The-julge-black,#111322)]'
              }`}
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}>
              &lt;
            </button>
            {getDisplayedPages().map(page => (
              <button
                key={page}
                className={`flex w-[40px] h-[40px] justify-center items-center rounded-[4px] ${
                  currentPage === page
                    ? 'bg-[var(--The-julge-red,#FF5A47)] text-[var(--The-julge-white,#FFF)] font-spoqa text-[14px] font-normal leading-[22px]'
                    : 'bg-[var(--The-julge-white,#FFF)] text-[var(--The-julge-black,#111322)] font-spoqa text-[14px] font-normal leading-[22px]'
                }`}
                onClick={() => handlePageChange(page)}>
                {page}
              </button>
            ))}
            <button
              className={`px-[12px] py-[8px] ${
                currentPage >= totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[var(--The-julge-white,#FFF)] text-[var(--The-julge-black,#111322)]'
              }`}
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
