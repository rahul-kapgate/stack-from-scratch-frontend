import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCurrentUser, useLogout } from "@/hooks/Useauth";

export default function Header() {
  const { data: user } = useCurrentUser();
  const { mutate: logout, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 font-['DM_Sans',sans-serif]">
      <div className="relative bg-[#060b14]/85 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden">
        {/* Orbs */}
        <div
          className="pointer-events-none absolute -top-16 -left-20 w-[260px] h-[260px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)",
            animation: "hdrOrb 5s ease-in-out infinite",
          }}
        />
        <div
          className="pointer-events-none absolute -top-10 -right-14 w-[200px] h-[200px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
            animation: "hdrOrb 5s ease-in-out 2.5s infinite",
          }}
        />

        <style>{`
          @keyframes hdrOrb { 0%,100%{opacity:0.5} 50%{opacity:1} }
          @keyframes hdrFadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
          .hdr-inner { animation: hdrFadeIn 0.5s ease both; }
          .hdr-nav-link { position: relative; }
          .hdr-nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -22px; left: 0; right: 0;
            height: 1.5px;
            background: #3b82f6;
            border-radius: 1px;
          }
          .hdr-btn-primary:hover { transform: translateY(-1.5px); box-shadow: 0 10px 36px rgba(37,99,235,0.5) !important; }
          .hdr-btn-ghost:hover { color: #cbd5e1; border-color: rgba(255,255,255,0.15); }
        `}</style>

        {/* Main bar */}
        <div className="hdr-inner max-w-[1140px] mx-auto flex justify-between items-center px-7 h-[60px] relative z-[1]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div
              className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center flex-shrink-0 border border-white/[0.12]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.9), rgba(139,92,246,0.7))",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
              >
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-['DM_Serif_Display',serif] text-[17px] text-slate-100 leading-none tracking-[-0.3px]">
              Stack{" "}
              <em
                className="text-blue-400 not-italic"
                style={{ fontStyle: "italic" }}
              >
                from Scratch
              </em>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-7 items-center text-sm font-medium">
            {/* AI pill */}
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium text-blue-300 border border-blue-500/[0.22] select-none"
              style={{ background: "rgba(59,130,246,0.08)" }}
            >
              <span
                className="w-[5px] h-[5px] rounded-full bg-blue-500 flex-shrink-0"
                style={{ animation: "hdrOrb 2.5s ease-in-out infinite" }}
              />
              AI-powered
            </div>

            <div className="w-px h-[18px] bg-white/[0.07]" />

            <Link
              to="/"
              className={`hdr-nav-link text-[13.5px] font-medium transition-colors no-underline ${
                pathname === "/"
                  ? "active text-blue-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className={`hdr-nav-link text-[13.5px] font-medium transition-colors no-underline ${
                pathname === "/about-us"
                  ? "active text-blue-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className={`hdr-nav-link text-[13.5px] font-medium transition-colors no-underline ${
                pathname === "/contact"
                  ? "active text-blue-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`hdr-nav-link text-[13.5px] font-medium transition-colors no-underline ${
                  pathname === "/dashboard"
                    ? "active text-blue-300"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <span className="text-[13px] text-slate-400 font-medium">
                  {user.name}
                </span>
                <div className="w-px h-[18px] bg-white/[0.07] mx-1" />
                <button
                  onClick={() => logout()}
                  disabled={isPending}
                  className="hdr-btn-ghost bg-white/[0.04] text-slate-500 border border-white/[0.09] px-[18px] py-2 rounded-[9px] text-[13px] font-medium cursor-pointer transition-all"
                >
                  {isPending ? "Logging out…" : "Log out"}
                </button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <button className="hdr-btn-ghost bg-white/[0.04] text-slate-500 border border-white/[0.09] px-[18px] py-2 rounded-[9px] text-[13px] font-medium cursor-pointer transition-all">
                    Sign in
                  </button>
                </Link>
                <Link to="/auth">
                  <button
                    className="hdr-btn-primary flex items-center gap-1.5 bg-blue-600 text-white border-none px-5 py-2 rounded-[9px] text-[13px] font-semibold cursor-pointer transition-all"
                    style={{ boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}
                  >
                    Start free
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ opacity: 0.85 }}
                    >
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: avatar/signin + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {!user ? (
              <Link to="/auth">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-[9px] text-[13px] font-semibold"
                  style={{ boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}
                >
                  Sign in
                </button>
              </Link>
            ) : (
              <div
                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[13px] font-bold"
                style={{ boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}
              >
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="flex flex-col gap-[5px] p-1.5 bg-transparent border-none cursor-pointer z-[110]"
            >
              <span
                className="block w-[22px] h-0.5 bg-slate-300 rounded-sm transition-all duration-300"
                style={{
                  transform: open ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className={`block w-[22px] h-0.5 bg-slate-300 rounded-sm transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className="block w-[22px] h-0.5 bg-slate-300 rounded-sm transition-all duration-300"
                style={{
                  transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-[350ms] ease-in-out relative z-[1] ${
            open
              ? "max-h-80 opacity-100 border-t border-white/[0.06]"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 px-7 py-5">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`text-[15px] font-medium no-underline transition-colors ${
                pathname === "/"
                  ? "text-blue-300"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              onClick={() => setOpen(false)}
              className={`text-[15px] font-medium no-underline transition-colors ${
                pathname === "/about-us"
                  ? "text-blue-300"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className={`text-[15px] font-medium no-underline transition-colors ${
                pathname === "/contact"
                  ? "text-blue-300"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className={`text-[15px] font-medium no-underline transition-colors ${
                  pathname === "/dashboard"
                    ? "text-blue-300"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                Dashboard
              </Link>
            )}

            <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-2.5">
              {user ? (
                <>
                  <span className="text-[13px] text-slate-400 font-medium">
                    {user.name}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    disabled={isPending}
                    className="bg-white/[0.04] text-slate-500 border border-white/[0.09] py-2.5 rounded-[9px] text-sm font-medium cursor-pointer"
                  >
                    {isPending ? "Logging out…" : "Log out"}
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/auth" onClick={() => setOpen(false)}>
                    <button className="w-full bg-white/[0.04] text-slate-400 border border-white/[0.09] py-2.5 rounded-[9px] text-sm font-medium cursor-pointer">
                      Sign in
                    </button>
                  </Link>
                  <Link to="/auth" onClick={() => setOpen(false)}>
                    <button
                      className="w-full bg-blue-600 text-white py-3 rounded-[9px] text-sm font-semibold cursor-pointer"
                      style={{ boxShadow: "0 4px_20px rgba(37,99,235,0.35)" }}
                    >
                      Start free →
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
