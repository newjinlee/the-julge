import axiosInstance from '@/app/api/lib/axiosInstance';
import axios from 'axios';
import { NextResponse } from 'next/server';

interface ApplicationUpdateData {
  status: string;
}

export async function PUT(
  request: Request,
  context: { params: { shopId: string; noticeId: string; applicationId: string } },
): Promise<NextResponse> {
  let applicationUpdateData: ApplicationUpdateData;
  const { shopId, noticeId, applicationId } = context.params;

  try {
    applicationUpdateData = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { status } = applicationUpdateData;
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No authentication token provided' }, { status: 401 });
  }

  try {
    const response = await axiosInstance.put(
      `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating applications:', error);

    if (axios.isAxiosError(error)) {
      const { status, data } = error.response || {};
      const errorMessage = data?.message || 'Failed to create notice';
      const statusCode = status || 500;

      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

    return NextResponse.json({ error: 'Error updating applications' }, { status: 500 });
  }
}
