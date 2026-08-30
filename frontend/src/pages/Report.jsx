import { useState } from "react";

function Reports() {
  const [reportType, setReportType] = useState("Visitor Activity");
  const [period, setPeriod] = useState("Today");
  const [generated, setGenerated] = useState(false);

  const visitors = [
    {
      name: "Rahul Sharma",
      host: "Dr. Amit Patel",
      purpose: "Meeting",
      time: "09:15 AM",
      status: "Checked In",
    },
    {
      name: "Priya Mehta",
      host: "Prof. Neha Shah",
      purpose: "Interview",
      time: "10:30 AM",
      status: "Checked In",
    },
    {
      name: "Arjun Verma",
      host: "Mr. Raj Malhotra",
      purpose: "Delivery",
      time: "11:05 AM",
      status: "Checked Out",
    },
    {
      name: "Sneha Joshi",
      host: "Dr. Kavita Rao",
      purpose: "Meeting",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      name: "Aman Gupta",
      host: "Admin Office",
      purpose: "Document Submission",
      time: "12:00 PM",
      status: "Checked In",
    },
  ];

  const generateReport = () => {
    setGenerated(true);

    setTimeout(() => {
      setGenerated(false);
    }, 3000);
  };

  const exportReport = () => {
    const csv =
      "Visitor Name,Host,Purpose,Check-in Time,Status\n" +
      visitors
        .map(
          (visitor) =>
            `"${visitor.name}","${visitor.host}","${visitor.purpose}","${visitor.time}","${visitor.status}"`
        )
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "visitor-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-7">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reports
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Generate and export visitor activity reports.
          </p>
        </div>

        <button
          onClick={exportReport}
          className="bg-gray-900 text-white px-4 py-2.5 rounded-md text-xs font-medium hover:bg-gray-800"
        >
          ↓ Export Report
        </button>

      </div>

      {/* Generate Report */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5">

        <h2 className="text-sm font-semibold text-gray-900">
          Generate Report
        </h2>

        <p className="text-[9px] text-gray-400 mt-1">
          Select report type and time period.
        </p>

        <div className="flex items-end gap-4 mt-5">

          <div className="flex-1">
            <label className="block text-[9px] font-semibold text-gray-500 mb-2">
              REPORT TYPE
            </label>

            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-md bg-white outline-none"
            >
              <option>Visitor Activity</option>
              <option>Security Activity</option>
              <option>Check-in / Check-out</option>
              <option>Pending Visitors</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-[9px] font-semibold text-gray-500 mb-2">
              TIME PERIOD
            </label>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-md bg-white outline-none"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <button
            onClick={generateReport}
            className="h-9 px-5 bg-gray-900 text-white rounded-md text-[10px] font-medium hover:bg-gray-800"
          >
            Generate Report
          </button>

        </div>

        {generated && (
          <div className="mt-4 px-3 py-2 bg-green-50 text-green-700 rounded-md text-[10px]">
            ✓ Report generated successfully.
          </div>
        )}

      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-5">

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] font-semibold text-gray-400">
            TOTAL VISITORS
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {visitors.length}
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            Registered visitors
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] font-semibold text-gray-400">
            CHECKED IN
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {
              visitors.filter(
                (visitor) => visitor.status === "Checked In"
              ).length
            }
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            Currently inside
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] font-semibold text-gray-400">
            CHECKED OUT
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {
              visitors.filter(
                (visitor) => visitor.status === "Checked Out"
              ).length
            }
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            Completed visits
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] font-semibold text-gray-400">
            PENDING
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {
              visitors.filter(
                (visitor) => visitor.status === "Pending"
              ).length
            }
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            Awaiting approval
          </p>
        </div>

      </div>

      {/* Report Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Visitor Activity Report
            </h2>

            <p className="text-[9px] text-gray-400 mt-1">
              {reportType} · {period}
            </p>
          </div>

          <button
            onClick={exportReport}
            className="border border-gray-200 px-3 py-2 rounded-md text-[9px] text-gray-600 hover:bg-gray-50"
          >
            Export CSV
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  VISITOR NAME
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  HOST
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  PURPOSE
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  CHECK-IN
                </th>

                <th className="px-5 py-3 text-left text-[9px] font-semibold text-gray-400">
                  STATUS
                </th>

              </tr>
            </thead>

            <tbody>

              {visitors.map((visitor, index) => (

                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-semibold text-gray-600">
                        {visitor.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .substring(0, 2)}
                      </div>

                      <span className="text-[10px] font-medium text-gray-800">
                        {visitor.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-[10px] text-gray-600">
                    {visitor.host}
                  </td>

                  <td className="px-5 py-4 text-[10px] text-gray-600">
                    {visitor.purpose}
                  </td>

                  <td className="px-5 py-4 text-[10px] text-gray-600">
                    {visitor.time}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-2 py-1 rounded-full text-[8px] font-medium ${
                        visitor.status === "Checked In"
                          ? "bg-green-50 text-green-700"
                          : visitor.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {visitor.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;