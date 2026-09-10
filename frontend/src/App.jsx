import { useState } from "react";
function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  // Visitors are loaded from backend
  const [visitors, setVisitors] = useState([]);

  // Load visitors from backend
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/visitors"
        );

        const data = await response.json();

        console.log("APP VISITORS FROM BACKEND:", data);

        if (!response.ok) {
          console.error("Failed to fetch visitors:", data);
          return;
        }

        const formattedVisitors = data
          .filter((visitor) => visitor.visitorName)
          .map((visitor) => ({
            id: visitor._id,
            name: visitor.visitorName,
            purpose: visitor.purpose || "",
            host: visitor.host || "",
            time: visitor.visitDateTime
              ? new Date(
                  visitor.visitDateTime
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            status:
              visitor.status === "Checked-in"
                ? "Active"
                : visitor.status === "Checked-out"
                ? "Checked Out"
                : visitor.status === "Approved"
                ? "Active"
                : visitor.status === "Rejected"
                ? "Rejected"
                : "Pending",
          }));

        setVisitors(formattedVisitors);
      } catch (error) {
        console.error(
          "Failed to fetch visitors:",
          error
        );
      }
    };

    fetchVisitors();
  }, []);

  const [search, setSearch] = useState("");

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

  const checkOut = (visitorId) => {
    setVisitors((current) =>
      current.map((visitor) =>
        visitor.id === visitorId
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

      {/* ================= SIDEBAR ================= */}

      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <div style={styles.logoBox}>S</div>

          <span style={styles.logoText}>
            SECURE-PASS
          </span>
        </div>

        <div style={styles.sidebarContent}>

          <p style={styles.sectionTitle}>
            NAVIGATION
          </p>

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

          <p
            style={{
              ...styles.sectionTitle,
              marginTop: "35px",
            }}
          >
            QUICK ACTIONS
          </p>

          <button
            onClick={() =>
              goTo("Pre-Registration")
            }
            style={{
              ...styles.navButton,
              ...(activePage === "Pre-Registration"
                ? styles.activeNav
                : {}),
            }}
          >
            <span style={styles.navIcon}>
              ⊕
            </span>

            New Pre-Registration
          </button>

          <button
            onClick={() =>
              alert("Temporary pass feature opened.")
            }
            style={styles.navButton}
          >
            <span style={styles.navIcon}>
              ♙
            </span>

            Issue Temp Pass
          </button>

        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}

      <div style={styles.mainArea}>

        {/* ================= NAVBAR ================= */}

        <header style={styles.navbar}>

          <div style={styles.searchBox}>

            <span style={styles.searchIcon}>
              ⌕
            </span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search visitors, hosts, logs..."
              style={styles.searchInput}
            />

          </div>

          <div style={styles.userArea}>

            <button
              onClick={() =>
                alert("No new notifications.")
              }
              style={styles.notification}
            >
              ♧
            </button>

            <div style={styles.avatar}>
              AD
            </div>

            <div>

              <div style={styles.adminName}>
                Admin User
              </div>

              <div style={styles.adminRole}>
                Command Center
              </div>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <main style={styles.content}>

          {/* ================= DASHBOARD ================= */}

          {activePage === "Dashboard" && (
            <>

              <div style={styles.pageHeader}>

                <div>

                  <h1 style={styles.heading}>
                    Dashboard Overview
                  </h1>

                  <p style={styles.subtitle}>
                    Real-time monitoring of campus
                    visitors and security logs.
                  </p>

                </div>

                <button
                  onClick={() =>
                    goTo("Pre-Registration")
                  }
                  style={styles.registerButton}
                >
                  ⊕ &nbsp; Register New Visitor
                </button>

              </div>

              <div style={styles.statsGrid}>

                <StatCard
                  title="Total Visitors Today"
                  value={visitors.length}
                  description="Visitors loaded from database"
                  icon="♙"
                />

                <StatCard
                  title="Checked In"
                  value={
                    visitors.filter(
                      (v) =>
                        v.status === "Active"
                    ).length
                  }
                  description="Currently on-site"
                  icon="⇥"
                />

                <StatCard
                  title="Checked Out"
                  value={
                    visitors.filter(
                      (v) =>
                        v.status === "Checked Out"
                    ).length
                  }
                  description="Completed visits"
                  icon="⇥"
                />

                <StatCard
                  title="Pending Approvals"
                  value={
                    visitors.filter(
                      (v) =>
                        v.status === "Pending"
                    ).length
                  }
                  description="Awaiting host confirmation"
                  icon="◷"
                />

              </div>

              <div style={styles.tableCard}>

                <div style={styles.tableHeader}>

                  <div>

                    <h2 style={styles.tableTitle}>
                      Recent Visitors Log
                    </h2>

                    <p style={styles.tableSubtitle}>
                      Live feed of entries and exits
                      in past 12 hours
                    </p>

                  </div>

                  <div style={styles.tableActions}>

                    <button
                      onClick={() =>
                        alert(
                          "Filter options opened."
                        )
                      }
                      style={styles.smallButton}
                    >
                      Filter Log
                    </button>

                    <button
                      onClick={exportCSV}
                      style={styles.smallButton}
                    >
                      Export CSV
                    </button>

                  </div>

                </div>

                <div
                  style={{
                    overflowX: "auto",
                  }}
                >

                  <table style={styles.table}>

                    <thead>

                      <tr>

                        <th style={styles.th}>
                          Visitor Name
                        </th>

                        <th style={styles.th}>
                          Purpose of Visit
                        </th>

                        <th style={styles.th}>
                          Host Personnel
                        </th>

                        <th style={styles.th}>
                          Check-in Time
                        </th>

                        <th style={styles.th}>
                          Status
                        </th>

                        <th style={styles.th}>
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredVisitors.map(
                        (visitor, index) => (

                          <tr
                            key={
                              visitor.id ||
                              index
                            }
                          >

                            <td style={styles.td}>

                              <div
                                style={
                                  styles.visitorName
                                }
                              >

                                <span
                                  style={
                                    styles.initial
                                  }
                                >
                                  {visitor.name.charAt(
                                    0
                                  )}
                                </span>

                                {visitor.name}

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
                              {visitor.time}
                            </td>

                            <td style={styles.td}>

                              <StatusBadge
                                status={
                                  visitor.status
                                }
                              />

                            </td>

                            <td style={styles.td}>

                              <button
                                onClick={() =>
                                  alert(
                                    `Viewing ${visitor.name}`
                                  )
                                }
                                style={
                                  styles.linkButton
                                }
                              >
                                View Profile
                              </button>

                              {visitor.status !==
                                "Checked Out" && (

                                <button
                                  onClick={() =>
                                    checkOut(index)
                                  }
                                  style={
                                    styles.checkoutButton
                                  }
                                >
                                  Check Out
                                </button>

                              )}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </>
          )}

          {/* ================= VISITORS ================= */}

          {activePage === "Visitors" && (
            <VisitorsPage
              visitors={filteredVisitors}
              onRegister={() =>
                goTo("Pre-Registration")
              }
              onCheckOut={checkOut}
            />
          )}

          {/* ================= SECURITY LOGS ================= */}

          {activePage === "Security Logs" && (
            <SecurityLogsPage />
          )}

          {/* ================= REPORTS ================= */}

          {activePage === "Reports" && (
            <ReportsPage
              visitors={visitors}
            />
          )}

          {/* ================= SETTINGS ================= */}

          {activePage === "System Settings" && (
            <SettingsPage />
          )}

          {/* ================= PRE REGISTRATION ================= */}

          {activePage === "Pre-Registration" && (
            <PreRegistrationPage
              onBack={() =>
                goTo("Dashboard")
              }
              onSubmit={(newVisitor) => {

                setVisitors((current) => [
                  ...current,
                  newVisitor,
                ]);

                alert(
                  "Pre-registration submitted successfully!"
                );

                goTo("Visitors");

              }}
            />
          )}

        </main>

      </div>
    </div>
  );
}

/* =========================
   VISITOR TABLE
========================= */

function VisitorTable({ visitors, showAction = false }) {
  return (
    <div>

      <div style={styles.pageHeader}>

        <div>

          <h1 style={styles.heading}>
            Visitors
          </h1>

          <p style={styles.subtitle}>
            Manage registered visitors and their visits.
          </p>

        </div>

        <button
          onClick={onRegister}
          style={styles.registerButton}
        >
          ⊕ &nbsp; Register New Visitor
        </button>

      </div>

      <div style={styles.statsGrid}>

        <StatCard
          title="Total Visitors"
          value={visitors.length}
          description="Registered visitors"
          icon="♙"
        />

        <StatCard
          title="Active"
          value={
            visitors.filter(
              (v) => v.status === "Active"
            ).length
          }
          description="Currently on-site"
          icon="●"
        />

        <StatCard
          title="Pending"
          value={
            visitors.filter(
              (v) => v.status === "Pending"
            ).length
          }
          description="Awaiting approval"
          icon="◷"
        />

        <StatCard
          title="Checked Out"
          value={
            visitors.filter(
              (v) =>
                v.status === "Checked Out"
            ).length
          }
          description="Completed visits"
          icon="✓"
        />

      </div>

      <div style={styles.tableCard}>

        <div style={styles.tableHeader}>

          <div>

            <h2 style={styles.tableTitle}>
              Visitor Records
            </h2>

            <p style={styles.tableSubtitle}>
              All registered visitors
            </p>

          </div>

        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={styles.th}>
                  Visitor Name
                </th>

                <th style={styles.th}>
                  Purpose
                </th>

                <th style={styles.th}>
                  Host
                </th>

                <th style={styles.th}>
                  Time
                </th>

                <th style={styles.th}>
                  Status
                </th>

                <th style={styles.th}>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {visitors.map(
                (visitor, index) => (

                  <tr
                    key={
                      visitor.id ||
                      index
                    }
                  >

                    <td style={styles.td}>

                      <div
                        style={
                          styles.visitorName
                        }
                      >

                        <span
                          style={
                            styles.initial
                          }
                        >
                          {visitor.name.charAt(
                            0
                          )}
                        </span>

                        {visitor.name}

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
                      {visitor.time}
                    </td>

                    <td style={styles.td}>

                      <StatusBadge
                        status={
                          visitor.status
                        }
                      />

                    </td>

                    <td style={styles.td}>

                      {visitor.status !==
                        "Checked Out" && (

                        <button
                          onClick={() =>
                            onCheckOut(index)
                          }
                          style={
                            styles.checkoutButton
                          }
                        >
                          Check Out
                        </button>

                      )}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* =========================
   SECURITY LOGS
========================= */

function SecurityLogsPage() {

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const logs = [
    {
      time: "12:42 PM",
      user: "Admin User",
      action: "Visitor Check-in",
      visitor: "Rahul Sharma",
      location: "Main Gate",
      status: "Success",
    },
    {
      time: "12:18 PM",
      user: "Security Officer",
      action: "Visitor Check-out",
      visitor: "Arjun Verma",
      location: "Main Gate",
      status: "Success",
    },
    {
      time: "11:56 AM",
      user: "Admin User",
      action: "Visitor Registration",
      visitor: "Aman Gupta",
      location: "Reception",
      status: "Success",
    },
    {
      time: "11:30 AM",
      user: "Security Officer",
      action: "Access Denied",
      visitor: "Unknown Visitor",
      location: "North Gate",
      status: "Warning",
    },
    {
      time: "11:05 AM",
      user: "Admin User",
      action: "Approval Updated",
      visitor: "Sneha Joshi",
      location: "Admin Office",
      status: "Success",
    },
  ];

  const filteredLogs = logs.filter((log) => {

    const text =
      `${log.user} ${log.action} ${log.visitor} ${log.location}`.toLowerCase();

    const matchesSearch =
      text.includes(
        search.toLowerCase()
      );

    const matchesFilter =
      filter === "All" ||
      log.status === filter;

    return (
      matchesSearch &&
      matchesFilter
    );
  });

  const exportLogs = () => {

    const csv =
      "Time,User,Action,Visitor,Location,Status\n" +
      filteredLogs
        .map(
          (log) =>
            `"${log.time}","${log.user}","${log.action}","${log.visitor}","${log.location}","${log.status}"`
        )
        .join("\n");

    downloadFile(
      csv,
      "security-logs.csv"
    );
  };

  return (
    <div>

      <div style={styles.pageHeader}>

        <div>

          <h1 style={styles.heading}>
            Security Logs
          </h1>

          <p style={styles.subtitle}>
            Monitor security events and system activity.
          </p>
        </div>

        <button
          onClick={exportLogs}
          style={styles.registerButton}
        >
          ↓ &nbsp; Export Logs
        </button>

      </div>

      <div style={styles.statsGrid}>

        <StatCard
          title="Total Events"
          value={logs.length}
          description="Recorded today"
          icon="⊗"
        />

        <StatCard
          title="Successful"
          value={
            logs.filter(
              (l) =>
                l.status === "Success"
            ).length
          }
          description="Normal activity"
          icon="✓"
        />

        <StatCard
          title="Warnings"
          value={
            logs.filter(
              (l) =>
                l.status === "Warning"
            ).length
          }
          description="Requires attention"
          icon="!"
        />

        <StatCard
          title="System Status"
          value="Online"
          description="All systems operational"
          icon="●"
        />

      </div>

      <div style={styles.tableCard}>

        <div style={styles.tableHeader}>

          <div>

            <h2 style={styles.tableTitle}>
              Activity Log
            </h2>

            <p style={styles.tableSubtitle}>
              Latest security events
            </p>
          </div>

          <div style={styles.tableActions}>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search logs..."
              style={styles.smallInput}
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              style={styles.smallSelect}
            >

              <option value="All">
                All Events
              </option>

              <option value="Success">
                Success
              </option>

              <option value="Warning">
                Warnings
              </option>

            </select>

          </div>

        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={styles.th}>
                  TIME
                </th>

                <th style={styles.th}>
                  USER
                </th>

                <th style={styles.th}>
                  ACTION
                </th>

                <th style={styles.th}>
                  VISITOR
                </th>

                <th style={styles.th}>
                  LOCATION
                </th>

                <th style={styles.th}>
                  STATUS
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLogs.map(
                (log, index) => (

                  <tr key={index}>

                    <td style={styles.td}>
                      {log.time}
                    </td>

                    <td style={styles.td}>
                      {log.user}
                    </td>

                    <td style={styles.td}>
                      {log.action}
                    </td>

                    <td style={styles.td}>
                      {log.visitor}
                    </td>

                    <td style={styles.td}>
                      {log.location}
                    </td>

                    <td style={styles.td}>

                      <StatusBadge
                        status={
                          log.status
                        }
                      />

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* =========================
   REPORTS
========================= */

function ReportsPage({ visitors }) {

  const [reportType, setReportType] =
    useState("Visitor Activity");

  const [period, setPeriod] =
    useState("Today");

  const exportReport = () => {

    const csv =
      "Visitor Name,Host,Purpose,Time,Status\n" +
      visitors
        .map(
          (v) =>
            `"${v.name}","${v.host}","${v.purpose}","${v.time}","${v.status}"`
        )
        .join("\n");

    downloadFile(
      csv,
      "visitor-report.csv"
    );
  };

  const checkedIn =
    visitors.filter(
      (v) => v.status === "Active"
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

      <div style={styles.pageHeader}>

        <div>

          <h1 style={styles.heading}>
            Reports
          </h1>

          <p style={styles.subtitle}>
            Generate and export visitor activity reports.
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={downloadReport}
        >
          ↓ Export Report
        </button>

      </div>

      <div style={styles.formCard}>

        <h2 style={styles.formTitle}>
          Generate Report
        </h2>

        <p style={styles.tableSubtitle}>
          Select report type and time period.
        </p>

        <div style={styles.reportControls}>

          <div style={styles.controlGroup}>

            <label style={styles.label}>
              REPORT TYPE
            </label>

            <select
              value={reportType}
              onChange={(e) =>
                setReportType(
                  e.target.value
                )
              }
              style={styles.input}
            >

              <option>
                Visitor Activity
              </option>

              <option>
                Security Activity
              </option>

              <option>
                Check-in / Check-out
              </option>

              <option>
                Pending Visitors
              </option>

            </select>

          </div>

          <div style={styles.controlGroup}>

            <label style={styles.label}>
              TIME PERIOD
            </label>

            <select
              value={period}
              onChange={(e) =>
                setPeriod(
                  e.target.value
                )
              }
              style={styles.input}
            >

              <option>
                Today
              </option>

              <option>
                This Week
              </option>

              <option>
                This Month
              </option>

              <option>
                Last 30 Days
              </option>

            </select>

          </div>

          <button
            onClick={() =>
              alert(
                `${reportType} report generated for ${period}.`
              )
            }
            style={styles.registerButton}
          >
            Generate Report
          </button>

        </div>

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

      <div style={styles.tableCard}>

        <div style={styles.tableHeader}>

          <div>

            <h2 style={styles.tableTitle}>
              Visitor Activity Report
            </h2>

            <p style={styles.tableSubtitle}>
              {reportType} · {period}
            </p>
          </div>

          <button
            onClick={exportReport}
            style={styles.smallButton}
          >
            Export CSV
          </button>

        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={styles.th}>
                  VISITOR
                </th>

                <th style={styles.th}>
                  HOST
                </th>

                <th style={styles.th}>
                  PURPOSE
                </th>

                <th style={styles.th}>
                  TIME
                </th>

                <th style={styles.th}>
                  STATUS
                </th>

              </tr>

            </thead>

            <tbody>

              {visitors.map(
                (visitor, index) => (

                  <tr
                    key={
                      visitor.id ||
                      index
                    }
                  >

                    <td style={styles.td}>
                      {visitor.name}
                    </td>

                    <td style={styles.td}>
                      {visitor.host}
                    </td>

                    <td style={styles.td}>
                      {visitor.purpose}
                    </td>

                    <td style={styles.td}>
                      {visitor.time}
                    </td>

                    <td style={styles.td}>

                      <StatusBadge
                        status={
                          visitor.status
                        }
                      />

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* =========================
   HOSTS
========================= */

function SettingsPage() {

  const [notifications, setNotifications] =
    useState(true);

  const [autoCheckout, setAutoCheckout] =
    useState(false);

  const [approval, setApproval] =
    useState(true);

  const [saved, setSaved] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchSettings = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/api/settings"
        );

        const data =
          await response.json();

        setApproval(
          data.autoApproval ?? true
        );

        setAutoCheckout(
          data.autoCheckout ?? false
        );

        setNotifications(
          data.notifications ?? true
        );

      } catch (error) {

        console.error(
          "Failed to fetch settings:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchSettings();

  }, []);

  const saveSettings = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/settings",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            autoApproval:
              approval,

            autoCheckout:
              autoCheckout,

            notifications:
              notifications,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {

        setSaved(true);

        setTimeout(() => {
          setSaved(false);
        }, 2500);

      } else {

        console.error(
          "Failed to save settings:",
          data
        );

      }

    } catch (error) {

      console.error(
        "Failed to save settings:",
        error
      );

    }
  };

  if (loading) {
    return (
      <div>
        Loading settings...
      </div>
    );
  }

  return (
    <div>

      <div style={styles.pageHeader}>

        <div>

          <h1 style={styles.heading}>
            System Settings
          </h1>

          <p style={styles.subtitle}>
            Manage system preferences and security settings.
          </p>

        </div>
        <button onClick={() => setShowForm((current) => !current)} style={styles.primaryButton}>
          {showForm ? "Close Form" : "+ Add Host"}
        </button>
      </div>

      {saved && (
        <div style={styles.successMessage}>
          ✓ Settings saved successfully.
        </div>
      )}

      <div style={styles.settingsGrid}>

        <div style={styles.formCard}>

          <h2 style={styles.formTitle}>
            Visitor Management
          </h2>

          <SettingRow
            title="Require Host Approval"
            description="Visitors must be approved by their host."
            checked={approval}
            onChange={setApproval}
          />

          <SettingRow
            title="Automatic Check-out"
            description="Automatically check visitors out after their visit."
            checked={autoCheckout}
            onChange={setAutoCheckout}
          />

        </div>

        <div style={styles.formCard}>

          <h2 style={styles.formTitle}>
            Notifications
          </h2>

          <SettingRow
            title="Security Notifications"
            description="Receive alerts for important security events."
            checked={notifications}
            onChange={setNotifications}
          />

        </div>

      </div>

      <div style={styles.formCard}>

        <h2 style={styles.formTitle}>
          System Information
        </h2>

        <div style={styles.infoRow}>
          <span>
            System Name
          </span>

          <strong>
            SECURE-PASS
          </strong>
        </div>

        <div style={styles.infoRow}>
          <span>
            Version
          </span>

          <strong>
            1.0.0
          </strong>
        </div>

        <div style={styles.infoRow}>
          <span>
            System Status
          </span>

          <strong
            style={{
              color: "#166534",
            }}
          >
            ● Online
          </strong>
        </div>

      </div>

    </div>
  );
}

/* =========================
   PRE-REGISTRATION
========================= */

function PreRegistrationPage({
  onBack,
  onSubmit,
}) {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [host, setHost] =
    useState("");

  const [purpose, setPurpose] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const submit = async () => {

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !host.trim() ||
      !purpose.trim() ||
      !date ||
      !time
    ) {

      alert(
        "Please fill in all required fields."
      );

      return;
    }

    try {

      setSubmitting(true);

      const visitDateTime =
        new Date(
          `${date}T${time}`
        ).toISOString();

      const response =
        await fetch(
          "http://localhost:5000/api/visitors",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              visitorName:
                name.trim(),

              phone:
                phone.trim(),

              email:
                email.trim(),

              purpose:
                purpose.trim(),

              host:
                host.trim(),

              visitDateTime:
                visitDateTime,

              status:
                "Pending",
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "NEW VISITOR FROM BACKEND:",
        data
      );

      if (!response.ok) {

        console.error(
          "Failed to register visitor:",
          data
        );

        alert(
          data.message ||
            "Failed to register visitor."
        );

        return;
      }

      /*
        The backend successfully created
        the visitor.

        We send the created visitor back
        to App.jsx.

        IMPORTANT:
        There is NO goTo() here.
      */

      onSubmit({

        id:
          data._id,

        name:
          data.visitorName,

        purpose:
          data.purpose || "",

        host:
          data.host || "",

        time:
          data.visitDateTime
            ? new Date(
                data.visitDateTime
              ).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "",

        status:
          data.status ===
          "Checked-in"
            ? "Active"
            : data.status ===
              "Checked-out"
            ? "Checked Out"
            : data.status ===
              "Approved"
            ? "Active"
            : data.status ===
              "Rejected"
            ? "Rejected"
            : "Pending",

      });

    } catch (error) {

      console.error(
        "Failed to register visitor:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );

    } finally {

      setSubmitting(false);

    }
  };

  return (
    <div>

      <div style={styles.pageHeader}>

        <div>

          <h1 style={styles.heading}>
            New Pre-Registration
          </h1>

          <p style={styles.subtitle}>
            Register a visitor before their arrival.
          </p>
        </div>
      </div>

      <div style={styles.formCard}>

        <h2 style={styles.formTitle}>
          Visitor Information
        </h2>

        <div style={styles.formGrid}>

          <FormInput
            label="VISITOR NAME *"
            value={name}
            onChange={setName}
            placeholder="Enter visitor name"
          />

          <FormInput
            label="EMAIL *"
            value={email}
            onChange={setEmail}
            placeholder="Enter email"
            type="email"
          />

          <FormInput
            label="PHONE NUMBER *"
            value={phone}
            onChange={setPhone}
            placeholder="Enter phone number"
          />

          <FormInput
            label="COMPANY / ORGANIZATION"
            value={company}
            onChange={setCompany}
            placeholder="Enter company"
          />

          <FormInput
            label="HOST / EMPLOYEE *"
            value={host}
            onChange={setHost}
            placeholder="Enter host name"
          />

          <FormInput
            label="PURPOSE OF VISIT *"
            value={purpose}
            onChange={setPurpose}
            placeholder="Enter purpose"
          />

          <FormInput
            label="VISIT DATE *"
            value={date}
            onChange={setDate}
            type="date"
          />

          <FormInput
            label="VISIT TIME *"
            value={time}
            onChange={setTime}
            type="time"
          />

        </div>

        <div style={styles.formButtons}>

          <button
            onClick={onBack}
            style={styles.cancelButton}
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            onClick={submit}
            style={styles.registerButton}
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit Pre-Registration"}
          </button>

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

        <span style={styles.statTitle}>
          {title}
        </span>

        <span style={styles.statIcon}>
          {icon}
        </span>

      </div>

        <div style={styles.statIcon}>{icon}</div>
      </div>

      <div style={styles.statDescription}>
        {description}
      </div>

    </div>
  );
}

function StatusBadge({ status }) {

  let style =
    styles.activeBadge;

  if (
    status === "Pending" ||
    status === "Warning"
  ) {
    style =
      styles.pendingBadge;
  }

  if (
    status === "Checked Out"
  ) {
    style =
      styles.checkedOutBadge;
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

        <div style={styles.settingTitle}>
          {title}
        </div>

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
    <div>

      <label style={styles.label}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={placeholder}
        style={styles.formInput}
      />
    </div>
  );
}

/* =========================
   DOWNLOAD
========================= */

function downloadFile(
  content,
  filename
) {

  const blob = new Blob(
    [content],
    {
      type:
        "text/csv;charset=utf-8;",
    }
  );

  const url =
    URL.createObjectURL(blob);

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
    background: "#ffffff",
    borderRight:
      "1px solid #e5e7eb",
    flexShrink: 0,
  },

  logoArea: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    borderBottom:
      "1px solid #e5e7eb",
  },

  logoImage: {
    width: "34px",
    height: "34px",
    objectFit: "contain",
    display: "block",
    marginRight: "10px",
    background: "transparent",
  },

  logoImage: {
    width: "28px",
    height: "28px",
    objectFit: "contain",
    marginRight: "10px",
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
  },

  tableSubtitle: {
    fontSize: "9px",
    color: "#9ca3af",
    margin:
      "3px 0 0",
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