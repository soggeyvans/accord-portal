'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#002B5C] mb-4">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <h3 className="font-semibold text-gray-900 mb-2">Recent Dies</h3>
            <p className="text-gray-600 text-sm">View and manage recent die information</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-[#002B5C] text-2xl font-bold">12</span>
              <span className="text-sm text-gray-500">Active Dies</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <h3 className="font-semibold text-gray-900 mb-2">Material Status</h3>
            <p className="text-gray-600 text-sm">Check raw material inventory levels</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-[#002B5C] text-2xl font-bold">85%</span>
              <span className="text-sm text-gray-500">Stock Level</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <h3 className="font-semibold text-gray-900 mb-2">Maintenance Schedule</h3>
            <p className="text-gray-600 text-sm">Upcoming maintenance tasks</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-[#002B5C] text-2xl font-bold">3</span>
              <span className="text-sm text-gray-500">Pending Tasks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#002B5C] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-[#002B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Die #A123 Maintenance Complete</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New Material Stock Added</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 