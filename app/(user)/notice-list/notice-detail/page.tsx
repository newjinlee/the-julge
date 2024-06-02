"use client";
import React from 'react';
import { NavBar } from '../../../../components/NavBar';
import JobDetail from '../../notice-list/notice-detail/JobDetail';
import RecentJobs from '../../notice-list/notice-detail/RecentJobs';
import Footer from '../../../../components/Footer';

const Page = () => {
  return (
    <div>
      <NavBar />
      <JobDetail />
      <RecentJobs />
      <Footer />
    </div>
  );
};

export default Page;