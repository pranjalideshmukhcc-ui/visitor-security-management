import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function PreRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    visitorName: "",
    email: "",
    phone: "",
    company: "",
    host: "",
    purpose: "",
    visitDate: "",
    visitTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Pre-registration submitted successfully!");

    setFormData({
      visitorName: "",
      email: "",
      phone: "",
      company: "",
      host: "",
      purpose: "",
      visitDate: "",
      visitTime: "",
    });

    navigate("/visitors");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              New Pre-Registration
            </h1>

            <p className="text-gray-500 mt-1">
              Register a visitor before their scheduled visit.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-5xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visitor Name
                  </label>

                  <input
                    type="text"
                    name="visitorName"
                    value={formData.visitorName}
                    onChange={handleChange}
                    required
                    placeholder="Enter visitor name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="visitor@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company / Organization
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Host / Employee
                  </label>

                  <input
                    type="text"
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    required
                    placeholder="Host employee name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Visit
                  </label>

                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    placeholder="Meeting, interview, delivery..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visit Date
                  </label>

                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visit Time
                  </label>

                  <input
                    type="time"
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Submit Pre-Registration
                </button>

              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PreRegistration;