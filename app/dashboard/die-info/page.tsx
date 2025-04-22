export default function DieInfoPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-[#002B5C] mb-4">Die Information</h1>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Die Specifications</h3>
          <p className="text-gray-600">Access detailed specifications and documentation for all dies.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Maintenance History</h3>
          <p className="text-gray-600">View maintenance records and upcoming service schedules.</p>
        </div>
      </div>
    </div>
  );
} 