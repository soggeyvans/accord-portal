'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlaceholderImage from '@/app/components/PlaceholderImage';

// Mock data for die information
const mockDieData = {
  dieNumber: 'D-12345',
  masterDrawing: {
    url: '#',
    title: 'Master Drawing PDF',
  },
  masterQCDrawing: {
    url: '#',
    title: 'QC Drawing PDF',
  },
  setupParameters: {
    material: 'Polypropylene',
    temperature: '180-200°C',
    pressure: '800-1000 PSI',
    cycleTime: '45 seconds',
    moldType: 'Two-plate',
    runnerSystem: 'Hot runner',
  },
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
  qualityAlerts: [
    'Check for flash at parting line',
    'Monitor gate vestige',
    'Verify critical dimensions every 1000 cycles',
  ],
  troubleshooting: [
    {
      issue: 'Short Shots',
      solution: 'Increase injection pressure and check material temperature',
    },
    {
      issue: 'Flash',
      solution: 'Check clamp pressure and mold alignment',
    },
    {
      issue: 'Sink Marks',
      solution: 'Increase packing pressure and time',
    },
  ],
  packagingDetails: {
    boxSize: '24" x 24" x 12"',
    weightLimit: '50 lbs',
    specialInstructions: [
      'Use foam padding for protection',
      'Label with die number and revision',
      'Include setup sheet in package',
    ],
  },
};

export default function DieInformation() {
  const [expandedIssues, setExpandedIssues] = useState<number[]>([]);

  const toggleIssue = (index: number) => {
    setExpandedIssues(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-[#002B5C]">Die Information</h1>
          <p className="mt-2 text-gray-600">Die Number: {mockDieData.dieNumber}</p>
        </div>

        {/* Master Drawing Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Master Drawing</h2>
          <PlaceholderImage
            title={mockDieData.masterDrawing.title}
            className="h-48 w-full max-w-md"
          />
          <Link
            href={mockDieData.masterDrawing.url}
            className="mt-4 inline-flex items-center text-[#002B5C] hover:text-[#003872]"
          >
            <span>View Full Drawing</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

        {/* QC Drawing Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Master QC Drawing</h2>
          <PlaceholderImage
            title={mockDieData.masterQCDrawing.title}
            className="h-48 w-full max-w-md"
          />
          <Link
            href={mockDieData.masterQCDrawing.url}
            className="mt-4 inline-flex items-center text-[#002B5C] hover:text-[#003872]"
          >
            <span>View Critical Dimensions</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

        {/* Setup Parameters Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Setup Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(mockDieData.setupParameters).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <span className="font-medium text-gray-700 w-32 capitalize">{key}:</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Instructional Video</h2>
          <div className="relative w-full overflow-hidden rounded-lg shadow-inner bg-gray-100">
            {/* 16:9 aspect ratio wrapper */}
            <div className="relative pt-[56.25%]">
              <iframe
                src={mockDieData.videoUrl}
                title="Die Setup Instructions"
                className="absolute inset-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {/* Video description or caption */}
            <div className="mt-4 text-sm text-gray-600">
              This video demonstrates the proper setup and operation procedures for Die {mockDieData.dieNumber}.
            </div>
          </div>
        </div>

        {/* Quality Alerts Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Quality Alerts & Special Instructions</h2>
          <div className="space-y-2">
            {mockDieData.qualityAlerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-yellow-800">{alert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Troubleshooting Guide</h2>
          <div className="space-y-2">
            {mockDieData.troubleshooting.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleIssue(index)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
                >
                  <span className="font-medium text-gray-900">{item.issue}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedIssues.includes(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedIssues.includes(index) && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">{item.solution}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Packaging Details Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Packaging Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-32">Box Size:</span>
              <span className="text-gray-600">{mockDieData.packagingDetails.boxSize}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-32">Weight Limit:</span>
              <span className="text-gray-600">{mockDieData.packagingDetails.weightLimit}</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Special Instructions:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {mockDieData.packagingDetails.specialInstructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 