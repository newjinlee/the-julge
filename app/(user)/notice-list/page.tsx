'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { JobCard } from '@/components/JobCard';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';

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

interface UserResponse {
  item: {
    id: string;
    email: string;
    type: 'employer' | 'employee';
    name?: string;
    phone?: string;
    address?: string;
    bio?: string;
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
      } | null;
    };
  };
  links: any[];
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

async function fetchUserInfo(userId: string): Promise<UserResponse> {
  try {
    const response: AxiosResponse<UserResponse> = await axios.get(
      `https://bootcamp-api.codeit.kr/api/5-7/the-julge/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function Page() {
  const [jobs, setJobs] = useState<JobsResponse | null>(null);
  const [allJobs, setAllJobs] = useState<JobsResponse['items']>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobsResponse['items']>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('마감임박순');
  const [user, setUser] = useState<UserResponse | null>(null);
  const { searchShopValue } = useSearch();

  if (searchShopValue) {
    console.log(searchShopValue);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobs(undefined, undefined, 0, 100);
        setJobs(data);
        setAllJobs(data.items);
        setTotalPages(Math.ceil(data.count / 6));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const data = await fetchUserInfo(userId);
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const filtered = searchShopValue
      ? allJobs.filter(item => item.item.shop.item.name.toLowerCase().includes(searchShopValue.toLowerCase()))
      : allJobs;

    setFilteredJobs(filtered);
    setTotalPages(Math.ceil(filtered.length / 6));
    setCurrentPage(1); // Reset to the first page whenever the search changes
  }, [searchShopValue, allJobs]);

  const sortJobs = (items, option) => {
    switch (option) {
      case '시급 많은 순':
        return items.sort((a, b) => b.item.hourlyPay - a.item.hourlyPay);
      case '시간 적은 순':
        return items.sort((a, b) => a.item.workhour - b.item.workhour);
      case '가나다 순':
        return items.sort((a, b) => a.item.shop.item.name.localeCompare(b.item.shop.item.name));
      case '마감임박순':
      default:
        return items.sort((a, b) => new Date(a.item.startsAt).getTime() - new Date(b.item.startsAt).getTime());
    }
  };

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const sortedJobs = sortJobs([...filteredJobs], selectedOption);

  const jobsForCurrentPage = sortedJobs.slice((currentPage - 1) * 6, currentPage * 6);

  const matchedJobs = user
    ? sortedJobs.filter(job => job.item.shop.item.address1.includes(user.item.address))
    : sortedJobs.slice(0, 3);

  const displayedMatchedJobs = matchedJobs.length > 0 ? matchedJobs.slice(0, 3) : sortedJobs.slice(0, 3);

  return (
    <>
      <div className="flex flex-col items-start w-100% px-[238px] py-[60px] bg-[var(--The-julge-red-10,#FFEBE7)] gap-[32px]">
        <h1 className=" text-[28px] font-bold leading-normal tracking-[0.56px] text-[var(--The-julge-black,#111322)]">
          맞춤 공고
        </h1>
        {jobs && (
          <div className="grid grid-cols-3 gap-[14px] justify-start">
            {displayedMatchedJobs.map(item => (
              <Link href={`/notice-list//notice-detail/${item.item.shop.item.id}/${item.item.id}`} key={item.item.id}>
                <JobCard
                  id={item.item.id}
                  startsAt={item.item.startsAt}
                  hourlyPay={item.item.hourlyPay}
                  workhour={item.item.workhour}
                  closed={item.item.closed}
                  shop={item.item.shop}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col w-100% px-[238px] py-[60px] gap-[40px]">
        <div className="flex justify-between">
          <h1 className="text-[var(--The-julge-black,#111322)] font-['Spoqa Han Sans Neo'] text-[28px] font-bold leading-normal tracking-[0.56px]">
            전체 공고
          </h1>
          <div className="inline-flex items-start gap-[10px]">
            <button
              className="flex h-[30px] p-3 items-center gap-6 rounded-[5px] bg-[#F2F2F3]"
              onClick={toggleDropdown}>
              {selectedOption}
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-[30px] bg-[#F2F2F3] rounded-[5px] shadow-md z-10">
                <button
                  className="block w-full text-left p-3 hover:bg-[#E0E0E0]"
                  onClick={() => handleOptionSelect('마감임박순')}>
                  마감임박순
                </button>
                <button
                  className="block w-full text-left p-3 hover:bg-[#E0E0E0]"
                  onClick={() => handleOptionSelect('시급 많은 순')}>
                  시급 많은 순
                </button>
                <button
                  className="block w-full text-left p-3 hover:bg-[#E0E0E0]"
                  onClick={() => handleOptionSelect('시간 적은 순')}>
                  시간 적은 순
                </button>
                <button
                  className="block w-full text-left p-3 hover:bg-[#E0E0E0]"
                  onClick={() => handleOptionSelect('가나다 순')}>
                  가나다 순
                </button>
              </div>
            )}
            <button className="flex h-[30px] p-3 items-center gap-6 rounded-[5px] bg-[#FF8D72]">상세 필터</button>
          </div>
        </div>
        {jobs && (
          <div className="grid grid-cols-3 gap-[14px] justify-start">
            {jobsForCurrentPage.map(item => (
              <Link href={`/notice-list/notice-detail/${item.item.shop.item.id}/${item.item.id}`} key={item.item.id}>
                <JobCard
                  key={item.item.id}
                  id={item.item.id}
                  startsAt={item.item.startsAt}
                  hourlyPay={item.item.hourlyPay}
                  workhour={item.item.workhour}
                  closed={item.item.closed}
                  shop={item.item.shop}
                />
              </Link>
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
                  ? 'text-gray-400 cursor-not-allowed'
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
