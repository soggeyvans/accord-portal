'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const navigation: NavItem[] = [
  { 
    name: 'Overview',
    href: '/dashboard',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    roles: ['admin', 'user'],
  },
  {
    name: 'Die Information',
    href: '/dashboard/die-info',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    roles: ['admin', 'user'],
  },
  {
    name: 'Raw Material Guide',
    href: '/dashboard/raw-material',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    roles: ['admin', 'user'],
  },
  {
    name: 'Maintenance Info',
    href: '/dashboard/maintenance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    roles: ['admin', 'user'],
  },
  {
    name: 'Health & Safety Info',
    href: '/dashboard/safety',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    roles: ['admin', 'user'],
  },
  {
    name: 'Company Notifications',
    href: '/dashboard/notifications',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    roles: ['admin', 'user'],
  },
  {
    name: 'Profile & Info',
    href: '/dashboard/profile',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    roles: ['admin', 'employee'],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    
    if (!isAuthenticated || !role) {
      router.push('/login');
    } else {
      setUserEmail(email || '');
      setUserRole(role);

      const currentPath = pathname || '';
      const currentNavItem = navigation.find(item => item.href === currentPath);
      if (currentNavItem && !currentNavItem.roles.includes(role)) {
        router.push('/dashboard');
      }
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  const getUserInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-4 text-gray-600 hover:text-[#002B5C] focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center">
            <div className="relative h-12 w-48 ml-4 bg-gray-50">
              <Image
                src="/accord-logo.png"
                alt="Accord Plastics"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
          </Link>
        </div>
        <nav className="mt-6 px-4">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 mb-2 text-sm rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#002B5C] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="md:pl-64">
        {/* Top navigation */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 ml-12 md:ml-0">
          <div className="text-lg font-semibold text-[#002B5C] truncate">
            {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="hidden sm:flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#002B5C] flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {getUserInitials(userEmail)}
                    </span>
                  </div>
                  <span className="ml-2 text-sm text-gray-600 capitalize hidden sm:block">{userRole}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={() => {
                      router.push('/dashboard/profile');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile & Info
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>

      {/* Click away listener for profile dropdown */}
      {isProfileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </div>
  );
} 