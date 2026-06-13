import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://studentsportal-x37v.onrender.com/api";

const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
};

// ─── ChangePassword ──────────────────────────────────────────────────────────
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setMsg(null);
    if (!oldPassword || !newPassword) {
      setMsg({ type: "error", text: "❗ Dono fields fill karna zaroori hai" });
      return;
    }
    if (newPassword.length < 6) {
      setMsg({ type: "error", text: "❗ New password kam se kam 6 characters ka hona chahiye" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setMsg({ type: "success", text: "✅ Password successfully update ho gaya!" });
        setOldPassword(""); setNewPassword("");
      } else {
        setMsg({ type: "error", text: `❌ ${json.msg || "Password update nahi ho saka"}` });
      }
    } catch {
      setMsg({ type: "error", text: "❌ Server se connect nahi ho saka" });
    } finally { setLoading(false); }
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", marginBottom: "24px", maxWidth: "480px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Change Password</h2>
      </div>
      <div style={{ marginBottom: "14px" }}>
        <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Old Password</label>
        <input type="password" placeholder="Current password dalein" value={oldPassword} onChange={e => setOldPassword(e.target.value)}
          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontFamily: "inherit", fontSize: "14px", outline: "none", background: "#fff", color: "#0f172a", boxSizing: "border-box" }} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>New Password</label>
        <input type="password" placeholder="Naya password dalein (min 6 char)" value={newPassword} onChange={e => setNewPassword(e.target.value)}
          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontFamily: "inherit", fontSize: "14px", outline: "none", background: "#fff", color: "#0f172a", boxSizing: "border-box" }} />
      </div>
      {msg && (
        <div style={{ padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", marginBottom: "16px", background: msg.type === "success" ? "#f0fdf4" : "#fef2f2", color: msg.type === "success" ? "#15803d" : "#b91c1c", border: `1px solid ${msg.type === "success" ? "#bbf7d0" : "#fecaca"}` }}>
          {msg.text}
        </div>
      )}
      <button onClick={handleUpdate} disabled={loading}
        style={{ background: loading ? "#93c5fd" : "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}>
        {loading ? "⏳ Updating..." : "🔒 Update Password"}
      </button>
    </div>
  );
}

// ─── ForumAdmin ──────────────────────────────────────────────────────────────
function ForumAdmin({ posts, fetchData }) {
  const [replyText, setReplyText] = useState({});
  const [msg, setMsg] = useState({});

  const handleAdminReply = async (postId) => {
    const reply = replyText[postId];
    if (!reply?.trim()) return;
    try {
      const res = await fetch(`${API}/forum/posts/${postId}/admin-reply`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });
      if (res.ok) { setMsg(p => ({ ...p, [postId]: "✅ Reply sent & resolved!" })); setReplyText(p => ({ ...p, [postId]: "" })); fetchData(); }
      else setMsg(p => ({ ...p, [postId]: "❌ Reply send nahi ho saka" }));
    } catch { setMsg(p => ({ ...p, [postId]: "❌ Server error" })); }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Kya aap ye post delete karna chahte hain?")) return;
    try {
      const res = await fetch(`${API}/forum/posts/${postId}`, { method: "DELETE" });
      if (res.ok) fetchData(); else alert("❌ Post delete nahi ho saki.");
    } catch { alert("❌ Server se connect nahi ho saka."); }
  };

  const cardStyle = { marginBottom: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Discussion Forum</h2>
        <button onClick={fetchData} style={{ background: "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}>🔄 Refresh</button>
      </div>
      {posts.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>💬 Koi discussion nahi hai abhi</p>
      ) : posts.map(post => (
        <div key={post._id} style={cardStyle}>
          <div style={{ padding: "16px 20px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "500", color: "#0f172a" }}>{post.title}</h4>
                <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", background: post.status === "resolved" ? "#f0fdf4" : "#fffbeb", color: post.status === "resolved" ? "#15803d" : "#92400e" }}>
                  {post.status === "resolved" ? "✅ Resolved" : "⏳ Open"}
                </span>
              </div>
              <p style={{ margin: "6px 0 4px", fontSize: "13px", color: "#64748b" }}>{post.content || "No description"}</p>
              <small style={{ color: "#94a3b8" }}>By <b>{post.authorName || "Student"}</b> · {new Date(post.createdAt).toLocaleDateString("en-IN")} · {post.replies?.length || 0} replies</small>
            </div>
            <button onClick={() => handleDelete(post._id)} style={{ background: "#fef2f2", color: "#dc2626", padding: "6px 14px", borderRadius: "6px", border: "1px solid #fecaca", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "600" }}>Delete</button>
          </div>
          {post.replies?.length > 0 && (
            <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: "8px", background: "#fff" }}>
              {post.replies.map((r, i) => (
                <div key={i} style={{ padding: "10px 14px", background: r.isAdmin ? "#eff6ff" : "#f0fdf4", borderLeft: `3px solid ${r.isAdmin ? "#1d4ed8" : "#10B981"}`, borderRadius: "0 6px 6px 0" }}>
                  <b style={{ fontSize: "12px", color: r.isAdmin ? "#1e40af" : "#15803d" }}>{r.isAdmin ? "👨‍💼 Admin" : `👤 ${r.authorName}`}</b>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#374151" }}>{r.reply}</p>
                </div>
              ))}
            </div>
          )}
          {post.status !== "resolved" && (
            <div style={{ padding: "14px 20px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
              <textarea rows={2} placeholder="Admin reply likhein aur issue resolve karein..." value={replyText[post._id] || ""} onChange={e => setReplyText(p => ({ ...p, [post._id]: e.target.value }))}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", resize: "none", fontSize: "13px", outline: "none", marginBottom: "8px", fontFamily: "inherit", boxSizing: "border-box" }} />
              {msg[post._id] && <div style={{ fontSize: "12px", marginBottom: "8px", color: msg[post._id].includes("✅") ? "#15803d" : "#dc2626" }}>{msg[post._id]}</div>}
              <button onClick={() => handleAdminReply(post._id)} style={{ background: "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}>✅ Reply & Mark Resolved</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SessionManagement ───────────────────────────────────────────────────────
function SessionManagement({ sessions, fetchData }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [msg, setMsg] = useState(null);
  const [adding, setAdding] = useState(false);
  const [closingId, setClosingId] = useState(null);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const handleAdd = async () => {
    if (!form.name.trim()) { setMsg({ type: "error", text: "❗ Session Name required hai" }); return; }
    setAdding(true); setMsg(null);
    try {
      const res = await fetch(`${API}/session`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name.trim(), description: form.description.trim() }) });
      if (res.ok) { setMsg({ type: "success", text: "✅ Session successfully add ho gaya!" }); setForm({ name: "", description: "" }); fetchData(); }
      else { const err = await res.json().catch(() => ({})); setMsg({ type: "error", text: `❌ ${err.msg || "Session add nahi ho saka"}` }); }
    } catch { setMsg({ type: "error", text: "❌ Server se connect nahi ho saka" }); }
    finally { setAdding(false); }
  };

  const handleClose = async (id) => {
    if (!window.confirm("Ye session close karna chahte hain?")) return;
    setClosingId(id);
    try {
      const res = await fetch(`${API}/session/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: false }) });
      if (res.ok) fetchData(); else alert("❌ Session close nahi ho saka");
    } catch { alert("❌ Server error"); }
    finally { setClosingId(null); }
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: isMobile ? "16px" : "24px", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: "10px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Session Management</h2>
        <button onClick={fetchData} style={{ background: "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}>🔄 Refresh</button>
      </div>
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", marginBottom: "20px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end", flexDirection: isMobile ? "column" : "row" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: isMobile ? "100%" : "140px" }}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Session Name *</label>
          <input placeholder="e.g. 2024-25" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontFamily: "inherit", fontSize: "14px", outline: "none", background: "#fff", color: "#0f172a", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: isMobile ? "100%" : "140px" }}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</label>
          <input placeholder="e.g. Annual session" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontFamily: "inherit", fontSize: "14px", outline: "none", background: "#fff", color: "#0f172a", boxSizing: "border-box" }} />
        </div>
        <button onClick={handleAdd} disabled={adding} style={{ background: adding ? "#93c5fd" : "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: adding ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit", whiteSpace: "nowrap", alignSelf: "flex-end", width: isMobile ? "100%" : "auto" }}>
          {adding ? "⏳ Adding..." : "+ Add Session"}
        </button>
      </div>
      {msg && <div style={{ padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", marginBottom: "16px", background: msg.type === "success" ? "#f0fdf4" : "#fef2f2", color: msg.type === "success" ? "#15803d" : "#b91c1c", border: `1px solid ${msg.type === "success" ? "#bbf7d0" : "#fecaca"}` }}>{msg.text}</div>}
      {sessions.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📅 Koi session nahi hai. Upar form se add karein.</p>
      ) : (
        <div style={{ display: "block", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "500px" }}>
            <thead><tr>
              {["#","Name","Description","Status","Action"].map(h => <th key={h} style={{ background: "#f8fafc", padding: "10px 16px", textAlign: "left", fontSize: "11px", color: "#64748b", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.04em" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {sessions.map((s, idx) => (
                <tr key={s._id}>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</td>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#0f172a", fontWeight: 500 }}>{s.name}</td>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#64748b" }}>{s.description || "—"}</td>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                    {s.isActive ? <span style={{ background: "#f0fdf4", color: "#15803d", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>✅ Active</span> : <span style={{ background: "#fef2f2", color: "#991b1b", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>❌ Closed</span>}
                  </td>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                    {s.isActive && <button onClick={() => handleClose(s._id)} disabled={closingId === s._id} style={{ background: "#fef2f2", color: "#dc2626", padding: "6px 14px", borderRadius: "6px", border: "1px solid #fecaca", cursor: closingId === s._id ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", opacity: closingId === s._id ? 0.6 : 1 }}>{closingId === s._id ? "Closing..." : "Close"}</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── ComplaintManagement ─────────────────────────────────────────────────────
function ComplaintManagement({ complaints, fetchData }) {
  const [replyText, setReplyText] = useState({});
  const [msg, setMsg] = useState({});
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const handleAction = async (id, status) => {
    const adminResponse = replyText[id]?.trim();
    if (!adminResponse) { setMsg(p => ({ ...p, [id]: "❗ Pehle reply likhein" })); return; }
    try {
      const res = await fetch(`${API}/complaint/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminResponse, status }) });
      if (res.ok) { setMsg(p => ({ ...p, [id]: `✅ Complaint ${status} kar di gayi!` })); setReplyText(p => ({ ...p, [id]: "" })); fetchData(); }
      else setMsg(p => ({ ...p, [id]: "❌ Action fail ho gaya" }));
    } catch { setMsg(p => ({ ...p, [id]: "❌ Server error" })); }
  };

  const getBadge = (status) => {
    if (status === "closed" || status === "resolved") return <span style={{ background: "#f0fdf4", color: "#15803d", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>✅ Resolved</span>;
    if (status === "rejected") return <span style={{ background: "#fef2f2", color: "#991b1b", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>❌ Rejected</span>;
    if (status === "in-progress") return <span style={{ background: "#eff6ff", color: "#1e40af", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>🔄 In Progress</span>;
    return <span style={{ background: "#fffbeb", color: "#92400e", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>⏳ Pending</span>;
  };

  const btnBase = { padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit", border: "1px solid", flex: isMobile ? 1 : "unset" };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: isMobile ? "16px" : "24px", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: "10px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Complaint Management</h2>
        <button onClick={fetchData} style={{ background: "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}>🔄 Refresh</button>
      </div>
      {complaints.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📭 Koi complaint nahi hai abhi</p>
      ) : complaints.map(c => {
        const isResolved = c.status === "closed" || c.status === "resolved";
        return (
          <div key={c._id} style={{ marginBottom: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", background: "#f8fafc" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                <b style={{ fontSize: "14px", color: "#0f172a" }}>{c.complaintType?.name || "General"}</b>
                {getBadge(c.status)}
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 6px" }}>{c.complaintText}</p>
              <small style={{ color: "#94a3b8" }}>By <b>{c.studentId?.name || "Student"}</b> · {c.studentId?.email} · {new Date(c.createdAt).toLocaleDateString("en-IN")}</small>
            </div>
            <div style={{ padding: "16px 20px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
              {c.adminResponse && (
                <div style={{ marginBottom: "14px", padding: "12px 16px", background: "#f0fdf4", borderLeft: "3px solid #10B981", borderRadius: "0 8px 8px 0" }}>
                  <div style={{ fontSize: "11px", color: "#15803d", fontWeight: "700", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Admin Response</div>
                  <div style={{ fontSize: "13px", color: "#374151" }}>{c.adminResponse}</div>
                </div>
              )}
              {!isResolved ? (
                <>
                  <textarea rows={3} placeholder="Student ko reply likhein..." value={replyText[c._id] || ""} onChange={e => setReplyText(p => ({ ...p, [c._id]: e.target.value }))}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", resize: "none", fontSize: "13px", outline: "none", marginBottom: "12px", fontFamily: "inherit", boxSizing: "border-box" }} />
                  {msg[c._id] && <div style={{ fontSize: "12px", marginBottom: "10px", color: msg[c._id].includes("✅") ? "#15803d" : "#dc2626", fontWeight: "600" }}>{msg[c._id]}</div>}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button onClick={() => handleAction(c._id, "resolved")} style={{ ...btnBase, color: "#15803d", borderColor: "#86efac", background: "#f0fdf4" }}>✅ Resolve</button>
                    <button onClick={() => handleAction(c._id, "pending")}  style={{ ...btnBase, color: "#1e40af", borderColor: "#93c5fd", background: "#eff6ff" }}>⏳ Pending</button>
                    <button onClick={() => handleAction(c._id, "rejected")} style={{ ...btnBase, color: "#b91c1c", borderColor: "#fca5a5", background: "#fef2f2" }}>❌ Reject</button>
                  </div>
                </>
              ) : (
                <div style={{ padding: "10px 14px", background: "#f0fdf4", borderRadius: "8px", fontSize: "13px", color: "#15803d", fontWeight: "500" }}>✅ Ye complaint already {c.status} hai</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CollegeManagement ───────────────────────────────────────────────────────
function CollegeManagement({ colleges, fetchData }) {
  const [form, setForm] = useState({ name: "", code: "", location: "" });
  const [msg, setMsg] = useState(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const handleAdd = async () => {
    if (!form.name.trim()) { setMsg({ type: "error", text: "❗ College Name required hai" }); return; }
    if (!form.code.trim()) { setMsg({ type: "error", text: "❗ College Code required hai" }); return; }
    setAdding(true); setMsg(null);
    try {
      const res = await fetch(`${API}/college`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name.trim(), code: form.code.trim(), location: form.location.trim() }) });
      if (res.ok) { setMsg({ type: "success", text: "✅ College successfully add ho gaya!" }); setForm({ name: "", code: "", location: "" }); fetchData(); }
      else { const err = await res.json().catch(() => ({})); setMsg({ type: "error", text: `❌ ${err.message || "College add nahi ho saka"}` }); }
    } catch { setMsg({ type: "error", text: "❌ Server se connect nahi ho saka." }); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap ye college delete karna chahte hain?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API}/college/${id}`, { method: "DELETE" });
      if (res.ok) fetchData(); else alert("❌ College delete nahi ho saka.");
    } catch { alert("❌ Server se connect nahi ho saka."); }
    finally { setDeletingId(null); }
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: isMobile ? "16px" : "24px", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: "10px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", margin: 0 }}>College Management</h2>
        <button onClick={fetchData} style={{ background: "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}>🔄 Refresh</button>
      </div>
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", marginBottom: "20px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end", flexDirection: isMobile ? "column" : "row" }}>
        {[["College Name *","e.g. Government Polytechnic","name"],["College Code *","e.g. GP001","code"],["Location","e.g. Lucknow, UP","location"]].map(([lbl,ph,key]) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: isMobile ? "100%" : "140px" }}>
            <label style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{lbl}</label>
            <input placeholder={ph} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()}
              style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontFamily: "inherit", fontSize: "14px", outline: "none", background: "#fff", color: "#0f172a", boxSizing: "border-box" }} />
          </div>
        ))}
        <button onClick={handleAdd} disabled={adding} style={{ background: adding ? "#93c5fd" : "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: adding ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit", whiteSpace: "nowrap", alignSelf: "flex-end", width: isMobile ? "100%" : "auto" }}>
          {adding ? "⏳ Adding..." : "+ Add College"}
        </button>
      </div>
      {msg && <div style={{ padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", marginBottom: "16px", background: msg.type === "success" ? "#f0fdf4" : "#fef2f2", color: msg.type === "success" ? "#15803d" : "#b91c1c", border: `1px solid ${msg.type === "success" ? "#bbf7d0" : "#fecaca"}` }}>{msg.text}</div>}
      {colleges.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>🏫 Koi college nahi hai. Upar form se add karein.</p>
      ) : (
        <div style={{ display: "block", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "500px" }}>
            <thead><tr>
              {["#","Code","Name","Location","Action"].map(h => <th key={h} style={{ background: "#f8fafc", padding: "10px 16px", textAlign: "left", fontSize: "11px", color: "#64748b", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.04em" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {colleges.map((c, idx) => (
                <tr key={c._id}>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</td>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}><span style={{ background: "#eff6ff", color: "#1e40af", padding: "3px 10px", borderRadius: "6px", fontWeight: "700", fontSize: "12px", fontFamily: "monospace" }}>{c.code}</span></td>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontWeight: 500, color: "#0f172a" }}>{c.name}</td>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", color: "#64748b" }}>{c.location || "—"}</td>
                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
                    <button onClick={() => handleDelete(c._id)} disabled={deletingId === c._id} style={{ background: "#fef2f2", color: "#dc2626", padding: "6px 14px", borderRadius: "6px", border: "1px solid #fecaca", cursor: deletingId === c._id ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", opacity: deletingId === c._id ? 0.6 : 1 }}>{deletingId === c._id ? "Deleting..." : "Delete"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Main AdminDashboard ─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate(); // ✅ FIX: useNavigate hook yahan call kiya
  const [active, setActive] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({ complaints: [], students: [], colleges: [], sessions: [], logs: [], forumPosts: [] });

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = ['complaint','student','college','session','forum/posts','user-logs'];
      const results = await Promise.all(
        endpoints.map(e => fetch(`${API}/${e}`).then(async res => {
          if (!res.ok) return { data: [] };
          const json = await res.json();
          return { data: Array.isArray(json) ? json : (json.data ?? []) };
        }).catch(() => ({ data: [] })))
      );
      setData({ complaints: results[0].data, students: results[1].data, colleges: results[2].data, sessions: results[3].data, forumPosts: results[4].data, logs: results[5].data });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen, isMobile]);

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const handleNavClick = (id) => {
    setActive(id);
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  const navGroups = [
    { label: "Core", items: [
      { id: "dashboard", icon: "🏠", label: "Overview" },
      { id: "college",   icon: "🏫", label: "Colleges" },
      { id: "session",   icon: "📅", label: "Sessions" },
    ]},
    { label: "Management", items: [
      { id: "complaints", icon: "📂", label: "Complaints" },
      { id: "user-logs",  icon: "📜", label: "User Logs" },
    ]},
    { label: "Safety & Community", items: [
      { id: "blocked", icon: "🚫", label: "Blocked Users" },
      { id: "forum",   icon: "💬", label: "Forum" },
    ]},
    { label: "System", items: [
      { id: "password", icon: "🔒", label: "Security" },
    ]},
  ];

  const pageTitle = navGroups.flatMap(g => g.items).find(i => i.id === active)?.label || active;

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap: isMobile ? "10px" : "16px", marginBottom: "28px" }}>
            {[
              { label: "Total Complaints",    val: data.complaints.length },
              { label: "Active Colleges",     val: data.colleges.length },
              { label: "Registered Students", val: data.students.length },
              { label: "Total Logs",          val: data.logs.length },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: isMobile ? "16px" : "20px 24px" }}>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700", marginBottom: "10px", letterSpacing: "0.05em" }}>{s.label}</div>
                <div style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: "700", color: loading ? "#D1D5DB" : "#0f172a" }}>{loading ? "—" : s.val}</div>
              </div>
            ))}
          </div>
        );
      case "college":    return <CollegeManagement colleges={data.colleges} fetchData={fetchData} />;
      case "complaints": return <ComplaintManagement complaints={data.complaints} fetchData={fetchData} />;
      case "session":    return <SessionManagement sessions={data.sessions} fetchData={fetchData} />;
      case "blocked":
        return (
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: isMobile ? "16px" : "24px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Blocked Users</h2>
            </div>
            <div style={{ display: "block", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "400px" }}>
                <thead><tr>
                  {["Name","Email","Reason","Action"].map(h => <th key={h} style={{ background: "#f8fafc", padding: "10px 16px", textAlign: "left", fontSize: "11px", color: "#64748b", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.04em" }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {data.students.filter(s => s.isBlocked).length === 0
                    ? <tr><td colSpan={4} style={{ textAlign: "center", color: "#94a3b8", padding: "30px", fontSize: "14px" }}>Koi blocked user nahi hai</td></tr>
                    : data.students.filter(s => s.isBlocked).map(s => (
                      <tr key={s._id}>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#0f172a" }}>{s.name}</td>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#0f172a" }}>{s.email}</td>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#0f172a" }}>Terms Violation</td>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}><button style={{ background: "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}>Unblock</button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        );
      case "forum":    return <ForumAdmin posts={data.forumPosts} fetchData={fetchData} />;
      case "password": return <ChangePassword />;
      case "user-logs":
        return (
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: isMobile ? "16px" : "24px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: "10px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", margin: 0 }}>User Logs</h2>
              <button onClick={fetchData} style={{ background: "#1d4ed8", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}>🔄 Refresh</button>
            </div>
            {data.logs.length === 0 ? (
              <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📜 Koi log nahi hai. Student login/logout kare tab dikhai dega.</p>
            ) : (
              <div style={{ display: "block", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "600px" }}>
                  <thead><tr>
                    {["#","User Name","Email","Action","IP Address","Date & Time"].map(h => <th key={h} style={{ background: "#f8fafc", padding: "10px 16px", textAlign: "left", fontSize: "11px", color: "#64748b", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.04em" }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {data.logs.map((log, idx) => (
                      <tr key={log._id}>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", color: "#94a3b8", fontWeight: 600, fontSize: "14px" }}>{idx + 1}</td>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontWeight: 500, color: "#0f172a", fontSize: "14px" }}>{log.userName}</td>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", color: "#64748b", fontSize: "14px" }}>{log.userEmail}</td>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                          {log.action === "login"
                            ? <span style={{ background: "#f0fdf4", color: "#15803d", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>🟢 Login</span>
                            : <span style={{ background: "#fef2f2", color: "#b91c1c", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>🔴 Logout</span>}
                        </td>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", color: "#64748b", fontSize: "12px", fontFamily: "monospace" }}>{log.ipAddress || "—"}</td>
                        <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", color: "#64748b", fontSize: "12px" }}>{new Date(log.createdAt).toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  const SidebarContent = () => (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 8px 28px", borderBottom: "1px solid #1e293b", marginBottom: "16px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "#fff", flexShrink: 0 }}>A</div>
        <span style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: "600" }}>Admin Panel</span>
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)}
            style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "22px", cursor: "pointer", marginLeft: "auto", lineHeight: 1, padding: "2px 6px", flexShrink: 0 }}>✕</button>
        )}
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
        {navGroups.map(group => (
          <div key={group.label}>
            <div style={{ fontSize: "11px", color: "#475569", textTransform: "uppercase", fontWeight: "700", margin: "16px 0 6px 14px", letterSpacing: "0.06em" }}>{group.label}</div>
            {group.items.map(item => {
              const isActive = active === item.id;
              return (
                <div key={item.id} onClick={() => handleNavClick(item.id)}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "8px", cursor: "pointer", color: isActive ? "#f1f5f9" : "#64748b", fontSize: "14px", fontWeight: isActive ? "500" : "400", background: isActive ? "#1e293b" : "transparent", borderLeft: `3px solid ${isActive ? "#1d4ed8" : "transparent"}`, transition: "all 0.15s" }}>
                  <span style={{ fontSize: "15px" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      <button onClick={handleLogout}
        style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "8px", cursor: "pointer", color: "#f87171", fontSize: "14px", marginTop: "8px", background: "none", border: "none", width: "100%", textAlign: "left", fontFamily: "inherit" }}>
        🚪 Logout Session
      </button>

      <div style={{ marginTop: "auto", borderTop: "1px solid #1e293b", paddingTop: "16px" }}>
        <div style={{ padding: "10px 12px", background: "#1e293b", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "600", color: "#fff", flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#f1f5f9" }}>Administrator</div>
            <div style={{ fontSize: "11px", color: "#475569" }}>Super Admin</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif", position: "relative" }}>

      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} />
      )}

      <aside style={{
        width: "240px",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "24px 14px",
        flexShrink: 0,
        overflowY: "auto",
        ...(isMobile ? {
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          zIndex: 50,
          width: "260px",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        } : {
          position: "relative",
          transform: "none",
          transition: "none",
        })
      }}>
        <SidebarContent />
      </aside>

      <main style={{ flex: 1, background: "#f8fafc", overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>

        <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: isMobile ? "0 14px" : "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: isMobile ? "56px" : "60px", position: "sticky", top: 0, zIndex: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)}
                style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: "7px", width: "36px", height: "36px", fontSize: "18px", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
            )}
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{pageTitle}</span>
          </div>
          {!isMobile && (
            <span style={{ fontSize: "13px", color: "#64748b" }}>Mohd Hasan P G College</span>
          )}
        </div>

        <div style={{ padding: isMobile ? "14px" : "32px", maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
              <div style={{ fontSize: "14px" }}>Backend se data load ho raha hai...</div>
            </div>
          ) : renderContent()}
        </div>
      </main>
    </div>
  );
}