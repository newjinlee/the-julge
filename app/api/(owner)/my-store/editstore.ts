import axiosInstance from '../../lib/axios';
import { ShopData } from './registerstore';

export const editStore = async (token: string, shopId: string | undefined, shopData: ShopData) => {
  try {
    const response = await axiosInstance({
      method: 'PUT',
      url: `/shops/${shopId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: shopData,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating shop:', error);
    throw error;
  }
};
