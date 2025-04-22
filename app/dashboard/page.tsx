'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for the chart
const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Maintenance Events',
      data: [3, 5, 2, 4, 3],
      backgroundColor: '#002B5C',
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Weekly Maintenance Events',
    },
  },
};

// Mock data for quick stats
const quickStats = {
  activeDies: 12,
  materialInventory: 85,
  maintenanceTasks: 3,
  employeeCount: 45,
};

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    title: 'Die #A123 Maintenance Complete',
    time: '2 hours ago',
    type: 'maintenance',
  },
  {
    id: 2,
    title: 'New Material Stock Added',
    time: '5 hours ago',
    type: 'material',
  },
  {
    id: 3,
    title: 'Safety Protocol Updated',
    time: '1 day ago',
    type: 'safety',
  },
];

// Quick access links
const quickLinks = [
  { title: 'Die Info', href: '/dashboard/die-info', icon: '🔧' },
  { title: 'Raw Material Guide', href: '/dashboard/raw-material', icon: '📦' },
  { title: 'Maintenance Info', href: '/dashboard/maintenance', icon: '🛠️' },
  { title: 'Safety', href: '/dashboard/health-safety', icon: '🛡️' },
  { title: 'Profile', href: '/dashboard/profile', icon: '👤' },
];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return (
          <svg className="w-6 h-6 text-[#002B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'material':
        return (
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'safety':
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#002B5C] text-white p-4 rounded-lg shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, Admin</h1>
          <p className="text-sm">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-[#002B5C] mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-600">Active Dies</h3>
            <div className="mt-2 flex justify-between items-end">
              <span className="text-3xl font-bold text-[#002B5C]">{quickStats.activeDies}</span>
              <span className="text-sm text-gray-500">Total</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-600">Material Inventory</h3>
            <div className="mt-2 flex justify-between items-end">
              <span className="text-3xl font-bold text-[#002B5C]">{quickStats.materialInventory}%</span>
              <div className="w-12 h-12 relative">
                <svg className="transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#002B5C"
                    strokeWidth="3"
                    strokeDasharray={`${quickStats.materialInventory}, 100`}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-600">Pending Tasks</h3>
            <div className="mt-2 flex justify-between items-end">
              <span className="text-3xl font-bold text-[#002B5C]">{quickStats.maintenanceTasks}</span>
              <span className="text-sm text-gray-500">Tasks</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-600">Employee Count</h3>
            <div className="mt-2 flex justify-between items-end">
              <span className="text-3xl font-bold text-[#002B5C]">{quickStats.employeeCount}</span>
              <span className="text-sm text-gray-500">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-[#002B5C] mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="text-2xl mb-2">{link.icon}</span>
              <span className="text-sm font-medium text-gray-900">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-[#002B5C] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-[#002B5C] mb-4">Maintenance Overview</h2>
          <div className="h-[300px]">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
} 