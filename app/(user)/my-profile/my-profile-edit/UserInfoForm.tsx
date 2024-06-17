'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UserInput from './UserInput';
import CustomTextarea from '../../../../components/CustomTextarea';
import UserDropdown from './UserDropdown';
import Alert from '../../../../components/Alert';

interface StoreInfoFormProps {
  buttonText: string;
  alertMessage: string;
}

const categories = ['한식', '중식', '일식', '양식', '분식', '카페', '편의점', '기타'];
const addresses = [
  '서울시 종로구',
  '서울시 중구',
  '서울시 용산구',
  '서울시 성동구',
  '서울시 광진구',
  '서울시 동대문구',
  '서울시 중랑구',
  '서울시 성북구',
  '서울시 강북구',
  '서울시 도봉구',
  '서울시 노원구',
  '서울시 은평구',
  '서울시 서대문구',
  '서울시 마포구',
  '서울시 양천구',
  '서울시 강서구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 영등포구',
  '서울시 동작구',
  '서울시 관악구',
  '서울시 서초구',
  '서울시 강남구',
  '서울시 송파구',
  '서울시 강동구',
];

export default function UserInfoForm({ buttonText, alertMessage }: StoreInfoFormProps) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
  }, []);

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(`https://bootcamp-api.codeit.kr/api/5-7/the-julge/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.item.name);
        setPhone(response.data.item.phone);
        setAddress(response.data.item.address);
        setBio(response.data.item.bio);
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    }

    getUserInfo();
  }, [userId, token]);

  async function handleAlertOpen() {
    try {
      await axios.put(
        `https://bootcamp-api.codeit.kr/api/5-7/the-julge/users/${userId}`,
        { name, phone, address, bio },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShowAlert(true);
      setErrorMessage(alertMessage);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || '전화번호가 올바르지 않습니다.');
      setShowAlert(true);
    }
  }

  function handleAlertClose() {
    setShowAlert(false);
    router.push('/my-profile');
  }

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative max-w-[964px] h-full mx-auto px-5 py-[60px] md:py-[60px]">
        <div className="flex items-center justify-between mb-7">
          <h1 className="font-bold text-2xl">가게 정보</h1>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UserInput
              label="이름*"
              placeholder={name}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <UserInput
              label="전화번호*"
              placeholder={phone}
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />
            <UserDropdown label="주소*" options={addresses} selectedOption={address} onOptionSelected={setAddress} />
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label>소개</label>
            <textarea
              className="px-5 py-4 w-full h-[153px] border border-solid border-gray-300 rounded-md"
              placeholder={bio}
              value={bio}
              onChange={handleTextArea}></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAlertOpen}
            className="w-[312px] h-12 bg-red-500 text-white font-bold border rounded-md px-12 py-3 text-center whitespace-nowrap">
            {buttonText}
          </button>
        </div>
        {showAlert && <Alert message={errorMessage} onClose={handleAlertClose} />}
      </div>
    </div>
  );
}
