import { useState } from "react";

function SecurityLogs() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const logs = [
    {
      id: 1,
      time: "12:42 PM",
      user: "Admin User",
      action: "Visitor Check-in",
      visitor: "Rahul Sharma",
      location: "Main Gate",
      status: "Success",
    },
    {
      id: 2,
      time: "12:18 PM",
      user: "Security Officer",
      action: "Visitor Check-out",
      visitor: "Arjun Verma",
      location: "Main Gate",
      status: "Success",
    },
    {
      id: 3,
      time: "11:56 AM",
      user: "Admin User",
      action: "Visitor Registration",
      visitor: "Aman Gupta",
      location: "Reception",
      status: "Success",
    },
    {
      id: 4,
      time: "11:30 AM",
      user: "Security Officer",
      action: "Access Denied",
      visitor: "Unknown Visitor",
      location: "North Gate",
      status: "Warning",
    },
    {
      id: 5,
      time: "11:05 AM",
      user: "Admin User",
      action: "Approval Updated",
      visitor: "Sneha Joshi",
      location: "Admin Office",
      status: "Success",
    },
    {
      id: 6,
      time: "10:42 AM",
      user: "Security Officer",
      action: "Visitor Check-in",
      visitor: "Priya Mehta",
      location: "Main Gate",
      status: "Success",
    },
    {
      id: 7,
      time: "10:15 AM",
      user: "Admin User",
      action: "System Login",
      visitor: "-",
      location: "Command Center",
      status: "Success",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const text = `${log.user} ${log.action} ${log.visitor} ${log.location}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || log.status === filter;

    return matchesSearch && matchesFilter;
  });

  const exportLogs = () => {
    const header =
      "Time,User,Action,Visitor,Location,Status\n";

    const rows = filteredLogs
      .map(
        (log) =>
          `"${log.time}","${log.user}","${log.action}","${log.visitor}","${log.location}","${log.status}"`
      )
      .join("\n");

    const blob = new Blob([header + rows], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "security-logs.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const successCount = logs.filter(
    (log) => log.status === "Success"
  ).length;

  const warningCount = logs.filter(
    (log) => log.status === "Warning"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-7">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Security Logs
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Monitor security events and system activity.
          </p>
        </div>

        <button
          onClick={exportLogs}
          className="bg-gray-900 text-white px-4 py-2.5 rounded-md text-xs font-medium hover:bg-gray-800"
        >
          ↓ Export Logs
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-5">

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] font-semibold text-gray-400">
            TOTAL EVENTS
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {logs.length}
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            Recorded today
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] font-semibold text-gray-400">
            SUCCESSFUL
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {successCount}
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            Normal activity
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] font-semibold text-gray-400">
            WARNINGS
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {warningCount}
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            Requires attention
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] font-semibold text-gray-400">
            SYSTEM STATUS
          </p>

          <p className="text-lg font-bold text-gray-900 mt-2">
            ● Online
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            All systems operational
          </p>
        </div>

      </div>

      {/* Logs */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Activity Log
            </h2>

            <p className="text-[9px] text-gray-400 mt-1">
              Latest security events.
            </p>
          </div>

          <div className="flex gap-2">

            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 px-3 py-2 text-[10px] border border-gray-200 rounded-md outline-none"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 text-[10px] border border-gray-200 rounded-md bg-white outline-none"
            >
              <option value="All">All Events</option>
              <option value="Success">Success</option>
              <option value="Warning">Warnings</option>
            </select>

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  TIME
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  USER
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  ACTION
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  VISITOR
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  LOCATION
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  STATUS
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredLogs.map((log) => (

                <tr
                  key={log.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >

                  <td className="px-5 py-4 text-[10px] text-gray-600">
                    {log.time}
                  </td>

                  <td className="px-5 py-4 text-[10px] text-gray-700 font-medium">
                    {log.user}
                  </td>

                  <td className="px-5 py-4 text-[10px] text-gray-600">
                    {log.action}
                  </td>

                  <td className="px-5 py-4 text-[10px] text-gray-600">
                    {log.visitor}
                  </td>

                  <td className="px-5 py-4 text-[10px] text-gray-600">
                    {log.location}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-2 py-1 rounded-full text-[8px] font-medium ${
                        log.status === "Success"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {log.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredLogs.length === 0 && (
            <div className="text-center py-10 text-xs text-gray-400">
              No security logs found.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default SecurityLogs;