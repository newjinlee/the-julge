import axiosInstance from '../../lib/axios';

export interface ShopData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: number;
  description: string;
  imageUrl: string;
}

export const registerStore = async (shopData: ShopData) => {
  try {
    const response = await axiosInstance.post('/shops', shopData);
    return response.data;
  } catch (error) {
    console.error('Error creating shop:', error);
    throw error;
  }
};
