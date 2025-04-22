'use client';

const renderCompanyDocs = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Company Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Employee Handbook', icon: '📚', description: 'General guidelines and company policies' },
          { title: 'Company Policies', icon: '📋', description: 'Detailed workplace regulations' },
          { title: 'Benefits Summary', icon: '🏥', description: 'Overview of employee benefits' },
          { title: 'Safety Guidelines', icon: '⚠️', description: 'Workplace safety protocols' }
        ].map((doc, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              <span className="text-2xl">{doc.icon}</span>
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-1">
                  {doc.title}
                </h4>
                <p className="text-base text-gray-800">
                  {doc.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {renderCompanyDocs()}
    </div>
  );
}