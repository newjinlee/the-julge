import axiosInstance from '@/app/api/lib/axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}
