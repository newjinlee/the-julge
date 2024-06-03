import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Job = {
  id: string;
  title: string;
  description: string;
};

const NoticeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://bootcamp-api.codeit.kr/api/5-7/the-julge/shops/{shop_id}/notices/${id}`)
        .then((response: { data: { item: Job } }) => {
          setJob(response.data.item);
        })
        .catch((error: any) => {
          console.error('Failed to load job details', error);
        });
    }
  }, [id]);

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
