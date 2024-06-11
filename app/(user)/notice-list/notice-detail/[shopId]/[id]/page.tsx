'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Job = {
  id: string;
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
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const urlParts = window.location.pathname.split('/');
        const shopId = urlParts[urlParts.length - 2];
        const id = urlParts[urlParts.length - 1];

        if (shopId && id) {
          console.log(`Fetching job details for shopId: ${shopId}, id: ${id}`);
          const response = await axios.get(`https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/${shopId}/notices/${id}`);
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
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{job.description}</p>
    </div>
  );
};

export default NoticeDetailPage;
