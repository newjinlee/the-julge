'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import useShopData from '@/app/hooks/useShopData';
import { NoticeFullDetailData, Applications } from '@/types';
import useNoticeFullDetail from '@/app/hooks/useNoticeFullDetail';
import Pagination from '@/components/Pagination';

const MyNoticeDetail = () => {
  const router = useRouter();
  const { noticeId } = useParams();

  const [noticeFullDetail, setNoticeFullDetail] = useState<NoticeFullDetailData>();
  const [applications, setApplications] = useState<Applications>();

  const limit = 5;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchNoticeDetail = async () => {
      try {
        const shop = await useShopData(userId);
        const detail: NoticeFullDetailData = await useNoticeFullDetail(shop.item.id, noticeId, offset, limit);
        setNoticeFullDetail(detail);
        setApplications(detail.item.currentUserApplication);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNoticeDetail();
  }, [noticeId, offset]);

  // ------------------------------------ test
  const handleClick = () => {
    console.log(applications);
  };
  // ------------------------------------ test

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const convertToKoreanTime = (utcTime: string, workhour: number) => {
    if (isNaN(Date.parse(utcTime))) {
      return 'Invalid time value';
    }

    const utcDate = new Date(utcTime);

    const startHours = utcDate.getUTCHours();
    let endHours = startHours + Math.floor(workhour);
    const minutes = (workhour % 1) * 60;

    // 24시간이 넘어갔을 때 새벽 시간으로 변환
    if (endHours >= 24) {
      endHours -= 24;
      utcDate.setUTCDate(utcDate.getUTCDate() + 1);
    }

    return `${utcDate.toISOString().slice(0, 16).replace('T', ' ')}~${String(endHours).padStart(2, '0')}:${String(Math.round(minutes)).padStart(2, '0')}`;
  };

  return (
    <>
      {noticeFullDetail && (
        <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
          <button onClick={handleClick}>test</button>
          <div className="w-full flex flex-col items-start gap-8 mb-[60px]">
            <div className="w-full">
              <h2 className="text-orange-600 text-base font-bold">{noticeFullDetail.item.shop.item.category}</h2>
              <h1 className="text-gray-900 text-2xl font-bold mb-6">{noticeFullDetail.item.shop.item.name}</h1>
              <div className="flex flex-col bg-white p-6 rounded-xl shadow-md lg:flex-row gap-8">
                <div className="flex-none w-full lg:w-1/2 rounded-xl overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src={noticeFullDetail.item.shop.item.imageUrl}
                    alt="가게사진"
                    width={597}
                    height={543}
                    priority
                  />
                </div>
                <div className="flex flex-col justify-between w-full lg:w-1/2">
                  <div>
                    <h3 className="text-orange-600 text-base font-bold">시급</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatNumber(noticeFullDetail.item.hourlyPay)}원
                      </span>
                      {noticeFullDetail.item.hourlyPay > noticeFullDetail.item.shop.item.originalHourlyPay && (
                        <div className="bg-orange-600 text-white text-sm rounded-full flex items-center p-2">
                          <span>
                            기존 시급보다{' '}
                            {(
                              (noticeFullDetail.item.hourlyPay / noticeFullDetail.item.shop.item.originalHourlyPay) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                          <div className="w-5 h-5 relative">
                            <Image
                              src="/arrow-up-icon.png"
                              alt="arrow upper"
                              fill
                              sizes="(max-width: 20px) 100vw, 50vw"
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="w-5 h-5 relative">
                      <Image
                        src="/clock-icon.png"
                        alt="clock"
                        fill
                        sizes="(max-width: 20px) 100vw, 50vw"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <p className="text-gray-600">
                      {convertToKoreanTime(noticeFullDetail.item.startsAt, noticeFullDetail.item.workhour)} (
                      {noticeFullDetail.item.workhour}시간)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-5 h-5 relative">
                      <Image
                        src="/location-icon.png"
                        alt="location"
                        fill
                        sizes="(max-width: 20px) 100vw, 50vw"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <p className="text-gray-600">{noticeFullDetail.item.shop.item.address1}</p>
                  </div>
                  <p className="mt-4 text-gray-900">{noticeFullDetail.item.shop.item.description}</p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full bg-white text-The-julge-primary border border-The-julge-primary py-3 rounded-md font-bold"
                      onClick={() => router.push(`/my-notice/my-notice-edit/${noticeId}`)}>
                      공고 편집하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-8 bg-zinc-100 rounded-xl flex-col justify-start items-start gap-8 inline-flex">
              <h3 className="text-gray-900 text-lg font-bold">공고 설명</h3>
              <p className="text-gray-600 mt-2">{noticeFullDetail.item.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[32px] mt-[60px]">
            <h1 className="text-The-julge-black text-2xl font-bold mb-6">신청자 목록</h1>
            <div>
              {applications && applications.count > 0 ? (
                <>
                  <table className="border w-full text-left">
                    <thead className="bg-The-julge-red-10">
                      <tr>
                        <th className="px-[12px] py-[14px]">신청자</th>
                        <th>소개</th>
                        <th>전화번호</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.items.map((application: any, index: number) => (
                        <tr key={index}>
                          <td className="px-[12px] py-[20px]">{application.item.user.item.name}</td>
                          <td>{application.item.user.item.id}</td>
                          <td>{application.item.user.item.phone}</td>
                          <td>{application.item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(applications.count / limit)}
                    hasNext={applications.hasNext}
                    noticeId={noticeId}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <p>신청자 없음</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyNoticeDetail;
