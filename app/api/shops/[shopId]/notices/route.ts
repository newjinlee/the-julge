import axiosInstance from '@/app/api/lib/axios';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { NoticeData } from '@/types';

export async function GET(request: Request, { params }: { params: { shopId: string } }): Promise<NextResponse> {
  const { shopId } = params;

  // 조회 조건 추가
  const url = new URL(request.url);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);
  const limit = parseInt(url.searchParams.get('limit') || '6', 10);

  try {
    const response = await axiosInstance.get<NoticeData[]>(`/shops/${shopId}/notices`, {
      params: {
        offset,
        limit,
      },
    });

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

export async function POST(request: Request, { params }: { params: { shopId: string } }): Promise<NextResponse> {
  const { shopId } = params;
  let noticeData: Omit<NoticeData, 'id' | 'closed'>;

  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
  }

  try {
    noticeData = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: '요청 양식 오류' }, { status: 400 });
  }

  const { hourlyPay, startsAt, workhour, description } = noticeData;

  try {
    const response = await axiosInstance.post(
      `/shops/${shopId}/notices`,
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

    return NextResponse.json({ message: '가게 공고 등록 성공' }, { status: 200 });
  } catch (error) {
    console.error('Error creating notice:', error);

    if (axios.isAxiosError(error)) {
      const { status, data } = error.response || {};
      const errorMessage = data?.message || 'Failed to create notice';
      const statusCode = status || 500;

      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}
