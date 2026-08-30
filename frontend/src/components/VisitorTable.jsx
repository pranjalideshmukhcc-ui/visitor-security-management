function VisitorTable() {
  const visitors = [
    {
      name: "Rahul Sharma",
      purpose: "Meeting",
      host: "Dr. Amit Patel",
      time: "09:15 AM",
      status: "Checked In",
    },
    {
      name: "Priya Mehta",
      purpose: "Interview",
      host: "Prof. Neha Shah",
      time: "10:30 AM",
      status: "Checked In",
    },
    {
      name: "Arjun Kumar",
      purpose: "Delivery",
      host: "Admin Office",
      time: "11:45 AM",
      status: "Checked Out",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">
          Recent Visitors Log
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          Latest visitor activity
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-xs text-gray-500">
                VISITOR NAME
              </th>
              <th className="text-left px-6 py-4 text-xs text-gray-500">
                PURPOSE OF VISIT
              </th>
              <th className="text-left px-6 py-4 text-xs text-gray-500">
                HOST PERSONNEL
              </th>
              <th className="text-left px-6 py-4 text-xs text-gray-500">
                CHECK-IN TIME
              </th>
              <th className="text-left px-6 py-4 text-xs text-gray-500">
                STATUS
              </th>
              <th className="text-left px-6 py-4 text-xs text-gray-500">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {visitor.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {visitor.purpose}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {visitor.host}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {visitor.time}
                </td>

                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs">
                    {visitor.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="text-blue-600 text-xs mr-3">
                    View
                  </button>

                  <button className="text-gray-500 text-xs">
                    Check Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VisitorTable;