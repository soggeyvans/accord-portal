export default function RawMaterialPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-[#002B5C] mb-4">Raw Material Guide</h1>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Material Types</h3>
          <p className="text-gray-600">Comprehensive guide to all raw materials used in production.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Storage Requirements</h3>
          <p className="text-gray-600">Proper storage and handling guidelines for different materials.</p>
        </div>
      </div>
    </div>
  );
} 