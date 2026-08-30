import { useState } from "react";

function Approvals() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      visitor: "Sneha Joshi",
      host: "Dr. Kavita Rao",
      purpose: "Meeting",
      status: "Pending",
    },
    {
      id: 2,
      visitor: "Rohan Mehta",
      host: "Prof. Neha Shah",
      purpose: "Interview",
      status: "Pending",
    },
    {
      id: 3,
      visitor: "Karan Singh",
      host: "Admin Office",
      purpose: "Document Submission",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? { ...request, status }
          : request
      )
    );
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