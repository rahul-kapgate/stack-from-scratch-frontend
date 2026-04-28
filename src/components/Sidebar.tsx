import { type Page, USER } from "@/types/types";
import type { JSX } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────

export const Icons = {
  Profile: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  Interview: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 17v4M9 9l2 2 4-4" />
    </svg>
  ),
  Logout: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  Menu: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  X: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  LogoMark: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
    >
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

// ── Nav items config ──────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Page; label: string; icon: JSX.Element }[] = [
  { id: "profile", label: "Profile", icon: <Icons.Profile /> },
  { id: "interview", label: "AI Interview", icon: <Icons.Interview /> },
];

// ── NavItem ───────────────────────────────────────────────────────────────────

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        padding: "9px 12px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13.5,
        fontWeight: active ? 500 : 400,
        background: active ? "rgba(59,130,246,0.12)" : "transparent",
        color: active ? "#93c5fd" : "#64748b",
        transition: "all 0.18s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.04)";
          (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background =
            "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
        }
      }}
    >
      {/* Active left-border accent */}
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 3,
            height: 20,
            background: "#3b82f6",
            borderRadius: "0 2px 2px 0",
          }}
        />
      )}
      <span style={{ color: active ? "#3b82f6" : "inherit" }}>{icon}</span>
      {label}
    </button>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

interface SidebarProps {
  active: Page;
  setActive: (p: Page) => void;
  onClose?: () => void;
}

export default function Sidebar({ active, setActive, onClose }: SidebarProps) {
  return (
    <aside
      style={{
        width: "20vw",
        height: "100%",
        background: "#060b14",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        padding: "0 0 0 10px",
      }}
    >
      {/* ── Logo ── */}
      <div
        style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icons.LogoMark />
          </div>
          <div>
            <p
              style={{
                fontSize: 13.5,
                fontWeight: 600,
                color: "#e2e8f0",
                margin: 0,
                lineHeight: 1.2,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              AI Interview
            </p>
            <p style={{ fontSize: 10.5, color: "#334155", margin: 0 }}>
              Practice Platform
            </p>
          </div>
        </div>

        {/* Close btn — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#475569",
              padding: 4,
            }}
          >
            <Icons.X />
          </button>
        )}
      </div>

      {/* ── User mini card ── */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            padding: "9px 12px",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {USER.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: 12.5,
                color: "#e2e8f0",
                margin: 0,
                fontWeight: 500,
                fontFamily: "'DM Sans',sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {USER.name}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#334155",
                margin: 0,
                fontFamily: "'DM Sans',sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {USER.role}
            </p>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav
        style={{
          flex: 1,
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#1e293b",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: "0 0 6px 4px",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          Navigation
        </p>

        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={active === item.id}
            onClick={() => {
              setActive(item.id);
              onClose?.();
            }}
          />
        ))}
      </nav>

      {/* ── Logout ── */}
      <div
        style={{
          padding: "12px 12px 20px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: "9px 12px",
            borderRadius: 10,
            border: "none",
            background: "transparent",
            color: "#475569",
            fontSize: 13.5,
            fontFamily: "'DM Sans',sans-serif",
            cursor: "pointer",
            transition: "all 0.18s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(239,68,68,0.07)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fca5a5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#475569";
          }}
        >
          <Icons.Logout /> Logout
        </button>
      </div>
    </aside>
  );
}
