'use client';

import { useState } from 'react';
import Image from 'next/image';
import PlaceholderImage from '@/app/components/PlaceholderImage';

// Mock data for maintenance sections
const mockMaintenanceData = {
  criticalEquipment: [
    {
      id: 'EQ001',
      name: 'Injection Molding Machine #1',
      model: 'IM-2000X',
      serial: 'SN2023456',
      vendor: {
        name: 'Precision Machinery Co.',
        contact: '+1 (555) 123-4567',
        email: 'support@precisionmach.com',
        website: 'https://precisionmach.com'
      },
      status: 'In Stock'
    },
    {
      id: 'EQ002',
      name: 'Material Dryer',
      model: 'DR-500',
      serial: 'SN789012',
      vendor: {
        name: 'Industrial Drying Systems',
        contact: '+1 (555) 234-5678',
        email: 'service@ids.com',
        website: 'https://ids.com'
      },
      status: 'Limited Stock'
    },
    {
      id: 'EQ003',
      name: 'Cooling Tower',
      model: 'CT-1000',
      serial: 'SN345678',
      vendor: {
        name: 'CoolTech Solutions',
        contact: '+1 (555) 345-6789',
        email: 'support@cooltech.com',
        website: 'https://cooltech.com'
      },
      status: 'Out of Stock'
    }
  ],
  startupInstructions: [
    {
      id: 'SI001',
      equipment: 'Injection Molding Machine #1',
      steps: [
        'Check all safety guards are in place',
        'Verify hydraulic oil level',
        'Power on main breaker',
        'Initialize control panel',
        'Set temperature zones',
        'Wait for heat soak (minimum 30 minutes)',
        'Check material feed system'
      ]
    },
    {
      id: 'SI002',
      equipment: 'Material Dryer',
      steps: [
        'Inspect material hopper seals',
        'Check filter condition',
        'Power on main switch',
        'Set temperature according to material specs',
        'Verify airflow indicators',
        'Allow warm-up period (15 minutes)'
      ]
    }
  ],
  preventiveMaintenance: [
    {
      id: 'PM001',
      frequency: 'Daily',
      tasks: [
        'Clean machine surfaces',
        'Check oil levels',
        'Inspect safety systems',
        'Review error logs'
      ]
    },
    {
      id: 'PM002',
      frequency: 'Weekly',
      tasks: [
        'Lubricate moving parts',
        'Clean filters',
        'Check hydraulic connections',
        'Calibrate sensors'
      ]
    },
    {
      id: 'PM003',
      frequency: 'Monthly',
      tasks: [
        'Full system inspection',
        'Replace filters',
        'Check electrical connections',
        'Update maintenance logs'
      ]
    }
  ],
  equipmentFixes: [
    {
      id: 'EF001',
      problem: 'Hydraulic Pressure Loss',
      description: 'Sudden drop in hydraulic pressure during operation',
      steps: [
        'Stop machine operation',
        'Check hydraulic fluid level',
        'Inspect for leaks',
        'Verify pump operation',
        'Check pressure relief valve'
      ],
      imageUrl: '/maintenance/hydraulic-system.jpg',
      videoUrl: '/maintenance/pressure-fix.mp4'
    },
    {
      id: 'EF002',
      problem: 'Heater Zone Failure',
      description: 'Temperature control issues in specific zones',
      steps: [
        'Identify affected zone',
        'Check thermocouple connection',
        'Inspect heater band condition',
        'Test controller output',
        'Replace components if necessary'
      ],
      imageUrl: '/maintenance/heater-zone.jpg',
      videoUrl: '/maintenance/heater-repair.mp4'
    }
  ],
  lightSwitches: [
    {
      id: 'LS001',
      area: 'Production Floor',
      location: 'Main entrance, right wall',
      controls: 'Main production lighting'
    },
    {
      id: 'LS002',
      area: 'Material Storage',
      location: 'Storage room entrance',
      controls: 'Storage area lights'
    },
    {
      id: 'LS003',
      area: 'Maintenance Bay',
      location: 'Bay entrance, left side',
      controls: 'Work area and tool storage lighting'
    }
  ],
  criticalVendors: [
    {
      id: 'CV001',
      name: 'Precision Machinery Co.',
      phone: '+1 (555) 123-4567',
      email: 'support@precisionmach.com',
      equipment: ['Injection Molding Machines', 'Robotics'],
      website: 'https://precisionmach.com'
    },
    {
      id: 'CV002',
      name: 'Industrial Drying Systems',
      phone: '+1 (555) 234-5678',
      email: 'service@ids.com',
      equipment: ['Material Dryers', 'Dehumidifiers'],
      website: 'https://ids.com'
    }
  ],
  criticalParts: [
    {
      id: 'CP001',
      equipment: 'Injection Molding Machine #1',
      partName: 'Hydraulic Pump',
      modelNumber: 'HP-2000',
      serialNumber: 'SN123456',
      source: {
        name: 'Precision Machinery Co.',
        link: 'https://precisionmach.com/parts/HP-2000'
      }
    },
    {
      id: 'CP002',
      equipment: 'Material Dryer',
      partName: 'Heating Element',
      modelNumber: 'HE-500',
      serialNumber: 'SN789012',
      source: {
        name: 'Industrial Drying Systems',
        link: 'https://ids.com/parts/HE-500'
      }
    }
  ]
};

