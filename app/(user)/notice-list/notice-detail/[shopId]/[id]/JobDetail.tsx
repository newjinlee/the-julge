'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Alert from '@/components/AlertForApply';
import AlertForApplyCancel from '@/components/AlertForApplyCancel';
import { fetchJobDetails, fetchUserProfile, applyJob, fetchApplications, cancelJobApplication } from '@/utils/api';
import { NoticeDetailData } from '@/types/notices';

const JobDetail = () => {
  const [message, setMessage] = useState('');
  const [shopId, setShopId] = useState<string | null>(null);
  const [noticeId, setNoticeId] = useState<string | null>(null);
  const [job, setJob] = useState<NoticeDetailData['item'] | null>(null);
  const [isApplied, setIsApplied] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [isPastJob, setIsPastJob] = useState(false);

  useEffect(() => {
    const storedShopId = localStorage.getItem('shop_id');
    const storedNoticeId = localStorage.getItem('notice_id');

    setShopId(storedShopId);
    setNoticeId(storedNoticeId);

    if (storedShopId && storedNoticeId) {
      fetchJobDetails(storedShopId, storedNoticeId).then(data => {
        setJob(data);
        const currentTime = new Date();
        const jobStartTime = new Date(data.startsAt);
        setIsPastJob(currentTime > jobStartTime);

        if (data.currentUserApplication) {
          setIsApplied(true);
        } else {
          checkIfUserApplied(storedShopId, storedNoticeId);
        }
      });
      //.catch(error => console.error(error));
    }
  }, []);

  const checkIfUserApplied = async (shopId: string, noticeId: string) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setMessage('로그인이 필요합니다');
      return;
    }

    try {
      const applications = await fetchApplications(shopId, noticeId, token);
      const userApplication = applications.find((app: any) => app.item.user.item.id === userId);

      if (userApplication) {
        setIsApplied(true);
      }
    } catch (error) {
      // console.error('Failed to fetch applications', error);
    }
  };

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setMessage('로그인이 필요합니다');
      return;
    }

    try {
      const userProfile = await fetchUserProfile(userId, token);

      if (!userProfile.name || !userProfile.phone || !userProfile.address || !userProfile.bio) {
        setMessage('내 프로필을 먼저 등록해 주세요');
        return;
      }

      const response = await applyJob(shopId!, noticeId!, token);

      if (response.status === 201) {
        setMessage('지원 등록 성공');
        setIsApplied(true);
      }
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
            setMessage('알 수 없는 오류가 발생했습니다');
            break;
          default:
            setMessage('지원 등록 실패');
        }
      } else {
        setMessage('지원 등록 실패');
      }
      // console.error(error);
    }
  };

  const handleCancel = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setMessage('로그인이 필요합니다');
      return;
    }

    try {
      const applications = await fetchApplications(shopId!, noticeId!, token);
      const userApplication = applications.find((app: any) => app.item.user.item.id === userId);

      if (userApplication) {
        const applicationId = userApplication.item.id;
        const response = await cancelJobApplication(shopId!, noticeId!, applicationId, token);

        if (response.status === 200) {
          setMessage('지원 취소 성공');
          setIsApplied(false);
        }
      } else {
        setMessage('지원 내역을 찾을 수 없습니다');
      }
    } catch (error: any) {
      setMessage('지원 취소 실패');
      // console.error(error);
    }
  };

  const handleCloseAlert = () => {
    setMessage('');
  };

  if (!job)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  const shop = job.shop.item;

  return (
    <div className="box-border border-none text-decoration-none select-none outline-none font-inherit align-baseline relative max-w-[964px] h-full mx-auto py-16">
      {message && <Alert message={message} onClose={handleCloseAlert} />}
      {showCancelAlert && (
        <AlertForApplyCancel
          message="신청을 취소하시겠어요?"
          onClose={() => setShowCancelAlert(false)}
          onConfirm={() => {
            handleCancel();
            setShowCancelAlert(false);
          }}
        />
      )}
      <div className="w-full flex flex-col items-start gap-8">
        <div className="w-full">
          <h2 className="text-orange-600 text-base font-bold">{shop.category}</h2>
          <h1 className="text-gray-900 text-2xl font-bold mb-6">{shop.name}</h1>
          <div className="flex flex-col bg-white p-6 rounded-xl shadow-md lg:flex-row gap-8">
            <div className="flex-none w-full lg:w-1/2 rounded-xl overflow-hidden relative">
              <Image
                className={`w-full h-full object-cover ${isPastJob || job.closed ? 'brightness-50' : ''}`}
                src={shop.imageUrl}
                alt={shop.name}
                width={597}
                height={543}
              />
              {job.closed && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <span className="text-white text-2xl font-bold">마감 완료</span>
                </div>
              )}
              {isPastJob && !job.closed && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <span className="text-white text-2xl font-bold">지난 공고</span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between w-full lg:w-1/2">
              <div>
                <h3 className="text-orange-600 text-base font-bold">시급</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-gray-900">{job.hourlyPay.toLocaleString('ko-KR')}원</span>
                  <div className="bg-[#EA3C12] text-white text-sm rounded-full flex items-center p-2">
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
                {isApplied ? (
                  <button
                    type="button"
                    className="w-full bg-white py-3.5 rounded-md border border-orange-600 justify-center items-center gap-2 inline-flex cursor-pointer"
                    onClick={() => setShowCancelAlert(true)}>
                    <div className="text-center text-orange-600 text-base font-bold font-['Spoqa Han Sans Neo'] leading-tight">
                      취소하기
                    </div>
                  </button>
                ) : job.closed || isPastJob ? (
                  <button
                    type="button"
                    className="w-full bg-gray-400 text-white py-3 rounded-md font-bold font-['Spoqa Han Sans Neo'] cursor-not-allowed"
                    disabled>
                    신청 불가
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full bg-[#EA3C12] text-white py-3 rounded-md font-bold font-['Spoqa Han Sans Neo']"
                    onClick={handleApply}>
                    신청하기
                  </button>
                )}
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
