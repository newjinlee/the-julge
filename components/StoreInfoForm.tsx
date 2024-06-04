import Image from 'next/image';
import closeIcon from '@/public/close-icon.png';
import CustomInput from './CustomInput';
import CustomTextarea from './CustomTextarea';
import Dropdown from './Dropdown';

export default function StoreInfoForm() {
  const categories = ['한식', '중식', '일식', '양식', '분식', '카페', '편의점', '기타'];
  const addresses = ['서울시 종로구', '서울시 중구'];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative max-w-[964px] h-full mx-auto px-5 py-[60px] md:py-[60px]">
        <div className="flex items-center justify-between mb-7">
          <h1 className="font-bold text-2xl">가게 정보</h1>
          <button>
            <Image src={closeIcon} alt="닫기 버튼" className="w-8 h-8" />
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <CustomInput label="가게 이름*" placeholder="입력" />
            <Dropdown label="분류*" options={categories} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Dropdown label="주소*" options={addresses} />
            <CustomInput label="상세주소*" placeholder="입력" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CustomInput label="기본 시급*" placeholder="입력" />
          </div>

          <div>
            <CustomTextarea label="가게 설명" placeholder="입력" />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-[312px] h-12 bg-red-500 text-white font-bold border rounded-md px-12 py-3 text-center whitespace-nowrap">
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
