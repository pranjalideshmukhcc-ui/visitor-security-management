import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import VisitorTable from "../components/VisitorTable";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Real-time monitoring of campus visitors and security logs.
              </p>
            </div>

            <button
              onClick={() => navigate("/pre-registration")}
              className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-semibold hover:bg-gray-800"
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