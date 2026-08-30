import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-md flex items-center justify-center text-white font-bold">
            S
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900">
            SECURE-PASS
          </h1>

          <p className="text-xs text-gray-500 mt-2">
            Visitor & Security Management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-xs outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-xs outline-none focus:border-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-md text-xs font-medium hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;