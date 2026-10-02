import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Approvals from "./pages/Approvals";
import Hosts from "./pages/Hosts";

import SecurityLogs from "./pages/SecurityLogs";
import Reports from "./pages/Report";
import Settings from "./pages/Settings";
import PreRegistration from "./pages/PreRegistration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/hosts" element={<Hosts />} />
        <Route path="/security-logs" element={<SecurityLogs />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pre-registration" element={<PreRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;