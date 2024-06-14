'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import ProfileRegister from './ProfileRegister';
import JobApplication from './JobApplication';

export default function Page() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getUserData() {
      const response = await axios.get(`https://bootcamp-api.codeit.kr/api/5-7/the-julge/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(response.data.item.name);
      setPhone(response.data.item.phone);
      setAddress(response.data.item.address);
      setBio(response.data.item.bio);
    }

    getUserData();
  }, [userId, token]); // userId, token이 변경될 때마다 함수 실행

  return (
    <>
      {name ? (
        <ProfileCard name={name} phoneNumber={phone} preferAddress={address} bio={bio}></ProfileCard>
      ) : (
        <ProfileRegister></ProfileRegister>
      )}
      <JobApplication></JobApplication>
    </>
  );
}
