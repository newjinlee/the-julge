import { NoticeDetailData } from '@/types/notices';

export const saveRecentJob = (job: NoticeDetailData['item']) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const recentJobs: NoticeDetailData['item'][] = JSON.parse(localStorage.getItem('recentJobs') || '[]');
    const updatedRecentJobs = [job, ...recentJobs.filter(j => j.id !== job.id)].slice(0, 6);
    console.log('Saving jobs to localStorage:', updatedRecentJobs);
    localStorage.setItem('recentJobs', JSON.stringify(updatedRecentJobs));
  }
};

export const getRecentJobs = (): NoticeDetailData['item'][] => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const jobs = JSON.parse(localStorage.getItem('recentJobs') || '[]');
    console.log('Getting jobs from localStorage:', jobs);
    return jobs;
  }
  return [];
};
