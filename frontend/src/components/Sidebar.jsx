import { useNavigate, useLocation } from "react-router-dom";


function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navClass = (path) =>
  `w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left ${
    isActive(path)
      ? "bg-indigo-50 text-blue-700 font-semibold"
      : "text-slate-600 hover:bg-indigo-50 hover:text-blue-700"
  }`;

  return (
   <aside className="w-64 min-h-screen bg-white border-r border-indigo-100 flex-shrink-0">
      <div className="h-16 px-6 flex items-center border-b border-indigo-100">
       <div className="w-8 h-8 mr-3 flex items-center justify-center">
 <img
  src="/visitra-logo.jpg"
  alt="VISITRA"
  className="w-8 h-8 object-contain"
/>
</div>

<span className="font-bold text-sm tracking-wide text-[#172554]">
  VISITRA
</span>
      </div>

      <div className="px-4 py-6">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Navigation
        </p>

        <nav className="space-y-1">
          <button
            onClick={() => navigate("/dashboard")}
            className={navClass("/dashboard")}
          >
            <span>▣</span>
            Dashboard
          </button>

          <button
            onClick={() => navigate("/visitors")}
            className={navClass("/visitors")}
          >
            <span>♙</span>
            Visitors
          </button>

          <button
            onClick={() => navigate("/security-logs")}
            className={navClass("/security-logs")}
          >
            <span>⊗</span>
            Security Logs
          </button>

          <button
            onClick={() => navigate("/reports")}
            className={navClass("/reports")}
          >
            <span>▤</span>
            Reports
          </button>

          <button
            onClick={() => navigate("/settings")}
            className={navClass("/settings")}
          >
            <span>⚙</span>
            System Settings
          </button>
        </nav>

        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-9 mb-3">
          Quick Actions
        </p>

        <nav className="space-y-1">
          <button
            onClick={() => navigate("/pre-registration")}
            className={navClass("/pre-registration")}
          >
            <span>⊕</span>
            New Pre-Registration
          </button>

          <button
            onClick={() => navigate("/pre-registration")}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-md text-sm text-left"
          >
            <span>♙</span>
            Issue Temp Pass
          </button>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;