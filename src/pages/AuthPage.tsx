import { useState } from "react";
import { useSendOtp, useVerifyOtp, useLogin } from "../hooks/Useauth";
import type { UserType } from "@/utils/authApi";
import { Link } from "react-router-dom";

type Tab = "login" | "signup";
type SignupStep = "form" | "otp";

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("signup");
  const [signupStep, setSignupStep] = useState<SignupStep>("form");
  const [verified, setVerified] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<UserType>("student");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginMutation = useLogin();
  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  function validateLogin() {
    const e: Record<string, string> = {};
    if (!identifier) e.identifier = "Email or phone is required";
    if (!loginPassword) e.loginPassword = "Password is required";
    return e;
  }

  function validateSignupForm() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!phone) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) e.phone = "Enter a valid 10-digit number";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Min. 6 characters";
    if (!confirmPwd) e.confirmPwd = "Please confirm your password";
    else if (password !== confirmPwd) e.confirmPwd = "Passwords do not match";
    return e;
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateLogin();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    loginMutation.mutate(
      { identifier, password: loginPassword },
      {
        onError: (err: Error) =>
          setErrors({ identifier: err.message ?? "Login failed" }),
      },
    );
  }

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateSignupForm();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    sendOtpMutation.mutate(
      { name, email, phone, password, user_type: userType },
      {
        onSuccess: () => setSignupStep("otp"),
        onError: (err: Error) =>
          setErrors({ email: err.message ?? "Failed to send OTP" }),
      },
    );
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!otp.trim()) {
      setErrors({ otp: "Enter the OTP sent to your email" });
      return;
    }
    if (otp.length !== 6) {
      setErrors({ otp: "OTP must be 6 digits" });
      return;
    }
    setErrors({});
    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          setTab("login");
          setSignupStep("form");
          setVerified(true);
          setOtp("");
        },
        onError: (err: Error) =>
          setErrors({ otp: err.message ?? "Invalid OTP" }),
      },
    );
  }

  function switchTab(t: Tab) {
    setTab(t);
    setErrors({});
    setSignupStep("form");
    setVerified(false);
    loginMutation.reset();
    sendOtpMutation.reset();
    verifyOtpMutation.reset();
  }

  const inputCls = (hasErr: boolean, disabled: boolean) =>
    `w-full h-10 px-3 rounded-[10px] border text-sm outline-none transition-colors
     bg-white/[0.03] text-slate-200 placeholder:text-slate-700
     ${hasErr ? "border-red-500/60" : "border-white/[0.09] focus:border-blue-500/60"}
     ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className="bg-[#060b14] min-h-screen text-slate-100 font-['DM_Sans',sans-serif] flex items-center justify-center px-4 py-14 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes orb  { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes fadein { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .orb  { animation: orb 5s ease-in-out infinite; }
        .auth-card { animation: fadein 0.6s ease both; }
        .auth-inp:focus { border-color: rgba(59,130,246,0.6) !important; }
        .auth-btn { transition: all 0.2s ease; }
        .auth-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,99,235,0.45); }
        .auth-btn:active { transform: translateY(0); }
        .auth-tab-active { border-bottom: 2px solid #3b82f6; }
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

      <div className="auth-card relative z-10 w-full max-w-[440px]">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-[7px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            <span className="text-xs text-blue-300 font-medium">
              AI-powered interview platform
            </span>
          </div>
        </div>

        {/* Verified banner */}
        {verified && (
          <div className="mb-4 flex items-center gap-2 bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl">
            <span>✓</span> Account verified! Sign in to continue.
          </div>
        )}

        {/* Card */}
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-[20px] overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-white/[0.07]">
            {(["login", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`py-3.5 text-sm font-medium transition-colors font-['DM_Sans',sans-serif]
                  ${
                    tab === t
                      ? "text-slate-100 bg-white/[0.02] auth-tab-active"
                      : "text-slate-600 hover:text-slate-400 bg-transparent"
                  }`}
              >
                {t === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <div className="p-7">
            {/* ── Login ── */}
            {tab === "login" && (
              <>
                <h2 className="font-['DM_Serif_Display',serif] text-2xl text-slate-50 mb-1 font-normal">
                  Welcome back
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  Sign in with your email or phone
                </p>

                <form onSubmit={handleLogin} className="space-y-4" noValidate>
                  <Field label="Email or phone" error={errors.identifier}>
                    <input
                      type="text"
                      placeholder="you@example.com or 9876543210"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      disabled={loginMutation.isPending}
                      className={inputCls(
                        !!errors.identifier,
                        loginMutation.isPending,
                      )}
                    />
                  </Field>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-medium text-slate-400">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={loginMutation.isPending}
                      className={inputCls(
                        !!errors.loginPassword,
                        loginMutation.isPending,
                      )}
                    />
                    {errors.loginPassword && (
                      <ErrMsg msg={errors.loginPassword} />
                    )}
                  </div>

                  <SubmitBtn
                    pending={loginMutation.isPending}
                    label="Sign in"
                  />
                </form>

                <SwitchRow tab="login" onSwitch={() => switchTab("signup")} />
              </>
            )}

            {/* ── Signup Step 1 ── */}
            {tab === "signup" && signupStep === "form" && (
              <>
                <h2 className="font-['DM_Serif_Display',serif] text-2xl text-slate-50 mb-1 font-normal">
                  Create your account
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  We'll send an OTP to verify your email
                </p>

                <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
                  <Field label="Full name" error={errors.name}>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={sendOtpMutation.isPending}
                      className={inputCls(
                        !!errors.name,
                        sendOtpMutation.isPending,
                      )}
                    />
                  </Field>

                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={sendOtpMutation.isPending}
                      className={inputCls(
                        !!errors.email,
                        sendOtpMutation.isPending,
                      )}
                    />
                  </Field>

                  <Field label="Phone number" error={errors.phone}>
                    <div className="flex gap-2">
                      <span className="h-10 px-3 flex items-center border border-white/[0.09] rounded-[10px] text-sm text-slate-600 bg-white/[0.05] shrink-0">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        maxLength={10}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/, ""))
                        }
                        disabled={sendOtpMutation.isPending}
                        className={`flex-1 ${inputCls(!!errors.phone, sendOtpMutation.isPending)}`}
                      />
                    </div>
                  </Field>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">
                      I am a
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["student", "professional"] as UserType[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setUserType(r)}
                          disabled={sendOtpMutation.isPending}
                          className={`h-10 rounded-[10px] border text-sm font-medium transition-all disabled:opacity-50
                            ${
                              userType === r
                                ? "border-blue-500/50 bg-blue-500/[0.12] text-blue-300"
                                : "border-white/[0.09] bg-white/[0.03] text-slate-500 hover:text-slate-300 hover:border-white/20"
                            }`}
                        >
                          {r === "student" ? "🎓 Student" : "💼 Professional"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Password" error={errors.password}>
                    <input
                      type="password"
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={sendOtpMutation.isPending}
                      className={inputCls(
                        !!errors.password,
                        sendOtpMutation.isPending,
                      )}
                    />
                  </Field>

                  <Field label="Confirm password" error={errors.confirmPwd}>
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      disabled={sendOtpMutation.isPending}
                      className={inputCls(
                        !!errors.confirmPwd,
                        sendOtpMutation.isPending,
                      )}
                    />
                  </Field>

                  <SubmitBtn
                    pending={sendOtpMutation.isPending}
                    label="Send OTP"
                  />
                </form>

                <SwitchRow tab="signup" onSwitch={() => switchTab("login")} />
              </>
            )}

            {/* ── Signup Step 2: OTP ── */}
            {tab === "signup" && signupStep === "otp" && (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 text-xl">
                    ✉
                  </div>
                  <h2 className="font-['DM_Serif_Display',serif] text-2xl text-slate-50 mb-1 font-normal">
                    Check your email
                  </h2>
                  <p className="text-sm text-slate-600">
                    We sent a 6-digit OTP to{" "}
                    <span className="font-medium text-slate-300">{email}</span>
                  </p>
                </div>

                <form
                  onSubmit={handleVerifyOtp}
                  className="space-y-4"
                  noValidate
                >
                  <Field label="Enter OTP" error={errors.otp}>
                    <input
                      type="text"
                      placeholder="••••••"
                      value={otp}
                      maxLength={6}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                      disabled={verifyOtpMutation.isPending}
                      className={`${inputCls(!!errors.otp, verifyOtpMutation.isPending)} text-center text-2xl tracking-[0.6em] font-mono`}
                    />
                  </Field>

                  <SubmitBtn
                    pending={verifyOtpMutation.isPending}
                    label="Verify & create account"
                  />
                </form>

                <div className="text-center mt-4 space-y-2">
                  <p className="text-sm text-slate-600">
                    Didn't receive it?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        if (!name || !email || !phone || !password) return;
                        sendOtpMutation.mutate({
                          name,
                          email,
                          phone,
                          password,
                          user_type: userType,
                        });
                      }}
                      disabled={
                        sendOtpMutation.isPending || sendOtpMutation.isSuccess
                      }
                      className="text-blue-500 hover:underline font-medium disabled:opacity-50"
                    >
                      {sendOtpMutation.isPending ? "Sending…" : "Resend OTP"}
                    </button>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSignupStep("form");
                      setOtp("");
                      setErrors({});
                    }}
                    className="text-xs text-slate-600 hover:text-slate-400 underline"
                  >
                    ← Change details
                  </button>
                </div>
              </>
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

// ── Helpers ──────────────────────────────────────────────

function Field({
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
      {error && <ErrMsg msg={error} />}
    </div>
  );
}

function ErrMsg({ msg }: { msg: string }) {
  return <p className="text-xs text-red-400 mt-1">{msg}</p>;
}

function SubmitBtn({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="auth-btn w-full h-10 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-[10px] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
    >
      {pending ? (
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

function SwitchRow({ tab, onSwitch }: { tab: Tab; onSwitch: () => void }) {
  return (
    <p className="text-center text-sm text-slate-600 mt-5">
      {tab === "login"
        ? "Don't have an account? "
        : "Already have an account? "}
      <button
        onClick={onSwitch}
        className="text-blue-500 hover:underline font-medium"
      >
        {tab === "login" ? "Create one" : "Sign in"}
      </button>
    </p>
  );
}
