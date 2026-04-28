import { useState } from "react";
import { USER, PAST_INTERVIEWS, statusConfig, scoreColor } from "@/types/types";

// ── Icons local to this page ──────────────────────────────────────────────────

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
const SparkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const TrophyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.6">
    <path d="M6 9H4a2 2 0 000 4h2M18 9h2a2 2 0 010 4h-2M8 21h8M12 17v4M8 3h8l-1 10a4 4 0 01-6 0L8 3z" />
  </svg>
);
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const SpinnerIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ animation: "spin 1s linear infinite" }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

// ── Shared card style ─────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.018)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 18,
  padding: "24px 28px",
};

// ── Config chips ──────────────────────────────────────────────────────────────

const CONFIG_CHIPS = [
  { label: "Role",       value: USER.role },
  { label: "Difficulty", value: "Mid-level" },
  { label: "Duration",   value: "~40 min" },
  { label: "Format",     value: "Code + Voice" },
];

// ── AIInterviewPage ───────────────────────────────────────────────────────────

export default function AIInterviewPage() {
  const [starting, setStarting] = useState(false);
  const [started,  setStarted]  = useState(false);

  const handleStart = () => {
    setStarting(true);
    setTimeout(() => { setStarting(false); setStarted(true); }, 1400);
  };

  return (
    <div style={{ animation: "pageIn 0.45s ease both" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "#3b82f6", textTransform: "uppercase", margin: "0 0 6px" }}>
          Practice
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.6rem,3vw,2.1rem)", color: "#f1f5f9", margin: "0 0 4px", fontWeight: 400 }}>
          AI Interview
        </h1>
        <p style={{ fontSize: 13.5, color: "#475569", margin: 0 }}>
          Simulate a real interview with AI-generated questions and instant feedback.
        </p>
      </div>

      {/* ── Start card ── */}
      <div style={{
        ...card,
        marginBottom: 16,
        background: "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(99,102,241,0.06) 100%)",
        border: "1px solid rgba(59,130,246,0.18)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative glow */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 240, height: 240, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, position: "relative", zIndex: 1 }}>

          {/* Left — description */}
          <div style={{ maxWidth: 480 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6",
              }}>
                <SparkIcon />
              </div>
              <span style={{ fontSize: 12, color: "#93c5fd", fontWeight: 500 }}>
                AI-powered · Role-specific · Instant feedback
              </span>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#f1f5f9", margin: "0 0 8px" }}>
              Start your AI Interview
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.7 }}>
              Our AI will generate questions tailored to your role as a{" "}
              <span style={{ color: "#93c5fd" }}>{USER.role}</span> targeting {USER.target}.
              You'll get a full scorecard after.
            </p>
          </div>

          {/* Right — CTA or success */}
          {!started ? (
            <button
              onClick={handleStart}
              disabled={starting}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: starting ? "rgba(37,99,235,0.5)" : "#2563eb",
                border: "none", borderRadius: 12,
                padding: "12px 24px",
                color: "#fff", fontSize: 14.5, fontWeight: 600,
                fontFamily: "'DM Sans',sans-serif",
                cursor: starting ? "not-allowed" : "pointer",
                boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                transition: "all 0.2s ease", flexShrink: 0,
              }}
              onMouseEnter={e => { if (!starting) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              {starting ? <><SpinnerIcon /> Loading session…</> : <><PlayIcon /> Start Interview</>}
            </button>
          ) : (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: 12, padding: "10px 18px",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span style={{ fontSize: 13.5, color: "#10b981", fontWeight: 600 }}>Interview started!</span>
            </div>
          )}
        </div>

        {/* Config chips */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          {CONFIG_CHIPS.map(chip => (
            <div key={chip.label} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 8, padding: "5px 12px",
            }}>
              <span style={{ fontSize: 11, color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em" }}>{chip.label}</span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>·</span>
              <span style={{ fontSize: 12, color: "#93c5fd", fontWeight: 500 }}>{chip.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Previous interviews ── */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", margin: "0 0 2px" }}>Previous Interviews</h3>
            <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>{PAST_INTERVIEWS.length} sessions completed</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <TrophyIcon />
            <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 500 }}>Avg: 81%</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PAST_INTERVIEWS.map((iv, i) => {
            const sc = statusConfig(iv.status);
            return (
              <div
                key={iv.id}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 16px", borderRadius: 12,
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer", transition: "all 0.18s ease",
                  animation: `pageIn 0.4s ease ${i * 0.06}s both`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.09)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.015)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                {/* Score ring */}
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: `2px solid ${scoreColor(iv.score)}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, background: `${scoreColor(iv.score)}10`,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: scoreColor(iv.score) }}>{iv.score}</span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#e2e8f0" }}>{iv.role}</span>
                    <span style={{ fontSize: 11.5, color: "#475569" }}>@ {iv.company}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 3, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11.5, color: "#334155" }}>{iv.round}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#334155" }}>
                      <ClockIcon /> {iv.duration}
                    </span>
                    <span style={{ fontSize: 11, color: "#1e293b" }}>{iv.date}</span>
                  </div>
                </div>

                {/* Status badge */}
                <span style={{
                  fontSize: 11.5, fontWeight: 500,
                  color: sc.color, background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  borderRadius: 100, padding: "3px 10px", flexShrink: 0,
                }}>
                  {sc.label}
                </span>

                <span style={{ color: "#334155", flexShrink: 0 }}><ChevronRightIcon /></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}