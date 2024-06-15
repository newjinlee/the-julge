'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShopData, NoticeData } from '@/types';
import { JobCard } from '@/components/JobCard';

interface MyNoticeListProps {
  shopData: ShopData;
}

const MyNoticeList: React.FC<MyNoticeListProps> = ({ shopData }) => {
  const [noticeList, setNoticeList] = useState<NoticeData[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const obsRef = useRef<HTMLDivElement | null>(null);
  const preventRef = useRef(true);
  const limit = 6;

  const router = useRouter();

  const fetchNoticeList = async () => {
    try {
      setLoading(true);
      const shopId = shopData.item.id;
      const noticeResponse = await fetch(`/api/shops/${shopId}/notices?offset=${offset}&limit=${limit}`);
      const noticeData = await noticeResponse.json();

      if (noticeData.items.length < limit) {
        setHasMore(false);
      }

      setNoticeList(prev => {
        // 중복 데이터 제거
        const newNotices = noticeData.items.filter(
          (newNotice: NoticeData) => !prev.some(existingNotice => existingNotice.item.id === newNotice.item.id),
        );
        return [...prev, ...newNotices];
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching notices data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore && !loading) {
      fetchNoticeList();
    }
  }, [offset, limit, shopData.item.id]);

  const handleClick = (notice: NoticeData) => {
    console.log(notice);
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current && hasMore && !loading) {
      preventRef.current = false;
      setOffset(prev => prev + limit);
      preventRef.current = true;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      if (obsRef.current) observer.unobserve(obsRef.current);
      observer.disconnect();
    };
  }, [noticeList, loading, hasMore]);

  return (
    <div className="w-full">
      <h1 className="text-gray-900 text-2xl font-bold mb-6">내가 등록한 공고</h1>
      {noticeList.length === 0 ? (
        <p>공고를 등록해보세요.</p>
      ) : (
        <div className="flex flex-wrap gap-3.5">
          {noticeList.map(notice => (
            <div key={notice.item.id}>
              <JobCard
                id={notice.item.id}
                startsAt={notice.item.startsAt}
                hourlyPay={notice.item.hourlyPay}
                workhour={notice.item.workhour}
                closed={notice.item.closed}
                shop={shopData}
                currentUserApplication="currentUserApplication"
                onClick={() => handleClick(notice)}
              />
            </div>
          ))}
        </div>
      )}
      <div ref={obsRef} />
      {loading && <p>로딩 중...</p>}
    </div>
  );
};

export default MyNoticeList;
