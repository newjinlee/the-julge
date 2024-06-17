import axiosInstance from '../../lib/axiosInstance';
import { NextResponse } from 'next/server';
import { ShopData } from '@/types';

export async function PUT(request: Request, context: { params: { shopId: string } }): Promise<NextResponse> {
  let shopData: ShopData;
  const { shopId } = context.params;

  try {
    shopData = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, category, address1, address2, description, imageUrl, originalHourlyPay } = shopData.item;
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No authentication token provided' }, { status: 401 });
  }

  try {
    const response = await axiosInstance.put(
      `/shops/${shopId}`,
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
    console.error('Error updating shop:', error);
    return NextResponse.json({ error: 'Error updating shop' }, { status: 500 });
  }
}
