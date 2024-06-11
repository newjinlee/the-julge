'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setEmailError(validateEmail(email) ? '' : '이메일 형식으로 작성해 주세요.');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordError(password.length >= 8 ? '' : '비밀번호는 8자 이상이어야 합니다.');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bootcamp-api.codeit.kr/api/5-7/the-julge/token', { email, password });
      // Save the token to local storage
      const { token, user } = response.data.item;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.item.id);
      localStorage.setItem('userEmail', user.item.email);
      localStorage.setItem('userType', user.item.type);
      router.push('/notice-list');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setShowModal(true);
      } else {
        // Show modal for any other error
        setShowModal(true);
      }
    }
  };

  return (
    <div className="flex h-full justify-center flex-col items-center gap-10">
      <Image src="/logo-big.png" height={45} width={248} alt="logo" />

      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-4">
          <div>
            <h1>이메일</h1>
            <input
              type="text"
              placeholder="입력"
              className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-3"
              onChange={handleEmailChange}
            />
            {emailError && <h1 className="text-red-500">{emailError}</h1>}
          </div>

          <div>
            <h1>비밀번호</h1>
            <input
              type="password"
              placeholder="입력"
              className="w-[350px] h-[58px] border-solid border-2 border-gray-200 rounded-md p-4 mb-4"
              onChange={handlePasswordChange}
            />
            {passwordError && <h1 className="text-red-500">{passwordError}</h1>}
          </div>

          <button
            type="submit"
            className="w-[350px] h-[48px] bg-[#EA3C12] text-[16px] font-semibold rounded-md text-white">
            로그인하기
          </button>
        </div>
      </form>

      {showModal && (
        <div className="absolute top-50 left-50 w-[200px] h-[80px] flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg">
            <h2>알림</h2>
            <p>이메일/비밀번호가 올바르지 않습니다.</p>
            <button onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
