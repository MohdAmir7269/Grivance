
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ FIXED: Base URL without /api — sab endpoints neeche sahi likhe hain
const BASE = "https://studentsportal-x37v.onrender.com";

const statusColors = {
  pending: { bg: "#FFFBEB", color: "#D97706", dot: "#F59E0B" },
  "in-progress": { bg: "#EFF6FF", color: "#2563EB", dot: "#3B82F6" },
  closed: { bg: "#ECFDF5", color: "#059669", dot: "#10B981" },
  resolved: { bg: "#ECFDF5", color: "#059669", dot: "#10B981" },
  rejected: { bg: "#FEF2F2", color: "#DC2626", dot: "#EF4444" },
};

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

const StudentDashboard = () => {
  const navigate = useNavigate();

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [activeLink, setActiveLink] = useState("Dashboard");

  const [complaints, setComplaints] = useState([]);
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complaintsError, setComplaintsError] = useState("");

  const [complaintText, setComplaintText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  const [profileName, setProfileName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileMsg, setProfileMsg] = useState("");

  const [forumPosts, setForumPosts] = useState([]);
  const [forumLoading, setForumLoading] = useState(false);
  const [forumError, setForumError] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [forumMsg, setForumMsg] = useState("");
  const [activePost, setActivePost] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyMsg, setReplyMsg] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const id = localStorage.getItem("studentId");

    if (!name || !isLoggedIn || !id) {
      navigate("/login");
      return;
    }

    setStudentName(name);
    setProfileName(name);
    setStudentId(id);
    fetchComplaints(id);
    fetchComplaintTypes();
    fetchForumPosts();
  }, []);

  // ── API Calls ──────────────────────────────────────────────────────────────

  const fetchComplaints = async (id) => {
    const studentIdToUse = id || localStorage.getItem("studentId");
    if (!studentIdToUse) return;
    try {
      setLoading(true);
      setComplaintsError("");
      // ✅ FIXED: Sahi URL — /api/complaint/student/:id
      const res = await fetch(`${BASE}/api/complaint/student/${studentIdToUse}`);
      if (!res.ok) throw new Error("Server error");
      const json = await res.json();
      const arr = Array.isArray(json) ? json : (json.data ?? []);
      setComplaints(arr);
    } catch (err) {
      console.error("fetchComplaints error:", err);
      setComplaintsError("Server se data load nahi ho saka. Baad mein try karein.");
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaintTypes = async () => {
    try {
      // ✅ FIXED: /api/complaint-type — sahi prefix ke saath
      const res = await fetch(`${BASE}/api/complaint-type`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      console.log("Complaint types:", json);
      const arr = Array.isArray(json) ? json : (json.data ?? []);
      setComplaintTypes(arr);
      if (arr.length === 0) {
        console.warn("⚠️ Koi complaint types nahi mile DB mein");
      }
    } catch (err) {
      console.error("Complaint types fetch error:", err);
      setComplaintTypes([]);
    }
  };

  const fetchForumPosts = async () => {
    try {
      setForumLoading(true);
      setForumError("");
      // ✅ FIXED: /api/forum/posts
      const res = await fetch(`${BASE}/api/forum/posts`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      const arr = Array.isArray(json) ? json : (json.data ?? []);
      setForumPosts(arr);
    } catch {
      setForumError("Forum posts load nahi ho sake. Baad mein try karein.");
      setForumPosts([]);
    } finally {
      setForumLoading(false);
    }
  };

  const handleAddComplaint = async () => {
    setSubmitMsg("");

    if (!complaintText.trim()) {
      setSubmitMsg("❗ Please enter complaint text.");
      return;
    }
    if (!selectedType) {
      setSubmitMsg("❗ Please select a complaint category.");
      return;
    }

    const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(selectedType);
    if (!isValidObjectId) {
      setSubmitMsg("❗ Invalid category selected. Please re-select.");
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        complaintText,
        studentId,
        complaintType: selectedType,
      };

      // ✅ FIXED: /api/complaint — sahi prefix
      const res = await fetch(`${BASE}/api/complaint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSubmitMsg("✅ Complaint registered successfully!");
        setComplaintText("");
        setSelectedType("");
        const currentId = studentId || localStorage.getItem("studentId");
        if (currentId) {
          // ✅ FIXED: Complaint submit ke baad thoda wait karke fetch karo taaki DB update ho jaye
          setTimeout(() => fetchComplaints(currentId), 500);
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        setSubmitMsg(`❌ Error: ${errData.msg || "Failed to submit"}`);
      }
    } catch {
      setSubmitMsg("❌ Server se connect nahi ho saka.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProfile = async () => {
    setProfileMsg("");
    try {
      // ✅ FIXED: /api/student/update-profile
      const res = await fetch(`${BASE}/api/student/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, name: profileName }),
      });
      if (res.ok) {
        setStudentName(profileName);
        localStorage.setItem("studentName", profileName);
        setProfileMsg("✅ Profile name updated!");
      } else {
        setProfileMsg("❌ Name update failed.");
      }
    } catch {
      setProfileMsg("❌ Server se connect nahi ho saka.");
    }
  };

  const handleChangePassword = async () => {
    setProfileMsg("");
    if (!oldPassword || !newPassword) {
      setProfileMsg("❗ Fill both password fields.");
      return;
    }
    try {
      // ✅ FIXED: /api/student/change-password
      const res = await fetch(`${BASE}/api/student/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, oldPassword, newPassword }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setOldPassword("");
        setNewPassword("");
        setProfileMsg("✅ Password changed successfully!");
      } else {
        setProfileMsg(`❌ ${json.msg || "Invalid old password"}`);
      }
    } catch {
      setProfileMsg("❌ Server se connect nahi ho saka.");
    }
  };

  const handleNewForumPost = async () => {
    setForumMsg("");
    if (!newPostTitle.trim()) {
      setForumMsg("❗ Post title required.");
      return;
    }
    try {
      // ✅ FIXED: /api/forum/posts
      const res = await fetch(`${BASE}/api/forum/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostBody,
          authorName: studentName,
          studentId,
        }),
      });
      if (res.ok) {
        const json = await res.json().catch(() => ({}));
        const newPost = json.data || {
          _id: "fp" + Date.now(),
          title: newPostTitle,
          content: newPostBody,
          authorName: studentName,
          createdAt: new Date().toISOString(),
          replies: [],
          status: "open",
        };
        setForumPosts((prev) => [newPost, ...prev]);
        setNewPostTitle("");
        setNewPostBody("");
        setForumMsg("✅ Post created!");
        // ✅ FIXED: Fresh list reload karo
        setTimeout(() => fetchForumPosts(), 500);
      } else {
        const errData = await res.json().catch(() => ({}));
        setForumMsg(`❌ ${errData.msg || "Post create nahi ho saka."}`);
      }
    } catch {
      setForumMsg("❌ Server se connect nahi ho saka.");
    }
  };

  const handleReply = async (postId) => {
    setReplyMsg("");
    if (!replyText.trim()) {
      setReplyMsg("❗ Reply cannot be empty.");
      return;
    }
    const newReply = {
      authorName: studentName,
      reply: replyText,
      isAdmin: false,
    };
    try {
      // ✅ FIXED: /api/forum/posts/:postId/reply
      const res = await fetch(`${BASE}/api/forum/posts/${postId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newReply, studentId }),
      });
      if (!res.ok) throw new Error();
      await fetchForumPosts();
      setActivePost((prev) =>
        prev?._id === postId
          ? { ...prev, replies: [...(prev.replies || []), newReply] }
          : prev
      );
      setReplyText("");
      setReplyMsg("✅ Reply posted!");
    } catch {
      setReplyMsg("❌ Reply post nahi ho saka.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNavClick = (label) => {
    setActiveLink(label);
    setProfileMsg("");
    setSubmitMsg("");
    setForumMsg("");
    setReplyMsg("");
    if (isMobile) setSidebarOpen(false);
    if (label === "Discussion Forum") fetchForumPosts();
    if (label === "Add Complaint") fetchComplaintTypes();
    if (
      label === "Pending" ||
      label === "Closed" ||
      label === "My Complaints" ||
      label === "Dashboard"
    ) {
      const id = studentId || localStorage.getItem("studentId");
      if (id) fetchComplaints(id);
    }
  };

  const navItems = [
    { icon: "⊞", label: "Dashboard" },
    { icon: "📝", label: "Add Complaint" },
    { icon: "📋", label: "My Complaints" },
    { icon: "✅", label: "Closed" },
    { icon: "⏳", label: "Pending" },
    { icon: "💬", label: "Discussion Forum" },
    { icon: "👤", label: "Profile" },
    { icon: "⚙", label: "Settings" },
  ];

  const closedComplaints = complaints.filter(
    (c) => c.status === "closed" || c.status === "resolved"
  );
  const pendingComplaints = complaints.filter((c) => c.status === "pending");
  const pendingAndRejected = complaints.filter(
    (c) =>
      c.status === "pending" ||
      c.status === "rejected" ||
      c.status === "in-progress"
  );

  // ── Reusable Complaint Table ───────────────────────────────────────────────
  const ComplaintsListTable = ({ list, title }) => {
    const data = list ?? complaints;
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: isMobile ? "16px" : "25px",
          border: "1px solid #F0F0F5",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "700",
              color: "#1C1F2E",
            }}
          >
            {title || "All Complaints"}
          </h3>
          <button
            onClick={() => fetchComplaints(studentId)}
            style={{
              background: "#F3F4F6",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>⏳</div>
            Loading complaints...
          </div>
        ) : complaintsError ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#EF4444",
              fontSize: "14px",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚠️</div>
            {complaintsError}
          </div>
        ) : data.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>📭</div>
            <div style={{ fontWeight: "600", marginBottom: "4px" }}>
              Koi complaint nahi mili
            </div>
            <div style={{ fontSize: "13px" }}>
              Abhi tak koi complaint register nahi ki gayi hai.
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.map((item) => {
              const status = statusColors[item.status] || statusColors["pending"];
              const date = new Date(item.createdAt);
              return (
                <div
                  key={item._id}
                  style={{
                    padding: isMobile ? "12px" : "18px",
                    background: "#F9FAFB",
                    borderRadius: "14px",
                    border: "1px solid #F0F0F5",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          borderRight: "2px solid #E5E7EB",
                          paddingRight: "15px",
                          minWidth: "36px",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "800",
                            color: "#1C1F2E",
                          }}
                        >
                          {date.getDate()}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#9CA3AF",
                            textTransform: "uppercase",
                          }}
                        >
                          {date.toLocaleString("en-IN", { month: "short" })}
                        </div>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#1C1F2E",
                            wordBreak: "break-word",
                          }}
                        >
                          {item.complaintText}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#6B7280",
                            marginTop: "4px",
                          }}
                        >
                          ID: #{item._id.slice(-6).toUpperCase()} • Category:{" "}
                          <b>{item.complaintType?.name || "General"}</b>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        background: status.bg,
                        color: status.color,
                        padding: "5px 14px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: status.dot,
                        }}
                      />
                      {item.status?.toUpperCase()}
                    </div>
                  </div>
                  {item.adminResponse && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "12px",
                        background: "#fff",
                        borderLeft: "4px solid #10B981",
                        borderRadius: "0 6px 6px 0",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#10B981",
                          fontWeight: "800",
                          marginBottom: "4px",
                        }}
                      >
                        ADMIN REMARK
                      </div>
                      <div style={{ fontSize: "13px", color: "#4B5563" }}>
                        {item.adminResponse}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ── Page Renderer ──────────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activeLink) {
      case "Dashboard":
        return (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : isTablet
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: isMobile ? "12px" : "20px",
                marginBottom: "30px",
              }}
            >
              {[
                { label: "Total Raised", val: complaints.length, color: "#1C1F2E" },
                {
                  label: "In Progress",
                  val: complaints.filter((c) => c.status === "in-progress").length,
                  color: "#2563EB",
                },
                { label: "Closed Cases", val: closedComplaints.length, color: "#059669" },
                { label: "Pending", val: pendingComplaints.length, color: "#D97706" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "#fff",
                    padding: isMobile ? "16px" : "24px",
                    borderRadius: "16px",
                    border: "1px solid #F0F0F5",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#9CA3AF",
                      marginBottom: "5px",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "22px" : "28px",
                      fontWeight: "800",
                      color: loading ? "#D1D5DB" : s.color,
                    }}
                  >
                    {loading ? "—" : s.val}
                  </div>
                </div>
              ))}
            </div>
            <ComplaintsListTable title="Recent Status Tracking" />
          </div>
        );

      case "Add Complaint":
        return (
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: isMobile ? "20px" : "35px",
              border: "1px solid #F0F0F5",
              maxWidth: "700px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                margin: "0 0 25px",
                fontSize: "18px",
                fontWeight: "700",
                color: "#1C1F2E",
              }}
            >
              Register a New Issue
            </h3>

            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#374151",
              }}
            >
              Complaint Category
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                outline: "none",
                marginBottom: "20px",
                fontSize: "14px",
                background: "#fff",
                boxSizing: "border-box",
              }}
            >
              <option value="">-- Please Select Category --</option>
              {complaintTypes.length === 0 ? (
                <option disabled>Categories load nahi hui</option>
              ) : (
                complaintTypes.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))
              )}
            </select>

            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#374151",
              }}
            >
              Detailed Description
            </label>
            <textarea
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              rows={6}
              placeholder="Explain your problem in detail..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                outline: "none",
                resize: "none",
                fontSize: "14px",
                marginBottom: "20px",
                boxSizing: "border-box",
              }}
            />

            {submitMsg && (
              <div
                style={{
                  marginBottom: "15px",
                  fontSize: "14px",
                  color: submitMsg.includes("✅") ? "green" : "red",
                  fontWeight: "600",
                }}
              >
                {submitMsg}
              </div>
            )}

            <button
              onClick={handleAddComplaint}
              disabled={submitting}
              style={{
                width: "100%",
                padding: "14px",
                background: submitting ? "#A5B4FC" : "#6C63FF",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "15px",
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Processing..." : "Submit Complaint"}
            </button>
          </div>
        );

      case "My Complaints":
        return <ComplaintsListTable title="My Complaints" />;

      case "Closed":
        return (
          <ComplaintsListTable
            list={closedComplaints}
            title={`Closed Complaints (${closedComplaints.length})`}
          />
        );

      case "Pending":
        return (
          <ComplaintsListTable
            list={pendingAndRejected}
            title={`Pending & Rejected (${pendingAndRejected.length})`}
          />
        );

      case "Discussion Forum":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: isMobile ? "16px" : "28px",
                border: "1px solid #F0F0F5",
                maxWidth: "750px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#1C1F2E",
                }}
              >
                Start a New Discussion
              </h3>
              <input
                type="text"
                placeholder="Post title / topic..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  marginBottom: "12px",
                  outline: "none",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
              <textarea
                rows={4}
                placeholder="Describe your topic or question in detail..."
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  resize: "none",
                  outline: "none",
                  fontSize: "14px",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />
              {forumMsg && (
                <div
                  style={{
                    marginBottom: "10px",
                    fontSize: "13px",
                    color: forumMsg.includes("✅") ? "green" : "red",
                  }}
                >
                  {forumMsg}
                </div>
              )}
              <button
                onClick={handleNewForumPost}
                style={{
                  padding: "12px 28px",
                  background: "#6C63FF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Post Discussion
              </button>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: isMobile ? "16px" : "25px",
                border: "1px solid #F0F0F5",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#1C1F2E",
                  }}
                >
                  All Discussions {!forumLoading && `(${forumPosts.length})`}
                </h3>
                <button
                  onClick={fetchForumPosts}
                  style={{
                    background: "#F3F4F6",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  🔄 Refresh
                </button>
              </div>

              {forumLoading ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>⏳</div>
                  Loading posts...
                </div>
              ) : forumError ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#EF4444",
                    fontSize: "14px",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚠️</div>
                  {forumError}
                </div>
              ) : forumPosts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>💬</div>
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                    Abhi koi discussion nahi
                  </div>
                  <div style={{ fontSize: "13px" }}>
                    Upar se pehli discussion shuru karein!
                  </div>
                </div>
              ) : (
                forumPosts.map((post) => {
                  const isOpen = activePost?._id === post._id;
                  return (
                    <div
                      key={post._id}
                      style={{
                        marginBottom: "14px",
                        border: "1px solid #F0F0F5",
                        borderRadius: "14px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          padding: "16px 20px",
                          background: "#F9FAFB",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          setActivePost(isOpen ? null : post);
                          setReplyMsg("");
                          setReplyText("");
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#1C1F2E",
                                wordBreak: "break-word",
                              }}
                            >
                              {post.title}
                            </div>
                            <span
                              style={{
                                padding: "3px 10px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: "700",
                                background:
                                  post.status === "resolved" ? "#ECFDF5" : "#FFFBEB",
                                color:
                                  post.status === "resolved" ? "#059669" : "#D97706",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {post.status === "resolved" ? "✅ Resolved" : "⏳ Open"}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#6B7280",
                              marginTop: "4px",
                            }}
                          >
                            By {post.authorName || "Student"} •{" "}
                            {new Date(post.createdAt).toLocaleDateString("en-IN")} •{" "}
                            {post.replies?.length || 0}{" "}
                            {post.replies?.length === 1 ? "reply" : "replies"}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: "18px",
                            color: "#9CA3AF",
                            marginLeft: "10px",
                            flexShrink: 0,
                          }}
                        >
                          {isOpen ? "▲" : "▼"}
                        </span>
                      </div>

                      {isOpen && (
                        <div style={{ padding: "16px 20px", background: "#fff" }}>
                          {post.content && (
                            <p
                              style={{
                                fontSize: "13px",
                                color: "#4B5563",
                                marginBottom: "16px",
                                lineHeight: "1.7",
                                borderBottom: "1px solid #F3F4F6",
                                paddingBottom: "14px",
                              }}
                            >
                              {post.content}
                            </p>
                          )}

                          {post.replies?.length > 0 && (
                            <div
                              style={{
                                marginBottom: "16px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                              }}
                            >
                              {post.replies.map((r, i) => (
                                <div
                                  key={i}
                                  style={{
                                    padding: "10px 14px",
                                    background: r.isAdmin ? "#EFF6FF" : "#F0FDF4",
                                    borderLeft: `3px solid ${r.isAdmin ? "#2563EB" : "#10B981"}`,
                                    borderRadius: "0 6px 6px 0",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      color: r.isAdmin ? "#2563EB" : "#059669",
                                    }}
                                  >
                                    {r.isAdmin
                                      ? "👨‍💼 Admin Reply"
                                      : `👤 ${r.authorName || "Student"}`}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "13px",
                                      color: "#374151",
                                      marginTop: "3px",
                                    }}
                                  >
                                    {r.reply}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {post.status !== "resolved" ? (
                            <>
                              <textarea
                                rows={2}
                                placeholder="Write your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  borderRadius: "8px",
                                  border: "1px solid #E5E7EB",
                                  resize: "none",
                                  fontSize: "13px",
                                  outline: "none",
                                  marginBottom: "8px",
                                  boxSizing: "border-box",
                                }}
                              />
                              {replyMsg && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: replyMsg.includes("✅") ? "green" : "red",
                                    marginBottom: "8px",
                                  }}
                                >
                                  {replyMsg}
                                </div>
                              )}
                              <button
                                onClick={() => handleReply(post._id)}
                                style={{
                                  padding: "9px 20px",
                                  background: "#1C1F2E",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "8px",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                }}
                              >
                                Post Reply
                              </button>
                            </>
                          ) : (
                            <div
                              style={{
                                padding: "10px 14px",
                                background: "#ECFDF5",
                                borderRadius: "8px",
                                fontSize: "13px",
                                color: "#059669",
                                fontWeight: "600",
                              }}
                            >
                              ✅ Ye issue admin ne resolve kar diya hai
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );

      case "Profile":
        return (
          <div
            style={{
              maxWidth: "550px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "28px",
                borderRadius: "16px",
                border: "1px solid #F0F0F5",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#6C63FF,#3ECFCF)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  color: "#fff",
                  fontWeight: "800",
                  flexShrink: 0,
                }}
              >
                {studentName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#1C1F2E" }}>
                  {studentName}
                </div>
                <div style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "4px" }}>
                  Student ID: {studentId}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "16px",
                border: "1px solid #F0F0F5",
              }}
            >
              <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "700", color: "#1C1F2E" }}>
                Personal Details
              </h3>
              <label style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: "600" }}>
                Full Name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  marginTop: "6px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleUpdateProfile}
                style={{
                  background: "#6C63FF",
                  color: "#fff",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Save Update
              </button>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "16px",
                border: "1px solid #F0F0F5",
              }}
            >
              <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "700", color: "#1C1F2E" }}>
                Change Password
              </h3>
              <input
                type="password"
                placeholder="Current Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  marginBottom: "12px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  marginBottom: "16px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleChangePassword}
                style={{
                  background: "#1C1F2E",
                  color: "#fff",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Change Password
              </button>
            </div>

            {profileMsg && (
              <div
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#fff",
                  color: profileMsg.includes("✅") ? "#059669" : "#EF4444",
                  fontWeight: "700",
                  textAlign: "center",
                  border: `1px solid ${profileMsg.includes("✅") ? "#A7F3D0" : "#FEE2E2"}`,
                }}
              >
                {profileMsg}
              </div>
            )}
          </div>
        );

      case "Settings":
        return (
          <div
            style={{
              background: "#fff",
              padding: isMobile ? "20px" : "35px",
              borderRadius: "16px",
              border: "1px solid #F0F0F5",
              maxWidth: "500px",
            }}
          >
            <h3 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "700", color: "#1C1F2E" }}>
              Account Management
            </h3>
            <p style={{ color: "#9CA3AF", fontSize: "14px", marginBottom: "28px" }}>
              Logout karne ke baad dobara login karna hoga. Aapka saara data safe rahega.
            </p>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "14px",
                background: "#FEF2F2",
                color: "#EF4444",
                border: "1px solid #FEE2E2",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              🚪 Sign Out from Device
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F5F6FA",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
    >
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 40,
          }}
        />
      )}

      <aside
        style={{
          width: "260px",
          background: "#1C1F2E",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "30px 20px",
          flexShrink: 0,
          ...(isMobile
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 50,
                transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.3s ease",
                overflowY: "auto",
              }
            : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #6C63FF, #3ECFCF)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            🎓
          </div>
          <span style={{ fontWeight: "800", fontSize: "18px" }}>EduPortal</span>
        </div>

        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {navItems.map((item) => {
            const isActive = activeLink === item.label;
            return (
              <div
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: isActive ? "rgba(108,99,255,0.15)" : "transparent",
                  color: isActive ? "#A89EFF" : "#8B90A7",
                  fontWeight: isActive ? "700" : "500",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}

          <div
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "12px 18px",
              borderRadius: "12px",
              cursor: "pointer",
              color: "#EF4444",
              fontWeight: "500",
              marginTop: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>🚪</span>
            <span>Logout</span>
          </div>
        </nav>

        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              padding: "10px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "12px", color: "#9CA3AF" }}>Logged in as</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>
              {studentName}
            </div>
          </div>
        </div>
      </aside>

      <main
        style={{
          flex: 1,
          padding: isMobile ? "20px 16px" : isTablet ? "30px 24px" : "40px 50px",
          overflowY: "auto",
          minWidth: 0,
        }}
      >
        <header style={{ marginBottom: "35px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  background: "#1C1F2E",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                ☰
              </button>
            )}
            <div>
              <div style={{ color: "#9CA3AF", fontSize: "14px", fontWeight: "500" }}>
                Student Management Portal
              </div>
              <h1
                style={{
                  margin: "5px 0 0",
                  fontSize: isMobile ? "22px" : "28px",
                  color: "#1C1F2E",
                  fontWeight: "800",
                }}
              >
                {activeLink}
              </h1>
            </div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;