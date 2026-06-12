// import React, { useState, useEffect } from "react";

// const styles = `
// * { box-sizing: border-box; margin: 0; padding: 0; }
// body { font-family: 'Inter', system-ui, sans-serif; }
// .wrap { display: flex; min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; }
// .sidebar { width: 240px; background: #0f172a; display: flex; flex-direction: column; padding: 24px 14px; flex-shrink: 0; overflow-y: auto; }
// .brand { display: flex; align-items: center; gap: 10px; padding: 0 8px 28px; border-bottom: 1px solid #1e293b; margin-bottom: 16px; }
// .brand-icon { width: 36px; height: 36px; border-radius: 10px; background: #1d4ed8; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #fff; flex-shrink: 0; }
// .brand-text { color: #f1f5f9; font-size: 16px; font-weight: 600; }
// .nav-group-label { font-size: 11px; color: #475569; text-transform: uppercase; font-weight: 700; margin: 16px 0 6px 14px; letter-spacing: 0.06em; }
// .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; cursor: pointer; color: #64748b; font-size: 14px; transition: all 0.15s; border-left: 3px solid transparent; }
// .nav-item:hover { background: #1e293b; color: #f1f5f9; }
// .nav-item.active { background: #1e293b; color: #f1f5f9; font-weight: 500; border-left-color: #1d4ed8; }
// .spacer { flex: 1; }
// .logout { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; cursor: pointer; color: #f87171; font-size: 14px; margin-top: 8px; transition: background 0.15s; border: none; background: none; width: 100%; text-align: left; font-family: inherit; }
// .logout:hover { background: rgba(248,113,113,0.08); }
// .main { flex: 1; background: #f8fafc; overflow-y: auto; display: flex; flex-direction: column; min-width: 0; }
// .topbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 60px; position: sticky; top: 0; z-index: 50; }
// .topbar-title { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
// .topbar-left { display: flex; align-items: center; gap: 12px; }
// .hamburger-btn { display: none; align-items: center; justify-content: center; background: none; border: 1px solid #e2e8f0; border-radius: 7px; width: 36px; height: 36px; font-size: 18px; cursor: pointer; flex-shrink: 0; line-height: 1; }
// .content { padding: 32px; max-width: 1200px; margin: 0 auto; width: 100%; }
// .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 28px; }
// .stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; }
// .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; letter-spacing: 0.05em; }
// .stat-val { font-size: 28px; font-weight: 700; color: #0f172a; }
// .section-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
// .section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
// .section-head h2 { font-size: 16px; font-weight: 600; color: #0f172a; }
// .user-table { width: 100%; border-collapse: separate; border-spacing: 0; }
// .user-table th { background: #f8fafc; padding: 10px 16px; text-align: left; font-size: 11px; color: #64748b; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em; }
// .user-table td { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; }
// .btn-primary { background: #1d4ed8; color: #fff; padding: 9px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; transition: opacity 0.15s; display: inline-flex; align-items: center; justify-content: center; }
// .btn-primary:hover { opacity: 0.88; }
// .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
// .btn-danger { background: #fef2f2; color: #dc2626; padding: 6px 14px; border-radius: 6px; border: 1px solid #fecaca; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 600; transition: background 0.15s; display: inline-flex; align-items: center; justify-content: center; }
// .btn-danger:hover { background: #fee2e2; }
// .btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }
// .inp { width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: inherit; font-size: 14px; outline: none; transition: border 0.2s; background: #fff; color: #0f172a; }
// .inp:focus { border-color: #1d4ed8; box-shadow: 0 0 0 3px rgba(29,78,216,0.1); }
// .btn-resolve { color: #15803d; border: 1px solid #86efac; background: #f0fdf4; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; }
// .btn-resolve:hover { background: #dcfce7; }
// .btn-pending  { color: #1e40af; border: 1px solid #93c5fd; background: #eff6ff; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; }
// .btn-pending:hover { background: #dbeafe; }
// .btn-reject   { color: #b91c1c; border: 1px solid #fca5a5; background: #fef2f2; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; }
// .btn-reject:hover { background: #fee2e2; }
// .badge-resolved   { background: #f0fdf4; color: #15803d; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
// .badge-pending    { background: #fffbeb; color: #92400e; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
// .badge-rejected   { background: #fef2f2; color: #991b1b; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
// .badge-inprogress { background: #eff6ff; color: #1e40af; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
// .badge-login  { background: #f0fdf4; color: #15803d; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
// .badge-logout { background: #fef2f2; color: #b91c1c; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
// .form-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; }
// .form-field { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 140px; }
// .form-field label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
// .msg { padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; margin-bottom: 16px; }
// .msg.success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
// .msg.error   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
// .code-badge { background: #eff6ff; color: #1e40af; padding: 3px 10px; border-radius: 6px; font-weight: 700; font-size: 12px; font-family: monospace; }
// .user-chip { margin-top: auto; border-top: 1px solid #1e293b; padding-top: 16px; }
// .user-chip-inner { padding: 10px 12px; background: #1e293b; border-radius: 10px; display: flex; align-items: center; gap: 10px; }
// .user-avatar { width: 32px; height: 32px; border-radius: 50%; background: #1d4ed8; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: #fff; flex-shrink: 0; }
// .sidebar-close-btn { display: none; background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; margin-left: auto; line-height: 1; padding: 2px 4px; }
// .overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99; }

// @media (max-width: 768px) {
//   .wrap { flex-direction: row; }

//   .sidebar {
//     position: fixed;
//     top: 0;
//     left: 0;
//     height: 100vh;
//     width: 260px;
//     z-index: 100;
//     transform: translateX(-100%);
//     transition: transform 0.25s ease;
//     padding: 16px 12px;
//   }

//   .sidebar.open {
//     transform: translateX(0);
//   }

//   .overlay.open {
//     display: block;
//   }

//   .sidebar-close-btn {
//     display: block;
//   }

//   .hamburger-btn {
//     display: flex;
//   }

//   .main {
//     width: 100%;
//     margin-left: 0;
//   }

//   .topbar {
//     padding: 0 14px;
//     height: auto;
//     min-height: 56px;
//   }

//   .topbar-college {
//     display: none;
//   }

//   .content {
//     padding: 14px;
//   }

//   .stat-grid {
//     grid-template-columns: 1fr 1fr;
//     gap: 10px;
//   }

//   .form-box {
//     flex-direction: column;
//     align-items: stretch;
//   }

//   .form-field {
//     width: 100%;
//     min-width: unset;
//   }

//   .table-wrapper {
//     display: block;
//     overflow-x: auto;
//     -webkit-overflow-scrolling: touch;
//   }

//   .user-table {
//     min-width: 500px;
//   }

//   .section-head {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;
//   }

//   .btn-resolve,
//   .btn-pending,
//   .btn-reject {
//     flex: 1;
//   }

//   .section-card {
//     padding: 16px;
//   }
// }
// `;

// const API = "https://studentsportal-x37v.onrender.com/api";

// // ─── ChangePassword ──────────────────────────────────────────────────────────
// function ChangePassword() {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [msg, setMsg] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpdate = async () => {
//     setMsg(null);
//     if (!oldPassword || !newPassword) {
//       setMsg({ type: "error", text: "❗ Dono fields fill karna zaroori hai" });
//       return;
//     }
//     if (newPassword.length < 6) {
//       setMsg({ type: "error", text: "❗ New password kam se kam 6 characters ka hona chahiye" });
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/admin/change-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ oldPassword, newPassword }),
//       });
//       const json = await res.json().catch(() => ({}));
//       if (res.ok) {
//         setMsg({ type: "success", text: "✅ Password successfully update ho gaya!" });
//         setOldPassword("");
//         setNewPassword("");
//       } else {
//         setMsg({ type: "error", text: `❌ ${json.msg || "Password update nahi ho saka"}` });
//       }
//     } catch {
//       setMsg({ type: "error", text: "❌ Server se connect nahi ho saka" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="section-card" style={{ maxWidth: "480px" }}>
//       <div className="section-head"><h2>Change Password</h2></div>
//       <div style={{ marginBottom: "14px" }}>
//         <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
//           Old Password
//         </label>
//         <input
//           className="inp"
//           type="password"
//           placeholder="Current password dalein"
//           value={oldPassword}
//           onChange={e => setOldPassword(e.target.value)}
//         />
//       </div>
//       <div style={{ marginBottom: "20px" }}>
//         <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
//           New Password
//         </label>
//         <input
//           className="inp"
//           type="password"
//           placeholder="Naya password dalein (min 6 char)"
//           value={newPassword}
//           onChange={e => setNewPassword(e.target.value)}
//         />
//       </div>
//       {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
//       <button className="btn-primary" onClick={handleUpdate} disabled={loading}>
//         {loading ? "⏳ Updating..." : "🔒 Update Password"}
//       </button>
//     </div>
//   );
// }

