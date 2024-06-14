'use client';

import CustomInput from '@/components/CustomInput';
import CustomTextarea from '@/components/CustomTextarea';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from '@/components/Calendar';
import Alert from '@/components/Alert';
interface Notice {
  hourlyPay: string;
  startsAt: string | null;
  workhour: string;
  description: string;
}

const MyNoticeEdit = () => {
  const [notice, setNotice] = useState<Notice>({
    hourlyPay: '',
    startsAt: '',
    workhour: '',
    description: '',
  });

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setalertMessage] = useState<string>('');

  const router = useRouter();

  const handleAlertOpen = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleDateChange = (date: string | null) => {
    setNotice({ ...notice, startsAt: date });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('로그인 필요');
        setalertMessage('로그인이 필요합니다.');
        return;
      }

      // userId로 shopId 조회
      const shopResponse = await fetch(`/api/users/${userId}`);
      if (!shopResponse.ok) {
        throw new Error('회원정보 조회 실패');
      }

      const userData = await shopResponse.json();
      const shopId = userData.item.shop?.item?.id;

      if (!shopId) {
        throw new Error('가게가 등록되어있지 않음');
      }

      // 공고 등록
      const noticeResponse = await fetch(`/api/shops/${shopId}/notices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(notice),
      });

      if (!noticeResponse.ok) {
        const errorResponse = await noticeResponse.json();
        throw new Error(errorResponse.error || 'fail to register notice');
      }

      setalertMessage('등록이 완료되었습니다.');
    } catch (error: any) {
      console.error('Error', error);
      setalertMessage(error.message);
    }

    handleAlertOpen();
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
              placeholder="0"
              value={notice.hourlyPay}
              onChange={e => setNotice({ ...notice, hourlyPay: e.target.value })}
              className="border px-[20px] py-[16px] h-[58px] w-[308px]"
            />
          </div>
          <div className="w-[308px]">
            <Calendar label="시작 일시" value={notice.startsAt} isTime={true} onChange={handleDateChange} />
          </div>
          <div className="relative w-[308px]">
            <CustomInput
              label="업무 시간*"
              unit="시간"
              placeholder="0"
              value={notice.workhour}
              onChange={e => setNotice({ ...notice, workhour: e.target.value })}
              className="border px-[20px] py-[16px] h-[58px] w-[308px]"
            />
          </div>
        </div>
        <div>
          <CustomTextarea
            label="공고 설명"
            placeholder="공고 설명을 적어주세요."
            value={notice.description}
            onChange={e => setNotice({ ...notice, description: e.target.value })}
          />
        </div>
        <div className="flex justify-center gap-2">
          <button type="button" className="flex justify-center w-[312px] py-[14px] bg-The-julge-gray-40 text-white">
            돌아가기
          </button>
          <button type="submit" className="flex justify-center w-[312px] py-[14px] bg-The-julge-red-40 text-white">
            등록하기
          </button>
        </div>
      </form>

      {showAlert && <Alert message={alertMessage} onClose={handleAlertClose} />}
    </div>
  );
};

export default MyNoticeEdit;
