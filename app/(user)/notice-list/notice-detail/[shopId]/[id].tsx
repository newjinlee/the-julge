import { useRouter } from 'next/router';
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
  }
};

const NoticeDetailPage = () => {
  const router = useRouter();
  const { shopId, id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shopId && id) {
      axios.get(`https://bootcamp-api.codeit.kr/api/1-0/the-julge/shops/${shopId}/notices/${id}`)
        .then((response: { data: { item: Job } }) => {
          setJob(response.data.item);
          setError(null);
        })
        .catch((error: any) => {
          console.error('Failed to load job details', error);
          setError('Failed to load job details');
        });
    } else {
      setError('Invalid job ID or shop ID');
    }
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
