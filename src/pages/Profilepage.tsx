import { useState } from "react";
import { USER, SKILLS } from "@/types/types";

// ── Shared card style ─────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.018)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 18,
  padding: "24px 28px",
};

// ── Inline input style ────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "9px 14px",
  color: "#e2e8f0",
  fontSize: 13.5,
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s",
};

// ── Edit icon ─────────────────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// ── ProfilePage ───────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [editing, setEditing]     = useState(false);
  const [name, setName]           = useState(USER.name);
  const [role, setRole]           = useState(USER.role);
  const [editName, setEditName]   = useState(USER.name);
  const [editRole, setEditRole]   = useState(USER.role);

  const saveEdit = () => {
    setName(editName);
    setRole(editRole);
    setEditing(false);
  };

  return (
    <div style={{ animation: "pageIn 0.45s ease both" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "#3b82f6", textTransform: "uppercase", margin: "0 0 6px" }}>
          My Account
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.6rem,3vw,2.1rem)", color: "#f1f5f9", margin: "0 0 4px", fontWeight: 400 }}>
          Profile
        </h1>
        <p style={{ fontSize: 13.5, color: "#475569", margin: 0 }}>
          Manage your information and track your progress.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* ── Identity card ── */}
        <div style={{ ...card, gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>

            {/* Avatar + info */}
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 700, color: "#fff",
                flexShrink: 0, border: "2px solid rgba(59,130,246,0.3)",
              }}>
                {USER.avatar}
              </div>

              <div>
                {editing ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <input
                      style={inputStyle}
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      onFocus={e => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      placeholder="Full name"
                    />
                    <input
                      style={inputStyle}
                      value={editRole}
                      onChange={e => setEditRole(e.target.value)}
                      onFocus={e => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      placeholder="Role"
                    />
                  </div>
                ) : (
                  <>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#f1f5f9", margin: "0 0 3px" }}>{name}</h2>
                    <p style={{ fontSize: 13, color: "#3b82f6", margin: "0 0 3px", fontWeight: 500 }}>{role}</p>
                    <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>{USER.email}</p>
                  </>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              {editing ? (
                <>
                  <button
                    onClick={() => setEditing(false)}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "7px 14px", color: "#64748b", fontSize: 13, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    style={{ background: "#2563eb", border: "none", borderRadius: 10, padding: "7px 16px", color: "#fff", fontSize: 13, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", fontWeight: 600 }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "7px 14px", color: "#94a3b8", fontSize: 13, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
                >
                  <EditIcon /> Edit profile
                </button>
              )}
            </div>
          </div>

          {/* Meta row */}
          <div style={{ display: "flex", gap: 24, marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 11, color: "#334155", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.09em" }}>Level</p>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>{USER.level}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#334155", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.09em" }}>Target Role</p>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>{USER.target}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#334155", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.09em" }}>Target Companies</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {USER.targetCompanies.map(c => (
                  <span key={c} style={{ fontSize: 11.5, color: "#3b82f6", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 100, padding: "2px 10px" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stat cards ── */}
        {USER.stats.map(s => (
          <div key={s.label} style={{ ...card, textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.9rem", color: "#3b82f6", margin: "0 0 4px", fontWeight: 400, lineHeight: 1 }}>
              {s.value}
            </p>
            <p style={{ fontSize: 12, color: "#475569", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Skill breakdown ── */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", margin: "0 0 2px" }}>Skill Breakdown</h3>
            <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>Based on your last 12 interviews</p>
          </div>
          <span style={{ fontSize: 11, color: "#3b82f6", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 100, padding: "3px 10px" }}>
            AI analysed
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {SKILLS.map(skill => (
            <div key={skill.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{skill.name}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: skill.color }}>{skill.level}%</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${skill.level}%`, background: skill.color, borderRadius: 100, opacity: 0.75, transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}