'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import MyStoreInfo from './MyStoreInfo';
import MyNoticeList from './MyNoticeList';

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      router.push('/login');
    }

    setUserId(storedUserId);
  }, [router]);

  if (userId === null) {
    return null;
  }

  return (
    <>
      <MyStoreInfo userId={userId} />
      {/* <MyNoticeList /> */}
    </>
  );
}
