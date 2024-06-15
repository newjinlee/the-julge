// 'use client';
// import axiosInstance from '@/app/api/lib/axios';
// import { useState, useEffect } from 'react';

// export default function RegisterPagination() {
//   const [userData, setUserData] = useState(null);

//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

//   async function getApplyData() {
//     const response = await axiosInstance.get(
//       `https://bootcamp-api.codeit.kr/api/5-7/the-julge/users/${userId}/applications`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: false,
//       },
//     );
//   }

//   return (
//     <div>
//       <button onClick={getApplyData}>asdf</button>
//     </div>
//   );
// }

'use client';
import axiosInstance from '@/app/api/lib/axios';
import { useState, useEffect } from 'react';

interface Application {
  item: {
    id: string;
    status: 'pending | accepted | rejected | canceled';
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
  };
}

export default function RegisterPagination() {
  const [userData, setUserData] = useState([]);
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
        },
      );
      setUserData(response.data.items);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  function handlePageChange(newPage: any) {
    setCurrentPage(newPage);
  }

  return (
    <div>
      <table className="w-full border-gray-400 border-solid border-[1px] rounded-xl ">
        <thead className="h-[50px] text-normal bg-[#FFEBE7]">
          <tr className="text-left">
            <th className="font-normal text-[14px] w-[20%] pl-4">가게</th>
            <th className="font-normal text-[14px] w-[40%]">일자</th>
            <th className="font-normal text-[14px] w-[20%]">시급</th>
            <th className="font-normal text-[14px] w-[20%]">상태</th>
          </tr>
        </thead>
        <tbody className=" text-[16px] font-normal">
          {userData.map((application: any) => (
            <tr key={userId} className="h-[69px]">
              <td className="font-normal text-[16px] text-[#111322] pl-4">{application.item.shop.item.name}</td>
              <td className="font-normal text-[16px] text-[#111322]">
                {new Date(application.item.createdAt).toLocaleDateString()}
              </td>
              <td className="font-normal text-[16px] text-[#111322]">{application.item.notice.item.hourlyPay}</td>
              <td className="font-normal text-[16px] text-[#111322]">{application.item.status}</td>
            </tr>
          ))}
          <tr className="h-[69px]">
            <td className="font-normal text-[16px] text-[#111322] pl-4">홍콩반점</td>
            <td className="font-normal text-[16px] text-[#111322]">2023-01-12 10:00 ~ 12:00 (2시간)</td>
            <td className="font-normal text-[16px] text-[#111322]">15,000원</td>
            <td className="font-normal text-[16px] text-[#111322]">승인완료</td>
          </tr>
          <tr className="h-[69px]">
            <td className="font-normal text-[16px] text-[#111322] pl-4">홍콩반점</td>
            <td className="font-normal text-[16px] text-[#111322]">2023-01-12 10:00 ~ 12:00 (2시간)</td>
            <td className="font-normal text-[16px] text-[#111322]">15,000원</td>
            <td className="font-normal text-[16px] text-[#111322]">승인완료</td>
          </tr>
          <tr className="h-[69px]">
            <td className="font-normal text-[16px] text-[#111322] pl-4">홍콩반점</td>
            <td className="font-normal text-[16px] text-[#111322]">2023-01-12 10:00 ~ 12:00 (2시간)</td>
            <td className="font-normal text-[16px] text-[#111322]">15,000원</td>
            <td className="font-normal text-[16px] text-[#111322]">승인완료</td>
          </tr>
          <tr className="h-[69px]">
            <td className="font-normal text-[16px] text-[#111322] pl-4">홍콩반점</td>
            <td className="font-normal text-[16px] text-[#111322]">2023-01-12 10:00 ~ 12:00 (2시간)</td>
            <td className="font-normal text-[16px] text-[#111322]">15,000원</td>
            <td className="font-normal text-[16px] text-[#111322]">승인완료</td>
          </tr>
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
