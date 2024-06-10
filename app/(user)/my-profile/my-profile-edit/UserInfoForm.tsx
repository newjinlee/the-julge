'use client';
import { useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/public/close-icon.png';
import CustomInput from '../../../../components/CustomInput';
import Dropdown from '../../../../components/Dropdown';
import Alert from '../../../../components/Alert';

interface StoreInfoFormProps {
  buttonText: string;
  alertMessage: string;
}

const categories = ['한식', '중식', '일식', '양식', '분식', '카페', '편의점', '기타'];
const addresses = [
  '서울시 종로구',
  '서울시 중구',
  '서울시 용산구',
  '서울시 성동구',
  '서울시 광진구',
  '서울시 동대문구',
  '서울시 중랑구',
  '서울시 성북구',
  '서울시 강북구',
  '서울시 도봉구',
  '서울시 노원구',
  '서울시 은평구',
  '서울시 서대문구',
  '서울시 마포구',
  '서울시 양천구',
  '서울시 강서구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 영등포구',
  '서울시 동작구',
  '서울시 관악구',
  '서울시 서초구',
  '서울시 강남구',
  '서울시 송파구',
  '서울시 강동구',
];

export default function UserInfoForm({ buttonText, alertMessage }: StoreInfoFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleAlertOpen = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative max-w-[964px] h-full mx-auto px-5 py-[60px] md:py-[60px]">
        <div className="flex items-center justify-between mb-7">
          <h1 className="font-bold text-2xl">가게 정보</h1>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomInput label="이름*" placeholder="입력" />
            <CustomInput label="전화번호*" placeholder="입력" />
            <Dropdown label="주소*" options={addresses} />
          </div>

          <div></div>
          <div>
            <div className="flex flex-col gap-2 mb-8">
              <label>소개</label>
              <textarea
                className="px-5 py-4 w-full h-[153px] border border-solid border-gray-300 rounded-md"
                placeholder="입력"></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAlertOpen}
            className="w-[312px] h-12 bg-red-500 text-white font-bold border rounded-md px-12 py-3 text-center whitespace-nowrap">
            {buttonText}
          </button>
        </div>
        {showAlert && <Alert message={alertMessage} onClose={handleAlertClose} />}
      </div>
    </div>
  );
}