// // ─── ForumAdmin ──────────────────────────────────────────────────────────────
// function ForumAdmin({ posts, fetchData }) {
//   const [replyText, setReplyText] = useState({});
//   const [msg, setMsg] = useState({});

//   const handleAdminReply = async (postId) => {
//     const reply = replyText[postId];
//     if (!reply?.trim()) return;
//     try {
//       const res = await fetch(`${API}/forum/posts/${postId}/admin-reply`, {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reply }),
//       });
//       if (res.ok) { setMsg(p => ({ ...p, [postId]: "✅ Reply sent & resolved!" })); setReplyText(p => ({ ...p, [postId]: "" })); fetchData(); }
//       else setMsg(p => ({ ...p, [postId]: "❌ Reply send nahi ho saka" }));
//     } catch { setMsg(p => ({ ...p, [postId]: "❌ Server error" })); }
//   };

//   const handleDelete = async (postId) => {
//     if (!window.confirm("Kya aap ye post delete karna chahte hain?")) return;
//     try {
//       const res = await fetch(`${API}/forum/posts/${postId}`, { method: "DELETE" });
//       if (res.ok) fetchData(); else alert("❌ Post delete nahi ho saki.");
//     } catch { alert("❌ Server se connect nahi ho saka."); }
//   };

//   return (
//     <div className="section-card">
//       <div className="section-head"><h2>Discussion Forum</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
//       {posts.length === 0 ? (
//         <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>💬 Koi discussion nahi hai abhi</p>
//       ) : posts.map(post => (
//         <div key={post._id} style={{ marginBottom: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
//           <div style={{ padding: "16px 20px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
//                 <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "500", color: "#0f172a" }}>{post.title}</h4>
//                 <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", background: post.status === "resolved" ? "#f0fdf4" : "#fffbeb", color: post.status === "resolved" ? "#15803d" : "#92400e" }}>
//                   {post.status === "resolved" ? "✅ Resolved" : "⏳ Open"}
//                 </span>
//               </div>
//               <p style={{ margin: "6px 0 4px", fontSize: "13px", color: "#64748b" }}>{post.content || "No description"}</p>
//               <small style={{ color: "#94a3b8" }}>By <b>{post.authorName || "Student"}</b> · {new Date(post.createdAt).toLocaleDateString("en-IN")} · {post.replies?.length || 0} replies</small>
//             </div>
//             <button className="btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
//           </div>
//           {post.replies?.length > 0 && (
//             <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: "8px", background: "#fff" }}>
//               {post.replies.map((r, i) => (
//                 <div key={i} style={{ padding: "10px 14px", background: r.isAdmin ? "#eff6ff" : "#f0fdf4", borderLeft: `3px solid ${r.isAdmin ? "#1d4ed8" : "#10B981"}`, borderRadius: "0 6px 6px 0" }}>
//                   <b style={{ fontSize: "12px", color: r.isAdmin ? "#1e40af" : "#15803d" }}>{r.isAdmin ? "👨‍💼 Admin" : `👤 ${r.authorName}`}</b>
//                   <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#374151" }}>{r.reply}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//           {post.status !== "resolved" && (
//             <div style={{ padding: "14px 20px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
//               <textarea rows={2} placeholder="Admin reply likhein aur issue resolve karein..." value={replyText[post._id] || ""} onChange={e => setReplyText(p => ({ ...p, [post._id]: e.target.value }))} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", resize: "none", fontSize: "13px", outline: "none", marginBottom: "8px", fontFamily: "inherit" }} />
//               {msg[post._id] && <div style={{ fontSize: "12px", marginBottom: "8px", color: msg[post._id].includes("✅") ? "#15803d" : "#dc2626" }}>{msg[post._id]}</div>}
//               <button className="btn-primary" onClick={() => handleAdminReply(post._id)}>✅ Reply & Mark Resolved</button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── SessionManagement ───────────────────────────────────────────────────────
// function SessionManagement({ sessions, fetchData }) {
//   const [form, setForm] = useState({ name: "", description: "" });
//   const [msg, setMsg] = useState(null);
//   const [adding, setAdding] = useState(false);
//   const [closingId, setClosingId] = useState(null);

//   const handleAdd = async () => {
//     if (!form.name.trim()) { setMsg({ type: "error", text: "❗ Session Name required hai" }); return; }
//     setAdding(true); setMsg(null);
//     try {
//       const res = await fetch(`${API}/session`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name.trim(), description: form.description.trim() }) });
//       if (res.ok) { setMsg({ type: "success", text: "✅ Session successfully add ho gaya!" }); setForm({ name: "", description: "" }); fetchData(); }
//       else { const err = await res.json().catch(() => ({})); setMsg({ type: "error", text: `❌ ${err.msg || "Session add nahi ho saka"}` }); }
//     } catch { setMsg({ type: "error", text: "❌ Server se connect nahi ho saka" }); }
//     finally { setAdding(false); }
//   };

//   const handleClose = async (id) => {
//     if (!window.confirm("Ye session close karna chahte hain?")) return;
//     setClosingId(id);
//     try {
//       const res = await fetch(`${API}/session/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: false }) });
//       if (res.ok) fetchData(); else alert("❌ Session close nahi ho saka");
//     } catch { alert("❌ Server error"); }
//     finally { setClosingId(null); }
//   };

//   return (
//     <div className="section-card">
//       <div className="section-head"><h2>Session Management</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
//       <div className="form-box">
//         <div className="form-field"><label>Session Name *</label><input className="inp" placeholder="e.g. 2024-25" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
//         <div className="form-field"><label>Description</label><input className="inp" placeholder="e.g. Annual session" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
//         <button className="btn-primary" onClick={handleAdd} disabled={adding} style={{ whiteSpace: "nowrap", alignSelf: "flex-end" }}>{adding ? "⏳ Adding..." : "+ Add Session"}</button>
//       </div>
//       {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
//       {sessions.length === 0 ? (
//         <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📅 Koi session nahi hai. Upar form se add karein.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="user-table">
//             <thead><tr><th>#</th><th>Name</th><th>Description</th><th>Status</th><th>Action</th></tr></thead>
//             <tbody>
//               {sessions.map((s, idx) => (
//                 <tr key={s._id}>
//                   <td style={{ color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</td>
//                   <td style={{ fontWeight: 500 }}>{s.name}</td>
//                   <td style={{ color: "#64748b" }}>{s.description || "—"}</td>
//                   <td>{s.isActive ? <span className="badge-resolved">✅ Active</span> : <span className="badge-rejected">❌ Closed</span>}</td>
//                   <td>{s.isActive && <button className="btn-danger" onClick={() => handleClose(s._id)} disabled={closingId === s._id}>{closingId === s._id ? "Closing..." : "Close"}</button>}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── ComplaintManagement ─────────────────────────────────────────────────────
// function ComplaintManagement({ complaints, fetchData }) {
//   const [replyText, setReplyText] = useState({});
//   const [msg, setMsg] = useState({});

//   const handleAction = async (id, status) => {
//     const adminResponse = replyText[id]?.trim();
//     if (!adminResponse) { setMsg(p => ({ ...p, [id]: "❗ Pehle reply likhein" })); return; }
//     try {
//       const res = await fetch(`${API}/complaint/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminResponse, status }) });
//       if (res.ok) { setMsg(p => ({ ...p, [id]: `✅ Complaint ${status} kar di gayi!` })); setReplyText(p => ({ ...p, [id]: "" })); fetchData(); }
//       else setMsg(p => ({ ...p, [id]: "❌ Action fail ho gaya" }));
//     } catch { setMsg(p => ({ ...p, [id]: "❌ Server error" })); }
//   };

//   const getBadge = (status) => {
//     if (status === "closed" || status === "resolved") return <span className="badge-resolved">✅ Resolved</span>;
//     if (status === "rejected") return <span className="badge-rejected">❌ Rejected</span>;
//     if (status === "in-progress") return <span className="badge-inprogress">🔄 In Progress</span>;
//     return <span className="badge-pending">⏳ Pending</span>;
//   };

