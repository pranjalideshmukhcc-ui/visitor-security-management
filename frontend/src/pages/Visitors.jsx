import { useState } from "react";

function Visitors() {
  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "9876543210",
      host: "Dr. Amit Patel",
      purpose: "Meeting",
      date: "30 Aug 2026",
      time: "09:15 AM",
      status: "Checked In",
    },
    {
      id: 2,
      name: "Priya Mehta",
      email: "priya.mehta@email.com",
      phone: "9876543211",
      host: "Prof. Neha Shah",
      purpose: "Interview",
      date: "30 Aug 2026",
      time: "10:30 AM",
      status: "Checked In",
    },
    {
      id: 3,
      name: "Arjun Verma",
      email: "arjun.verma@email.com",
      phone: "9876543212",
      host: "Mr. Raj Malhotra",
      purpose: "Delivery",
      date: "30 Aug 2026",
      time: "11:05 AM",
      status: "Checked Out",
    },
    {
      id: 4,
      name: "Sneha Joshi",
      email: "sneha.joshi@email.com",
      phone: "9876543213",
      host: "Dr. Kavita Rao",
      purpose: "Meeting",
      date: "30 Aug 2026",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      id: 5,
      name: "Aman Gupta",
      email: "aman.gupta@email.com",
      phone: "9876543214",
      host: "Admin Office",
      purpose: "Document Submission",
      date: "30 Aug 2026",
      time: "12:00 PM",
      status: "Checked In",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    host: "",
    purpose: "",
    date: "",
    time: "",
  });

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(search.toLowerCase()) ||
      visitor.host.toLowerCase().includes(search.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || visitor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCheckout = (id) => {
    setVisitors((current) =>
      current.map((visitor) =>
        visitor.id === id
          ? { ...visitor, status: "Checked Out" }
          : visitor
      )
    );
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVisitor = (e) => {
    e.preventDefault();

    const newVisitor = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      host: form.host,
      purpose: form.purpose,
      date: form.date
        ? new Date(form.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "30 Aug 2026",
      time: form.time || "Not specified",
      status: "Pending",
    };

    setVisitors((current) => [newVisitor, ...current]);

    setForm({
      name: "",
      email: "",
      phone: "",
      host: "",
      purpose: "",
      date: "",
      time: "",
    });

    setShowForm(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getStatusStyle = (status) => {
    if (status === "Checked In") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (status === "Pending") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#f3f4f6",
      color: "#4b5563",
    };
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Visitors</h1>
          <p style={styles.subtitle}>
            Manage and monitor all campus visitors.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={styles.primaryButton}
        >
          + Register New Visitor
        </button>
      </div>

      {/* Statistics */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>TOTAL VISITORS</span>
          <strong style={styles.statNumber}>{visitors.length}</strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statLabel}>CHECKED IN</span>
          <strong style={styles.statNumber}>
            {visitors.filter((v) => v.status === "Checked In").length}
          </strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statLabel}>PENDING</span>
          <strong style={styles.statNumber}>
            {visitors.filter((v) => v.status === "Pending").length}
          </strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statLabel}>CHECKED OUT</span>
          <strong style={styles.statNumber}>
            {visitors.filter((v) => v.status === "Checked Out").length}
          </strong>
        </div>
      </div>

      {/* Table Card */}
      <div style={styles.card}>
        <div style={styles.toolbar}>
          <div>
            <h2 style={styles.tableTitle}>Visitor Records</h2>
            <p style={styles.tableSubtitle}>
              Complete list of registered visitors.
            </p>
          </div>

          <div style={styles.controls}>
            <input
              type="text"
              placeholder="Search visitors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.search}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.select}
            >
              <option value="All">All Status</option>
              <option value="Checked In">Checked In</option>
              <option value="Pending">Pending</option>
              <option value="Checked Out">Checked Out</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Visitor</th>
                <th style={styles.th}>Purpose</th>
                <th style={styles.th}>Host Personnel</th>
                <th style={styles.th}>Visit Date</th>
                <th style={styles.th}>Check-in</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((visitor) => (
                  <tr key={visitor.id} style={styles.row}>
                    <td style={styles.td}>
                      <div style={styles.visitorCell}>
                        <div style={styles.avatar}>
                          {getInitials(visitor.name)}
                        </div>

                        <div>
                          <div style={styles.visitorName}>
                            {visitor.name}
                          </div>

                          <div style={styles.email}>
                            {visitor.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={styles.td}>{visitor.purpose}</td>

                    <td style={styles.td}>{visitor.host}</td>

                    <td style={styles.td}>{visitor.date}</td>

                    <td style={styles.td}>{visitor.time}</td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,
                          ...getStatusStyle(visitor.status),
                        }}
                      >
                        {visitor.status}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button
                          onClick={() => setSelectedVisitor(visitor)}
                          style={styles.viewButton}
                        >
                          View
                        </button>

                        {visitor.status === "Checked In" && (
                          <button
                            onClick={() => handleCheckout(visitor.id)}
                            style={styles.checkoutButton}
                          >
                            Check Out
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={styles.empty}>
                    No visitors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Visitor Modal */}
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Register New Visitor</h2>
                <p style={styles.modalSubtitle}>
                  Enter visitor information below.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddVisitor}>
              <div style={styles.formGrid}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Visitor Name"
                  required
                  style={styles.input}
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  required
                  style={styles.input}
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="Phone Number"
                  required
                  style={styles.input}
                />

                <input
                  name="host"
                  value={form.host}
                  onChange={handleFormChange}
                  placeholder="Host Personnel"
                  required
                  style={styles.input}
                />

                <input
                  name="purpose"
                  value={form.purpose}
                  onChange={handleFormChange}
                  placeholder="Purpose of Visit"
                  required
                  style={styles.input}
                />

                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleFormChange}
                  required
                  style={styles.input}
                />

                <input
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={handleFormChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>

                <button type="submit" style={styles.primaryButton}>
                  Register Visitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {selectedVisitor && (
        <div style={styles.overlay}>
          <div style={styles.profileModal}>
            <div style={styles.profileTop}>
              <div style={styles.bigAvatar}>
                {getInitials(selectedVisitor.name)}
              </div>

              <div>
                <h2 style={styles.profileName}>
                  {selectedVisitor.name}
                </h2>

                <span
                  style={{
                    ...styles.status,
                    ...getStatusStyle(selectedVisitor.status),
                  }}
                >
                  {selectedVisitor.status}
                </span>
              </div>

              <button
                onClick={() => setSelectedVisitor(null)}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>

            <div style={styles.profileDetails}>
              <Detail
                label="Email"
                value={selectedVisitor.email}
              />

              <Detail
                label="Phone"
                value={selectedVisitor.phone}
              />

              <Detail
                label="Host Personnel"
                value={selectedVisitor.host}
              />

              <Detail
                label="Purpose of Visit"
                value={selectedVisitor.purpose}
              />

              <Detail
                label="Visit Date"
                value={selectedVisitor.date}
              />

              <Detail
                label="Check-in Time"
                value={selectedVisitor.time}
              />
            </div>

            <button
              onClick={() => setSelectedVisitor(null)}
              style={styles.fullClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p style={styles.detailLabel}>{label}</p>
      <p style={styles.detailValue}>{value}</p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 64px)",
    background: "#f7f7f7",
    padding: "28px",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#171717",
  },

  subtitle: {
    margin: "5px 0 0",
    fontSize: "12px",
    color: "#737373",
  },

  primaryButton: {
    border: "none",
    background: "#202020",
    color: "#fff",
    padding: "11px 16px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    marginBottom: "20px",
  },

  statCard: {
    background: "#fff",
    border: "1px solid #e1e1e1",
    borderRadius: "8px",
    padding: "16px",
  },

  statLabel: {
    display: "block",
    fontSize: "9px",
    color: "#8a8a8a",
    fontWeight: "600",
    letterSpacing: "0.7px",
  },

  statNumber: {
    display: "block",
    marginTop: "8px",
    fontSize: "24px",
    color: "#171717",
  },

  card: {
    background: "#fff",
    border: "1px solid #e1e1e1",
    borderRadius: "8px",
    overflow: "hidden",
  },

  toolbar: {
    minHeight: "70px",
    padding: "0 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
  },

  tableTitle: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "700",
  },

  tableSubtitle: {
    margin: "4px 0 0",
    fontSize: "9px",
    color: "#9a9a9a",
  },

  controls: {
    display: "flex",
    gap: "8px",
  },

  search: {
    width: "190px",
    height: "32px",
    border: "1px solid #d9d9d9",
    borderRadius: "5px",
    padding: "0 10px",
    outline: "none",
    fontSize: "10px",
    boxSizing: "border-box",
  },

  select: {
    height: "32px",
    border: "1px solid #d9d9d9",
    borderRadius: "5px",
    padding: "0 8px",
    outline: "none",
    background: "#fff",
    fontSize: "10px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#fafafa",
    borderBottom: "1px solid #e5e5e5",
    padding: "11px 14px",
    textAlign: "left",
    fontSize: "9px",
    color: "#777",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  row: {
    borderBottom: "1px solid #eeeeee",
  },

  td: {
    padding: "13px 14px",
    fontSize: "10px",
    color: "#555",
    whiteSpace: "nowrap",
  },

  visitorCell: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#ededed",
    color: "#555",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
    fontWeight: "700",
  },

  visitorName: {
    fontSize: "10px",
    color: "#222",
    fontWeight: "600",
  },

  email: {
    marginTop: "2px",
    fontSize: "8px",
    color: "#999",
  },

  status: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "10px",
    fontSize: "8px",
    fontWeight: "600",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  viewButton: {
    border: "none",
    background: "transparent",
    color: "#333",
    textDecoration: "underline",
    fontSize: "9px",
    cursor: "pointer",
  },

  checkoutButton: {
    border: "1px solid #d8d8d8",
    background: "#fff",
    color: "#555",
    borderRadius: "4px",
    padding: "4px 7px",
    fontSize: "8px",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "40px",
    color: "#999",
    fontSize: "11px",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },

  modal: {
    width: "650px",
    maxWidth: "100%",
    background: "#fff",
    borderRadius: "9px",
    padding: "24px",
    boxSizing: "border-box",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  },

  profileModal: {
    width: "450px",
    maxWidth: "100%",
    background: "#fff",
    borderRadius: "9px",
    padding: "24px",
    boxSizing: "border-box",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "22px",
  },

  modalTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
  },

  modalSubtitle: {
    margin: "4px 0 0",
    color: "#999",
    fontSize: "10px",
  },

  closeButton: {
    border: "none",
    background: "transparent",
    fontSize: "24px",
    color: "#999",
    cursor: "pointer",
    lineHeight: 1,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  input: {
    width: "100%",
    height: "38px",
    boxSizing: "border-box",
    border: "1px solid #d8d8d8",
    borderRadius: "5px",
    padding: "0 10px",
    outline: "none",
    fontSize: "10px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginTop: "22px",
    paddingTop: "18px",
    borderTop: "1px solid #eee",
  },

  cancelButton: {
    border: "1px solid #d6d6d6",
    background: "#fff",
    color: "#555",
    borderRadius: "5px",
    padding: "10px 15px",
    fontSize: "10px",
    cursor: "pointer",
  },

  profileTop: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "20px",
    borderBottom: "1px solid #eee",
  },

  bigAvatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#ededed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    color: "#555",
  },

  profileName: {
    margin: "0 0 6px",
    fontSize: "16px",
  },

  profileDetails: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
    padding: "20px 0",
  },

  detailLabel: {
    margin: 0,
    fontSize: "9px",
    color: "#999",
  },

  detailValue: {
    margin: "4px 0 0",
    fontSize: "11px",
    color: "#333",
    fontWeight: "600",
  },

  fullClose: {
    width: "100%",
    border: "none",
    background: "#202020",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "10px",
    cursor: "pointer",
  },
};

export default Visitors;