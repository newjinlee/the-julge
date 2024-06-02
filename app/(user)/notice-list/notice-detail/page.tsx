"use client";
import React from 'react';
import JobDetail from './JobDetail';
import RecentJobs from './RecentJobs';

const Page = () => {
  return (
    <div>
      <JobDetail />
      <RecentJobs />
    </div>
  );
};

export default Page;