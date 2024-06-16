import axiosInstance from '@/app/api/lib/axiosInstance';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { NoticeDetailData } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: { shopId: string; noticeId: string } },
): Promise<NextResponse> {
  const { shopId, noticeId } = params;

  try {
    const response = await axiosInstance.get<NoticeDetailData[]>(`/shops/${shopId}/notices/${noticeId}`);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching notices:', error);

    if (axios.isAxiosError(error)) {
      const { status, data } = error.response || {};
      const errorMessage = data?.message || 'Failed to fetch notices';
      const statusCode = status || 500;

      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

    return NextResponse.json({ error: 'Failed to fetch notices ' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: { shopId: string; noticeId: string } },
): Promise<NextResponse> {
  let noticeUpdatelData: NoticeDetailData;
  const { shopId, noticeId } = context.params;

  try {
    noticeUpdatelData = await request.json();
  } catch (error) {
    console.error('Error parsing reuqest body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { hourlyPay, startsAt, workhour, description } = noticeUpdatelData.item;
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No authentication token provided' }, { status: 401 });
  }

  try {
    const response = await axiosInstance.put(
      `/shops/${shopId}/notices/${noticeId}`,
      {
        hourlyPay,
        startsAt,
        workhour,
        description,
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
