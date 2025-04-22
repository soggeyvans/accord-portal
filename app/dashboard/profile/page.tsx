'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface EmployeeData {
  id: string;
  name: string;
  code: string;
  role: string;
  startDate: string;
  birthDate: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  vacationDays: {
    allowed: number;
    used: number;
  };
  productionStats: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  isActive: boolean;
  profilePicture?: string;
}

// Mock data - replace with API call in production
const mockEmployeeData: EmployeeData = {
  id: '1',
  name: 'John Smith',
  code: 'OP123',
  role: 'Machine Operator',
  startDate: '2022-03-15',
  birthDate: '1990-05-20',
  emergencyContact: {
    name: 'Jane Smith',
    relation: 'Spouse',
    phone: '(555) 123-4567'
  },
  vacationDays: {
    allowed: 15,
    used: 5
  },
  productionStats: {
    daily: 8.5,
    weekly: 42,
    monthly: 168
  },
  isActive: true
};

type TabType = 'profile' | 'stats' | 'docs' | 'messages';

export default function ProfilePage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeData>(mockEmployeeData);
  const [isBirthday, setIsBirthday] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');

    // Check if it's the employee's birthday
    const today = new Date();
    const birthDate = new Date(employeeData.birthDate);
    setIsBirthday(
      today.getMonth() === birthDate.getMonth() &&
      today.getDate() === birthDate.getDate()
    );
  }, [employeeData.birthDate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    toast.success('Changes saved successfully!');
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    // Password change logic here
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Password updated successfully!');
  };

  const handleEmergencyContactUpdate = (field: string, value: string) => {
    setEmployeeData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG)');
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setIsImageUploading(true);
  };

  const handleImageSave = () => {
    if (!imagePreview) return;

    // In a real app, you would upload the image to your backend here
    // For now, we'll just update the state
    setEmployeeData(prev => ({
      ...prev,
      profilePicture: imagePreview
    }));
    setImagePreview(null);
    setIsImageUploading(false);
    toast.success('Profile picture updated successfully!');
  };

  const handleImageRemove = () => {
    setEmployeeData(prev => ({
      ...prev,
      profilePicture: undefined
    }));
    setImagePreview(null);
    toast.success('Profile picture removed successfully!');
  };

  const handleImageCancel = () => {
    setImagePreview(null);
    setIsImageUploading(false);
  };

  const renderProfilePicture = () => {
    return (
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-[#002B5C] flex items-center justify-center overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : employeeData.profilePicture ? (
            <img
              src={employeeData.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-2xl font-bold">
              {employeeData.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        {(isAdmin || !isAdmin) && (
          <div className="absolute bottom-0 right-0 flex space-x-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4 text-[#002B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {employeeData.profilePicture && (
              <button
                onClick={handleImageRemove}
                className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleImageUpload}
        />
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {renderProfilePicture()}
                  <div>
                    <h1 className="text-2xl font-bold text-[#002B5C]">{employeeData.name}</h1>
                    <p className="text-gray-600">{employeeData.role}</p>
                    <p className="text-sm text-gray-500">Employee Code: {employeeData.code}</p>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      onClick={isEditing ? handleSave : handleEdit}
                      className="px-4 py-2 bg-[#002B5C] text-white rounded-lg hover:bg-[#003872] transition-colors"
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                    <button
                      onClick={() => setEmployeeData(prev => ({ ...prev, isActive: !prev.isActive }))}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      {employeeData.isActive ? 'Disable Account' : 'Enable Account'}
                    </button>
                  </div>
                )}
              </div>
              {isImageUploading && (
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={handleImageCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImageSave}
                    className="px-4 py-2 bg-[#002B5C] text-white rounded-lg hover:bg-[#003872] transition-colors"
                  >
                    Save Photo
                  </button>
                </div>
              )}
            </div>

            {/* Employee Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-[#002B5C] mb-4">Employee Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Start Date</h3>
                  {isEditing && isAdmin ? (
                    <input
                      type="date"
                      value={employeeData.startDate}
                      onChange={(e) => setEmployeeData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-600">{formatDate(employeeData.startDate)}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Birth Date</h3>
                  {isEditing && isAdmin ? (
                    <input
                      type="date"
                      value={employeeData.birthDate}
                      onChange={(e) => setEmployeeData(prev => ({ ...prev, birthDate: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-600">{formatDate(employeeData.birthDate)}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-[#002B5C] mb-4">Emergency Contact</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Name</h3>
                  {isEditing || !isAdmin ? (
                    <input
                      type="text"
                      value={employeeData.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactUpdate('name', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-600">{employeeData.emergencyContact.name}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Relationship</h3>
                  {isEditing || !isAdmin ? (
                    <input
                      type="text"
                      value={employeeData.emergencyContact.relation}
                      onChange={(e) => handleEmergencyContactUpdate('relation', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-600">{employeeData.emergencyContact.relation}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Phone</h3>
                  {isEditing || !isAdmin ? (
                    <input
                      type="tel"
                      value={employeeData.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactUpdate('phone', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-600">{employeeData.emergencyContact.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Password Change */}
            {!isAdmin && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#002B5C] mb-4">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <button
                    onClick={handlePasswordChange}
                    className="px-4 py-2 bg-[#002B5C] text-white rounded-lg hover:bg-[#003872] transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-6">
            {/* Vacation Days */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-[#002B5C] mb-4">Vacation Days</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">
                      Used: {employeeData.vacationDays.used} days
                    </span>
                    <span className="font-semibold text-gray-700">
                      Available: {employeeData.vacationDays.allowed - employeeData.vacationDays.used} days
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#002B5C] h-2.5 rounded-full"
                      style={{
                        width: `${(employeeData.vacationDays.used / employeeData.vacationDays.allowed) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-[#002B5C] mb-4">Production Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Daily Average</h3>
                  {isEditing && isAdmin ? (
                    <input
                      type="number"
                      value={employeeData.productionStats.daily}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        productionStats: { ...prev.productionStats, daily: parseFloat(e.target.value) }
                      }))}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-2xl text-[#002B5C]">{employeeData.productionStats.daily} hrs</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Weekly Total</h3>
                  {isEditing && isAdmin ? (
                    <input
                      type="number"
                      value={employeeData.productionStats.weekly}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        productionStats: { ...prev.productionStats, weekly: parseFloat(e.target.value) }
                      }))}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-2xl text-[#002B5C]">{employeeData.productionStats.weekly} hrs</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Monthly Total</h3>
                  {isEditing && isAdmin ? (
                    <input
                      type="number"
                      value={employeeData.productionStats.monthly}
                      onChange={(e) => setEmployeeData(prev => ({
                        ...prev,
                        productionStats: { ...prev.productionStats, monthly: parseFloat(e.target.value) }
                      }))}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="text-2xl text-[#002B5C]">{employeeData.productionStats.monthly} hrs</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'docs':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#002B5C] mb-4">Company Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="#"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <svg className="w-6 h-6 text-[#002B5C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-base font-medium text-gray-800 group-hover:text-[#002B5C] transition-colors">
                  Employee Handbook
                </span>
              </a>
              <a
                href="#"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <svg className="w-6 h-6 text-[#002B5C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-base font-medium text-gray-800 group-hover:text-[#002B5C] transition-colors">
                  Company Policies
                </span>
              </a>
              <a
                href="#"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <svg className="w-6 h-6 text-[#002B5C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-base font-medium text-gray-800 group-hover:text-[#002B5C] transition-colors">
                  Benefits Summary
                </span>
              </a>
              <a
                href="#"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <svg className="w-6 h-6 text-[#002B5C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-base font-medium text-gray-800 group-hover:text-[#002B5C] transition-colors">
                  Company Updates
                </span>
              </a>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#002B5C] mb-4">Messages</h2>
            <p className="text-gray-600">No new messages</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Birthday Banner */}
      {isBirthday && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center animate-pulse">
          <span className="text-xl text-blue-600">🎉 Happy Birthday! 🎂</span>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-[#002B5C] text-[#002B5C]'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile Info
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'stats'
                  ? 'border-b-2 border-[#002B5C] text-[#002B5C]'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Production Stats
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'docs'
                  ? 'border-b-2 border-[#002B5C] text-[#002B5C]'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Company Docs
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'messages'
                  ? 'border-b-2 border-[#002B5C] text-[#002B5C]'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Messages
            </button>
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
} 