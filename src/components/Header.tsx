import { Link } from "react-router-dom";
import { useState } from "react";
import { useCurrentUser, useLogout } from "@/hooks/Useauth";

export default function Header() {
  const { data: user } = useCurrentUser();
  const { mutate: logout, isPending } = useLogout();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#060b14]/85 backdrop-blur-xl border-b border-white/[0.06] font-['DM_Sans',sans-serif]">
      <div className="max-w-[1140px] mx-auto flex justify-between items-center px-7 py-3.5">
        {/* Logo */}
        <Link to="/">
          <img
            src="/favicon.svg"
            alt="Stack From Scratch"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          <Link
            to="/"
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/"
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            Contact
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2.5">
          {user ? (
            <>
              <span className="text-sm text-white">{user.name}</span>
              <button
                onClick={() => logout()}
                disabled={isPending}
                className="bg-white/[0.04] text-slate-400 border border-white/[0.09] px-5 py-2 rounded-lg text-[13px] font-medium cursor-pointer hover:text-slate-200 transition-all"
              >
                {isPending ? "Loggning out…" : "Log out"}
              </button>
            </>
          ) : (
            <Link to="/auth">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-[13px] font-semibold cursor-pointer shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 transition-all">
                Sign in
              </button>
            </Link>
          )}
        </div>

        {/* Mobile: Sign in + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {!user && (
            <Link to="/auth">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[13px] font-semibold shadow-[0_4px_20px_rgba(37,99,235,0.35)]">
                Sign in
              </button>
            </Link>
          )}

          {user && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[13px] font-semibold shadow-[0_4px_20px_rgba(37,99,235,0.35)]">
              {user.name[0] || "U"}
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex flex-col gap-[5px] p-1.5 bg-transparent border-none cursor-pointer z-[110]"
          >
            <span
              className="block w-[22px] h-0.5 bg-slate-200 rounded-sm transition-all duration-300"
              style={{
                transform: open ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className={`block w-[22px] h-0.5 bg-slate-200 rounded-sm transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className="block w-[22px] h-0.5 bg-slate-200 rounded-sm transition-all duration-300"
              style={{
                transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-350 ease-in-out ${
          open
            ? "max-h-80 opacity-100 border-t border-white/[0.06]"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-7 py-5">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-slate-400 text-[15px] font-medium no-underline hover:text-slate-200 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-slate-400 text-[15px] font-medium no-underline hover:text-slate-200 transition-colors"
          >
            Contact
          </Link>
          {user && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="text-slate-400 text-[15px] font-medium no-underline hover:text-slate-200 transition-colors"
            >
              Dashboard
            </Link>
          )}
          <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-2.5">
            {user ? (
              <>
                <span className="text-[13px] text-white">{user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  disabled={isPending}
                  className="bg-white/[0.04] text-slate-400 border border-white/[0.09] py-2.5 rounded-lg text-sm font-medium cursor-pointer"
                >
                  {isPending ? "Logging out…" : "Log out"}
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)}>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold cursor-pointer shadow-[0_4px_20px_rgba(37,99,235,0.35)]">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
