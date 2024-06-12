"use client";
import React from 'react';
import JobDetail from './JobDetail';
import RecentJobs from './RecentJobs';

const JobPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-neutral-50">
        <JobDetail />
        <RecentJobs />
      </div>
    </div>
  );
};

export default JobPage;