export default function MaintenancePage() {
  const [expandedStartup, setExpandedStartup] = useState<string[]>([]);
  const [expandedFixes, setExpandedFixes] = useState<string[]>([]);
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  const toggleStartup = (id: string) => {
    setExpandedStartup(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleFix = (id: string) => {
    setExpandedFixes(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleVendor = (id: string) => {
    setExpandedVendor(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-[#002B5C]">Maintenance Guide</h1>
          <p className="mt-2 text-gray-600">
            Comprehensive maintenance information and procedures
          </p>
        </div>

        {/* Critical Equipment List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Critical Equipment List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockMaintenanceData.criticalEquipment.map((equipment) => (
                    <tr key={equipment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{equipment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{equipment.model}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{equipment.serial}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                        <a href={equipment.vendor.website} target="_blank" rel="noopener noreferrer">
                          {equipment.vendor.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          equipment.status === 'In Stock'
                            ? 'bg-green-100 text-green-800'
                            : equipment.status === 'Limited Stock'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {equipment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Startup Instructions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Startup Instructions</h2>
          <div className="space-y-4">
            {mockMaintenanceData.startupInstructions.map((instruction) => (
              <div key={instruction.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleStartup(instruction.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
                >
                  <span className="font-medium text-gray-900">{instruction.equipment}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedStartup.includes(instruction.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedStartup.includes(instruction.id) && (
                  <div className="p-4 bg-white">
                    <ol className="list-decimal list-inside space-y-2">
                      {instruction.steps.map((step, index) => (
                        <li key={index} className="text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preventive Maintenance Tips */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Preventive Maintenance Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMaintenanceData.preventiveMaintenance.map((maintenance) => (
              <div key={maintenance.id} className="border rounded-lg p-4">
                <h3 className="font-medium text-lg text-gray-900 mb-3">{maintenance.frequency}</h3>
                <ul className="space-y-2">
                  {maintenance.tasks.map((task, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Fixes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Equipment Fixes</h2>
          <div className="space-y-4">
            {mockMaintenanceData.equipmentFixes.map((fix) => (
              <div key={fix.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFix(fix.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
                >
                  <span className="font-medium text-gray-900">{fix.problem}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedFixes.includes(fix.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFixes.includes(fix.id) && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <PlaceholderImage
                          title={fix.problem}
                          className="w-full h-48 mb-4 rounded-lg"
                        />
                        <p className="text-sm text-gray-500 mb-4">{fix.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Steps to Fix:</h4>
                        <ol className="list-decimal list-inside space-y-2">
                          {fix.steps.map((step, index) => (
                            <li key={index} className="text-gray-700">{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Light Switches */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Location of Light Switches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMaintenanceData.lightSwitches.map((switch_) => (
              <div key={switch_.id} className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{switch_.area}</h3>
                <p className="text-gray-600 mt-2">Location: {switch_.location}</p>
                <p className="text-gray-600 mt-1">Controls: {switch_.controls}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Vendors */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Critical Vendors</h2>
          <div className="space-y-4">
            {mockMaintenanceData.criticalVendors.map((vendor) => (
              <div key={vendor.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleVendor(vendor.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
                >
                  <span className="font-medium text-gray-900">{vendor.name}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedVendor === vendor.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedVendor === vendor.id && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                        <p className="text-gray-600">Phone: {vendor.phone}</p>
                        <p className="text-gray-600">Email: {vendor.email}</p>
                        <a
                          href={vendor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Visit Website
                        </a>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Supported Equipment</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {vendor.equipment.map((item, index) => (
                            <li key={index} className="text-gray-600">{item}</li>
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

        {/* Critical Equipment Parts List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#002B5C] mb-4">Critical Equipment Parts List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockMaintenanceData.criticalParts.map((part) => (
                  <tr key={part.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{part.equipment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.partName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.modelNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.serialNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                      <a href={part.source.link} target="_blank" rel="noopener noreferrer">
                        {part.source.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 