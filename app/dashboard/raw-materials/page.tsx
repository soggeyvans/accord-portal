'use client';

import { useState } from 'react';
import Image from 'next/image';
import PlaceholderImage from '@/app/components/PlaceholderImage';

// Mock data for raw materials
const mockMaterialsData = {
  materials: [
    {
      id: 'PP-001',
      name: 'Polypropylene',
      type: 'PP',
      description: 'General purpose injection grade polypropylene with excellent flow properties.',
      processInfo: {
        temperature: '190-230°C',
        pressure: '800-1200 PSI',
        speed: 'Medium',
        dryingTemp: 'N/A',
        dryingTime: 'N/A',
        notes: 'Minimal moisture sensitivity. No drying required.',
      },
      warnings: [
        'Avoid processing above 250°C',
        'Keep material sealed when not in use',
      ],
    },
    {
      id: 'ABS-002',
      name: 'Acrylonitrile Butadiene Styrene',
      type: 'ABS',
      description: 'High impact resistant ABS suitable for structural applications.',
      processInfo: {
        temperature: '220-260°C',
        pressure: '1000-1500 PSI',
        speed: 'Medium-High',
        dryingTemp: '80°C',
        dryingTime: '2-4 hours',
        notes: 'Pre-drying recommended for optimal results.',
      },
      warnings: [
        'Must be dried before processing',
        'Store in dry conditions',
      ],
    },
    {
      id: 'PC-003',
      name: 'Polycarbonate',
      type: 'PC',
      description: 'Optical grade polycarbonate for transparent applications.',
      processInfo: {
        temperature: '280-310°C',
        pressure: '1200-1800 PSI',
        speed: 'Low-Medium',
        dryingTemp: '120°C',
        dryingTime: '4-6 hours',
        notes: 'Thorough drying critical for quality.',
      },
      warnings: [
        'Must be thoroughly dried',
        'Avoid exposure to moisture',
        'Use proper PPE when handling',
      ],
    },
  ],
  troubleshooting: [
    {
      id: 1,
      problem: 'Black Specks',
      description: 'Dark contamination visible in molded parts',
      cause: 'Material degradation due to excessive heat exposure',
      solution: 'Reduce barrel temperature and minimize residence time',
      result: 'Eliminated contamination and improved part quality',
      imageUrl: '/defect-black-specks.jpg',
    },
    {
      id: 2,
      problem: 'Moisture Streaks',
      description: 'Silver streaks visible on part surface',
      cause: 'Insufficient material drying',
      solution: 'Increased drying time and temperature as per material specifications',
      result: 'Resolved surface defects and improved aesthetics',
      imageUrl: '/defect-moisture-streaks.jpg',
    },
    {
      id: 3,
      problem: 'Brittleness',
      description: 'Parts showing unexpected brittleness and cracking',
      cause: 'Material degradation from multiple regrind cycles',
      solution: 'Limited regrind percentage and improved material handling',
      result: 'Restored proper material properties and part performance',
      imageUrl: '/defect-brittleness.jpg',
    },
  ],
};

export default function RawMaterialGuide() {
  const [expandedTroubleshooting, setExpandedTroubleshooting] = useState<number[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(mockMaterialsData.materials[0].id);

  const toggleTroubleshooting = (id: number) => {
    setExpandedTroubleshooting(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const selectedMaterialData = mockMaterialsData.materials.find(m => m.id === selectedMaterial);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-[#002B5C]">Raw Material Guide</h1>
          <p className="mt-2 text-gray-600">
            Comprehensive guide for material properties and processing parameters
          </p>
        </div>

        {/* Materials List Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Raw Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMaterialsData.materials.map((material) => (
                <button
                  key={material.id}
                  onClick={() => setSelectedMaterial(material.id)}
                  className={`p-4 rounded-lg border transition-colors ${
                    selectedMaterial === material.id
                      ? 'border-[#002B5C] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{material.name}</h3>
                  <div className="mt-1 text-sm text-gray-500">ID: {material.id}</div>
                  <div className="mt-1 text-sm text-gray-500">Type: {material.type}</div>
                  <p className="mt-2 text-sm text-gray-600">{material.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Process Information Section */}
        {selectedMaterialData && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-[#002B5C] mb-4">
              Process Information: {selectedMaterialData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Temperature Settings</h3>
                <p className="text-gray-600">{selectedMaterialData.processInfo.temperature}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Pressure Range</h3>
                <p className="text-gray-600">{selectedMaterialData.processInfo.pressure}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Processing Speed</h3>
                <p className="text-gray-600">{selectedMaterialData.processInfo.speed}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Drying Temperature</h3>
                <p className="text-gray-600">{selectedMaterialData.processInfo.dryingTemp}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Drying Time</h3>
                <p className="text-gray-600">{selectedMaterialData.processInfo.dryingTime}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Processing Notes</h3>
                <p className="text-gray-600">{selectedMaterialData.processInfo.notes}</p>
              </div>
            </div>
            
            {/* Warnings */}
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Warnings & Handling Notes</h3>
              <div className="space-y-2">
                {selectedMaterialData.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5 text-red-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="text-red-800">{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Troubleshooting Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Troubleshooting Guide</h2>
          <div className="space-y-4">
            {mockMaterialsData.troubleshooting.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleTroubleshooting(item.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
                >
                  <span className="font-medium text-gray-900">{item.problem}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedTroubleshooting.includes(item.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedTroubleshooting.includes(item.id) && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <PlaceholderImage
                          title={`${item.problem} Example`}
                          className="w-full h-48 mb-4"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Description</h4>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Cause</h4>
                          <p className="text-gray-600">{item.cause}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Solution</h4>
                          <p className="text-gray-600">{item.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Result</h4>
                          <p className="text-gray-600">{item.result}</p>
                        </div>
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