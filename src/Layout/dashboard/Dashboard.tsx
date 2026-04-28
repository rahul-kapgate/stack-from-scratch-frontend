import { useState } from "react";
import { type Page } from "@/types/types";
import Sidebar, { Icons } from "@/components/Sidebar";
import ProfilePage from "@/pages/Profilepage";
import AIInterviewPage from "@/pages/Aiinterviewpage";

export default function Dashboard() {
  const [page, setPage]           = useState<Page>("profile");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#060b14",
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes pageIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }

        * { box-sizing: border-box; }

        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.12); }

        /* Responsive helpers */
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-topbar   { display: flex !important; }
          .main-content    { padding: 76px 16px 24px !important; }
        }
        @media (min-width: 769px) {
          .mobile-topbar   { display: none !important; }
          .mobile-overlay  { display: none !important; }
        }
      `}</style>

      {/* ── Desktop sidebar ── */}
      <div className="desktop-sidebar" style={{ display: "flex" }}>
        <Sidebar active={page} setActive={setPage} />
      </div>

      {/* ── Mobile top bar ── */}
      <div
        className="mobile-topbar"
        style={{
          display: "none",
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "#060b14",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 16px",
          alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>AI Interview</span>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
        >
          <Icons.Menu />
        </button>
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}
        >
          {/* Backdrop */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }}
            onClick={() => setMobileOpen(false)}
          />
          {/* Slide-in sidebar */}
          <div style={{ position: "relative", zIndex: 1, width: 240, height: "100%", animation: "slideIn 0.25s ease" }}>
            <Sidebar active={page} setActive={setPage} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main content area ── */}
      <main
        className="main-content"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px 36px",
          position: "relative",
        }}
      >
        {/* Subtle grid texture */}
        <div style={{
          position: "fixed", inset: 0,
          backgroundImage: "linear-gradient(rgba(59,130,246,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.018) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Page content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          {page === "profile"   && <ProfilePage />}
          {page === "interview" && <AIInterviewPage />}
        </div>
      </main>
    </div>
  );
}