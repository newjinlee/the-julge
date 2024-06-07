'use client';
import { useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/public/close-icon.png';
import CustomInput from '../../../components/CustomInput';
import CustomTextarea from '../../../components/CustomTextarea';
import Dropdown from '../../../components/Dropdown';
import ImageUpload from './ImageUpload';
import Alert from '../../../components/Alert';

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

export default function StoreInfoForm({ buttonText, alertMessage }: StoreInfoFormProps) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput label="가게 이름*" placeholder="입력" />
            <Dropdown label="분류*" options={categories} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown label="주소*" options={addresses} />
            <CustomInput label="상세주소*" placeholder="입력" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput label="기본 시급*" unit="원" placeholder="입력" />
          </div>
          <div>
            <ImageUpload onFileChange={handleFileChange} />
          </div>
          <div>
            <CustomTextarea label="가게 설명" placeholder="입력" />
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
