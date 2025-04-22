export default function NotificationsPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-[#002B5C] mb-4">Company Notifications</h1>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Updates</h3>
          <p className="text-gray-600">Latest company announcements and updates.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Important Alerts</h3>
          <p className="text-gray-600">Critical notifications and time-sensitive information.</p>
        </div>
      </div>
    </div>
  );
} 