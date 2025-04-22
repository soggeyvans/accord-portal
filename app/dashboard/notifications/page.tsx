'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

// Mock data for notifications
const mockNotifications = [
  {
    id: 'N001',
    title: 'New Safety Protocol Implementation',
    message: 'Updated safety protocols for machine operation will be effective starting next week. All operators must complete the new training module by Friday.',
    timestamp: '2024-04-22T09:00:00',
    tag: 'Policy',
    priority: 'High',
    link: '/dashboard/health-safety',
    attachment: null,
    isRead: false
  },
  {
    id: 'N002',
    title: 'Production Milestone Achieved! 🎉',
    message: 'Congratulations team! We\'ve hit our quarterly production target ahead of schedule. Join us for a celebration in the break room this afternoon.',
    timestamp: '2024-04-21T14:30:00',
    tag: 'Achievement',
    priority: 'Normal',
    link: null,
    attachment: '/docs/Q1-results.pdf',
    isRead: false
  },
  {
    id: 'N003',
    title: 'Scheduled Maintenance Notice',
    message: 'Line 2 will be down for scheduled maintenance this weekend. Please adjust production schedules accordingly.',
    timestamp: '2024-04-21T11:15:00',
    tag: 'Maintenance',
    priority: 'Medium',
    link: '/dashboard/maintenance',
    attachment: null,
    isRead: true
  },
  {
    id: 'N004',
    title: 'Emergency Response Team Meeting',
    message: 'Mandatory meeting for all ERT members tomorrow at 8:00 AM in Conference Room A.',
    timestamp: '2024-04-20T16:45:00',
    tag: 'Urgent',
    priority: 'Critical',
    link: null,
    attachment: '/docs/ert-agenda.pdf',
    isRead: false
  },
  {
    id: 'N005',
    title: 'New Material Handling Guidelines',
    message: 'Updated procedures for handling raw materials have been posted. Please review and acknowledge receipt.',
    timestamp: '2024-04-20T10:30:00',
    tag: 'Policy',
    priority: 'High',
    link: '/dashboard/raw-material',
    attachment: '/docs/material-guidelines.pdf',
    isRead: true
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleRead = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification?.tag === 'Achievement' && !notification.isRead) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: !notification.isRead }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'policy':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'achievement':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = showUnreadOnly
    ? notifications.filter(n => !n.isRead)
    : notifications;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-[#002B5C]">Company Notifications</h1>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002B5C]"
              >
                {showUnreadOnly ? 'Show All' : 'Show Unread Only'}
              </button>
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#002B5C] hover:bg-[#003872] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002B5C]"
                disabled={unreadCount === 0}
              >
                Mark All as Read
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow p-6 transition-all duration-200 ${
                !notification.isRead ? 'border-l-4 border-[#002B5C]' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {notification.title}
                    </h2>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTagColor(notification.tag)}`}>
                      {notification.tag}
                    </span>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{notification.message}</p>
                  <div className="mt-3 flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                    {notification.link && (
                      <Link
                        href={notification.link}
                        className="text-[#002B5C] hover:text-[#003872] font-medium"
                      >
                        View Details
                      </Link>
                    )}
                    {notification.attachment && (
                      <a
                        href={notification.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#002B5C] hover:text-[#003872] font-medium"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        Attachment
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleRead(notification.id)}
                  className={`ml-4 p-2 rounded-full transition-colors duration-200 ${
                    notification.isRead
                      ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                      : 'text-[#002B5C] hover:text-[#003872] hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {notification.isRead ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {showUnreadOnly ? 'No unread notifications to display.' : 'No notifications to display.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 