//   return (
//     <div className="section-card">
//       <div className="section-head"><h2>Complaint Management</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
//       {complaints.length === 0 ? (
//         <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📭 Koi complaint nahi hai abhi</p>
//       ) : complaints.map(c => {
//         const isResolved = c.status === "closed" || c.status === "resolved";
//         return (
//           <div key={c._id} style={{ marginBottom: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
//             <div style={{ padding: "16px 20px", background: "#f8fafc" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
//                 <b style={{ fontSize: "14px", color: "#0f172a" }}>{c.complaintType?.name || "General"}</b>
//                 {getBadge(c.status)}
//               </div>
//               <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 6px" }}>{c.complaintText}</p>
//               <small style={{ color: "#94a3b8" }}>By <b>{c.studentId?.name || "Student"}</b> · {c.studentId?.email} · {new Date(c.createdAt).toLocaleDateString("en-IN")}</small>
//             </div>
//             <div style={{ padding: "16px 20px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
//               {c.adminResponse && (
//                 <div style={{ marginBottom: "14px", padding: "12px 16px", background: "#f0fdf4", borderLeft: "3px solid #10B981", borderRadius: "0 8px 8px 0" }}>
//                   <div style={{ fontSize: "11px", color: "#15803d", fontWeight: "700", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Admin Response</div>
//                   <div style={{ fontSize: "13px", color: "#374151" }}>{c.adminResponse}</div>
//                 </div>
//               )}
//               {!isResolved ? (
//                 <>
//                   <textarea rows={3} placeholder="Student ko reply likhein..." value={replyText[c._id] || ""} onChange={e => setReplyText(p => ({ ...p, [c._id]: e.target.value }))} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", resize: "none", fontSize: "13px", outline: "none", marginBottom: "12px", fontFamily: "inherit" }} />
//                   {msg[c._id] && <div style={{ fontSize: "12px", marginBottom: "10px", color: msg[c._id].includes("✅") ? "#15803d" : "#dc2626", fontWeight: "600" }}>{msg[c._id]}</div>}
//                   <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//                     <button className="btn-resolve" onClick={() => handleAction(c._id, "resolved")}>✅ Resolve</button>
//                     <button className="btn-pending" onClick={() => handleAction(c._id, "pending")}>⏳ Pending</button>
//                     <button className="btn-reject"  onClick={() => handleAction(c._id, "rejected")}>❌ Reject</button>
//                   </div>
//                 </>
//               ) : (
//                 <div style={{ padding: "10px 14px", background: "#f0fdf4", borderRadius: "8px", fontSize: "13px", color: "#15803d", fontWeight: "500" }}>✅ Ye complaint already {c.status} hai</div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─── CollegeManagement ───────────────────────────────────────────────────────
// function CollegeManagement({ colleges, fetchData }) {
//   const [form, setForm] = useState({ name: "", code: "", location: "" });
//   const [msg, setMsg] = useState(null);
//   const [adding, setAdding] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const handleAdd = async () => {
//     if (!form.name.trim()) { setMsg({ type: "error", text: "❗ College Name required hai" }); return; }
//     if (!form.code.trim()) { setMsg({ type: "error", text: "❗ College Code required hai" }); return; }
//     setAdding(true); setMsg(null);
//     try {
//       const res = await fetch(`${API}/college`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name.trim(), code: form.code.trim(), location: form.location.trim() }) });
//       if (res.ok) { setMsg({ type: "success", text: "✅ College successfully add ho gaya!" }); setForm({ name: "", code: "", location: "" }); fetchData(); }
//       else { const err = await res.json().catch(() => ({})); setMsg({ type: "error", text: `❌ ${err.message || "College add nahi ho saka"}` }); }
//     } catch { setMsg({ type: "error", text: "❌ Server se connect nahi ho saka." }); }
//     finally { setAdding(false); }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Kya aap ye college delete karna chahte hain?")) return;
//     setDeletingId(id);
//     try {
//       const res = await fetch(`${API}/college/${id}`, { method: "DELETE" });
//       if (res.ok) fetchData(); else alert("❌ College delete nahi ho saka.");
//     } catch { alert("❌ Server se connect nahi ho saka."); }
//     finally { setDeletingId(null); }
//   };

//   return (
//     <div className="section-card">
//       <div className="section-head"><h2>College Management</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
//       <div className="form-box">
//         <div className="form-field"><label>College Name *</label><input className="inp" placeholder="e.g. Government Polytechnic" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
//         <div className="form-field"><label>College Code *</label><input className="inp" placeholder="e.g. GP001" value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
//         <div className="form-field"><label>Location</label><input className="inp" placeholder="e.g. Lucknow, UP" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
//         <button className="btn-primary" onClick={handleAdd} disabled={adding} style={{ whiteSpace: "nowrap", alignSelf: "flex-end" }}>{adding ? "⏳ Adding..." : "+ Add College"}</button>
//       </div>
//       {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
//       {colleges.length === 0 ? (
//         <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>🏫 Koi college nahi hai. Upar form se add karein.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="user-table">
//             <thead><tr><th>#</th><th>Code</th><th>Name</th><th>Location</th><th>Action</th></tr></thead>
//             <tbody>
//               {colleges.map((c, idx) => (
//                 <tr key={c._id}>
//                   <td style={{ color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</td>
//                   <td><span className="code-badge">{c.code}</span></td>
//                   <td style={{ fontWeight: 500 }}>{c.name}</td>
//                   <td style={{ color: "#64748b" }}>{c.location || "—"}</td>
//                   <td><button className="btn-danger" onClick={() => handleDelete(c._id)} disabled={deletingId === c._id}>{deletingId === c._id ? "Deleting..." : "Delete"}</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main AdminDashboard ─────────────────────────────────────────────────────
// export default function AdminDashboard() {
//   const [active, setActive] = useState("dashboard");
//   const [loading, setLoading] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [data, setData] = useState({ complaints: [], students: [], colleges: [], sessions: [], logs: [], forumPosts: [] });

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const endpoints = ['complaint','student','college','session','forum/posts','user-logs'];
//       const results = await Promise.all(
//         endpoints.map(e => fetch(`${API}/${e}`).then(async res => {
//           if (!res.ok) return { data: [] };
//           const json = await res.json();
//           return { data: Array.isArray(json) ? json : (json.data ?? []) };
//         }).catch(() => ({ data: [] })))
//       );
//       setData({ complaints: results[0].data, students: results[1].data, colleges: results[2].data, sessions: results[3].data, forumPosts: results[4].data, logs: results[5].data });
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchData(); }, []);

//   // Body scroll lock jab sidebar open ho
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => { document.body.style.overflow = ""; };
//   }, [sidebarOpen]);

//   const handleNavClick = (id) => {
//     setActive(id);
//     setSidebarOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   const renderContent = () => {
//     switch (active) {
//       case "dashboard":
//         return (
//           <div className="stat-grid">
//             <div className="stat-card"><div className="stat-label">Total Complaints</div><div className="stat-val">{data.complaints.length}</div></div>
//             <div className="stat-card"><div className="stat-label">Active Colleges</div><div className="stat-val">{data.colleges.length}</div></div>
//             <div className="stat-card"><div className="stat-label">Registered Students</div><div className="stat-val">{data.students.length}</div></div>
//             <div className="stat-card"><div className="stat-label">Total Logs</div><div className="stat-val">{data.logs.length}</div></div>
//           </div>
//         );
//       case "college": return <CollegeManagement colleges={data.colleges} fetchData={fetchData} />;
//       case "complaints": return <ComplaintManagement complaints={data.complaints} fetchData={fetchData} />;
//       case "session": return <SessionManagement sessions={data.sessions} fetchData={fetchData} />;
//       case "blocked":
//         return (
//           <div className="section-card">
//             <div className="section-head"><h2>Blocked Users</h2></div>
//             <div className="table-wrapper">
//               <table className="user-table">
//                 <thead><tr><th>Name</th><th>Email</th><th>Reason</th><th>Action</th></tr></thead>
//                 <tbody>
//                   {data.students.filter(s => s.isBlocked).length === 0
//                     ? <tr><td colSpan={4} style={{ textAlign: "center", color: "#94a3b8", padding: "30px" }}>Koi blocked user nahi hai</td></tr>
//                     : data.students.filter(s => s.isBlocked).map(s => (
//                       <tr key={s._id}><td>{s.name}</td><td>{s.email}</td><td>Terms Violation</td><td><button className="btn-primary">Unblock</button></td></tr>
//                     ))
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       case "forum": return <ForumAdmin posts={data.forumPosts} fetchData={fetchData} />;
//       case "password":
//         return <ChangePassword />;
//       case "user-logs":
//         return (
//           <div className="section-card">
//             <div className="section-head"><h2>User Logs</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
//             {data.logs.length === 0 ? (
//               <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📜 Koi log nahi hai. Student login/logout kare tab dikhai dega.</p>
//             ) : (
//               <div className="table-wrapper">
//                 <table className="user-table">
//                   <thead><tr><th>#</th><th>User Name</th><th>Email</th><th>Action</th><th>IP Address</th><th>Date & Time</th></tr></thead>
//                   <tbody>
//                     {data.logs.map((log, idx) => (
//                       <tr key={log._id}>
//                         <td style={{ color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</td>
//                         <td style={{ fontWeight: 500 }}>{log.userName}</td>
//                         <td style={{ color: "#64748b" }}>{log.userEmail}</td>
//                         <td>{log.action === "login" ? <span className="badge-login">🟢 Login</span> : <span className="badge-logout">🔴 Logout</span>}</td>
//                         <td style={{ color: "#64748b", fontSize: "12px", fontFamily: "monospace" }}>{log.ipAddress || "—"}</td>
//                         <td style={{ color: "#64748b", fontSize: "12px" }}>{new Date(log.createdAt).toLocaleString("en-IN")}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         );
//       default: return <div>Select an option</div>;
//     }
//   };

