'use client';
import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import { Formik, Form, Field, useFormik, FieldProps } from 'formik';
import CustomInput from '../../../components/CustomInput';
import CustomTextarea from '../../../components/CustomTextarea';
import Dropdown from '../../../components/Dropdown';
import ImageUpload from './ImageUpload';
import Alert from '../../../components/Alert';

interface StoreInfoFormProps {
  buttonText: string;
  alertMessage: string;
  method: 'POST' | 'PUT';
}

interface FormData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  id?: string;
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

export default function StoreInfoForm({ buttonText, alertMessage, method }: StoreInfoFormProps) {
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

  const handleSubmit = async (
    values: FormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('토큰이 없습니다');
      }
      const response = await axiosInstance({
        method,
        url: method === 'POST' ? '/shops' : `/shops/${values.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: values,
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        category: '',
        address1: '',
        address2: '',
        originalHourlyPay: 0,
        description: '',
        imageUrl: '',
      }}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="bg-gray-50 min-h-screen">
            <div className="relative max-w-[964px] h-full mx-auto px-5 py-[60px] md:py-[60px]">
              <div className="flex items-center justify-between mb-7">
                <h1 className="font-bold text-2xl">가게 정보</h1>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field name="name" component={CustomInput} label="가게 이름*" placeholder="입력"></Field>

                  <Field name="category" component={Dropdown} label="분류*" options={categories} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field name="address1" component={Dropdown} label="주소*" options={addresses} />
                  <Field name="address2" component={CustomInput} label="상세주소*" placeholder="입력" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    name="originalHourlyPay"
                    component={CustomInput}
                    label="기본 시급*"
                    unit="원"
                    placeholder="입력"
                  />
                </div>
                <div>
                  <Field component={ImageUpload} onFileChange={handleFileChange} />
                </div>
                <div>
                  <Field component={CustomTextarea} label="가게 설명" placeholder="입력" />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleAlertOpen}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[312px] h-12 font-bold border rounded-md px-12 py-3 text-center text-white whitespace-nowrap bg-red-500">
                  {buttonText}
                </button>
              </div>
              {showAlert && <Alert message={alertMessage} onClose={handleAlertClose} />}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
