import axios from 'axios';
import { NoticeDetailData } from '@/types/notices';


export const fetchJobDetails = async (shopId: string, jobId: string): Promise<NoticeDetailData['item']> => {
  try {
    const response = await axios.get(
      `https://bootcamp-api.codeit.kr/api/5-7/the-julge/shops/${shopId}/notices/${jobId}`,
    );
    return response.data.item;
  } catch (error: any) {
    console.error('Failed to load job details', error);
    throw new Error('Failed to load job details');
  }
};

export const fetchUserProfile = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`https://bootcamp-api.codeit.kr/api/5-7/the-julge/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.item;
  } catch (error: any) {
    console.error('Failed to load user profile', error);
    throw new Error('Failed to load user profile');
  }
};

export const applyJob = async (shopId: string, noticeId: string, token: string) => {
  try {
    const response = await axios.post(
      `https://bootcamp-api.codeit.kr/api/5-7/the-julge/shops/${shopId}/notices/${noticeId}/applications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error: any) {
    console.error('Failed to apply for job', error);
    throw error;
  }
};

export const cancelJobApplication = async (shopId: string, noticeId: string, userId: string, token: string) => {
  try {
    const response = await axios.put(
      `https://bootcamp-api.codeit.kr/api/5-7/the-julge/shops/${shopId}/notices/${noticeId}/applications/${userId}`,
      { status: 'canceled' },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error: any) {
    console.error('Failed to cancel job application', error);
    throw error;
  }
};