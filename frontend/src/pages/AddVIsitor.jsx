import { useState } from "react";

function AddVisitor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    host: "",
    purpose: "",
    visitDate: "",
    visitTime: "",
    idType: "",
    idNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Visitor Data:", formData);

    alert("Visitor registered successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      host: "",
      purpose: "",
      visitDate: "",
      visitTime: "",
      idType: "",
      idNumber: "",
    });
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      host: "",
      purpose: "",
      visitDate: "",
      visitTime: "",
      idType: "",
      idNumber: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Add Visitor
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Register a new visitor in the system
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Visitor Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Visitor Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter visitor name"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
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
                placeholder="visitor@email.com"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
              />
            </div>

          </div>
        </div>

        {/* Visit Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Visit Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Host
              </label>

              <input
                type="text"
                name="host"
                value={formData.host}
                onChange={handleChange}
                placeholder="Enter host name"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
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
                placeholder="Meeting, Interview, Delivery..."
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
              />
            </div>

          </div>
        </div>

        {/* Identification */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Identification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Type
              </label>

              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
              >
                <option value="">Select ID type</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">
                  Driving License
                </option>
                <option value="Employee ID">
                  Employee ID
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Number
              </label>

              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="Enter ID number"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500"
              />
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={handleClear}
            className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Register Visitor
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddVisitor;