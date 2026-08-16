import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(
      "Login form is working. Authentication will be connected to the backend soon."
    );

    console.log("Login submitted");
    console.log("Remember me:", rememberMe);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-white to-[#E0E7FF] flex items-center justify-center px-4 py-10">

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-indigo-100 px-8 py-9">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="relative w-20 h-20 flex items-center justify-center">

            {/* Orbit */}
            <div className="absolute w-20 h-9 border-4 border-blue-600 rounded-full rotate-[-25deg]" />

            {/* Shield */}
            <div className="relative w-14 h-16 bg-gradient-to-br from-[#172554] to-[#2563EB] flex items-center justify-center clip-shield shadow-lg">
              <span className="text-white text-2xl font-bold">
                S
              </span>

              {/* Lock */}
              <div className="absolute bottom-3 w-3 h-3 bg-white rounded-sm">
                <div className="absolute -top-2 left-[2px] w-2 h-2 border-2 border-white rounded-t-full" />
              </div>
            </div>

          </div>
        </div>

        {/* Brand */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold tracking-tight text-[#172554]">
            Secure<span className="text-[#2563EB]">Gate</span>{" "}
            <span className="text-[#172554]">VMS</span>
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Visitor & Security Management System
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-indigo-100" />

            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <div className="w-2 h-2 rounded-full bg-blue-300" />

            <div className="h-px w-16 bg-indigo-100" />
          </div>

        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#172554] mb-2"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="admin@securegate.com"
              required
              className="w-full h-11 px-4 border border-indigo-100 rounded-lg
              bg-indigo-50/30 text-slate-700
              outline-none transition
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Password */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#172554]"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-indigo-600 hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <div className="relative">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                required
                className="w-full h-11 px-4 pr-12
                border border-indigo-100 rounded-lg
                bg-indigo-50/30 text-slate-700
                outline-none transition
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* Show / Hide Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                text-slate-400 hover:text-blue-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "◉" : "◌"}
              </button>

            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">

            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />

            <label
              htmlFor="rememberMe"
              className="text-xs text-slate-500 cursor-pointer"
            >
              Keep me signed in on this station
            </label>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12
            bg-gradient-to-r from-[#2563EB] to-[#6366F1]
            hover:from-[#1D4ED8] hover:to-[#4F46E5]
            text-white text-sm font-semibold
            rounded-lg
            shadow-lg shadow-blue-200
            transition-all duration-200
            hover:shadow-xl hover:-translate-y-0.5"
          >
            Sign In to System →
          </button>

          {/* Temporary message */}
          {message && (
            <div className="text-center text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              {message}
            </div>
          )}

        </form>

        {/* Footer */}
        <div className="mt-7 pt-5 border-t border-indigo-100">

          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-[10px] text-blue-600">✓</span>
            </div>

            <span className="text-[10px] font-medium text-slate-400">
              Secure Access
            </span>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Authorized personnel only. Sessions are audited.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;