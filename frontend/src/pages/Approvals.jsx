import { useEffect, useState } from "react";
import axios from "axios";

function Approvals() {
 const [requests, setRequests] = useState([]);
 
 useEffect(() => {
  const fetchApprovals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/approvals"
      );

      const approvalRequests = response.data.data.map((visitor) => ({
        id: visitor._id,
        visitor: visitor.name,
        host: visitor.hostName,
        purpose: visitor.purpose,
        status: "Pending",
      }));

      setRequests(approvalRequests);
    } catch (error) {
      console.error("Error fetching approvals:", error);
    }
  };

  fetchApprovals();
}, []);

  const updateStatus = async (id, status) => {
  try {
    const endpoint = status === "Approved" ? "approve" : "reject";

    const response = await axios.put(
      `http://localhost:5000/api/approvals/${id}/${endpoint}`
    );

    const updatedVisitor = response.data.data;

    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status:
                updatedVisitor.status === "approved"
                  ? "Approved"
                  : "Rejected",
            }
          : request
      )
    );
  } catch (error) {
    console.error("Error updating approval:", error);
    alert("Failed to update visitor approval.");
  }
};

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Visitor Approvals
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Review and approve visitor requests.
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  {request.visitor}
                </h2>

                <p className="text-xs text-gray-500 mt-2">
                  Host: {request.host}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Purpose: {request.purpose}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {request.status === "Pending" ? (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(request.id, "Approved")
                      }
                      className="px-4 py-2 bg-gray-900 text-white rounded-md text-xs"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(request.id, "Rejected")
                      }
                      className="px-4 py-2 border border-gray-200 rounded-md text-xs"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px]">
                    {request.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Approvals;