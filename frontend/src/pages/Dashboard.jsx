import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import VisitorTable from "../components/VisitorTable";

function Dashboard() {
  const navigate = useNavigate();

  return (
   <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
             <h1 className="text-2xl font-bold text-[#0F2A5F]">
                Dashboard Overview
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Real-time monitoring of campus visitors and security logs.
              </p>
            </div>

            <button
              onClick={() => navigate("/pre-registration")}
             className="bg-gradient-to-r from-[#2563EB] to-[#6366F1] text-white px-5 py-3 rounded-md text-sm font-semibold shadow-md shadow-blue-200 hover:from-[#1D4ED8] hover:to-[#4F46E5] transition-all"
            >
              + Register New Visitor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <StatCard
              title="Total Visitors Today"
              value="148"
              subtitle="+12% from yesterday"
              icon="♙"
            />

            <StatCard
              title="Checked In"
              value="84"
              subtitle="Currently on-site"
              icon="→"
            />

            <StatCard
              title="Checked Out"
              value="52"
              subtitle="Completed visits"
              icon="✓"
            />

            <StatCard
              title="Pending Approvals"
              value="12"
              subtitle="Awaiting host confirmation"
              icon="!"
            />
          </div>

          <VisitorTable />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;