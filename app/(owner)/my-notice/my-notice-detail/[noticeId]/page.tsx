'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import useShopData from '@/app/hooks/useShopData';
import { NoticeDetailData, ShopData } from '@/types';
import useNoticeDetail from '@/app/hooks/useNoticeDetail';

const MyNoticeDetail = () => {
  const router = useRouter();
  const { noticeId } = useParams();

  const [noticeDetail, setNoticeDetail] = useState<NoticeDetailData>();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchNoticeDetail = async () => {
      try {
        const shop = await useShopData(userId);

        const detail = await useNoticeDetail(shop.item.id, noticeId);
        setNoticeDetail(detail);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNoticeDetail();
  }, [noticeId]);

  const handleClick = () => {
    console.log(noticeDetail);
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
      {noticeDetail && (
        <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
          <button onClick={handleClick}>test</button>
          <div className="w-full flex flex-col items-start gap-8 mb-[60px]">
            <div className="w-full">
              <h2 className="text-orange-600 text-base font-bold">{noticeDetail.item.shop.item.category}</h2>
              <h1 className="text-gray-900 text-2xl font-bold mb-6">{noticeDetail.item.shop.item.name}</h1>
              <div className="flex flex-col bg-white p-6 rounded-xl shadow-md lg:flex-row gap-8">
                <div className="flex-none w-full lg:w-1/2 rounded-xl overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src={noticeDetail.item.shop.item.imageUrl}
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
                        {formatNumber(noticeDetail.item.hourlyPay)}원
                      </span>
                      <div className="bg-orange-600 text-white text-sm rounded-full flex items-center p-2">
                        {noticeDetail.item.hourlyPay > noticeDetail.item.shop.item.originalHourlyPay && (
                          <span>
                            기존 시급보다{' '}
                            {(
                              (noticeDetail.item.hourlyPay / noticeDetail.item.shop.item.originalHourlyPay) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        )}
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
                      {convertToKoreanTime(noticeDetail.item.startsAt, noticeDetail.item.workhour)} (
                      {noticeDetail.item.workhour}시간)
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
                    <p className="text-gray-600">{noticeDetail.item.shop.item.address1}</p>
                  </div>
                  <p className="mt-4 text-gray-900">{noticeDetail.item.shop.item.description}</p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full bg-white text-The-julge-primary border border-The-julge-primary py-3 rounded-md font-bold">
                      공고 편집하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-8 bg-zinc-100 rounded-xl flex-col justify-start items-start gap-8 inline-flex">
              <h3 className="text-gray-900 text-lg font-bold">공고 설명</h3>
              <p className="text-gray-600 mt-2">{noticeDetail.item.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[32px] mt-[60px]">
            <h1 className="text-The-julge-black text-2xl font-bold mb-6">신청자 목록</h1>
            <div>
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
                  <tr>
                    <td className="px-[12px] py-[20px]">전유민</td>
                    <td>어쩌구저쩌구</td>
                    <td>010-0000-0000</td>
                    <td>거절</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyNoticeDetail;
