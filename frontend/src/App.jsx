import { useEffect, useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");

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
              ? new Date(visitor.visitDateTime).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
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
        console.error("Failed to fetch visitors:", error);
      }
    };

    fetchVisitors();
  }, []);

  const navItems = [
    "Dashboard",
    "Visitors",
    "Security Logs",
    "Reports",
    "System Settings",
  ];

  const goTo = (page) => {
    setActivePage(page);
  };

  const exportCSV = () => {
    const csv =
      "Visitor Name,Purpose,Host,Time,Status\n" +
      visitors
        .map(
          (v) =>
            `"${v.name}","${v.purpose}","${v.host}","${v.time}","${v.status}"`
        )
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "visitor-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const checkOut = (visitorId) => {
    setVisitors((current) =>
      current.map((visitor) =>
        visitor.id === visitorId
          ? {
              ...visitor,
              status: "Checked Out",
            }
          : visitor
      )
    );
  };

  const filteredVisitors = visitors.filter((visitor) => {
    const value =
      `${visitor.name} ${visitor.purpose} ${visitor.host}`.toLowerCase();

    return value.includes(search.toLowerCase());
  });

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <img
            src="/visitra logo.jpeg"
            alt="SECURE-PASS"
            style={styles.logoImage}
          />

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
              key={item}
              onClick={() => goTo(item)}
              style={{
                ...styles.navButton,
                ...(activePage === item
                  ? styles.activeNav
                  : {}),
              }}
            >
              <span style={styles.navIcon}>
                {item === "Dashboard" && "▣"}
                {item === "Visitors" && "♙"}
                {item === "Security Logs" && "⊗"}
                {item === "Reports" && "▤"}
                {item === "System Settings" && "⚙"}
              </span>

              {item}
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
            <span style={styles.navIcon}>⊕</span>
            New Pre-Registration
          </button>

          <button
            onClick={() =>
              alert("Temporary pass feature opened.")
            }
            style={styles.navButton}
          >
            <span style={styles.navIcon}>♙</span>
            Issue Temp Pass
          </button>
        </div>
      </aside>

      <div style={styles.mainArea}>
        <header style={styles.navbar}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

            <div style={styles.avatar}>AD</div>

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

        <main style={styles.content}>
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
                      (v) => v.status === "Active"
                    ).length
                  }
                  description="Currently on-site"
                  icon="⇥"
                />

                <StatCard
                  title="Checked Out"
                  value={
                    visitors.filter(
                      (v) => v.status === "Checked Out"
                    ).length
                  }
                  description="Completed visits"
                  icon="⇥"
                />

                <StatCard
                  title="Pending Approvals"
                  value={
                    visitors.filter(
                      (v) => v.status === "Pending"
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
                        alert("Filter options opened.")
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

                <div style={{ overflowX: "auto" }}>
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
                              visitor.id || index
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

                            <td style={styles.td}>
                              {visitor.purpose}
                            </td>

                            <td style={styles.td}>
                              {visitor.host}
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
                                    checkOut(
                                      visitor.id
                                    )
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

          {activePage === "Visitors" && (
            <VisitorsPage
              visitors={filteredVisitors}
              onRegister={() =>
                goTo("Pre-Registration")
              }
              onCheckOut={checkOut}
            />
          )}

          {activePage === "Security Logs" && (
            <SecurityLogsPage />
          )}

          {activePage === "Reports" && (
            <ReportsPage visitors={visitors} />
          )}

          {activePage === "System Settings" && (
            <SettingsPage />
          )}

          {activePage === "Pre-Registration" && (
            <PreRegistrationPage
              onBack={() => goTo("Dashboard")}
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


/* =====================================================
   VISITORS PAGE
===================================================== */

function VisitorsPage({
  visitors,
  onRegister,
  onCheckOut,
}) {
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
              (v) => v.status === "Checked Out"
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

        <div style={{ overflowX: "auto" }}>
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

                    <td style={styles.td}>
                      {visitor.purpose}
                    </td>

                    <td style={styles.td}>
                      {visitor.host}
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
                            onCheckOut(
                              visitor.id
                            )
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


/* =====================================================
   SECURITY LOGS PAGE
===================================================== */

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
      text.includes(search.toLowerCase());

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

        <div style={{ overflowX: "auto" }}>
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


/* =====================================================
   REPORTS PAGE
===================================================== */

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

  const checkedOut =
    visitors.filter(
      (v) =>
        v.status === "Checked Out"
    ).length;

  const pending =
    visitors.filter(
      (v) =>
        v.status === "Pending"
    ).length;

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
          onClick={exportReport}
          style={styles.registerButton}
        >
          ↓ &nbsp; Export Report
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
          title="Total Visitors"
          value={visitors.length}
          description="Registered visitors"
          icon="♙"
        />

        <StatCard
          title="Checked In"
          value={checkedIn}
          description="Currently inside"
          icon="⇥"
        />

        <StatCard
          title="Checked Out"
          value={checkedOut}
          description="Completed visits"
          icon="✓"
        />

        <StatCard
          title="Pending"
          value={pending}
          description="Awaiting approval"
          icon="◷"
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

        <div style={{ overflowX: "auto" }}>
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


/* =====================================================
   SYSTEM SETTINGS
===================================================== */

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

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch settings"
          );
        }

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
            autoApproval: approval,
            autoCheckout: autoCheckout,
            notifications: notifications,
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

        <button
          onClick={saveSettings}
          style={styles.registerButton}
        >
          Save Changes
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
          <span>System Name</span>

          <strong>SECURE-PASS</strong>
        </div>

        <div style={styles.infoRow}>
          <span>Version</span>

          <strong>1.0.0</strong>
        </div>

        <div style={styles.infoRow}>
          <span>System Status</span>

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


/* =====================================================
   PRE REGISTRATION
===================================================== */

function PreRegistrationPage({
  onBack,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [host, setHost] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [hosts, setHosts] = useState([]);
  const [loadingHosts, setLoadingHosts] =
    useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  // Fetch hosts from MongoDB
  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/hosts"
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch hosts"
          );
        }

        console.log(
          "HOSTS FROM BACKEND:",
          data
        );

        setHosts(data);
      } catch (error) {
        console.error(
          "Failed to fetch hosts:",
          error
        );

        alert(
          "Unable to load hosts from the backend."
        );
      } finally {
        setLoadingHosts(false);
      }
    };

    fetchHosts();
  }, []);

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

      const visitDateTime = new Date(
        `${date}T${time}`
      ).toISOString();

      const response = await fetch(
        "http://localhost:5000/api/visitors",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            visitorName: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            purpose: purpose.trim(),
            host: host.trim(),
            visitDateTime,
            status: "Pending",
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

      onSubmit({
        id: data._id,
        name: data.visitorName,
        purpose: data.purpose || "",
        host: data.host || "",
        time: data.visitDateTime
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
          data.status === "Checked-in"
            ? "Active"
            : data.status === "Checked-out"
            ? "Checked Out"
            : data.status === "Approved"
            ? "Active"
            : data.status === "Rejected"
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
          <button
            onClick={onBack}
            style={styles.linkButton}
          >
            ← Back
          </button>

          <h1 style={styles.heading}>
            Pre-Registration
          </h1>

          <p style={styles.subtitle}>
            Register a visitor in advance
          </p>
        </div>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>
          Visitor Information
        </h2>

        <div style={styles.formGrid}>
          <FormInput
            label="Visitor Name"
            value={name}
            onChange={setName}
            placeholder="Enter visitor name"
          />

          <FormInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter email"
            type="email"
          />

          <FormInput
            label="Phone"
            value={phone}
            onChange={setPhone}
            placeholder="Enter phone number"
          />

          <FormInput
            label="Company"
            value={company}
            onChange={setCompany}
            placeholder="Enter company name"
          />

          <div>
            <label style={styles.label}>
              Host Personnel *
            </label>

            <select
              value={host}
              onChange={(e) =>
                setHost(e.target.value)
              }
              style={styles.input}
              disabled={loadingHosts}
            >
              <option value="">
                {loadingHosts
                  ? "Loading hosts..."
                  : hosts.length === 0
                  ? "No hosts available"
                  : "Select host"}
              </option>

              {hosts.map((item) => (
                <option
                  key={item._id}
                  value={item.name}
                >
                  {item.name}
                  {item.department
                    ? ` - ${item.department}`
                    : ""}
                </option>
              ))}
            </select>
          </div>

          <FormInput
            label="Purpose of Visit"
            value={purpose}
            onChange={setPurpose}
            placeholder="Enter purpose"
          />

          <FormInput
            label="Visit Date"
            value={date}
            onChange={setDate}
            type="date"
          />

          <FormInput
            label="Visit Time"
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
            disabled={
              submitting || loadingHosts
            }
          >
            {submitting
              ? "Submitting..."
              : "Submit Registration"}
          </button>
        </div>
      </div>
    </div>
  );
}


/* =====================================================
   SMALL COMPONENTS
===================================================== */

function StatCard({
  title,
  value,
  description,
  icon,
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

      <div style={styles.statValue}>
        {value}
      </div>

      <div style={styles.statDescription}>
        {description}
      </div>
    </div>
  );
}


function StatusBadge({ status }) {
  let style = styles.activeBadge;

  if (
    status === "Pending" ||
    status === "Warning"
  ) {
    style = styles.pendingBadge;
  }

  if (status === "Checked Out") {
    style = styles.checkedOutBadge;
  }

  return (
    <span
      style={{
        ...styles.badge,
        ...style,
      }}
    >
      {status}
    </span>
  );
}


function SettingRow({
  title,
  description,
  checked,
  onChange,
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
        onClick={() =>
          onChange(!checked)
        }
        style={{
          ...styles.toggle,
          ...(checked
            ? styles.toggleOn
            : styles.toggleOff),
        }}
      >
        <span
          style={{
            ...styles.toggleCircle,
            ...(checked
              ? styles.circleOn
              : styles.circleOff),
          }}
        />
      </button>
    </div>
  );
}


function FormInput({
  label,
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
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        style={styles.input}
      />
    </div>
  );
}


function downloadFile(content, filename) {
  const blob = new Blob([content], {
    type: "text/csv;charset=utf-8;",
  });

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}


/* =====================================================
   STYLES
===================================================== */

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "#f5f5f5",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#171717",
  },

  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    flexShrink: 0,
  },

  logoArea: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    borderBottom: "1px solid #e5e7eb",
  },

  logoBox: {
    width: "28px",
    height: "28px",
    background: "#171717",
    color: "#ffffff",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    marginRight: "10px",
  },

  logoImage: {
    width: "28px",
    height: "28px",
    objectFit: "contain",
    marginRight: "10px",
  },

  logoText: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.4px",
  },

  sidebarContent: {
    padding: "18px 12px",
  },

  sectionTitle: {
    fontSize: "9px",
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "1px",
    margin:
      "0 0 8px 10px",
  },

  navButton: {
    width: "100%",
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    marginBottom: "2px",
    borderRadius: "6px",
    color: "#6b7280",
    fontSize: "13px",
    cursor: "pointer",
    textAlign: "left",
  },

  activeNav: {
    background: "#e5e5e7",
    color: "#171717",
    fontWeight: "600",
  },

  navIcon: {
    width: "16px",
    textAlign: "center",
    fontSize: "14px",
  },

  mainArea: {
    flex: 1,
    minWidth: 0,
  },

  navbar: {
    height: "64px",
    background: "#ffffff",
    borderBottom:
      "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between",
    padding: "0 28px",
  },

  searchBox: {
    width: "310px",
    height: "34px",
    border:
      "1px solid #dcdfe4",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 10px",
  },

  searchIcon: {
    color: "#9ca3af",
  },

  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "12px",
  },

  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  notification: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border:
      "1px solid #d1d5db",
    background: "#ffffff",
    cursor: "pointer",
  },

  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "#6b7280",
    fontWeight: "600",
  },

  adminName: {
    fontSize: "11px",
    fontWeight: "700",
  },

  adminRole: {
    fontSize: "9px",
    color: "#9ca3af",
  },

  content: {
    padding: "26px 24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between",
    marginBottom: "18px",
  },

  heading: {
    fontSize: "21px",
    margin: 0,
    fontWeight: "700",
  },

  subtitle: {
    margin: "4px 0 0",
    fontSize: "11px",
    color: "#8a8f98",
  },

  registerButton: {
    background: "#242424",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "18px",
  },

  statCard: {
    background: "#ffffff",
    border:
      "1px solid #dedfe2",
    borderRadius: "7px",
    padding: "14px",
    minHeight: "88px",
  },

  statTop: {
    display: "flex",
    justifyContent:
      "space-between",
  },

  statTitle: {
    fontSize: "10px",
    color: "#666b73",
  },

  statIcon: {
    color: "#9ca3af",
  },

  statValue: {
    fontSize: "22px",
    fontWeight: "700",
    marginTop: "8px",
  },

  statDescription: {
    fontSize: "9px",
    color: "#a4a8ae",
    marginTop: "2px",
  },

  tableCard: {
    background: "#ffffff",
    border:
      "1px solid #dedfe2",
    borderRadius: "7px",
    overflow: "hidden",
    marginBottom: "18px",
  },

  tableHeader: {
    minHeight: "54px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "0 14px",
    borderBottom:
      "1px solid #e5e7eb",
  },

  tableTitle: {
    fontSize: "12px",
    margin: 0,
    fontWeight: "700",
  },

  tableSubtitle: {
    fontSize: "9px",
    color: "#9ca3af",
    margin: "3px 0 0",
  },

  tableActions: {
    display: "flex",
    gap: "7px",
    alignItems: "center",
  },

  smallButton: {
    border:
      "1px solid #dfe1e5",
    background: "#ffffff",
    borderRadius: "4px",
    padding: "7px 10px",
    fontSize: "9px",
    color: "#555",
    cursor: "pointer",
  },

  smallInput: {
    height: "30px",
    width: "150px",
    border:
      "1px solid #dfe1e5",
    borderRadius: "4px",
    padding: "0 8px",
    outline: "none",
    fontSize: "9px",
  },

  smallSelect: {
    height: "30px",
    border:
      "1px solid #dfe1e5",
    borderRadius: "4px",
    padding: "0 8px",
    background: "#ffffff",
    fontSize: "9px",
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
  },

  th: {
    textAlign: "left",
    padding: "10px 13px",
    fontSize: "9px",
    color: "#777c84",
    background: "#fafafa",
    fontWeight: "600",
    borderBottom:
      "1px solid #e5e7eb",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "11px 13px",
    fontSize: "10px",
    color: "#6b7280",
    borderBottom:
      "1px solid #e5e7eb",
    whiteSpace: "nowrap",
  },

  visitorName: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#222222",
    fontWeight: "500",
  },

  initial: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
    color: "#6b7280",
    fontWeight: "600",
  },

  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "8px",
    fontWeight: "600",
  },

  activeBadge: {
    background: "#262626",
    color: "#ffffff",
  },

  pendingBadge: {
    background: "#fff7ed",
    color: "#9a3412",
  },

  checkedOutBadge: {
    background: "#f1f1f1",
    color: "#6b7280",
  },

  linkButton: {
    border: "none",
    background: "transparent",
    textDecoration:
      "underline",
    fontSize: "9px",
    cursor: "pointer",
    marginRight: "10px",
    color: "#333333",
  },

  checkoutButton: {
    border: "none",
    background: "transparent",
    fontSize: "9px",
    cursor: "pointer",
    color: "#777777",
  },

  formCard: {
    background: "#ffffff",
    border:
      "1px solid #dedfe2",
    borderRadius: "7px",
    padding: "20px",
    marginBottom: "18px",
  },

  formTitle: {
    margin: "0 0 5px",
    fontSize: "14px",
    fontWeight: "700",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "15px",
    marginTop: "20px",
  },

  input: {
    width: "100%",
    height: "38px",
    boxSizing: "border-box",
    border:
      "1px solid #d1d5db",
    borderRadius: "5px",
    padding: "0 11px",
    outline: "none",
    fontSize: "10px",
    background: "#ffffff",
  },

  label: {
    display: "block",
    fontSize: "9px",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "6px",
  },

  reportControls: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr auto",
    gap: "15px",
    alignItems: "end",
    marginTop: "20px",
  },

  controlGroup: {
    minWidth: 0,
  },

  formButtons: {
    display: "flex",
    justifyContent:
      "flex-end",
    gap: "10px",
    marginTop: "20px",
  },

  cancelButton: {
    border:
      "1px solid #d1d5db",
    background: "#ffffff",
    borderRadius: "5px",
    padding: "10px 15px",
    fontSize: "10px",
    cursor: "pointer",
  },

  settingsGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "18px",
  },

  settingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between",
    padding:
      "16px 0",
    borderBottom:
      "1px solid #eeeeee",
    gap: "15px",
  },

  settingTitle: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#222",
  },

  settingDescription: {
    fontSize: "9px",
    color: "#9ca3af",
    marginTop: "4px",
  },

  toggle: {
    width: "40px",
    height: "22px",
    border: "none",
    borderRadius: "20px",
    position: "relative",
    cursor: "pointer",
    flexShrink: 0,
  },

  toggleOn: {
    background: "#242424",
  },

  toggleOff: {
    background: "#d1d5db",
  },

  toggleCircle: {
    position: "absolute",
    top: "3px",
    width: "16px",
    height: "16px",
    background: "#ffffff",
    borderRadius: "50%",
  },

  circleOn: {
    right: "3px",
  },

  circleOff: {
    left: "3px",
  },

  infoRow: {
    display: "flex",
    justifyContent:
      "space-between",
    padding: "12px 0",
    borderBottom:
      "1px solid #eeeeee",
    fontSize: "10px",
    color: "#6b7280",
  },

  successMessage: {
    background: "#f0fdf4",
    color: "#166534",
    border:
      "1px solid #bbf7d0",
    borderRadius: "5px",
    padding: "10px 14px",
    fontSize: "10px",
    marginBottom: "18px",
  },
};

export default App;