import { useEffect, useState } from "react";
import axios from "axios";

function Hosts() {
  const [hosts, setHosts] = useState([]);
  useEffect(() => {
  const fetchHosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/hosts`);
      setHosts(response.data);
    } catch (error) {
      console.error("Failed to fetch hosts:", error);
    }
  };

  fetchHosts();
}, []);

  const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  department: "",
  status: "Active",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
     `${import.meta.env.VITE_API_URL}/api/hosts`,
      formData
    );

    setHosts((prevHosts) => [...prevHosts, response.data]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      status: "Active",
    });

    setShowForm(false);
  } catch (error) {
    console.error("Failed to add host:", error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hosts
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage hosts and employees who receive visitors
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition"
        >
          {showForm ? "Close Form" : "+ Add Host"}
        </button>
      </div>

      {/* Add Host Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Add New Host
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
                />
              </div>

             

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="host@company.com"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Engineering"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Add Host
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Hosts Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">
            Registered Hosts
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {hosts.length} hosts registered
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>

                <th className="text-left px-5 py-3 text-sm font-medium text-gray-600">
                  Name
                </th>

               
                <th className="text-left px-5 py-3 text-sm font-medium text-gray-600">
                  Department
                </th>

                <th className="text-left px-5 py-3 text-sm font-medium text-gray-600">
                  Email
                </th>

                <th className="text-left px-5 py-3 text-sm font-medium text-gray-600">
                  Phone
                </th>

                <th className="text-left px-5 py-3 text-sm font-medium text-gray-600">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {hosts.map((host) => (
                <tr
                  key={host.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >

                  <td className="px-5 py-4 font-medium text-gray-900">
                    {host.name}
                  </td>

                 

                  <td className="px-5 py-4 text-gray-600">
                    {host.department}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {host.email}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {host.phone}
                  </td>

                  <td className="px-5 py-4">

                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {host.status}
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

export default Hosts;