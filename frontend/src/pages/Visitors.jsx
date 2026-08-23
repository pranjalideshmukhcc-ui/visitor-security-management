import {
  LayoutDashboard,
  Users,
  UserCog,
  Plus,
  Search,
  Filter,
  X,
  Eye,
  LogIn,
  LogOut,
  Check,
  CircleX,
} from "lucide-react";
import { useState } from "react";

function Visitors() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@example.com",
      purpose: "Meeting",
      host: "Amit Patil",
      dateTime: "23 Aug 2026, 10:30 AM",
      checkIn: "10:30 AM",
      checkOut: "-",
      status: "Checked In",
    },
    {
      id: 2,
      name: "Sneha Joshi",
      phone: "9876543211",
      email: "sneha@example.com",
      purpose: "Interview",
      host: "Priya Deshmukh",
      dateTime: "23 Aug 2026, 11:15 AM",
      checkIn: "-",
      checkOut: "-",
      status: "Pending",
    },
    {
      id: 3,
      name: "Akash Kulkarni",
      phone: "9876543212",
      email: "akash@example.com",
      purpose: "Delivery",
      host: "Office Admin",
      dateTime: "23 Aug 2026, 12:00 PM",
      checkIn: "12:00 PM",
      checkOut: "01:30 PM",
      status: "Checked Out",
    },
    {
      id: 4,
      name: "Neha Patil",
      phone: "9876543213",
      email: "neha@example.com",
      purpose: "Official Work",
      host: "HR Department",
      dateTime: "23 Aug 2026, 02:00 PM",
      checkIn: "-",
      checkOut: "-",
      status: "Rejected",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    host: "",
    dateTime: "",
  });

  /* ---------------- FILTERING ---------------- */

  const filteredVisitors = visitors.filter((visitor) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      visitor.name.toLowerCase().includes(searchValue) ||
      visitor.phone.toLowerCase().includes(searchValue) ||
      visitor.purpose.toLowerCase().includes(searchValue) ||
      visitor.host.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || visitor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ---------------- FORM ---------------- */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVisitor = (e) => {
    e.preventDefault();

    const formattedDateTime = formData.dateTime
      ? new Date(formData.dateTime).toLocaleString([], {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

    const newVisitor = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email || "Not provided",
      purpose: formData.purpose,
      host: formData.host,
      dateTime: formattedDateTime,
      checkIn: "-",
      checkOut: "-",
      status: "Pending",
    };

    setVisitors((currentVisitors) => [
      ...currentVisitors,
      newVisitor,
    ]);

    setFormData({
      name: "",
      phone: "",
      email: "",
      purpose: "",
      host: "",
      dateTime: "",
    });

    setShowAddModal(false);
  };

  /* ---------------- TIME ---------------- */

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ---------------- APPROVAL ---------------- */

  const handleApprove = (id) => {
    setVisitors((currentVisitors) =>
      currentVisitors.map((visitor) =>
        visitor.id === id
          ? {
              ...visitor,
              status: "Approved",
            }
          : visitor
      )
    );

    setSelectedVisitor(null);
  };

  const handleReject = (id) => {
    setVisitors((currentVisitors) =>
      currentVisitors.map((visitor) =>
        visitor.id === id
          ? {
              ...visitor,
              status: "Rejected",
            }
          : visitor
      )
    );

    setSelectedVisitor(null);
  };

  /* ---------------- CHECK IN ---------------- */

  const handleCheckIn = (id) => {
    setVisitors((currentVisitors) =>
      currentVisitors.map((visitor) =>
        visitor.id === id
          ? {
              ...visitor,
              checkIn: getCurrentTime(),
              status: "Checked In",
            }
          : visitor
      )
    );

    setSelectedVisitor(null);
  };

  /* ---------------- CHECK OUT ---------------- */

  const handleCheckOut = (id) => {
    setVisitors((currentVisitors) =>
      currentVisitors.map((visitor) =>
        visitor.id === id
          ? {
              ...visitor,
              checkOut: getCurrentTime(),
              status: "Checked Out",
            }
          : visitor
      )
    );

    setSelectedVisitor(null);
  };

  /* ---------------- STATUS STYLE ---------------- */

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700";

      case "Approved":
        return "bg-blue-50 text-blue-700";

      case "Checked In":
        return "bg-green-50 text-green-700";

      case "Checked Out":
        return "bg-slate-100 text-slate-700";

      case "Rejected":
        return "bg-red-50 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-6">

        <div className="mb-10">
          <h1 className="text-xl font-bold text-slate-800">
            Visitor Security
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            Management System
          </p>
        </div>

        <nav className="space-y-2">

          {/* Visitors */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
            <Users size={20} />
            Visitors
          </div>

          {/* Dashboard */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition">
            <LayoutDashboard size={20} />
            Dashboard
          </div>

          {/* User Management */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition">
            <UserCog size={20} />
            User Management
          </div>

        </nav>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="flex-1 p-6 md:p-8">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Visitors
            </h2>

            <p className="text-slate-500 mt-1">
              Manage and monitor visitors
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Plus size={18} />
            Add Visitor
          </button>

        </div>

        {/* =====================================================
            SEARCH + FILTER
        ====================================================== */}

        <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-8">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name, phone, purpose or host..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

          </div>

          {/* FILTER */}

          <div className="relative">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full sm:w-48 pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Checked In">Checked In</option>
              <option value="Checked Out">Checked Out</option>
              <option value="Rejected">Rejected</option>
            </select>

            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

          </div>

        </div>

        {/* =====================================================
            TABLE
        ====================================================== */}

        <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="bg-slate-50 border-b border-slate-200">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Purpose
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Host
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Check-in
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Check-out
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredVisitors.map((visitor) => (

                  <tr
                    key={visitor.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-4">

                      <div>
                        <p className="font-medium text-slate-800">
                          {visitor.name}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {visitor.phone}
                        </p>
                      </div>

                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {visitor.purpose}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {visitor.host}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {visitor.checkIn}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {visitor.checkOut}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          visitor.status
                        )}`}
                      >
                        {visitor.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        {/* VIEW */}

                        <button
                          onClick={() => setSelectedVisitor(visitor)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        {/* CHECK IN */}

                        {(visitor.status === "Pending" ||
                          visitor.status === "Approved") && (

                          <button
                            onClick={() => handleCheckIn(visitor.id)}
                            className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            <LogIn size={15} />
                            Check In
                          </button>

                        )}

                        {/* CHECK OUT */}

                        {visitor.status === "Checked In" && (

                          <button
                            onClick={() => handleCheckOut(visitor.id)}
                            className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium"
                          >
                            <LogOut size={15} />
                            Check Out
                          </button>

                        )}

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* EMPTY STATE */}

          {filteredVisitors.length === 0 && (

            <div className="text-center py-12">

              <Users
                size={40}
                className="mx-auto text-slate-300 mb-3"
              />

              <p className="text-slate-500">
                No visitors found.
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

      </main>

      {/* =====================================================
          ADD VISITOR MODAL
      ====================================================== */}

      {showAddModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

              <div>

                <h3 className="text-xl font-bold text-slate-800">
                  Add Visitor
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Enter visitor details
                </p>

              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={22} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleAddVisitor}
              className="p-6 space-y-4"
            >

              {/* NAME */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Visitor Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter visitor name"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email (optional)"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* PURPOSE */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Purpose
                </label>

                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Meeting, Interview, Delivery"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* HOST */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Host
                </label>

                <input
                  type="text"
                  name="host"
                  value={formData.host}
                  onChange={handleChange}
                  required
                  placeholder="Enter host name"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* DATE & TIME */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date & Time
                </label>

                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Visitor
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          VISITOR DETAILS MODAL
      ====================================================== */}

      {selectedVisitor && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-md rounded-xl shadow-xl">

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

              <div>

                <h3 className="text-xl font-bold text-slate-800">
                  Visitor Details
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Complete visitor information
                </p>

              </div>

              <button
                onClick={() => setSelectedVisitor(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={22} />
              </button>

            </div>

            {/* DETAILS */}

            <div className="p-6 space-y-4">

              <div>
                <p className="text-sm text-slate-500">
                  Visitor Name
                </p>

                <p className="font-medium text-slate-800">
                  {selectedVisitor.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Phone Number
                </p>

                <p className="font-medium text-slate-800">
                  {selectedVisitor.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-medium text-slate-800">
                  {selectedVisitor.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Purpose
                </p>

                <p className="font-medium text-slate-800">
                  {selectedVisitor.purpose}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Host
                </p>

                <p className="font-medium text-slate-800">
                  {selectedVisitor.host}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Date & Time
                </p>

                <p className="font-medium text-slate-800">
                  {selectedVisitor.dateTime}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-sm text-slate-500">
                    Check-in
                  </p>

                  <p className="font-medium text-slate-800">
                    {selectedVisitor.checkIn}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Check-out
                  </p>

                  <p className="font-medium text-slate-800">
                    {selectedVisitor.checkOut}
                  </p>
                </div>

              </div>

              {/* STATUS */}

              <div>

                <p className="text-sm text-slate-500">
                  Status
                </p>

                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    selectedVisitor.status
                  )}`}
                >
                  {selectedVisitor.status}
                </span>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-2 pt-3">

                {/* APPROVE */}

                {selectedVisitor.status === "Pending" && (

                  <button
                    onClick={() => handleApprove(selectedVisitor.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    <Check size={16} />
                    Approve
                  </button>

                )}

                {/* REJECT */}

                {selectedVisitor.status === "Pending" && (

                  <button
                    onClick={() => handleReject(selectedVisitor.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
                  >
                    <CircleX size={16} />
                    Reject
                  </button>

                )}

                {/* CHECK IN */}

                {(selectedVisitor.status === "Pending" ||
                  selectedVisitor.status === "Approved") && (

                  <button
                    onClick={() =>
                      handleCheckIn(selectedVisitor.id)
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    <LogIn size={16} />
                    Check In
                  </button>

                )}

                {/* CHECK OUT */}

                {selectedVisitor.status === "Checked In" && (

                  <button
                    onClick={() =>
                      handleCheckOut(selectedVisitor.id)
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium"
                  >
                    <LogOut size={16} />
                    Check Out
                  </button>

                )}

                {/* CLOSE */}

                <button
                  onClick={() => setSelectedVisitor(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Visitors;