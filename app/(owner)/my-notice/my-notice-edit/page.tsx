'use client';

import CustomInput from '@/components/CustomInput';
import CustomTextarea from '@/components/CustomTextarea';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
// import axios from 'axios';
import { useAuth } from '@/lib/context/AuthProvider';

interface Notice {
  wage: string;
  startDate: string;
  workingHours: string;
  description: string;
}

const MyNoticeEdit = () => {
  const [notice, setNotice] = useState<Notice>({
    wage: '',
    startDate: '',
    workingHours: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
              value={notice.wage}
              onChange={e => setNotice({ ...notice, wage: e.target.value })}
              className="border px-[20px] py-[16px] h-[58px] w-[308px]"
            />
          </div>
          <div className="w-[308px]">
            <CustomInput
              label="시작 일시*"
              value={notice.startDate}
              onChange={e => setNotice({ ...notice, startDate: e.target.value })}
              className="border px-[20px] py-[16px] h-[58px] w-[308px]"
            />
          </div>
          <div className="relative w-[308px]">
            <CustomInput
              label="업무 시간*"
              unit="시간"
              placeholder="0"
              value={notice.workingHours}
              onChange={e => setNotice({ ...notice, workingHours: e.target.value })}
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
    </div>
  );
};

export default MyNoticeEdit;
