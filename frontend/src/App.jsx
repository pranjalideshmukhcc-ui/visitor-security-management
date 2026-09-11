import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Approvals from "./pages/Approvals";
import Hosts from "./pages/Hosts";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;