type Job = {
  id: string;
  image: string;
  title: string;
  time: string;
  location: string;
  wage: string;
  alarm: boolean;
  percentage: string;
};

export const saveRecentJob = (job: Job) => {
  const recentJobs: Job[] = JSON.parse(localStorage.getItem('recentJobs') || '[]');
  const updatedRecentJobs = [job, ...recentJobs.filter((j: Job) => j.id !== job.id)].slice(0, 6);
  localStorage.setItem('recentJobs', JSON.stringify(updatedRecentJobs));
};

export const getRecentJobs = (): Job[] => {
  return JSON.parse(localStorage.getItem('recentJobs') || '[]');
};