//   const navGroups = [
//     { label: "Core", items: [
//       { id: "dashboard", icon: "🏠", label: "Overview" },
//       { id: "college",   icon: "🏫", label: "Colleges" },
//       { id: "session",   icon: "📅", label: "Sessions" },
//     ]},
//     { label: "Management", items: [
//       { id: "complaints", icon: "📂", label: "Complaints" },
//       { id: "user-logs",  icon: "📜", label: "User Logs" },
//     ]},
//     { label: "Safety & Community", items: [
//       { id: "blocked", icon: "🚫", label: "Blocked Users" },
//       { id: "forum",   icon: "💬", label: "Forum" },
//     ]},
//     { label: "System", items: [
//       { id: "password", icon: "🔒", label: "Security" },
//     ]},
//   ];

//   const pageTitle = navGroups.flatMap(g => g.items).find(i => i.id === active)?.label || active;

//   return (
//     <div className="wrap">
//       <style>{styles}</style>

//       {/* Overlay — mobile pe sidebar ke peeche dark background */}
//       <div
//         className={`overlay ${sidebarOpen ? "open" : ""}`}
//         onClick={() => setSidebarOpen(false)}
//       />

//       {/* Sidebar */}
//       <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <div className="brand">
//           <div className="brand-icon">A</div>
//           <div className="brand-text">Admin Panel</div>
//           {/* Mobile close button */}
//           <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
//         </div>

//         {navGroups.map(group => (
//           <div key={group.label}>
//             <div className="nav-group-label">{group.label}</div>
//             {group.items.map(item => (
//               <div
//                 key={item.id}
//                 className={`nav-item ${active === item.id ? "active" : ""}`}
//                 onClick={() => handleNavClick(item.id)}
//               >
//                 <span style={{ fontSize: "15px" }}>{item.icon}</span>
//                 <span>{item.label}</span>
//               </div>
//             ))}
//           </div>
//         ))}

//         <div className="spacer" />
//         <button className="logout" onClick={handleLogout}>🚪 Logout Session</button>

//         <div className="user-chip">
//           <div className="user-chip-inner">
//             <div className="user-avatar">A</div>
//             <div>
//               <div style={{ fontSize: "13px", fontWeight: "500", color: "#f1f5f9" }}>Administrator</div>
//               <div style={{ fontSize: "11px", color: "#475569" }}>Super Admin</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="main">
//         <div className="topbar">
//           <div className="topbar-left">
//             {/* Hamburger — sirf mobile pe dikhega */}
//             <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>☰</button>
//             <span className="topbar-title">{pageTitle}</span>
//           </div>
//           <span className="topbar-college" style={{ fontSize: "13px", color: "#64748b" }}>
//             Mohd Hasan P G College
//           </span>
//         </div>

//         <div className="content">
//           {loading ? (
//             <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
//               <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
//               <div style={{ fontSize: "14px" }}>Backend se data load ho raha hai...</div>
//             </div>
//           ) : renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";

