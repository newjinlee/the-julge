"use client";
import React from 'react';
import { NavBar } from '../../../../components/NavBar';
import JobDetail from './JobDetail';
import RecentJobs from './RecentJobs';
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