import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoApproval, setAutoApproval] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          System Settings
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage system preferences and security settings.
        </p>
      </div>

      <div className="max-w-3xl space-y-5">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">
            General Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Organization Name
              </label>

              <input
                defaultValue="Secure-Pass Campus"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Visitor Pass Validity
              </label>

              <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs bg-white">
                <option>1 Day</option>
                <option>7 Days</option>
                <option>30 Days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">
            Notifications
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium">
                Visitor Notifications
              </p>

              <p className="text-[10px] text-gray-400 mt-1">
                Receive notifications for visitor activity.
              </p>
            </div>

            <button
              onClick={() =>
                setNotifications(!notifications)
              }
              className={`w-11 h-6 rounded-full p-1 ${
                notifications
                  ? "bg-gray-900"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  notifications
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">
            Approval Settings
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium">
                Automatic Approval
              </p>

              <p className="text-[10px] text-gray-400 mt-1">
                Automatically approve trusted visitor requests.
              </p>
            </div>

            <button
              onClick={() =>
                setAutoApproval(!autoApproval)
              }
              className={`w-11 h-6 rounded-full p-1 ${
                autoApproval
                  ? "bg-gray-900"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  autoApproval
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-gray-900 text-white px-5 py-2.5 rounded-md text-xs"
          >
            Save Settings
          </button>

          {saved && (
            <span className="text-xs text-green-600">
              Settings saved successfully.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;