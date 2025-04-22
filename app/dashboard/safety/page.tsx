export default function SafetyPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-[#002B5C] mb-4">Health & Safety Information</h1>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Safety Protocols</h3>
          <p className="text-gray-600">Standard operating procedures and safety guidelines.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Emergency Procedures</h3>
          <p className="text-gray-600">Emergency response plans and contact information.</p>
        </div>
      </div>
    </div>
  );
} 