'use client';

import { useState } from 'react';
import Image from 'next/image';
import PlaceholderImage from '@/app/components/PlaceholderImage';

// Mock data for health and safety sections
const mockHealthSafetyData = {
  evacuationGuide: {
    title: 'Emergency Evacuation Guide',
    description: 'This guide outlines emergency evacuation procedures for all facility areas. Please familiarize yourself with the nearest exits and assembly points.',
    mapUrl: '/safety/evacuation-map.pdf',
    imageUrl: '/safety/evacuation-preview.jpg',
    instructions: [
      'Identify primary and secondary evacuation routes',
      'Know the location of emergency exits',
      'Locate fire extinguishers and first aid stations',
      'Learn the designated assembly points',
      'Follow evacuation coordinator instructions'
    ]
  },
  safetyHandbook: {
    title: 'Health & Safety Handbook',
    description: 'Comprehensive guide covering all workplace safety protocols and procedures.',
    pdfUrl: '/safety/handbook.pdf',
    lastUpdated: '2024-03-15',
    chapters: [
      'General Safety Guidelines',
      'Personal Protective Equipment',
      'Machine Safety Protocols',
      'Emergency Procedures',
      'First Aid Guidelines',
      'Chemical Safety',
      'Reporting Procedures'
    ]
  },
  criticalSafetyIssues: [
    {
      id: 'CSI001',
      title: 'Machine Guarding Protocol',
      category: 'Equipment Safety',
      description: 'Proper use and maintenance of machine guards is critical for operator safety. Never operate equipment with missing or damaged guards.',
      imageUrl: '/safety/machine-guard.jpg',
      protocol: [
        'Inspect guards before each shift',
        'Report any damage immediately',
        'Never bypass safety interlocks',
        'Keep hands away from moving parts',
        'Clean and maintain guards regularly'
      ],
      severity: 'High',
      lastUpdated: '2024-03-10'
    },
    {
      id: 'CSI002',
      title: 'Chemical Handling Safety',
      category: 'Material Safety',
      description: 'Proper handling and storage of chemicals prevents accidents and exposure. Always refer to Material Safety Data Sheets (MSDS).',
      imageUrl: '/safety/chemical-safety.jpg',
      protocol: [
        'Wear appropriate PPE',
        'Check container integrity',
        'Use proper lifting techniques',
        'Store in designated areas',
        'Know spill response procedures'
      ],
      severity: 'High',
      lastUpdated: '2024-03-12'
    },
    {
      id: 'CSI003',
      title: 'Emergency Stop Procedures',
      category: 'Emergency Response',
      description: 'Knowledge of emergency stop locations and procedures is essential for all operators and maintenance personnel.',
      imageUrl: '/safety/emergency-stop.jpg',
      protocol: [
        'Locate all E-stop buttons',
        'Test E-stop functionality daily',
        'Clear area after activation',
        'Report any malfunctions',
        'Follow restart procedures'
      ],
      severity: 'Critical',
      lastUpdated: '2024-03-14'
    }
  ]
};

export default function HealthSafetyPage() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const toggleIssue = (id: string) => {
    setSelectedIssue(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-[#002B5C]">Health & Safety Information</h1>
          <p className="mt-2 text-gray-600">
            Essential safety guidelines and procedures for all personnel
          </p>
        </div>

        {/* Emergency Evacuation Guide */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">
            {mockHealthSafetyData.evacuationGuide.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <PlaceholderImage
                title="Evacuation Map"
                className="w-full h-64 rounded-lg mb-4"
              />
              <div className="flex space-x-4">
                <a
                  href={mockHealthSafetyData.evacuationGuide.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#002B5C] hover:bg-[#003872] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002B5C]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Map
                </a>
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002B5C]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Full Size
                </button>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-4">{mockHealthSafetyData.evacuationGuide.description}</p>
              <h3 className="font-medium text-gray-900 mb-2">Key Instructions:</h3>
              <ul className="space-y-2">
                {mockHealthSafetyData.evacuationGuide.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Health & Safety Handbook */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">
            {mockHealthSafetyData.safetyHandbook.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <PlaceholderImage
                title="Safety Handbook Cover"
                className="w-full h-64 rounded-lg mb-4"
              />
              <div className="flex space-x-4">
                <a
                  href={mockHealthSafetyData.safetyHandbook.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#002B5C] hover:bg-[#003872] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002B5C]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </a>
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002B5C]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Online
                </button>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-4">{mockHealthSafetyData.safetyHandbook.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Last Updated: {new Date(mockHealthSafetyData.safetyHandbook.lastUpdated).toLocaleDateString()}
              </p>
              <h3 className="font-medium text-gray-900 mb-2">Table of Contents:</h3>
              <ul className="space-y-2">
                {mockHealthSafetyData.safetyHandbook.chapters.map((chapter, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#002B5C] mr-2">{index + 1}.</span>
                    <span className="text-gray-700">{chapter}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Critical Safety Issues */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Critical Safety Issues</h2>
          <div className="space-y-4">
            {mockHealthSafetyData.criticalSafetyIssues.map((issue) => (
              <div key={issue.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleIssue(issue.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{issue.title}</span>
                    <span className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.severity === 'Critical'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      selectedIssue === issue.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {selectedIssue === issue.id && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <PlaceholderImage
                          title={issue.title}
                          className="w-full h-48 rounded-lg mb-4"
                        />
                        <p className="text-sm text-gray-500 mb-2">Category: {issue.category}</p>
                        <p className="text-sm text-gray-500">
                          Last Updated: {new Date(issue.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-4">{issue.description}</p>
                        <h4 className="font-medium text-gray-900 mb-2">Safety Protocol:</h4>
                        <ul className="space-y-2">
                          {issue.protocol.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span className="text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 