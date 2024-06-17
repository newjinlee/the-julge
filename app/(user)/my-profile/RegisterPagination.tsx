'use client';
import axiosInstance from '@/app/api/lib/axios';
import { useState, useEffect } from 'react';
import StatusBar from './StatusBar';

interface Application {
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    createdAt: string;
    shop: {
      item: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
      };
    };
    notice: {
      item: {
        hourlyPay: number;
      };
    };
  };
}

export default function RegisterPagination() {
  const [userData, setUserData] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const itemsPerPage = 5;

  useEffect(() => {
    getApplyData();
  }, [currentPage]);

  async function getApplyData() {
    try {
      const response = await axiosInstance.get(
        `https://bootcamp-api.codeit.kr/api/5-7/the-julge/users/${userId}/applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
          params: {
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage,
          },
        },
      );
      setUserData(response.data.items);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      // 로컬 스토리지에 applynum 값 저장
      localStorage.setItem('applynum', response.data.count);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
  }

  return (
    <div>
      <h1 className="text-[28px] font-bold  mb-[25px] "> 내 신청내역</h1>

      <table className="w-full border-gray-300 border-solid border-[1px] rounded-xl border-separate overflow:hidden">
        <thead className="h-[50px] text-normal bg-[#FFEBE7]">
          <tr className="text-left">
            <th className="font-normal text-[14px] w-[20%] pl-4">가게</th>
            <th className="font-normal text-[14px] w-[40%]">일자</th>
            <th className="font-normal text-[14px] w-[20%]">시급</th>
            <th className="font-normal text-[14px] w-[20%]">상태</th>
          </tr>
        </thead>
        <tbody className=" text-[14px] font-normal">
          {userData.map(application => (
            <tr key={application.item.id} className="h-[69px]">
              <td className="font-normal text-[16px] text-[#111322] pl-4">{application.item.shop.item.name}</td>
              <td className="font-normal text-[16px] text-[#111322]">
                {new Date(application.item.createdAt).toLocaleDateString()}
              </td>
              <td className="font-normal text-[16px] text-[#111322]">{application.item.notice.item.hourlyPay}</td>
              <td className="font-normal text-[16px] text-[#111322]">
                <StatusBar status={application.item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`rounded-md px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-[#FF8D72] text-white' : 'bg-gray-200'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
