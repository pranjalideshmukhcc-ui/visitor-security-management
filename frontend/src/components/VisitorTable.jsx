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
    <div className="bg-white border border-blue-100 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-blue-100">
        <h2 className="font-semibold text-[#0F2A5F]">
          Recent Visitors Log
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Latest visitor activity
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#EFF6FF]">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0F2A5F]">
                VISITOR NAME
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0F2A5F]">
                PURPOSE OF VISIT
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0F2A5F]">
                HOST PERSONNEL
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0F2A5F]">
                CHECK-IN TIME
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0F2A5F]">
                STATUS
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#0F2A5F]">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((visitor, index) => (
              <tr
                key={index}
                className="border-t border-blue-50 hover:bg-[#F8FAFC] transition-colors"
              >
                <td className="px-6 py-4 font-medium text-[#0F2A5F]">
                  {visitor.name}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {visitor.purpose}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {visitor.host}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {visitor.time}
                </td>

                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-medium">
                    {visitor.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="text-blue-600 text-xs font-medium mr-3 hover:text-blue-800">
                    View
                  </button>

                  <button className="text-slate-500 text-xs hover:text-[#0F2A5F]">
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