const styles = `
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.x/tabler-icons.min.css');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --sidebar-width: 240px;
  --topbar-height: 60px;
  --sidebar-bg: #0f172a;
  --sidebar-border: #1e293b;
  --sidebar-text: #64748b;
  --sidebar-active-bg: #1e293b;
  --sidebar-active-text: #f1f5f9;
  --sidebar-active-accent: #1d4ed8;
  --sidebar-label: #475569;
  --brand-bg: #1d4ed8;
  --surface: #ffffff;
  --surface-2: #f8fafc;
  --border: #e2e8f0;
  --border-light: #f1f5f9;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --accent: #1d4ed8;
  --accent-hover: rgba(29,78,216,0.08);
  --danger-text: #dc2626;
  --danger-bg: #fef2f2;
  --danger-border: #fecaca;
  --danger-hover: #fee2e2;
  --success-text: #15803d;
  --success-bg: #f0fdf4;
  --success-border: #bbf7d0;
  --warning-text: #92400e;
  --warning-bg: #fffbeb;
  --info-text: #1e40af;
  --info-bg: #eff6ff;
  --info-border: #93c5fd;
  --rejected-text: #991b1b;
  --rejected-bg: #fef2f2;
  --in-progress-text: #1e40af;
  --in-progress-bg: #eff6ff;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
}

@media (prefers-color-scheme: dark) {
  :root {
    --sidebar-bg: #0a0f1e;
    --sidebar-border: #1a2540;
    --sidebar-text: #475569;
    --sidebar-active-bg: #1a2540;
    --sidebar-active-text: #e2e8f0;
    --sidebar-label: #334155;
    --surface: #111827;
    --surface-2: #0f172a;
    --border: #1e293b;
    --border-light: #1a2540;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #475569;
    --danger-text: #f87171;
    --danger-bg: rgba(239,68,68,0.1);
    --danger-border: rgba(239,68,68,0.2);
    --danger-hover: rgba(239,68,68,0.15);
    --success-text: #4ade80;
    --success-bg: rgba(34,197,94,0.1);
    --success-border: rgba(34,197,94,0.2);
    --warning-text: #fbbf24;
    --warning-bg: rgba(251,191,36,0.1);
    --info-text: #60a5fa;
    --info-bg: rgba(96,165,250,0.1);
    --info-border: rgba(96,165,250,0.2);
    --rejected-text: #f87171;
    --rejected-bg: rgba(239,68,68,0.1);
    --in-progress-text: #60a5fa;
    --in-progress-bg: rgba(96,165,250,0.1);
  }
}

html, body { height: 100%; font-family: 'Inter', system-ui, -apple-system, sans-serif; }

/* ── Layout ─────────────────────────────────────────── */
.wrap { display: flex; min-height: 100vh; }

.overlay {
  display: none;
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 99;
  backdrop-filter: blur(2px);
}
.overlay.open { display: block; }

/* ── Sidebar ─────────────────────────────────────────── */
.sidebar {
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  display: flex; flex-direction: column;
  padding: 20px 12px;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: transform 0.25s ease;
}

.brand {
  display: flex; align-items: center; gap: 10px;
  padding: 0 8px 24px;
  border-bottom: 1px solid var(--sidebar-border);
  margin-bottom: 14px;
}
.brand-icon {
  width: 36px; height: 36px; border-radius: var(--radius-md);
  background: var(--brand-bg);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
  font-size: 16px; font-weight: 700;
}
.brand-text { color: #f1f5f9; font-size: 15px; font-weight: 600; }

.sidebar-close-btn {
  display: none; margin-left: auto;
  background: none; border: none;
  color: var(--sidebar-text); cursor: pointer;
  font-size: 18px; padding: 2px; line-height: 1;
}

.nav-group-label {
  font-size: 10px; color: var(--sidebar-label);
  text-transform: uppercase; font-weight: 700;
  margin: 14px 0 5px 12px; letter-spacing: 0.07em;
}

.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: var(--radius-md);
  cursor: pointer; color: var(--sidebar-text);
  font-size: 14px; transition: all 0.15s;
  border-left: 2px solid transparent;
  user-select: none;
}
.nav-item:hover { background: var(--sidebar-active-bg); color: var(--sidebar-active-text); }
.nav-item.active {
  background: var(--sidebar-active-bg);
  color: var(--sidebar-active-text);
  font-weight: 500;
  border-left-color: var(--sidebar-active-accent);
}
.nav-item .ti { font-size: 16px; flex-shrink: 0; }

.sidebar-spacer { flex: 1; min-height: 16px; }

.logout-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: var(--radius-md);
  cursor: pointer; color: #f87171;
  font-size: 14px; font-family: inherit;
  background: none; border: none; width: 100%; text-align: left;
  transition: background 0.15s;
}
.logout-btn:hover { background: rgba(248,113,113,0.08); }
.logout-btn .ti { font-size: 16px; }

.user-chip {
  margin-top: 12px;
  border-top: 1px solid var(--sidebar-border);
  padding-top: 14px;
}
.user-chip-inner {
  padding: 10px 12px;
  background: var(--sidebar-active-bg);
  border-radius: var(--radius-lg);
  display: flex; align-items: center; gap: 10px;
}
.user-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--brand-bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 600; color: #fff; flex-shrink: 0;
}
.user-chip-name { font-size: 13px; font-weight: 500; color: #f1f5f9; }
.user-chip-role { font-size: 11px; color: var(--sidebar-label); }

/* ── Main ─────────────────────────────────────────── */
.main {
  flex: 1; background: var(--surface-2);
  display: flex; flex-direction: column;
  min-width: 0; overflow-y: auto;
}

.topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 28px;
  display: flex; align-items: center; justify-content: space-between;
  height: var(--topbar-height);
  position: sticky; top: 0; z-index: 50;
  flex-shrink: 0;
}
.topbar-left { display: flex; align-items: center; gap: 12px; }
.topbar-title {
  font-size: 13px; font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase; letter-spacing: 0.06em;
}
.topbar-sub {
  font-size: 13px; color: var(--text-secondary);
}

.hamburger-btn {
  display: none; align-items: center; justify-content: center;
  background: none; border: 1px solid var(--border);
  border-radius: var(--radius-md); width: 36px; height: 36px;
  cursor: pointer; color: var(--text-secondary);
  flex-shrink: 0;
}
.hamburger-btn .ti { font-size: 18px; }

.content {
  padding: 28px 32px;
  max-width: 1200px; margin: 0 auto; width: 100%;
}

/* ── Stat grid ─────────────────────────────────────── */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px; margin-bottom: 24px;
}
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 18px 22px;
}
.stat-label {
  font-size: 11px; color: var(--text-secondary);
  text-transform: uppercase; font-weight: 700;
  margin-bottom: 10px; letter-spacing: 0.05em;
  display: flex; align-items: center; gap: 6px;
}
.stat-label .ti { font-size: 14px; }
.stat-val { font-size: 30px; font-weight: 700; color: var(--text-primary); }

/* ── Section card ─────────────────────────────────── */
.section-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 22px; margin-bottom: 22px;
}
.section-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 18px; padding-bottom: 14px;
  border-bottom: 1px solid var(--border-light);
  flex-wrap: wrap; gap: 10px;
}
.section-head h2 { font-size: 15px; font-weight: 600; color: var(--text-primary); }

/* ── Table ─────────────────────────────────────────── */
.table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.user-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.user-table th {
  background: var(--surface-2);
  padding: 9px 14px; text-align: left;
  font-size: 11px; color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
  text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em;
  white-space: nowrap;
}
.user-table td {
  padding: 13px 14px;
  border-bottom: 1px solid var(--border-light);
  font-size: 14px; color: var(--text-primary);
}
.user-table tbody tr:last-child td { border-bottom: none; }
.user-table tbody tr:hover td { background: var(--surface-2); }

/* ── Buttons ─────────────────────────────────────────── */
.btn-primary {
  background: var(--accent); color: #fff;
  padding: 8px 16px; border-radius: var(--radius-md);
  border: none; cursor: pointer;
  font-size: 13px; font-weight: 600; font-family: inherit;
  transition: opacity 0.15s;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  white-space: nowrap;
}
.btn-primary:hover { opacity: 0.88; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary .ti { font-size: 14px; }

.btn-danger {
  background: var(--danger-bg); color: var(--danger-text);
  padding: 6px 12px; border-radius: var(--radius-sm);
  border: 1px solid var(--danger-border);
  cursor: pointer; font-family: inherit;
  font-size: 13px; font-weight: 600;
  transition: background 0.15s;
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
}
.btn-danger:hover { background: var(--danger-hover); }
.btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-danger .ti { font-size: 13px; }

.btn-resolve {
  color: var(--success-text); border: 1px solid var(--success-border);
  background: var(--success-bg);
  padding: 7px 14px; border-radius: var(--radius-md);
  cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit;
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
}
.btn-resolve:hover { filter: brightness(0.95); }
.btn-resolve .ti { font-size: 13px; }

.btn-pending {
  color: var(--in-progress-text); border: 1px solid var(--info-border);
  background: var(--info-bg);
  padding: 7px 14px; border-radius: var(--radius-md);
  cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit;
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
}
.btn-pending:hover { filter: brightness(0.95); }

.btn-reject {
  color: var(--danger-text); border: 1px solid var(--danger-border);
  background: var(--danger-bg);
  padding: 7px 14px; border-radius: var(--radius-md);
  cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit;
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
}
.btn-reject:hover { filter: brightness(0.95); }

/* ── Form ─────────────────────────────────────────── */
.form-box {
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 18px;
  margin-bottom: 18px; display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;
}
.form-field { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 140px; }
.form-field label {
  font-size: 11px; font-weight: 700; color: var(--text-secondary);
  text-transform: uppercase; letter-spacing: 0.05em;
}
.inp {
  width: 100%; padding: 8px 11px;
  border-radius: var(--radius-md); border: 1px solid var(--border);
  font-family: inherit; font-size: 14px; outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  background: var(--surface); color: var(--text-primary);
}
.inp:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(29,78,216,0.1);
}
.inp::placeholder { color: var(--text-muted); }

.msg {
  padding: 10px 14px; border-radius: var(--radius-md);
  font-size: 13px; font-weight: 500; margin-bottom: 14px;
  display: flex; align-items: center; gap: 7px;
}
.msg .ti { font-size: 15px; flex-shrink: 0; }
.msg.success { background: var(--success-bg); color: var(--success-text); border: 1px solid var(--success-border); }
.msg.error   { background: var(--danger-bg);  color: var(--danger-text);  border: 1px solid var(--danger-border); }

/* ── Badges ─────────────────────────────────────────── */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 9px; border-radius: 20px;
  font-size: 11px; font-weight: 700; white-space: nowrap;
}
.badge .ti { font-size: 11px; }
.badge-resolved   { background: var(--success-bg);     color: var(--success-text); }
.badge-pending    { background: var(--warning-bg);     color: var(--warning-text); }
.badge-rejected   { background: var(--rejected-bg);    color: var(--rejected-text); }
.badge-inprogress { background: var(--in-progress-bg); color: var(--in-progress-text); }
.badge-login      { background: var(--success-bg);     color: var(--success-text); }
.badge-logout     { background: var(--rejected-bg);    color: var(--rejected-text); }
.badge-active     { background: var(--success-bg);     color: var(--success-text); }
.badge-closed     { background: var(--rejected-bg);    color: var(--rejected-text); }

.code-badge {
  background: var(--info-bg); color: var(--in-progress-text);
  padding: 2px 8px; border-radius: var(--radius-sm);
  font-weight: 700; font-size: 12px; font-family: monospace;
}

/* ── Loading state ─────────────────────────────────── */
.loading-state {
  text-align: center; padding: 60px 20px; color: var(--text-muted);
}
.loading-spinner {
  width: 32px; height: 32px; border: 3px solid var(--border);
  border-top-color: var(--accent); border-radius: 50%;
  animation: spin 0.7s linear infinite; margin: 0 auto 16px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Empty state ─────────────────────────────────────── */
.empty-state {
  text-align: center; padding: 48px 20px; color: var(--text-muted);
}
.empty-state .ti { font-size: 32px; display: block; margin-bottom: 10px; }
.empty-state p { font-size: 14px; }

/* ── Forum & complaint cards ─────────────────────────── */
.card-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden; margin-bottom: 12px;
}
.card-item-header {
  padding: 14px 18px; background: var(--surface-2);
  display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
}
.card-item-body {
  padding: 14px 18px; background: var(--surface);
  border-top: 1px solid var(--border-light);
}
.card-item-footer {
  padding: 12px 18px; background: var(--surface);
  border-top: 1px solid var(--border-light);
}
.card-item-title {
  font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 4px;
}
.card-item-meta { font-size: 12px; color: var(--text-muted); }
.card-item-text { font-size: 13px; color: var(--text-secondary); margin: 5px 0; }

.reply-item {
  padding: 9px 13px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-bottom: 6px;
}
.reply-admin { background: var(--info-bg);    border-left: 3px solid var(--accent); }
.reply-user  { background: var(--success-bg); border-left: 3px solid #10b981; }
.reply-author { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px; }
.reply-text  { font-size: 13px; color: var(--text-secondary); }

.admin-response {
  margin-bottom: 12px; padding: 10px 14px;
  background: var(--success-bg);
  border-left: 3px solid #10b981;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
.admin-response-label {
  font-size: 11px; color: var(--success-text);
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px;
}
.admin-response-text { font-size: 13px; color: var(--text-secondary); }

.textarea-inp {
  width: 100%; padding: 9px 11px;
  border-radius: var(--radius-md); border: 1px solid var(--border);
  resize: vertical; font-size: 13px; outline: none;
  margin-bottom: 10px; font-family: inherit;
  background: var(--surface); color: var(--text-primary);
  transition: border 0.2s, box-shadow 0.2s;
}
.textarea-inp:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(29,78,216,0.1); }
.textarea-inp::placeholder { color: var(--text-muted); }

.action-row { display: flex; gap: 8px; flex-wrap: wrap; }

/* ── ChangePassword ─────────────────────────────────── */
.pw-box { max-width: 460px; }
.pw-field { margin-bottom: 14px; }
.pw-field label {
  display: block; font-size: 11px; font-weight: 700;
  color: var(--text-secondary); text-transform: uppercase;
  letter-spacing: 0.05em; margin-bottom: 5px;
}

/* ── Inline message (small) ─────────────────────────── */
.inline-msg { font-size: 12px; margin-bottom: 8px; font-weight: 600; }
.inline-msg.ok  { color: var(--success-text); }
.inline-msg.err { color: var(--danger-text); }

/* ── Already-resolved banner ─────────────────────────── */
.resolved-banner {
  padding: 9px 13px; background: var(--success-bg);
  border-radius: var(--radius-md); font-size: 13px;
  color: var(--success-text); font-weight: 500;
  display: flex; align-items: center; gap: 6px;
}
.resolved-banner .ti { font-size: 14px; }

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 768px) {
  :root { --topbar-height: auto; }

  .sidebar {
    position: fixed; top: 0; left: 0; height: 100vh;
    width: 265px; z-index: 100;
    transform: translateX(-100%);
    padding: 16px 10px;
  }
  .sidebar.open { transform: translateX(0); }
  .sidebar-close-btn { display: flex; }

  .hamburger-btn { display: flex; }
  .topbar { padding: 0 14px; min-height: 56px; }
  .topbar-sub { display: none; }

  .content { padding: 14px; }
  .stat-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .stat-val { font-size: 24px; }

  .form-box { flex-direction: column; align-items: stretch; }
  .form-field { width: 100%; min-width: unset; }

  .user-table { min-width: 520px; }

  .section-head {
    flex-direction: column; align-items: flex-start;
  }

  .section-card { padding: 14px; }

  .action-row .btn-resolve,
  .action-row .btn-pending,
  .action-row .btn-reject { flex: 1; }

  .pw-box { max-width: 100%; }
  .card-item-header { flex-direction: column; }

  .topbar-sub-mobile {
    display: block;
    font-size: 11px; color: var(--text-muted);
    padding: 0 14px 8px;
  }
}

@media (min-width: 769px) {
  .topbar-sub-mobile { display: none; }
}
`;

