import { useState } from "react";
import { api } from "@/utils/apiClient";
import { Link } from "react-router-dom";

type Step = "email" | "reset" | "success";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validateEmail() {
    const e: Record<string, string> = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    return e;
  }

  function validateReset() {
    const e: Record<string, string> = {};
    if (!otp.trim()) e.otp = "Enter the OTP sent to your email";
    else if (otp.length !== 6) e.otp = "OTP must be 6 digits";
    if (!newPassword) e.newPassword = "New password is required";
    else if (newPassword.length < 6) e.newPassword = "Min. 6 characters";
    if (!confirmPwd) e.confirmPwd = "Please confirm your password";
    else if (newPassword !== confirmPwd)
      e.confirmPwd = "Passwords do not match";
    return e;
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateEmail();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { identifier: email });
      setStep("reset");
    } catch (err) {
      setErrors({
        email: err instanceof Error ? err.message : "Failed to send OTP",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateReset();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        identifier: email,
        otp,
        new_password: newPassword,
        confirm_password: confirmPwd,
      });
      setStep("success");
    } catch (err) {
      setErrors({
        otp:
          err instanceof Error ? err.message : "Invalid OTP or request failed",
      });
    } finally {
      setLoading(false);
    }
  }

  const inputCls = (hasErr: boolean, disabled: boolean) =>
    `w-full h-10 px-3 rounded-[10px] border text-sm outline-none transition-colors
     bg-white/[0.03] text-slate-200 placeholder:text-slate-700
     ${hasErr ? "border-red-500/60" : "border-white/[0.09] focus:border-blue-500/60"}
     ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  const STEPS: Step[] = ["email", "reset", "success"];
  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="bg-[#060b14] min-h-screen text-slate-100 font-['DM_Sans',sans-serif] flex items-center justify-center px-4 py-14 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes orb    { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes fadein { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .orb      { animation: orb 5s ease-in-out infinite; }
        .fp-card  { animation: fadein 0.6s ease both; }
        .fp-btn   { transition: all 0.2s ease; }
        .fp-btn:hover  { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,99,235,0.45); }
        .fp-btn:active { transform: translateY(0); }
      `}</style>

      {/* Orbs */}
      <div
        className="orb pointer-events-none fixed -top-28 -left-28 w-[420px] h-[420px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 65%)",
        }}
      />
      <div
        className="orb pointer-events-none fixed -bottom-20 -right-20 w-[380px] h-[380px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)",
          animationDelay: "2.5s",
        }}
      />

      <div className="fp-card relative z-10 w-full max-w-[440px]">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-[7px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            <span className="text-xs text-blue-300 font-medium">
              AI-powered interview platform
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-[20px] overflow-hidden">
          {/* Card top bar — back link + stepper */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.06]">
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-300 transition-colors"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to sign in
            </Link>

            {/* Step dots */}
            <div className="flex items-center gap-1.5">
              {STEPS.map((s, i) => {
                const isDone = i < stepIndex;
                const isActive = i === stepIndex;
                return (
                  <div key={s} className="flex items-center gap-1.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all
                        ${isActive ? "bg-blue-600 text-white" : isDone ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400" : "bg-white/[0.04] border border-white/[0.08] text-slate-600"}`}
                    >
                      {isDone ? (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`w-6 h-px rounded-full transition-colors ${isDone ? "bg-emerald-500/40" : "bg-white/[0.07]"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-7">
            {/* ── Step 1: Email ── */}
            {step === "email" && (
              <>
                <h2 className="font-['DM_Serif_Display',serif] text-2xl text-slate-50 mb-1 font-normal">
                  Forgot password?
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  Enter your email and we'll send an OTP to reset your password.
                </p>

                <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
                  <FpField label="Email address" error={errors.email}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className={inputCls(!!errors.email, loading)}
                    />
                  </FpField>
                  <FpBtn loading={loading} label="Send OTP" />
                </form>
              </>
            )}

            {/* ── Step 2: OTP + New password ── */}
            {step === "reset" && (
              <>
                <h2 className="font-['DM_Serif_Display',serif] text-2xl text-slate-50 mb-1 font-normal">
                  Reset your password
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  Enter the OTP sent to{" "}
                  <span className="font-medium text-slate-300">{email}</span>{" "}
                  and choose a new password.
                </p>

                <form onSubmit={handleReset} className="space-y-4" noValidate>
                  <FpField label="Enter OTP" error={errors.otp}>
                    <input
                      type="text"
                      placeholder="••••••"
                      value={otp}
                      maxLength={6}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                      disabled={loading}
                      className={`${inputCls(!!errors.otp, loading)} text-center text-2xl tracking-[0.6em] font-mono`}
                    />
                  </FpField>

                  <FpField label="New password" error={errors.newPassword}>
                    <input
                      type="password"
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={loading}
                      className={inputCls(!!errors.newPassword, loading)}
                    />
                  </FpField>

                  <FpField
                    label="Confirm new password"
                    error={errors.confirmPwd}
                  >
                    <input
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      disabled={loading}
                      className={inputCls(!!errors.confirmPwd, loading)}
                    />
                  </FpField>

                  <FpBtn loading={loading} label="Reset password" />
                </form>

                <p className="text-center text-sm text-slate-600 mt-4">
                  Didn't receive it?{" "}
                  <button
                    type="button"
                    onClick={(e) =>
                      handleSendOtp(e as unknown as React.FormEvent)
                    }
                    disabled={loading}
                    className="text-blue-500 hover:underline font-medium disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </p>

                <div className="text-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setOtp("");
                      setErrors({});
                    }}
                    className="text-xs text-slate-600 hover:text-slate-400 underline"
                  >
                    ← Change email
                  </button>
                </div>
              </>
            )}

            {/* ── Step 3: Success ── */}
            {step === "success" && (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✓
                </div>
                <h2 className="font-['DM_Serif_Display',serif] text-2xl text-slate-50 mb-2 font-normal">
                  Password reset!
                </h2>
                <p className="text-sm text-slate-600 mb-7 leading-relaxed">
                  Your password has been updated successfully.
                  <br />
                  Sign in with your new password.
                </p>
                <Link
                  to="/auth"
                  className="fp-btn inline-flex items-center justify-center w-full h-10 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-[10px] shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                >
                  Go to sign in →
                </Link>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-700 mt-5">
          By continuing, you agree to our{" "}
          <a href="#" className="hover:underline text-slate-600">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="hover:underline text-slate-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function FpField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function FpBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="fp-btn w-full h-10 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-[10px] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        `${label} →`
      )}
    </button>
  );
}
