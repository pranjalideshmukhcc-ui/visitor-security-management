import { useState } from "react";
function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");

  const [visitors, setVisitors] = useState([
    {
      name: "Sarang Mahajan",
      company: "Tech Solutions",
      host: "Admin",
      purpose: "Meeting",
      checkIn: "09:15 AM",
      checkOut: "-",
      status: "Checked In",
    },
    {
      name: "Smith Wagh",
      company: "Wagh Enterprises",
      host: "HR Department",
      purpose: "Interview",
      checkIn: "10:05 AM",
      checkOut: "-",
      status: "Checked In",
    },
    {
      name: "Eera Sabnis",
      company: "Sabnis Technologies",
      host: "IT Department",
      purpose: "Project Discussion",
      checkIn: "10:45 AM",
      checkOut: "12:15 PM",
      status: "Checked Out",
    },
    {
      name: "Maya Desmukh",
      company: "Desmukh Industries",
      host: "Manager",
      purpose: "Business Meeting",
      checkIn: "11:20 AM",
      checkOut: "-",
      status: "Checked In",
    },
    {
      name: "Ramish Pandit",
      company: "Pandit Associates",
      host: "Finance",
      purpose: "Document Submission",
      checkIn: "12:00 PM",
      checkOut: "-",
      status: "Checked In",
    },
  ]);

  const navItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Hosts", icon: "👤" },
    { name: "Visitors", icon: "👥" },
    { name: "Security Logs", icon: "▤" },
    { name: "Reports", icon: "▥" },
    { name: "Add Visitor", icon: "＋" },
    { name: "Settings", icon: "⚙" },
  ];

  const goTo = (page) => {
    setActivePage(page);
    setSearch("");
  };

  const checkOut = (index) => {
    setVisitors((current) =>
      current.map((visitor, i) =>
        i === index
          ? {
              ...visitor,
              checkOut: "Now",
              status: "Checked Out",
            }
          : visitor
      )
    );
  };

  const filteredVisitors = visitors.filter((visitor) => {
    const text = search.toLowerCase();

    return (
      visitor.name.toLowerCase().includes(text) ||
      visitor.company.toLowerCase().includes(text) ||
      visitor.host.toLowerCase().includes(text) ||
      visitor.purpose.toLowerCase().includes(text)
    );
  });

  const totalVisitors = visitors.length;
  const checkedIn = visitors.filter(
    (visitor) => visitor.status === "Checked In"
  ).length;
  const checkedOut = visitors.filter(
    (visitor) => visitor.status === "Checked Out"
  ).length;

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <img
            src="/visitra-logo.png"
            alt="VISITRA Logo"
            style={styles.logoImage}
          />
          <span style={styles.logoText}>VISITRA</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => goTo(item.name)}
              style={{
                ...styles.navItem,
                ...(activePage === item.name
                  ? styles.navItemActive
                  : {}),
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div style={styles.sidebarBottom}>
          <div style={styles.securityCard}>
            <div style={styles.securityIcon}>✓</div>
            <div>
              <div style={styles.securityTitle}>System Secure</div>
              <div style={styles.securityText}>All systems operational</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {/* TOPBAR */}
        <header style={styles.topbar}>
          <div>
            <h2 style={styles.pageTitle}>{activePage}</h2>
            <p style={styles.pageSubtitle}>
              Visitor & Security Management System
            </p>
          </div>

          <div style={styles.topbarRight}>
            <div style={styles.searchBox}>
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search visitors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.notification}>♢</div>

            <div style={styles.profile}>
              <div style={styles.profileAvatar}>A</div>
              <div>
                <div style={styles.profileName}>Admin</div>
                <div style={styles.profileRole}>Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div style={styles.content}>
          {activePage === "Dashboard" && (
            <Dashboard
              visitors={visitors}
              totalVisitors={totalVisitors}
              checkedIn={checkedIn}
              checkedOut={checkedOut}
              goTo={goTo}
            />
          )}

          {activePage === "Hosts" && <Hosts />}

          {activePage === "Visitors" && (
            <VisitorsPage
              visitors={filteredVisitors}
              allVisitors={visitors}
              search={search}
              checkOut={checkOut}
              goTo={goTo}
            />
          )}

          {activePage === "Security Logs" && (
            <SecurityLogs visitors={visitors} />
          )}

          {activePage === "Reports" && (
            <Reports visitors={visitors} />
          )}

          {activePage === "Add Visitor" && (
            <PreRegistration />
          )}

          {activePage === "Settings" && <Settings />}
        </div>
      </main>
    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({
  visitors,
  totalVisitors,
  checkedIn,
  checkedOut,
  goTo,
}) {
  return (
    <div>
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.heading}>Dashboard Overview</h1>
          <p style={styles.description}>
            Monitor visitors and security activity in real time.
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={() => goTo("Add Visitor")}
        >
          + Add Visitor
        </button>
      </div>

      <div style={styles.statsGrid}>
        <StatCard
          title="Total Visitors"
          value={totalVisitors}
          icon="👥"
          description="Today's visitors"
        />

        <StatCard
          title="Currently Inside"
          value={checkedIn}
          icon="✓"
          description="Visitors checked in"
        />

        <StatCard
          title="Checked Out"
          value={checkedOut}
          icon="↗"
          description="Visitors completed"
        />

        <StatCard
          title="Security Status"
          value="Secure"
          icon="◉"
          description="All systems operational"
        />
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.cardTitle}>Recent Visitors Log</h3>
            <p style={styles.cardSubtitle}>
              Latest visitor activity
            </p>
          </div>

          <button
            style={styles.secondaryButton}
            onClick={() => goTo("Visitors")}
          >
            View All
          </button>
        </div>

        <VisitorTable
          visitors={visitors}
          showAction={false}
        />
      </div>
    </div>
  );
}

