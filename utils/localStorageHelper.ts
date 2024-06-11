type Job = {
  id: string;
  startsAt: string;
  hourlyPay: number;
  workhour: number;
  closed: boolean;
  shop: {
    item: {
      id: string; // shop_id
      name: string;
      category: string;
      address1: string;
      address2: string;
      description: string;
      imageUrl: string;
      originalHourlyPay: number;
    };
    href: string;
  };
  currentUserApplication: any | null;
};

export const saveRecentJob = (job: Job) => {
  const recentJobs: Job[] = JSON.parse(localStorage.getItem('recentJobs') || '[]');
  const updatedRecentJobs = [job, ...recentJobs.filter((j: Job) => j.id !== job.id)].slice(0, 6);
  localStorage.setItem('recentJobs', JSON.stringify(updatedRecentJobs));
};

export const getRecentJobs = (): Job[] => {
  return JSON.parse(localStorage.getItem('recentJobs') || '[]');
};