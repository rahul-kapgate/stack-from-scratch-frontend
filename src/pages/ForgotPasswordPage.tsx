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

  // ── Validation ────────────────────────────────────────
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

  // ── Step 1: Send OTP to email ─────────────────────────
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
      const msg = err instanceof Error ? err.message : "Failed to send OTP";
      setErrors({ email: msg });
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2: Verify OTP + set new password ─────────────
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
      const msg =
        err instanceof Error ? err.message : "Invalid OTP or request failed";
      setErrors({ otp: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <Link
          to="/auth"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to sign in
        </Link>

        <div className="border border-border rounded-2xl bg-card shadow-sm overflow-hidden">
          {/* Progress dots */}
          <div className="flex items-center gap-2 px-7 pt-6 mb-1">
            {(["email", "reset", "success"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    step === s
                      ? "bg-blue-600 text-white"
                      : (step === "reset" && s === "email") ||
                          step === "success"
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {(step === "reset" && s === "email") ||
                  (step === "success" && s !== "success") ? (
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
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
                {i < 2 && (
                  <div
                    className={`flex-1 h-0.5 w-8 rounded-full ${
                      (step === "reset" && i === 0) || step === "success"
                        ? "bg-emerald-500"
                        : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="p-7">
            {/* ── Step 1: Email ── */}
            {step === "email" && (
              <>
                <h2 className="text-xl font-bold tracking-tight mb-1">
                  Forgot password?
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter your email and we'll send an OTP to reset your password.
                </p>
                <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.email ? "border-red-400" : "border-border"
                      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <Btn loading={loading} label="Send OTP" />
                </form>
              </>
            )}

            {/* ── Step 2: OTP + New password ── */}
            {step === "reset" && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold tracking-tight mb-1">
                    Reset your password
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the OTP sent to{" "}
                    <span className="font-medium text-foreground">{email}</span>{" "}
                    and choose a new password.
                  </p>
                </div>
                <form onSubmit={handleReset} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      OTP
                    </label>
                    <input
                      type="text"
                      placeholder="••••••"
                      value={otp}
                      maxLength={6}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                      disabled={loading}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 text-center tracking-[0.5em] font-mono ${
                        errors.otp ? "border-red-400" : "border-border"
                      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    {errors.otp && (
                      <p className="text-xs text-red-500 mt-1">{errors.otp}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      New password
                    </label>
                    <input
                      type="password"
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={loading}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.newPassword ? "border-red-400" : "border-border"
                      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    {errors.newPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      disabled={loading}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.confirmPwd ? "border-red-400" : "border-border"
                      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    {errors.confirmPwd && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPwd}
                      </p>
                    )}
                  </div>
                  <Btn loading={loading} label="Reset password" />
                </form>

                {/* Resend OTP */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Didn't receive it?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      handleSendOtp({
                        preventDefault: () => {},
                      } as React.FormEvent)
                    }
                    disabled={loading}
                    className="text-blue-600 hover:underline font-medium disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </p>
              </>
            )}

            {/* ── Step 3: Success ── */}
            {step === "success" && (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✓
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">
                  Password reset!
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Your password has been updated successfully. Sign in with your
                  new password.
                </p>
                <Link
                  to="/auth"
                  className="inline-block w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors leading-10 text-center"
                >
                  Go to sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Btn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
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
        label
      )}
    </button>
  );
}
