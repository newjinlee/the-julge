'use client';

import React, { useEffect, useState } from 'react';
import { fetchJobDetails } from '@/utils/api';
import Image from 'next/image';
import axios from 'axios';
import Alert from '@/components/AlertForNotice';

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
  currentUserApplication: any | null;
};

const JobDetail = () => {
  const [message, setMessage] = useState('');
  const [shopId, setShopId] = useState<string | null>(null);
  const [noticeId, setNoticeId] = useState<string | null>(null);
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const storedShopId = localStorage.getItem('shop_id');
    const storedNoticeId = localStorage.getItem('notice_id');

    setShopId(storedShopId);
    setNoticeId(storedNoticeId);

    if (storedShopId && storedNoticeId) {
      fetchJobDetails(storedShopId, storedNoticeId)
        .then(data => setJob(data))
        .catch(error => console.error(error));
    }
  }, []);

  const handleApply = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('로그인이 필요합니다');
      return;
    }

    try {
      await axios.post(
        `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/${shopId}/notices/${noticeId}/applications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage('지원 등록 성공');
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setMessage('공고가 마감되었습니다');
            break;
          case 401:
            setMessage('로그인이 필요합니다');
            break;
          case 404:
            setMessage('존재하지 않는 가게/공고입니다');
            break;
          default:
            setMessage('지원 등록 실패');
        }
      } else {
        setMessage('지원 등록 실패');
      }
      console.error(error);
    }
  };

  const handleCloseAlert = () => {
    setMessage('');
  };

  const handleSetTestData = () => {
    const testShopId = '4490151c-5217-4157-b072-9c37b05bed47'; // 테스트용 임의의 가게 ID
    const testNoticeId = '99996477-82db-4bda-aae1-4044f11d9a8b'; // 테스트용 임의의 공고 ID
    localStorage.setItem('shop_id', testShopId);
    localStorage.setItem('notice_id', testNoticeId);
    setShopId(testShopId);
    setNoticeId(testNoticeId);

    fetchJobDetails(testShopId, testNoticeId)
      .then(data => setJob(data))
      .catch(error => console.error(error));
  };

  if (!job)
    return (
      <div>
        <p>Loading...</p>
        <button onClick={handleSetTestData} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Load Test Data
        </button>
      </div>
    );

  const shop = job.shop.item;

  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
      {message && <Alert message={message} onClose={handleCloseAlert} />}
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
                    <span>기존 시급보다 {((job.hourlyPay / shop.originalHourlyPay) * 100).toFixed(0)}%</span>
                    <div className="w-5 h-5 relative">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12.5001 16.6668H7.50011V10.0001H3.46678L10.0001 3.4668L16.5334 10.0001H12.5001V16.6668Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-5 h-5 relative">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_0_3739)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.0001 0C15.5226 0 20.0001 4.47754 20.0001 10C20.0001 15.5225 15.5226 20 10.0001 20C4.47766 20 0.00012207 15.5225 0.00012207 10C0.00012207 4.47754 4.47766 0 10.0001 0ZM8.6134 4.96745H9.83573C10.0587 4.96745 10.2426 5.15137 10.2426 5.37435V10.0846H14.5411C14.7657 10.0846 14.948 10.2686 14.948 10.4915V11.7139C14.948 11.9385 14.7641 12.1208 14.5411 12.1208H8.20487V5.37435C8.20487 5.14974 8.38879 4.96745 8.6134 4.96745ZM10.0001 2.27051C14.2693 2.27051 17.7296 5.73079 17.7296 10C17.7296 14.2692 14.2693 17.7295 10.0001 17.7295C5.73092 17.7295 2.27063 14.2692 2.27063 10C2.27063 5.73242 5.73092 2.27051 10.0001 2.27051Z"
                        fill="#F48A71"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_3739">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-gray-600">
                  {new Date(job.startsAt).toLocaleString()} ({job.workhour}시간)
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-5 h-5 relative">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.6424 2.3595C14.8828 1.59292 13.9955 0.99871 13.0036 0.592131C10.0186 -0.626815 6.61864 0.0713425 4.34292 2.36266C2.83335 3.88686 2.00012 5.82739 2.00012 7.83396C2.00012 9.83738 2.83283 11.78 4.34292 13.3026L5.17354 14.1324C6.84052 15.7929 8.27805 17.2266 9.51144 19.2195L9.99123 20L10.4741 19.2195C11.7075 17.2266 13.1451 15.7929 14.8092 14.1342L15.6421 13.3C18.7861 10.1305 18.7861 5.52923 15.6424 2.3595ZM12.4739 10.695C11.1035 12.0787 8.88209 12.0787 7.51138 10.695C6.1412 9.31607 6.1412 7.0766 7.51138 5.69502C8.88209 4.31607 11.1035 4.31607 12.4739 5.69502C13.8413 7.0766 13.8413 9.31554 12.4739 10.695Z"
                      fill="#F48A71"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">{shop.address1}</p>
              </div>
              <p className="mt-4 text-gray-900">{shop.description}</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full bg-orange-600 text-white py-3 rounded-md font-bold font-['Spoqa Han Sans Neo']"
                  onClick={handleApply}>
                  신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-8 bg-zinc-100 rounded-xl flex-col justify-start items-start gap-8 inline-flex">
          <h3 className="text-gray-900 text-lg font-bold">공고 설명</h3>
          <p className="text-gray-600 mt-2">{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
