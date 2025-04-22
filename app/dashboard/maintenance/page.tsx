export default function MaintenancePage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-[#002B5C] mb-4">Maintenance Information</h1>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Scheduled Maintenance</h3>
          <p className="text-gray-600">View upcoming maintenance tasks and schedules.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Equipment Status</h3>
          <p className="text-gray-600">Current status and maintenance history of all equipment.</p>
        </div>
      </div>
    </div>
  );
} 