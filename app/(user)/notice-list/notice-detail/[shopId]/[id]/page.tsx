'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Job = {
  id: string;
  title: string;
  description: string;
  shop: {
    id: string; // shop_id
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
};

const NoticeDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shopId = searchParams.get('shopId');
  const id = searchParams.get('id');
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (shopId && id) {
          console.log(`Fetching job details for shopId: ${shopId}, id: ${id}`);
          const response = await axios.get(
            `https://bootcamp-api.codeit.kr/api/1-0/the-julge/shops/${shopId}/notices/${id}`,
          );
          console.log('API response:', response.data);
          setJob(response.data.item);
          setError(null);
        } else {
          setError('Invalid job ID or shop ID');
        }
      } catch (error: any) {
        console.error('Failed to load job details', error);
        setError('Failed to load job details');
      }
    };

    fetchJob();
  }, [shopId, id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
    </div>
  );
};

export default NoticeDetailPage;
