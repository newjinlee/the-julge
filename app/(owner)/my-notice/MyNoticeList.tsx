'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShopData, NoticeData } from '@/types';

const MyNoticeList = () => {
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [noticeData, setNoticeData] = useState<NoticeData[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 6;

  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          // 가게 정보
          const response = await fetch(`/api/users/${userId}`);
          const userData = await response.json();
          setShopData(userData.item.shop.item);
          console.log(shopData);

          // 가게 공고 리스트
          const shopId = userData.item.shop.item.id;
          const noticeResponse = await fetch(`/api/shops/${shopId}/notices?offset=${offset}&limit=${limit}`);
          const noticeData = await noticeResponse.json();
          console.log(noticeData);
        } else {
          console.log('no token');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserInfo();
  }, [router, offset]);

  // 예시로 무한 스크롤을 구현하는 방법
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setOffset(prevOffset => prevOffset + limit); // 스크롤이 끝에 도달하면 offset을 증가시킵니다.
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <p>공고 리스트</p>;
};

export default MyNoticeList;
