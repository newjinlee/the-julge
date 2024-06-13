import axiosInstance from '../../lib/axios';
import { ShopData } from './registerstore';

export const editStore = async (shopId: string | undefined, shopData: ShopData) => {
  try {
    const response = await axiosInstance.put(`/shops/${shopId}`, shopData);
    return response.data;
  } catch (error) {
    console.error('Error updating shop:', error);
    throw error;
  }
};