const API = "https://studentsportal-x37v.onrender.com/api";

// ─── Helper: inline feedback message ─────────────────────────────────────────
function InlineMsg({ msg }) {
  if (!msg) return null;
  const ok = msg.includes("✓") || msg.toLowerCase().includes("success") || msg.includes("ho gaya") || msg.includes("sent") || msg.includes("kar di") || msg.includes("resolved");
  return <div className={`inline-msg ${ok ? "ok" : "err"}`}>{msg}</div>;
}

// ─── ChangePassword ──────────────────────────────────────────────────────────
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setMsg(null);
    if (!oldPassword || !newPassword) {
      setMsg({ type: "error", text: "Dono fields fill karna zaroori hai" });
      return;
    }
    if (newPassword.length < 6) {
      setMsg({ type: "error", text: "New password kam se kam 6 characters ka hona chahiye" });
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
        setMsg({ type: "success", text: "Password successfully update ho gaya!" });
        setOldPassword("");
        setNewPassword("");
      } else {
        setMsg({ type: "error", text: json.msg || "Password update nahi ho saka" });
      }
    } catch {
      setMsg({ type: "error", text: "Server se connect nahi ho saka" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-card pw-box">
      <div className="section-head"><h2>Change Password</h2></div>
      <div className="pw-field">
        <label>Old Password</label>
        <input className="inp" type="password" placeholder="Current password dalein"
          value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
      </div>
      <div className="pw-field">
        <label>New Password</label>
        <input className="inp" type="password" placeholder="Naya password (min 6 characters)"
          value={newPassword} onChange={e => setNewPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleUpdate()} />
      </div>
      {msg && (
        <div className={`msg ${msg.type}`}>
          <i className={`ti ${msg.type === "success" ? "ti-circle-check" : "ti-alert-circle"}`} aria-hidden="true" />
          {msg.text}
        </div>
      )}
      <button className="btn-primary" onClick={handleUpdate} disabled={loading}>
        <i className="ti ti-lock" aria-hidden="true" />
        {loading ? "Updating..." : "Update Password"}
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
      if (res.ok) {
        setMsg(p => ({ ...p, [postId]: "Reply sent & resolved!" }));
        setReplyText(p => ({ ...p, [postId]: "" }));
        fetchData();
      } else {
        setMsg(p => ({ ...p, [postId]: "Reply send nahi ho saka" }));
      }
    } catch {
      setMsg(p => ({ ...p, [postId]: "Server error" }));
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Kya aap ye post delete karna chahte hain?")) return;
    try {
      const res = await fetch(`${API}/forum/posts/${postId}`, { method: "DELETE" });
      if (res.ok) fetchData();
      else alert("Post delete nahi ho saki.");
    } catch {
      alert("Server se connect nahi ho saka.");
    }
  };

  return (
    <div className="section-card">
      <div className="section-head">
        <h2>Discussion Forum</h2>
        <button className="btn-primary" onClick={fetchData}>
          <i className="ti ti-refresh" aria-hidden="true" />Refresh
        </button>
      </div>
      {posts.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-message-circle" aria-hidden="true" />
          <p>Koi discussion nahi hai abhi</p>
        </div>
      ) : posts.map(post => (
        <div key={post._id} className="card-item">
          <div className="card-item-header">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                <span className="card-item-title">{post.title}</span>
                <span className={`badge ${post.status === "resolved" ? "badge-resolved" : "badge-pending"}`}>
                  <i className={`ti ${post.status === "resolved" ? "ti-circle-check" : "ti-clock"}`} aria-hidden="true" />
                  {post.status === "resolved" ? "Resolved" : "Open"}
                </span>
              </div>
              <p className="card-item-text">{post.content || "No description"}</p>
              <span className="card-item-meta">
                By <strong>{post.authorName || "Student"}</strong>
                {" · "}{new Date(post.createdAt).toLocaleDateString("en-IN")}
                {" · "}{post.replies?.length || 0} replies
              </span>
            </div>
            <button className="btn-danger" onClick={() => handleDelete(post._id)}>
              <i className="ti ti-trash" aria-hidden="true" />Delete
            </button>
          </div>

          {post.replies?.length > 0 && (
            <div className="card-item-body" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {post.replies.map((r, i) => (
                <div key={i} className={`reply-item ${r.isAdmin ? "reply-admin" : "reply-user"}`}>
                  <div className="reply-author" style={{ color: r.isAdmin ? "var(--in-progress-text)" : "var(--success-text)" }}>
                    <i className={`ti ${r.isAdmin ? "ti-shield" : "ti-user"}`} aria-hidden="true" />{" "}
                    {r.isAdmin ? "Admin" : r.authorName}
                  </div>
                  <p className="reply-text">{r.reply}</p>
                </div>
              ))}
            </div>
          )}

          {post.status !== "resolved" && (
            <div className="card-item-footer">
              <textarea
                className="textarea-inp" rows={2}
                placeholder="Admin reply likhein aur issue resolve karein..."
                value={replyText[post._id] || ""}
                onChange={e => setReplyText(p => ({ ...p, [post._id]: e.target.value }))}
              />
              <InlineMsg msg={msg[post._id]} />
              <button className="btn-primary" onClick={() => handleAdminReply(post._id)}>
                <i className="ti ti-send" aria-hidden="true" />Reply & Mark Resolved
              </button>
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

  const handleAdd = async () => {
    if (!form.name.trim()) { setMsg({ type: "error", text: "Session Name required hai" }); return; }
    setAdding(true); setMsg(null);
    try {
      const res = await fetch(`${API}/session`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), description: form.description.trim() }),
      });
      if (res.ok) {
        setMsg({ type: "success", text: "Session successfully add ho gaya!" });
        setForm({ name: "", description: "" });
        fetchData();
      } else {
        const err = await res.json().catch(() => ({}));
        setMsg({ type: "error", text: err.msg || "Session add nahi ho saka" });
      }
    } catch {
      setMsg({ type: "error", text: "Server se connect nahi ho saka" });
    } finally {
      setAdding(false);
    }
  };

  const handleClose = async (id) => {
    if (!window.confirm("Ye session close karna chahte hain?")) return;
    setClosingId(id);
    try {
      const res = await fetch(`${API}/session/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: false }),
      });
      if (res.ok) fetchData(); else alert("Session close nahi ho saka");
    } catch {
      alert("Server error");
    } finally {
      setClosingId(null);
    }
  };

  return (
    <div className="section-card">
      <div className="section-head">
        <h2>Session Management</h2>
        <button className="btn-primary" onClick={fetchData}>
          <i className="ti ti-refresh" aria-hidden="true" />Refresh
        </button>
      </div>
      <div className="form-box">
        <div className="form-field">
          <label>Session Name *</label>
          <input className="inp" placeholder="e.g. 2024-25" value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && handleAdd()} />
        </div>
        <div className="form-field">
          <label>Description</label>
          <input className="inp" placeholder="e.g. Annual session" value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && handleAdd()} />
        </div>
        <button className="btn-primary" onClick={handleAdd} disabled={adding} style={{ alignSelf: "flex-end" }}>
          <i className="ti ti-plus" aria-hidden="true" />
          {adding ? "Adding..." : "Add Session"}
        </button>
      </div>
      {msg && (
        <div className={`msg ${msg.type}`}>
          <i className={`ti ${msg.type === "success" ? "ti-circle-check" : "ti-alert-circle"}`} aria-hidden="true" />
          {msg.text}
        </div>
      )}
      {sessions.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-calendar" aria-hidden="true" />
          <p>Koi session nahi hai. Upar form se add karein.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr><th>#</th><th>Name</th><th>Description</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {sessions.map((s, idx) => (
                <tr key={s._id}>
                  <td style={{ color: "var(--text-muted)", fontWeight: 600, width: 40 }}>{idx + 1}</td>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{s.description || "—"}</td>
                  <td>
                    {s.isActive
                      ? <span className="badge badge-active"><i className="ti ti-circle-check" aria-hidden="true" />Active</span>
                      : <span className="badge badge-closed"><i className="ti ti-circle-x" aria-hidden="true" />Closed</span>}
                  </td>
                  <td>
                    {s.isActive && (
                      <button className="btn-danger" onClick={() => handleClose(s._id)} disabled={closingId === s._id}>
                        {closingId === s._id ? "Closing..." : "Close"}
                      </button>
                    )}
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

  const handleAction = async (id, status) => {
    const adminResponse = replyText[id]?.trim();
    if (!adminResponse) { setMsg(p => ({ ...p, [id]: "Pehle reply likhein" })); return; }
    try {
      const res = await fetch(`${API}/complaint/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminResponse, status }),
      });
      if (res.ok) {
        setMsg(p => ({ ...p, [id]: `Complaint ${status} kar di gayi!` }));
        setReplyText(p => ({ ...p, [id]: "" }));
        fetchData();
      } else {
        setMsg(p => ({ ...p, [id]: "Action fail ho gaya" }));
      }
    } catch {
      setMsg(p => ({ ...p, [id]: "Server error" }));
    }
  };

  const getBadge = (status) => {
    if (status === "closed" || status === "resolved")
      return <span className="badge badge-resolved"><i className="ti ti-circle-check" aria-hidden="true" />Resolved</span>;
    if (status === "rejected")
      return <span className="badge badge-rejected"><i className="ti ti-circle-x" aria-hidden="true" />Rejected</span>;
    if (status === "in-progress")
      return <span className="badge badge-inprogress"><i className="ti ti-rotate-clockwise" aria-hidden="true" />In Progress</span>;
    return <span className="badge badge-pending"><i className="ti ti-clock" aria-hidden="true" />Pending</span>;
  };

  return (
    <div className="section-card">
      <div className="section-head">
        <h2>Complaint Management</h2>
        <button className="btn-primary" onClick={fetchData}>
          <i className="ti ti-refresh" aria-hidden="true" />Refresh
        </button>
      </div>
      {complaints.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-inbox" aria-hidden="true" />
          <p>Koi complaint nahi hai abhi</p>
        </div>
      ) : complaints.map(c => {
        const isResolved = c.status === "closed" || c.status === "resolved";
        return (
          <div key={c._id} className="card-item">
            <div className="card-item-header">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <span className="card-item-title">{c.complaintType?.name || "General"}</span>
                  {getBadge(c.status)}
                </div>
                <p className="card-item-text">{c.complaintText}</p>
                <span className="card-item-meta">
                  By <strong>{c.studentId?.name || "Student"}</strong>
                  {c.studentId?.email ? ` · ${c.studentId.email}` : ""}
                  {" · "}{new Date(c.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
            <div className="card-item-body">
              {c.adminResponse && (
                <div className="admin-response">
                  <div className="admin-response-label">
                    <i className="ti ti-shield" aria-hidden="true" /> Admin Response
                  </div>
                  <div className="admin-response-text">{c.adminResponse}</div>
                </div>
              )}
              {!isResolved ? (
                <>
                  <textarea
                    className="textarea-inp" rows={3}
                    placeholder="Student ko reply likhein..."
                    value={replyText[c._id] || ""}
                    onChange={e => setReplyText(p => ({ ...p, [c._id]: e.target.value }))}
                  />
                  <InlineMsg msg={msg[c._id]} />
                  <div className="action-row">
                    <button className="btn-resolve" onClick={() => handleAction(c._id, "resolved")}>
                      <i className="ti ti-circle-check" aria-hidden="true" />Resolve
                    </button>
                    <button className="btn-pending" onClick={() => handleAction(c._id, "pending")}>
                      <i className="ti ti-clock" aria-hidden="true" />Pending
                    </button>
                    <button className="btn-reject" onClick={() => handleAction(c._id, "rejected")}>
                      <i className="ti ti-circle-x" aria-hidden="true" />Reject
                    </button>
                  </div>
                </>
              ) : (
                <div className="resolved-banner">
                  <i className="ti ti-circle-check" aria-hidden="true" />
                  Ye complaint already {c.status} hai
                </div>
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

  const handleAdd = async () => {
    if (!form.name.trim()) { setMsg({ type: "error", text: "College Name required hai" }); return; }
    if (!form.code.trim()) { setMsg({ type: "error", text: "College Code required hai" }); return; }
    setAdding(true); setMsg(null);
    try {
      const res = await fetch(`${API}/college`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), code: form.code.trim(), location: form.location.trim() }),
      });
      if (res.ok) {
        setMsg({ type: "success", text: "College successfully add ho gaya!" });
        setForm({ name: "", code: "", location: "" });
        fetchData();
      } else {
        const err = await res.json().catch(() => ({}));
        setMsg({ type: "error", text: err.message || "College add nahi ho saka" });
      }
    } catch {
      setMsg({ type: "error", text: "Server se connect nahi ho saka" });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap ye college delete karna chahte hain?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API}/college/${id}`, { method: "DELETE" });
      if (res.ok) fetchData(); else alert("College delete nahi ho saka.");
    } catch {
      alert("Server se connect nahi ho saka.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="section-card">
      <div className="section-head">
        <h2>College Management</h2>
        <button className="btn-primary" onClick={fetchData}>
          <i className="ti ti-refresh" aria-hidden="true" />Refresh
        </button>
      </div>
      <div className="form-box">
        <div className="form-field">
          <label>College Name *</label>
          <input className="inp" placeholder="e.g. Government Polytechnic" value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && handleAdd()} />
        </div>
        <div className="form-field">
          <label>College Code *</label>
          <input className="inp" placeholder="e.g. GP001" value={form.code}
            onChange={e => setForm(p => ({ ...p, code: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && handleAdd()} />
        </div>
        <div className="form-field">
          <label>Location</label>
          <input className="inp" placeholder="e.g. Lucknow, UP" value={form.location}
            onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && handleAdd()} />
        </div>
        <button className="btn-primary" onClick={handleAdd} disabled={adding} style={{ alignSelf: "flex-end" }}>
          <i className="ti ti-plus" aria-hidden="true" />
          {adding ? "Adding..." : "Add College"}
        </button>
      </div>
      {msg && (
        <div className={`msg ${msg.type}`}>
          <i className={`ti ${msg.type === "success" ? "ti-circle-check" : "ti-alert-circle"}`} aria-hidden="true" />
          {msg.text}
        </div>
      )}
      {colleges.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-school" aria-hidden="true" />
          <p>Koi college nahi hai. Upar form se add karein.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr><th style={{ width: 40 }}>#</th><th style={{ width: 90 }}>Code</th><th>Name</th><th>Location</th><th style={{ width: 100 }}>Action</th></tr>
            </thead>
            <tbody>
              {colleges.map((c, idx) => (
                <tr key={c._id}>
                  <td style={{ color: "var(--text-muted)", fontWeight: 600 }}>{idx + 1}</td>
                  <td><span className="code-badge">{c.code}</span></td>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{c.location || "—"}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(c._id)} disabled={deletingId === c._id}>
                      <i className="ti ti-trash" aria-hidden="true" />
                      {deletingId === c._id ? "Deleting..." : "Delete"}
                    </button>
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

// ─── BlockedUsers ────────────────────────────────────────────────────────────
function BlockedUsers({ students }) {
  const blocked = students.filter(s => s.isBlocked);
  return (
    <div className="section-card">
      <div className="section-head"><h2>Blocked Users</h2></div>
      {blocked.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-shield-check" aria-hidden="true" />
          <p>Koi blocked user nahi hai</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Reason</th><th>Action</th></tr>
            </thead>
            <tbody>
              {blocked.map(s => (
                <tr key={s._id}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{s.email}</td>
                  <td style={{ color: "var(--text-secondary)" }}>Terms Violation</td>
                  <td><button className="btn-primary"><i className="ti ti-lock-open" aria-hidden="true" />Unblock</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── UserLogs ────────────────────────────────────────────────────────────────
function UserLogs({ logs, fetchData }) {
  return (
    <div className="section-card">
      <div className="section-head">
        <h2>User Logs</h2>
        <button className="btn-primary" onClick={fetchData}>
          <i className="ti ti-refresh" aria-hidden="true" />Refresh
        </button>
      </div>
      {logs.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-file-description" aria-hidden="true" />
          <p>Koi log nahi hai. Student login/logout kare tab dikhai dega.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Name</th>
                <th>Email</th>
                <th style={{ width: 100 }}>Action</th>
                <th>IP Address</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={log._id}>
                  <td style={{ color: "var(--text-muted)", fontWeight: 600 }}>{idx + 1}</td>
                  <td style={{ fontWeight: 500 }}>{log.userName}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{log.userEmail}</td>
                  <td>
                    {log.action === "login"
                      ? <span className="badge badge-login"><i className="ti ti-login" aria-hidden="true" />Login</span>
                      : <span className="badge badge-logout"><i className="ti ti-logout" aria-hidden="true" />Logout</span>}
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12, fontFamily: "monospace" }}>
                    {log.ipAddress || "—"}
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>
                    {new Date(log.createdAt).toLocaleString("en-IN")}
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
  const [active, setActive] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({
    complaints: [], students: [], colleges: [],
    sessions: [], logs: [], forumPosts: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = ["complaint", "student", "college", "session", "forum/posts", "user-logs"];
      const results = await Promise.all(
        endpoints.map(e =>
          fetch(`${API}/${e}`)
            .then(async res => {
              if (!res.ok) return { data: [] };
              const json = await res.json();
              return { data: Array.isArray(json) ? json : (json.data ?? []) };
            })
            .catch(() => ({ data: [] }))
        )
      );
      setData({
        complaints: results[0].data,
        students:   results[1].data,
        colleges:   results[2].data,
        sessions:   results[3].data,
        forumPosts: results[4].data,
        logs:       results[5].data,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleNavClick = (id) => {
    setActive(id);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <div className="loading-spinner" />
          <div style={{ fontSize: 14 }}>Backend se data load ho raha hai...</div>
        </div>
      );
    }
    switch (active) {
      case "dashboard":
        return (
          <div className="stat-grid">
            {[
              { label: "Total Complaints", val: data.complaints.length, icon: "ti-file-description" },
              { label: "Active Colleges",  val: data.colleges.length,   icon: "ti-school" },
              { label: "Registered Students", val: data.students.length, icon: "ti-users" },
              { label: "Total Logs",       val: data.logs.length,        icon: "ti-list" },
            ].map(({ label, val, icon }) => (
              <div key={label} className="stat-card">
                <div className="stat-label">
                  <i className={`ti ${icon}`} aria-hidden="true" />{label}
                </div>
                <div className="stat-val">{val}</div>
              </div>
            ))}
          </div>
        );
      case "college":    return <CollegeManagement colleges={data.colleges} fetchData={fetchData} />;
      case "complaints": return <ComplaintManagement complaints={data.complaints} fetchData={fetchData} />;
      case "session":    return <SessionManagement sessions={data.sessions} fetchData={fetchData} />;
      case "blocked":    return <BlockedUsers students={data.students} />;
      case "forum":      return <ForumAdmin posts={data.forumPosts} fetchData={fetchData} />;
      case "password":   return <ChangePassword />;
      case "user-logs":  return <UserLogs logs={data.logs} fetchData={fetchData} />;
      default:           return null;
    }
  };

  const navGroups = [
    { label: "Core", items: [
      { id: "dashboard", icon: "ti-layout-dashboard", label: "Overview" },
      { id: "college",   icon: "ti-school",           label: "Colleges" },
      { id: "session",   icon: "ti-calendar",         label: "Sessions" },
    ]},
    { label: "Management", items: [
      { id: "complaints", icon: "ti-file-description", label: "Complaints" },
      { id: "user-logs",  icon: "ti-list",             label: "User Logs" },
    ]},
    { label: "Safety & Community", items: [
      { id: "blocked", icon: "ti-ban",             label: "Blocked Users" },
      { id: "forum",   icon: "ti-message-circle",  label: "Forum" },
    ]},
    { label: "System", items: [
      { id: "password", icon: "ti-lock", label: "Security" },
    ]},
  ];

  const pageTitle = navGroups.flatMap(g => g.items).find(i => i.id === active)?.label || active;

  return (
    <div className="wrap">
      <style>{styles}</style>

      <div className={`overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <nav className={`sidebar ${sidebarOpen ? "open" : ""}`} aria-label="Admin navigation">
        <div className="brand">
          <div className="brand-icon">A</div>
          <span className="brand-text">Admin Panel</span>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        {navGroups.map(group => (
          <div key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map(item => (
              <div
                key={item.id}
                className={`nav-item ${active === item.id ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === "Enter" && handleNavClick(item.id)}
                aria-current={active === item.id ? "page" : undefined}
              >
                <i className={`ti ${item.icon}`} aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="sidebar-spacer" />
        <button className="logout-btn" onClick={handleLogout}>
          <i className="ti ti-logout" aria-hidden="true" />Logout Session
        </button>
        <div className="user-chip">
          <div className="user-chip-inner">
            <div className="user-avatar">A</div>
            <div>
              <div className="user-chip-name">Administrator</div>
              <div className="user-chip-role">Super Admin</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <i className="ti ti-menu-2" aria-hidden="true" />
            </button>
            <span className="topbar-title">{pageTitle}</span>
          </div>
          <span className="topbar-sub">Mohd Hasan P G College</span>
        </header>
        <div className="topbar-sub-mobile" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "6px 14px 8px" }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Mohd Hasan P G College</span>
        </div>
        <main className="content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}