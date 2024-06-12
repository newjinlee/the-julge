'use client';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { registerStore } from '@/app/api/(owner)/my-store/registerstore';
import { editStore } from '@/app/api/(owner)/my-store/editstore';
import CustomInput from '../../../components/CustomInput';
import CustomTextarea from '../../../components/CustomTextarea';
import Dropdown from '../../../components/Dropdown';
import ImageUpload from './ImageUpload';
import Alert from '../../../components/Alert';

interface StoreInfoFormProps {
  buttonText: string;
  alertMessage: string;
  method: 'POST' | 'PUT';
  shopId?: string;
  initialValues?: {
    name: string;
    category: string;
    address1: string;
    address2: string;
    originalHourlyPay: number;
    description: string;
    imageUrl: string;
  };
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

export default function StoreInfoForm({ buttonText, alertMessage, method, shopId, initialValues }: StoreInfoFormProps) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  console.log(initialValues);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    formik.setValues(initialValues);
  }, [initialValues]);

  const handleAlertOpen = () => {
    setShowAlert(true);
  };
  const handleAlertClose = () => {
    setShowAlert(false);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      address1: '',
      address2: '',
      originalHourlyPay: 0,
      description: '',
      imageUrl: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log('Form Values:', values);

        if (!token) {
          throw new Error('토큰이 없습니다');
        }

        if (method === 'POST') {
          await registerStore(token, values);
        } else if (method === 'PUT') {
          await editStore(token, shopId, values);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-gray-50 min-h-screen">
        <div className="relative max-w-[964px] h-full mx-auto px-5 py-[60px] md:py-[60px]">
          <div className="flex items-center justify-between mb-7">
            <h1 className="font-bold text-2xl">가게 정보</h1>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                label="가게 이름*"
                placeholder="입력"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <Dropdown
                label="분류*"
                name="category"
                options={categories}
                value={formik.values.category}
                onChange={(value: string) => formik.setFieldValue('category', value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dropdown
                label="주소*"
                name="address1"
                options={addresses}
                value={formik.values.address1}
                onChange={(value: string) => formik.setFieldValue('address1', value)}
              />
              <CustomInput
                label="상세주소*"
                placeholder="입력"
                name="address2"
                value={formik.values.address2}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                label="기본 시급*"
                placeholder="입력"
                unit="원"
                name="originalHourlyPay"
                value={formik.values.originalHourlyPay}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <ImageUpload
                onFileChange={(imageUrl: string) => formik.setFieldValue('imageUrl', imageUrl)}
                value={formik.values.imageUrl}
              />
            </div>
            <div>
              <CustomTextarea
                label="가게 설명"
                placeholder="입력"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleAlertOpen}
              type="submit"
              disabled={formik.isSubmitting}
              className="w-[312px] h-12 font-bold border rounded-md px-12 py-3 text-center text-white whitespace-nowrap bg-red-500">
              {buttonText}
            </button>
          </div>
          {showAlert && <Alert message={alertMessage} onClose={handleAlertClose} />}
        </div>
      </div>
    </form>
  );
}
