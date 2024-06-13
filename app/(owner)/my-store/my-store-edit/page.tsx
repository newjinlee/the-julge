'use client';

import StoreInfoForm from '@/app/(owner)/my-store/StoreInfoForm';
import axiosInstance from '@/app/api/lib/axios';
import { Suspense, useEffect, useState } from 'react';
import LoadingSpinner from '../../LoadingSpinner';

export default function StoreEditPage() {
  const [initialValues, setInitialValues] = useState<any>({
    name: '',
    category: '',
    address1: '',
    address2: '',
    originalHourlyPay: 0,
    description: '',
    imageUrl: '',
  });
  const [shopId, setShopId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    // 페이지가 로딩될 때 초기값을 가져오는 함수 호출
    const fetchInitialValues = async () => {
      try {
        // 가게 정보를 가져오는 API 호출
        const response = await axiosInstance.get(`/users/${storedUserId}`);

        // API 응답에서 가게 정보를 추출하여 초기값으로 설정
        const storeInfo = response.data;
        setShopId(storeInfo.item.shop.item.id);

        setInitialValues({
          name: storeInfo.item.shop.item.name,
          category: storeInfo.item.shop.item.category,
          address1: storeInfo.item.shop.item.address1,
          address2: storeInfo.item.shop.item.address2,
          originalHourlyPay: storeInfo.item.shop.item.originalHourlyPay,
          description: storeInfo.item.shop.item.description,
          imageUrl: storeInfo.item.shop.item.imageUrl,
        });
      } catch (error) {
        console.error('Error fetching initial values:', error);
      }
    };

    fetchInitialValues();
  }, []);

  return (
    <StoreInfoForm
      buttonText="수정"
      alertMessage="수정이 완료되었습니다."
      method="PUT"
      shopId={shopId}
      initialValues={initialValues}
      isEditPage={true}
    />
  );
}