/* =========================
   VISITORS
========================= */

function VisitorsPage({
  visitors,
  allVisitors,
  search,
  checkOut,
}) {
  const getOriginalIndex = (visitor) => {
    return allVisitors.findIndex(
      (item) =>
        item.name === visitor.name &&
        item.company === visitor.company &&
        item.checkIn === visitor.checkIn
    );
  };

  return (
    <div>
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.heading}>Visitors</h1>
          <p style={styles.description}>
            Manage all visitor check-in and check-out records.
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={() => alert("Visitor registration form coming soon.")}
        >
          + Add Visitor
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.cardTitle}>Visitor Records</h3>
            <p style={styles.cardSubtitle}>
              {search
                ? `Showing results for "${search}"`
                : "All registered visitors"}
            </p>
          </div>

          <div style={styles.recordCount}>
            {visitors.length} Records
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Visitor</th>
              <th style={styles.th}>Company</th>
              <th style={styles.th}>Host</th>
              <th style={styles.th}>Purpose</th>
              <th style={styles.th}>Check In</th>
              <th style={styles.th}>Check Out</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((visitor, index) => {
              const originalIndex = getOriginalIndex(visitor);

              return (
                <tr key={`${visitor.name}-${index}`}>
                  <td style={styles.td}>
                    <div style={styles.visitorCell}>
                      <div style={styles.avatar}>
                        {visitor.name.charAt(0)}
                      </div>
                      <strong>{visitor.name}</strong>
                    </div>
                  </td>

                  <td style={styles.td}>{visitor.company}</td>
                  <td style={styles.td}>{visitor.host}</td>
                  <td style={styles.td}>{visitor.purpose}</td>
                  <td style={styles.td}>{visitor.checkIn}</td>
                  <td style={styles.td}>{visitor.checkOut}</td>

                  <td style={styles.td}>
                    <StatusBadge status={visitor.status} />
                  </td>

                  <td style={styles.td}>
                    {visitor.status === "Checked In" ? (
                      <button
                        style={styles.checkoutButton}
                        onClick={() => checkOut(originalIndex)}
                      >
                        Check Out
                      </button>
                    ) : (
                      <span style={styles.completedText}>
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visitors.length === 0 && (
          <div style={styles.emptyState}>
            No visitors found.
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   VISITOR TABLE
========================= */

function VisitorTable({ visitors, showAction = false }) {
  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Visitor</th>
            <th style={styles.th}>Company</th>
            <th style={styles.th}>Host</th>
            <th style={styles.th}>Purpose</th>
            <th style={styles.th}>Check In</th>
            <th style={styles.th}>Check Out</th>
            <th style={styles.th}>Status</th>
            {showAction && <th style={styles.th}>Action</th>}
          </tr>
        </thead>

        <tbody>
          {visitors.map((visitor, index) => (
            <tr key={`${visitor.name}-${index}`}>
              <td style={styles.td}>
                <div style={styles.visitorCell}>
                  <div style={styles.avatar}>
                    {visitor.name.charAt(0)}
                  </div>
                  <strong>{visitor.name}</strong>
                </div>
              </td>

              <td style={styles.td}>{visitor.company}</td>
              <td style={styles.td}>{visitor.host}</td>
              <td style={styles.td}>{visitor.purpose}</td>
              <td style={styles.td}>{visitor.checkIn}</td>
              <td style={styles.td}>{visitor.checkOut}</td>

              <td style={styles.td}>
                <StatusBadge status={visitor.status} />
              </td>

              {showAction && (
                <td style={styles.td}>
                  <button style={styles.checkoutButton}>
                    Check Out
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================
   SECURITY LOGS
========================= */

function SecurityLogs({ visitors }) {
  return (
    <div>
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.heading}>Security Logs</h1>
          <p style={styles.description}>
            Monitor visitor security and access activity.
          </p>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.cardTitle}>Access Activity</h3>
            <p style={styles.cardSubtitle}>
              Recent security events
            </p>
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Visitor</th>
              <th style={styles.th}>Event</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index}>
                <td style={styles.td}>{visitor.name}</td>
                <td style={styles.td}>
                  {visitor.status === "Checked In"
                    ? "Visitor Check-In"
                    : "Visitor Check-Out"}
                </td>
                <td style={styles.td}>
                  {visitor.status === "Checked In"
                    ? visitor.checkIn
                    : visitor.checkOut}
                </td>
                <td style={styles.td}>
                  <StatusBadge status="Secure" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================
   REPORTS
========================= */

function Reports({ visitors }) {
  const checkedIn = visitors.filter(
    (visitor) => visitor.status === "Checked In"
  ).length;

  const checkedOut = visitors.filter(
    (visitor) => visitor.status === "Checked Out"
  ).length;

  const downloadReport = () => {
    const csv = [
      "Name,Company,Host,Purpose,Check In,Check Out,Status",
      ...visitors.map(
        (visitor) =>
          `"${visitor.name}","${visitor.company}","${visitor.host}","${visitor.purpose}","${visitor.checkIn}","${visitor.checkOut}","${visitor.status}"`
      ),
    ].join("\n");

    downloadFile(csv, "visitra-visitor-report.csv", "text/csv");
  };

  return (
    <div>
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.heading}>Reports</h1>
          <p style={styles.description}>
            View and export visitor activity reports.
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={downloadReport}
        >
          ↓ Export Report
        </button>
      </div>

      <div style={styles.statsGrid}>
        <StatCard
          title="Total Records"
          value={visitors.length}
          icon="▤"
          description="Visitor records"
        />

        <StatCard
          title="Checked In"
          value={checkedIn}
          icon="✓"
          description="Currently active"
        />

        <StatCard
          title="Checked Out"
          value={checkedOut}
          icon="↗"
          description="Completed visits"
        />

        <StatCard
          title="System Status"
          value="Active"
          icon="◉"
          description="Reporting system"
        />
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.cardTitle}>Visitor Report</h3>
            <p style={styles.cardSubtitle}>
              Complete visitor activity
            </p>
          </div>
        </div>

        <VisitorTable visitors={visitors} />
      </div>
    </div>
  );
}

/* =========================
   HOSTS
========================= */

function Hosts() {
  const [hosts, setHosts] = useState([
    { id: 1, name: "Sarah Connor", employeeId: "EMP001", email: "sarah@company.com", phone: "9876543210", department: "Engineering", status: "Active" },
    { id: 2, name: "John Smith", employeeId: "EMP002", email: "john@company.com", phone: "9876543211", department: "Human Resources", status: "Active" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", employeeId: "", email: "", phone: "", department: "", status: "Active" });

  const handleChange = (e) => {
    setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHosts((current) => [...current, { id: Date.now(), ...formData }]);
    setFormData({ name: "", employeeId: "", email: "", phone: "", department: "", status: "Active" });
    setShowForm(false);
  };

  return (
    <div>
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.heading}>Hosts</h1>
          <p style={styles.description}>Manage hosts and employees who receive visitors.</p>
        </div>
        <button onClick={() => setShowForm((current) => !current)} style={styles.primaryButton}>
          {showForm ? "Close Form" : "+ Add Host"}
        </button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1E293B" }}>Add New Host</h2>
          <p style={styles.cardSubtitle}>Enter the employee details below.</p>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" />
              <FormInput label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="EMP001" />
              <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="host@company.com" />
              <FormInput label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
              <FormInput label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="Engineering" />
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Status</label>
                <select name="status" value={formData.status} onChange={handleChange} style={styles.formInput}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={styles.formActions}>
              <button type="button" onClick={() => setShowForm(false)} style={styles.secondaryButton}>Cancel</button>
              <button type="submit" style={styles.primaryButton}>Add Host</button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.cardTitle}>Registered Hosts</h3>
            <p style={styles.cardSubtitle}>View and manage employees who can receive visitors.</p>
          </div>
          <div style={styles.recordCount}>{hosts.length} {hosts.length === 1 ? "Host" : "Hosts"}</div>
        </div>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead><tr>
              <th style={styles.th}>Host</th><th style={styles.th}>Employee ID</th><th style={styles.th}>Department</th><th style={styles.th}>Email</th><th style={styles.th}>Phone</th><th style={styles.th}>Status</th>
            </tr></thead>
            <tbody>
              {hosts.map((host) => (
                <tr key={host.id}>
                  <td style={styles.td}><div style={styles.visitorCell}><div style={styles.avatar}>{host.name.charAt(0)}</div><strong>{host.name}</strong></div></td>
                  <td style={styles.td}>{host.employeeId}</td><td style={styles.td}>{host.department}</td><td style={styles.td}>{host.email}</td><td style={styles.td}>{host.phone}</td>
                  <td style={styles.td}><StatusBadge status={host.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================
   PRE-REGISTRATION
========================= */

function PreRegistration() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    host: "",
    purpose: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.company || !form.host) {
      alert("Please fill in the required fields.");
      return;
    }

    alert("Visitor pre-registration submitted successfully.");

    setForm({
      name: "",
      company: "",
      host: "",
      purpose: "",
      date: "",
    });
  };

  return (
    <div>
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.heading}>Add Visitor</h1>
          <p style={styles.description}>
            Register an upcoming visitor before their arrival.
          </p>
        </div>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <FormInput
              label="Visitor Name *"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter visitor name"
            />

            <FormInput
              label="Company *"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />

            <FormInput
              label="Host *"
              name="host"
              value={form.host}
              onChange={handleChange}
              placeholder="Enter host name"
            />

            <FormInput
              label="Purpose"
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              placeholder="Reason for visit"
            />

            <FormInput
              label="Expected Visit Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div style={styles.formActions}>
            <button type="submit" style={styles.primaryButton}>
              Register Visitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================
   SETTINGS
========================= */

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [autoCheckout, setAutoCheckout] = useState(false);

  return (
    <div>
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.heading}>System Settings</h1>
          <p style={styles.description}>
            Configure VISITRA system preferences.
          </p>
        </div>
      </div>

      <div style={styles.settingsGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>General Settings</h3>
          <p style={styles.cardSubtitle}>
            Basic system configuration
          </p>

          <div style={styles.settingsList}>
            <SettingRow
              title="System Name"
              description="Name displayed across the system"
              value="VISITRA"
            />

            <SettingRow
              title="System Status"
              description="Current system availability"
              value="Active"
            />

            <SettingRow
              title="Visitor Management"
              description="Visitor registration system"
              value="Enabled"
            />
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Notifications</h3>
          <p style={styles.cardSubtitle}>
            Manage system notifications
          </p>

          <div style={styles.settingsList}>
            <ToggleRow
              title="Visitor Notifications"
              description="Receive visitor activity notifications"
              value={notifications}
              onChange={() => setNotifications(!notifications)}
            />

            <ToggleRow
              title="Security Alerts"
              description="Receive security-related alerts"
              value={securityAlerts}
              onChange={() =>
                setSecurityAlerts(!securityAlerts)
              }
            />

            <ToggleRow
              title="Automatic Checkout"
              description="Automatically checkout visitors"
              value={autoCheckout}
              onChange={() => setAutoCheckout(!autoCheckout)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

function StatCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statTop}>
        <div>
          <p style={styles.statTitle}>{title}</p>
          <h2 style={styles.statValue}>{value}</h2>
        </div>

        <div style={styles.statIcon}>{icon}</div>
      </div>

      <p style={styles.statDescription}>{description}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  let badgeStyle = styles.statusBlue;

  if (status === "Checked In" || status === "Secure") {
    badgeStyle = styles.statusGreen;
  }

  if (status === "Checked Out") {
    badgeStyle = styles.statusGray;
  }

  if (status === "Pending") {
    badgeStyle = styles.statusYellow;
  }

  return (
    <span style={{ ...styles.statusBadge, ...badgeStyle }}>
      {status}
    </span>
  );
}

function SettingRow({
  title,
  description,
  value,
}) {
  return (
    <div style={styles.settingRow}>
      <div>
        <div style={styles.settingTitle}>{title}</div>
        <div style={styles.settingDescription}>
          {description}
        </div>
      </div>

      <span style={styles.settingValue}>{value}</span>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  value,
  onChange,
}) {
  return (
    <div style={styles.settingRow}>
      <div>
        <div style={styles.settingTitle}>{title}</div>
        <div style={styles.settingDescription}>
          {description}
        </div>
      </div>

      <button
        onClick={onChange}
        style={{
          ...styles.toggle,
          ...(value ? styles.toggleOn : styles.toggleOff),
        }}
      >
        <span
          style={{
            ...styles.toggleCircle,
            ...(value ? styles.toggleCircleOn : {}),
          }}
        />
      </button>
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div style={styles.formGroup}>
      <label style={styles.formLabel}>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles.formInput}
      />
    </div>
  );
}

/* =========================
   DOWNLOAD
========================= */

function downloadFile(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/* =========================
   STYLES
========================= */

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "#F8FAFC",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#1E293B",
  },

  sidebar: {
    width: "250px",
    minHeight: "100vh",
    background: "#FFFFFF",
    borderRight: "1px solid #E2E8F0",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  },

  logoArea: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    borderBottom: "1px solid #E2E8F0",
  },

  logoImage: {
    width: "34px",
    height: "34px",
    objectFit: "contain",
    display: "block",
    marginRight: "10px",
    background: "transparent",
  },

  logoText: {
    fontSize: "15px",
    fontWeight: "800",
    letterSpacing: "0.7px",
    color: "#1E293B",
  },

  nav: {
    padding: "20px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  navItem: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "#64748B",
    padding: "12px 14px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "left",
  },

  navItemActive: {
    background: "#EFF6FF",
    color: "#2563EB",
    fontWeight: "600",
  },

  navIcon: {
    width: "20px",
    textAlign: "center",
    fontSize: "16px",
  },

  sidebarBottom: {
    marginTop: "auto",
    padding: "16px",
  },

  securityCard: {
    background: "#F8FAFC",
    border: "1px solid #E2E8F0",
    borderRadius: "10px",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  securityIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#DCFCE7",
    color: "#16A34A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },

  securityTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#1E293B",
  },

  securityText: {
    fontSize: "10px",
    color: "#64748B",
    marginTop: "2px",
  },

  main: {
    marginLeft: "250px",
    width: "calc(100% - 250px)",
    minHeight: "100vh",
  },

  topbar: {
    height: "64px",
    background: "#FFFFFF",
    borderBottom: "1px solid #E2E8F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
  },

  pageTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
  },

  pageSubtitle: {
    margin: "2px 0 0",
    fontSize: "11px",
    color: "#94A3B8",
  },

  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  searchBox: {
    width: "230px",
    height: "36px",
    border: "1px solid #E2E8F0",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 11px",
    background: "#FFFFFF",
  },

  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "12px",
    color: "#1E293B",
  },

  notification: {
    fontSize: "20px",
    color: "#64748B",
    cursor: "pointer",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  profileAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#DBEAFE",
    color: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "13px",
  },

  profileName: {
    fontSize: "12px",
    fontWeight: "700",
  },

  profileRole: {
    fontSize: "10px",
    color: "#64748B",
    marginTop: "2px",
  },

  content: {
    padding: "30px",
  },

  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  heading: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#1E293B",
  },

  description: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#64748B",
  },

  primaryButton: {
    border: "none",
    background: "#2563EB",
    color: "#FFFFFF",
    padding: "11px 17px",
    borderRadius: "7px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  secondaryButton: {
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    color: "#475569",
    padding: "8px 13px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "22px",
  },

  statCard: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "10px",
    padding: "18px",
  },

  statTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  statTitle: {
    margin: 0,
    fontSize: "11px",
    color: "#64748B",
    fontWeight: "600",
  },

  statValue: {
    margin: "7px 0 0",
    fontSize: "25px",
    fontWeight: "700",
    color: "#1E293B",
  },

  statIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "8px",
    background: "#EFF6FF",
    color: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
  },

  statDescription: {
    margin: "13px 0 0",
    fontSize: "10px",
    color: "#94A3B8",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  cardHeader: {
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #E2E8F0",
  },

  cardTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "700",
    color: "#1E293B",
  },

  cardSubtitle: {
    margin: "4px 0 0",
    fontSize: "10px",
    color: "#94A3B8",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "11px",
  },

  th: {
    background: "#F8FAFC",
    color: "#64748B",
    fontSize: "10px",
    fontWeight: "700",
    textAlign: "left",
    padding: "12px 14px",
    borderBottom: "1px solid #E2E8F0",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "13px 14px",
    borderBottom: "1px solid #F1F5F9",
    color: "#475569",
    whiteSpace: "nowrap",
  },

  visitorCell: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    color: "#1E293B",
  },

  avatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#DBEAFE",
    color: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "700",
  },

  statusBadge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "9px",
    fontWeight: "700",
  },

  statusGreen: {
    background: "#DCFCE7",
    color: "#15803D",
  },

  statusBlue: {
    background: "#DBEAFE",
    color: "#1D4ED8",
  },

  statusGray: {
    background: "#F1F5F9",
    color: "#64748B",
  },

  statusYellow: {
    background: "#FEF3C7",
    color: "#B45309",
  },

  checkoutButton: {
    border: "none",
    background: "#EFF6FF",
    color: "#2563EB",
    padding: "6px 9px",
    borderRadius: "5px",
    fontSize: "9px",
    fontWeight: "600",
    cursor: "pointer",
  },

  completedText: {
    color: "#94A3B8",
    fontSize: "10px",
  },

  recordCount: {
    background: "#F1F5F9",
    color: "#64748B",
    padding: "6px 10px",
    borderRadius: "5px",
    fontSize: "10px",
    fontWeight: "600",
  },

  emptyState: {
    padding: "40px",
    textAlign: "center",
    color: "#94A3B8",
    fontSize: "13px",
  },

  formCard: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "10px",
    padding: "25px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  formLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#475569",
  },

  formInput: {
    height: "38px",
    border: "1px solid #CBD5E1",
    borderRadius: "6px",
    padding: "0 11px",
    outline: "none",
    fontSize: "12px",
    color: "#1E293B",
    boxSizing: "border-box",
  },

  formActions: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "flex-end",
  },

  settingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },

  settingsList: {
    marginTop: "20px",
  },

  settingRow: {
    padding: "16px 0",
    borderTop: "1px solid #F1F5F9",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  settingTitle: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#1E293B",
  },

  settingDescription: {
    marginTop: "4px",
    fontSize: "10px",
    color: "#94A3B8",
  },

  settingValue: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#2563EB",
    background: "#EFF6FF",
    padding: "5px 9px",
    borderRadius: "5px",
  },

  toggle: {
    width: "40px",
    height: "22px",
    border: "none",
    borderRadius: "20px",
    padding: "2px",
    cursor: "pointer",
    position: "relative",
  },

  toggleOn: {
    background: "#2563EB",
  },

  toggleOff: {
    background: "#CBD5E1",
  },

  toggleCircle: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#FFFFFF",
    display: "block",
    transition: "0.2s",
  },

  toggleCircleOn: {
    marginLeft: "18px",
  },
};

export default App;