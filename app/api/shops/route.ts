import axiosInstance from '../lib/axiosInstance';
import { NextResponse } from 'next/server';

interface ShopData {
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '분식' | '카페' | '편의점' | '기타';
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  let shopData: ShopData;

  try {
    shopData = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, category, address1, address2, description, imageUrl, originalHourlyPay } = shopData;
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No authentication token provided' }, { status: 401 });
  }

  try {
    const response = await axiosInstance.post(
      '/shops',
      {
        name,
        category,
        address1,
        address2,
        description,
        imageUrl,
        originalHourlyPay,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error registering shop:', error);
    return NextResponse.json({ error: 'Error registering shop' }, { status: 500 });
  }
}
