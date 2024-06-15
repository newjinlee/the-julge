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
  const updatedRecentJobs = [job, ...recentJobs.filter(j => j.id !== job.id)].slice(0, 6);
  console.log('Saving jobs to localStorage:', updatedRecentJobs);
  localStorage.setItem('recentJobs', JSON.stringify(updatedRecentJobs));
};

export const getRecentJobs = (): Job[] => {
  const jobs = JSON.parse(localStorage.getItem('recentJobs') || '[]');
  console.log('Getting jobs from localStorage:', jobs);
  return jobs;
};
