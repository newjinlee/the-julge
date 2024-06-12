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

export const registerStore = async (token: string, shopData: ShopData) => {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: '/shops',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: shopData,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating shop:', error);
    throw error;
  }
};
