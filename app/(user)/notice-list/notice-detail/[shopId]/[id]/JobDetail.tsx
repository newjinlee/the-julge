'use client';

import React, { useEffect, useState } from 'react';
import { fetchJobDetails } from '@/utils/api';
import Image from 'next/image';

type Job = {
  id: string;
  description: string;
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
  currentUserApplication: any | null; // 현재 사용자 지원 정보 (optional)
};

const JobDetail = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        const urlParts = window.location.pathname.split('/');
        const shopId = urlParts[urlParts.length - 2];
        const id = urlParts[urlParts.length - 1];

        if (shopId && id) {
          console.log(`Fetching job details for shopId: ${shopId}, id: ${id}`);
          const jobDetails = await fetchJobDetails(shopId, id);
          console.log('API response:', jobDetails);
          setJob(jobDetails);
          setError(null);
        } else {
          setError('Invalid job ID or shop ID');
        }
      } catch (error: any) {
        console.error('Failed to load job details', error);
        setError('Failed to load job details');
      }
    };

    loadJobDetails();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  const shop = job.shop.item;

  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
      <div className="w-full flex flex-col items-start gap-8">
        <div className="w-full">
          <h2 className="text-orange-600 text-base font-bold">{shop.category}</h2>
          <h1 className="text-gray-900 text-2xl font-bold mb-6">{shop.name}</h1>
          <div className="flex flex-col bg-white p-6 rounded-xl shadow-md lg:flex-row gap-8">
            <div className="flex-none w-full lg:w-1/2 rounded-xl overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={shop.imageUrl}
                alt={shop.name}
                width={597}
                height={543}
              />
            </div>
            <div className="flex flex-col justify-between w-full lg:w-1/2">
              <div>
                <h3 className="text-orange-600 text-base font-bold">시급</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-gray-900">{job.hourlyPay.toLocaleString()}원</span>
                  <div className="bg-orange-600 text-white text-sm rounded-full flex items-center p-2">
                    <span>기존 시급보다 {(job.hourlyPay / shop.originalHourlyPay * 100).toFixed(0)}%</span>
                    <div className="w-5 h-5 relative">
                      <Image src="/arrow-up-icon.png" alt="arrow upper" fill style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-5 h-5 relative">
                  <Image src="/clock-icon.png" alt="clock" fill style={{ objectFit: 'cover' }} />
                </div>
                <p className="text-gray-600">{new Date(job.startsAt).toLocaleString()} ({job.workhour}시간)</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-5 h-5 relative">
                  <Image src="/location-icon.png" alt="location" fill style={{ objectFit: 'cover' }} />
                </div>
                <p className="text-gray-600">{shop.address1}</p>
              </div>
              <p className="mt-4 text-gray-900">{shop.description}</p>
              <div className="mt-6">
                <button type="button" className="w-full bg-orange-600 text-white py-3 rounded-md font-bold">
                  신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-8 bg-zinc-100 rounded-xl flex-col justify-start items-start gap-8 inline-flex">
          <h3 className="text-gray-900 text-lg font-bold">공고 설명</h3>
          <p className="text-gray-600 mt-2">
            {job.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
