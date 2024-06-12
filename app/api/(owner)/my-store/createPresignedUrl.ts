// createPresignedUrl.ts

import axiosInstance from '@/app/api/lib/axios';

async function createPresignedUrl(imageName: string): Promise<string> {
  try {
    const response = await axiosInstance.post('/images', { name: imageName });
    return response.data.item.url;
  } catch (error) {
    throw new Error('Failed to create presigned URL');
  }
}

export default createPresignedUrl;
