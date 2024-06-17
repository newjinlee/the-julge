import axiosInstance from '@/app/api/lib/axiosInstance';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { NoticeFullDetailData } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: { shopId: string; noticeId: string } },
): Promise<NextResponse> {
  const { shopId, noticeId } = params;

  // 조회 조건 추가
  const url = new URL(request.url);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);
  const limit = parseInt(url.searchParams.get('limit') || '5', 10);

  try {
    const response = await axiosInstance.get<NoticeFullDetailData[]>(
      `/shops/${shopId}/notices/${noticeId}/applications`,
      {
        params: {
          offset,
          limit,
        },
      },
    );

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
