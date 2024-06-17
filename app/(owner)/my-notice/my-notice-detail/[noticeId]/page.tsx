'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import useShopData from '@/app/hooks/useShopData';
import { NoticeFullDetailData, Applications } from '@/types';
import useNoticeFullDetail from '@/app/hooks/useNoticeFullDetail';
import Pagination from '@/components/Pagination';
import Alert from '@/components/ConfirmAlert';
import { toast } from 'react-toastify';

const MyNoticeDetail = () => {
  const router = useRouter();
  const { noticeId } = useParams();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const [noticeFullDetail, setNoticeFullDetail] = useState<NoticeFullDetailData>();
  const [applications, setApplications] = useState<Applications>();
  const [shopId, setShopId] = useState<string>('');

  const [status, setStatus] = useState<string>('');
  const [applicationId, setApplicationId] = useState<string>('');
  const [confirmMessage, setConfirmMessage] = useState<string>('');

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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const shop = await useShopData(userId);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const detail: NoticeFullDetailData = await useNoticeFullDetail(shop.item.id, noticeId, offset, limit);

        // 마감 된 공고는 내가게 페이지로 이동
        if (detail.item.closed) {
          router.push('/my-store');
        }

        setShopId(shop.item.id);
        setNoticeFullDetail(detail);
        setApplications(detail.item.currentUserApplication);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchNoticeDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticeId, offset]);

  // alert
  const handleAlertOpen = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // eslint-disable-next-line object-shorthand
        body: JSON.stringify({ status: status }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'fail to register/update notice');
      }

      handleAlertClose();
      toast.success(`${confirmMessage} 완료`);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error', error);
      handleAlertClose();
      toast.error(error.message);
    } finally {
      setTimeout(() => {
        router.push('/my-store');
      }, 1500); // 1초 후에 페이지 이동
    }
  };

  // eslint-disable-next-line require-await
  const handleUpdateApplication = async (status: string, applicationId: string) => {
    const message = status === 'rejected' ? '거절' : '승인';
    setConfirmMessage(message);

    setStatus(status);
    setApplicationId(applicationId);

    setAlertMessage(`신청을 ${message}하시겠어요?`);
    handleAlertOpen();
    // eslint-disable-next-line no-useless-return
    return;
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
                        <th className="px-[12px] py-[14px] w-[180px]">신청자</th>
                        <th className="px-[12px] py-[14px] w-[320px]">소개</th>
                        <th className="px-[12px] py-[14px] w-[200px]">전화번호</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.items.map((application: any) => (
                        <tr key={application.item.id} className="border-b border-The-julge-gray-20">
                          <td className="px-[12px] py-[20px]">{application.item.user.item.name}</td>
                          <td className="px-[12px] py-[20px]">{application.item.user.item.bio}</td>
                          <td className="px-[12px] py-[20px]">{application.item.user.item.phone}</td>
                          <td className="px-[12px] py-[20px]">
                            {application.item.status === 'pending' && (
                              <div className="flex flex-row items-center gap-[12px]">
                                <button
                                  className="bg-white text-The-julge-primary border border-The-julge-primary px-4 py-2 rounded-md"
                                  onClick={() => handleUpdateApplication('rejected', application.item.id)}>
                                  거절하기
                                </button>
                                <button
                                  className="mr-2 bg-white text-The-julge-blue-20 border border-The-julge-blue-20 px-4 py-2 rounded-md"
                                  onClick={() => handleUpdateApplication('accepted', application.item.id)}>
                                  승인하기
                                </button>
                              </div>
                            )}
                            {application.item.status === 'accepted' && <span>승인</span>}
                            {application.item.status === 'rejected' && <span>거절</span>}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={4} className="px-[12px] py-[15px]">
                          <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(applications.count / limit)}
                            hasNext={applications.hasNext}
                            noticeId={noticeId}
                            onPageChange={handlePageChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-[200px] text-The-julge-gray-50 text-[20px] gap-[20px]">
                  <span>신청자가 없습니다.</span>
                </div>
              )}
            </div>
          </div>
          {showAlert && <Alert message={alertMessage} onClose={handleAlertClose} onConfirm={handleConfirm} />}
        </div>
      )}
    </>
  );
};

export default MyNoticeDetail;
