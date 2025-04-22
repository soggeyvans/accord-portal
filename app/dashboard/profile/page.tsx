'use client';

import React from 'react';

const mockEmployeeData = {
  operatorCode: 'OP123',
  name: 'John Doe',
  startDate: 'Jan 5, 2020',
  birthdate: 'Mar 10, 1990',
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '(555) 987-6543',
    alternatePhone: '(555) 123-4567'
  }
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Employee Profile</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <div className="mt-2">
              <p><span className="font-medium">Name:</span> {mockEmployeeData.name}</p>
              <p><span className="font-medium">Operator Code:</span> {mockEmployeeData.operatorCode}</p>
              <p><span className="font-medium">Start Date:</span> {mockEmployeeData.startDate}</p>
              <p><span className="font-medium">Birth Date:</span> {mockEmployeeData.birthdate}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Emergency Contact</h2>
            <div className="mt-2">
              <p><span className="font-medium">Name:</span> {mockEmployeeData.emergencyContact.name}</p>
              <p><span className="font-medium">Relationship:</span> {mockEmployeeData.emergencyContact.relationship}</p>
              <p><span className="font-medium">Primary Phone:</span> {mockEmployeeData.emergencyContact.phone}</p>
              <p><span className="font-medium">Alternative Phone:</span> {mockEmployeeData.emergencyContact.alternatePhone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}