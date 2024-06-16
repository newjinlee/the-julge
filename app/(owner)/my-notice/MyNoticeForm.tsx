'use client';

import { useRouter, useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CustomInput from '@/components/CustomInput';
import CustomTextarea from '@/components/CustomTextarea';
import Calendar from '@/components/Calendar';
import Alert from '@/components/Alert';
import { NoticeData } from '@/types/notices';

const MyNoticeForm = () => {
  const [notice, setNotice] = useState<NoticeData>({
    item: {
      hourlyPay: 0,
      startsAt: null,
      workhour: 0,
      description: '',
    },
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [shopId, setShopId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { noticeId } = useParams();
  const router = useRouter();

  // 가게 정보 조회
  const fetchShopId = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('로그인 필요');
      setAlertMessage('로그인이 필요합니다.');
      setShowAlert(true);
      router.push('/login');
      return;
    }

    try {
      const shopResponse = await fetch(`/api/users/${userId}`);
      if (!shopResponse.ok) {
        throw new Error('회원정보 조회 실패');
      }
      const userData = await shopResponse.json();
      setShopId(userData.item.shop?.item?.id);
    } catch (error: any) {
      console.error('Error', error);
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  }, [router]);

  useEffect(() => {
    fetchShopId();
  }, [fetchShopId]);

  // 공고 상세 조회
  const fetchNoticeData = useCallback(
    async (noticeId: string | string[]) => {
      try {
        if (!shopId) {
          return;
        }

        const response = await fetch(`/api/shops/${shopId}/notices/${noticeId}`);
        if (!response.ok) {
          throw new Error('공고 조회 실패');
        }
        const noticeData = await response.json();
        setNotice(noticeData);
      } catch (error: any) {
        console.error('Error', error);
        setAlertMessage(error.message);
        setShowAlert(true);
      }
    },
    [shopId],
  );

  useEffect(() => {
    if (noticeId) {
      fetchNoticeData(noticeId);
    }
  }, [noticeId, fetchNoticeData]);

  // alert
  const handleAlertOpen = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);

    // 등록/편집이 완료되었을 때 공고리스트로
    if (isSuccess) {
      router.push('/my-notice');
      return;
    }
  };

  // 날짜선택
  const handleDateChange = (date: string | null) => {
    setNotice({ ...notice, item: { ...notice.item, startsAt: date } });
  };

  // 등록 및 수정
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    try {
      const method = noticeId ? 'PUT' : 'POST';
      const url = `/api/shops/${shopId}/notices${noticeId ? `/${noticeId}` : ''}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(notice),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'fail to register/update notice');
      }

      setAlertMessage(noticeId ? '공고가 수정되었습니다.' : '공고가 등록되었습니다.');
      handleAlertOpen();
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Error', error);
      setAlertMessage(error.message);
      handleAlertOpen();
    }
  };

  const handelRedirect = () => {
    if (noticeId) {
      router.push(`/my-notice/my-notice-detail/${noticeId}`);
    } else {
      router.push('/my-store');
    }
  };

  return (
    <div className="relative px-[12px] py-[60px] max-w-[964px] h-full mx-auto">
      <h1 className="font-bold text-2xl mb-7">공고등록</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row flex-wrap gap-2">
          <div className="relative w-[308px]">
            <CustomInput
              label="시급*"
              unit="원"
              name="시급"
              placeholder="0"
              value={notice.item.hourlyPay}
              onChange={e => setNotice({ ...notice, item: { ...notice.item, hourlyPay: parseInt(e.target.value) } })}
            />
          </div>
          <div className="w-[308px]">
            <Calendar label="시작 일시" value={notice.item.startsAt} isTime={true} onChange={handleDateChange} />
          </div>
          <div className="relative w-[308px]">
            <CustomInput
              label="업무 시간*"
              unit="시간"
              name="업무 시간"
              placeholder="0"
              value={notice.item.workhour}
              onChange={e => setNotice({ ...notice, item: { ...notice.item, workhour: parseInt(e.target.value) } })}
            />
          </div>
        </div>
        <div>
          <CustomTextarea
            label="공고 설명"
            name="공고 설명"
            placeholder="공고 설명을 적어주세요."
            value={notice.item.description}
            onChange={e => setNotice({ ...notice, item: { ...notice.item, description: e.target.value } })}
          />
        </div>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            className="flex justify-center w-[312px] py-[14px] bg-The-julge-gray-40 text-white"
            onClick={handelRedirect}>
            돌아가기
          </button>
          <button type="submit" className="flex justify-center w-[312px] py-[14px] bg-The-julge-red-40 text-white">
            {noticeId ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>

      {showAlert && <Alert message={alertMessage} onClose={handleAlertClose} />}
    </div>
  );
};

export default MyNoticeForm;
