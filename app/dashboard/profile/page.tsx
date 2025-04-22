'use client';

import React from 'react';
import Image from 'next/image';

interface EmployeeData {
  operatorCode: string;
  name: string;
  startDate: string;
  birthdate: string;
  profilePicture: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    alternatePhone: string;
  };
  productionStats: {
    today: { hours: number; units: number };
    thisWeek: { hours: number; units: number };
    thisMonth: { hours: number; units: number };
  };
  vacation: {
    allowed: number;
    used: number;
    remaining: number;
  };
}

const mockEmployeeData: EmployeeData = {
  operatorCode: 'OP123',
  name: 'John Doe',
  startDate: 'Jan 5, 2020',
  birthdate: 'Mar 10, 1990',
  profilePicture: '/placeholder-profile.jpg',
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '(555) 987-6543',
    alternatePhone: '(555) 123-4567'
  },
  productionStats: {
    today: { hours: 7.5, units: 150 },
    thisWeek: { hours: 37.5, units: 750 },
    thisMonth: { hours: 160, units: 3200 }
  },
  vacation: {
    allowed: 15,
    used: 5,
    remaining: 10
  }
};

function ProfilePage() {
  const today = new Date();
  const birthday = new Date(mockEmployeeData.birthdate);
  const isBirthday = today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Profile Header */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-blue-100">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-900">{mockEmployeeData.name}</h1>
                {isBirthday && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎉</span>
                    <span className="text-2xl">🎂</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mt-1">Operator Code: {mockEmployeeData.operatorCode}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Update Profile Picture
              </button>
            </div>
          </div>
        </section>

        {/* Employee Information */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Employee Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                <p className="text-base text-gray-900">{mockEmployeeData.startDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Birthdate</h3>
                <p className="text-base text-gray-900">{mockEmployeeData.birthdate}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Emergency Contact</h3>
              <div className="mt-2 space-y-2">
                <p className="text-base text-gray-900">
                  {mockEmployeeData.emergencyContact.name} ({mockEmployeeData.emergencyContact.relationship})
                </p>
                <p className="text-base text-gray-900">
                  Primary: {mockEmployeeData.emergencyContact.phone}
                </p>
                <p className="text-base text-gray-900">
                  Alternative: {mockEmployeeData.emergencyContact.alternatePhone}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Production Statistics */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Production Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Today</h3>
              <p className="text-lg font-semibold text-gray-900">
                {mockEmployeeData.productionStats.today.hours} hours
              </p>
              <p className="text-base text-gray-600">
                {mockEmployeeData.productionStats.today.units} units
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">This Week</h3>
              <p className="text-lg font-semibold text-gray-900">
                {mockEmployeeData.productionStats.thisWeek.hours} hours
              </p>
              <p className="text-base text-gray-600">
                {mockEmployeeData.productionStats.thisWeek.units} units
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">This Month</h3>
              <p className="text-lg font-semibold text-gray-900">
                {mockEmployeeData.productionStats.thisMonth.hours} hours
              </p>
              <p className="text-base text-gray-600">
                {mockEmployeeData.productionStats.thisMonth.units} units
              </p>
            </div>
          </div>
        </section>

        {/* Vacation Days */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Vacation Days</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base text-gray-600">
                {mockEmployeeData.vacation.used} used / {mockEmployeeData.vacation.allowed} total
              </span>
              <span className="text-base font-medium text-blue-600">
                {mockEmployeeData.vacation.remaining} remaining
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(mockEmployeeData.vacation.used / mockEmployeeData.vacation.allowed) * 100}%` }}
              />
            </div>
          </div>
        </section>

        {/* Company Resources */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Employee Handbook', icon: '📚', description: 'General guidelines and company policies' },
              { title: 'Company Policies', icon: '📋', description: 'Detailed workplace regulations' },
              { title: 'Benefits Summary', icon: '🏥', description: 'Overview of employee benefits' },
              { title: 'Safety Guidelines', icon: '⚠️', description: 'Workplace safety protocols' }
            ].map((doc, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">{doc.icon}</span>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">{doc.title}</h3>
                    <p className="text-base text-gray-800">{doc.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Communications & Notifications */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Communications & Notifications</h2>
          <div className="space-y-4">
            {[
              { title: 'Company Picnic Next Month', date: '2024-04-15', type: 'Event' },
              { title: 'New Safety Protocol Update', date: '2024-03-20', type: 'Update' },
              { title: 'Employee of the Month Announcement', date: '2024-03-01', type: 'Announcement' }
            ].map((notification, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
                <div>
                  <h3 className="text-base font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.type}</p>
                </div>
                <span className="text-sm text-gray-500">{notification.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;