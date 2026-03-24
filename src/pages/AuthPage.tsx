import { useState } from "react"
import { useSendOtp, useVerifyOtp, useLogin } from "../hooks/Useauth"
import type { UserType } from "@/utils/authApi"

type Tab       = "login" | "signup"
type SignupStep = "form"  | "otp"

export default function AuthPage() {
  const [tab,        setTab]        = useState<Tab>("signup")
  const [signupStep, setSignupStep] = useState<SignupStep>("form")
  const [verified,   setVerified]   = useState(false)

  // Login fields
  const [identifier,    setIdentifier]    = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Signup fields
  const [name,      setName]      = useState("")
  const [email,     setEmail]     = useState("")
  const [phone,     setPhone]     = useState("")
  const [userType,  setUserType]  = useState<UserType>("student")
  const [password,  setPassword]  = useState("")
  const [confirmPwd,setConfirmPwd]= useState("")
  const [otp,       setOtp]       = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})

  const loginMutation      = useLogin()
  const sendOtpMutation    = useSendOtp()
  const verifyOtpMutation  = useVerifyOtp()

  // ── Validation ────────────────────────────────────────
  function validateLogin() {
    const e: Record<string, string> = {}
    if (!identifier) e.identifier = "Email or phone is required"
    if (!loginPassword) e.loginPassword = "Password is required"
    return e
  }

  function validateSignupForm() {
    const e: Record<string, string> = {}
    if (!name.trim())  e.name     = "Full name is required"
    if (!email)        e.email    = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email"
    if (!phone)        e.phone    = "Phone number is required"
    else if (!/^\d{10}$/.test(phone)) e.phone = "Enter a valid 10-digit number"
    if (!password)     e.password = "Password is required"
    else if (password.length < 6) e.password = "Min. 6 characters"
    if (!confirmPwd)   e.confirmPwd = "Please confirm your password"
    else if (password !== confirmPwd) e.confirmPwd = "Passwords do not match"
    return e
  }

  // ── Handlers ─────────────────────────────────────────
  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateLogin()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    loginMutation.mutate(
      { identifier, password: loginPassword },
      { onError: (err: Error) => setErrors({ identifier: err instanceof Error ? err.message : "Login failed" }) }
    )
  }

  // Step 1 — send ALL fields to backend, backend sends OTP
  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateSignupForm()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    sendOtpMutation.mutate(
      { name, email, phone, password, user_type: userType },
      {
        onSuccess: () => setSignupStep("otp"),
        onError:  (err: Error) => setErrors({ email: err.message ?? "Failed to send OTP" }),
      }
    )
  }

  // Step 2 — only email + otp needed
  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!otp.trim()) { setErrors({ otp: "Enter the OTP sent to your email" }); return }
    if (otp.length !== 6) { setErrors({ otp: "OTP must be 6 digits" }); return }
    setErrors({})
    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          // Directly switch to login tab and show verified banner
          setTab("login")
          setSignupStep("form")
          setVerified(true)
          setOtp("")
        },
        onError: (err: Error) => setErrors({ otp: err instanceof Error ? err.message : "Invalid OTP" }),
      }
    )
  }

  function switchTab(t: Tab) {
    setTab(t); setErrors({}); setSignupStep("form"); setVerified(false)
    loginMutation.reset(); sendOtpMutation.reset(); verifyOtpMutation.reset()
  }

  const ic = (err: boolean, dis: boolean) =>
    `w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${err ? "border-red-400" : "border-border"} ${dis ? "opacity-50 cursor-not-allowed" : ""}`

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">

        {/* Verified banner */}
        {verified && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            <span>✓</span> Account verified! Sign in to continue.
          </div>
        )}

        <div className="border border-border rounded-2xl bg-card shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-border">
            {(["login","signup"] as Tab[]).map(t => (
              <button key={t} onClick={() => switchTab(t)}
                className={`py-3.5 text-sm font-medium transition-colors ${tab===t ? "bg-background text-foreground border-b-2 border-blue-600" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {t === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <div className="p-7">

            {/* ── Login ── */}
            {tab === "login" && (
              <>
                <h2 className="text-xl font-bold tracking-tight mb-1">Welcome back</h2>
                <p className="text-sm text-muted-foreground mb-6">Sign in with your email or phone</p>
                <form onSubmit={handleLogin} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email or phone</label>
                    <input type="text" placeholder="you@example.com or 9876543210"
                      value={identifier} onChange={e => setIdentifier(e.target.value)}
                      disabled={loginMutation.isPending}
                      className={ic(!!errors.identifier, loginMutation.isPending)} />
                    {errors.identifier && <p className="text-xs text-red-500 mt-1">{errors.identifier}</p>}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-medium">Password</label>
                      <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                    </div>
                    <input type="password" placeholder="••••••••"
                      value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                      disabled={loginMutation.isPending}
                      className={ic(!!errors.loginPassword, loginMutation.isPending)} />
                    {errors.loginPassword && <p className="text-xs text-red-500 mt-1">{errors.loginPassword}</p>}
                  </div>
                  <Btn pending={loginMutation.isPending} label="Sign in" />
                </form>
                <Switch tab="login" onSwitch={() => switchTab("signup")} />
              </>
            )}

            {/* ── Signup Step 1: Form ── */}
            {tab === "signup" && signupStep === "form" && (
              <>
                <h2 className="text-xl font-bold tracking-tight mb-1">Create your account</h2>
                <p className="text-sm text-muted-foreground mb-6">We'll send an OTP to verify your email</p>
                <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full name</label>
                    <input type="text" placeholder="John Doe" value={name}
                      onChange={e => setName(e.target.value)} disabled={sendOtpMutation.isPending}
                      className={ic(!!errors.name, sendOtpMutation.isPending)} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input type="email" placeholder="you@example.com" value={email}
                      onChange={e => setEmail(e.target.value)} disabled={sendOtpMutation.isPending}
                      className={ic(!!errors.email, sendOtpMutation.isPending)} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone number</label>
                    <div className="flex gap-2">
                      <span className="h-10 px-3 flex items-center border border-border rounded-lg text-sm text-muted-foreground bg-muted shrink-0">+91</span>
                      <input type="tel" placeholder="9876543210" value={phone} maxLength={10}
                        onChange={e => setPhone(e.target.value.replace(/\D/,""))} disabled={sendOtpMutation.isPending}
                        className={`flex-1 ${ic(!!errors.phone, sendOtpMutation.isPending)}`} />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">I am a</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["student","professional"] as UserType[]).map(r => (
                        <button key={r} type="button" onClick={() => setUserType(r)} disabled={sendOtpMutation.isPending}
                          className={`h-10 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 ${userType===r ? "border-blue-600 bg-blue-50 text-blue-700" : "border-border bg-background hover:bg-muted"}`}>
                          {r === "student" ? "🎓 Student" : "💼 Professional"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Password</label>
                    <input type="password" placeholder="Min. 6 characters" value={password}
                      onChange={e => setPassword(e.target.value)} disabled={sendOtpMutation.isPending}
                      className={ic(!!errors.password, sendOtpMutation.isPending)} />
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Confirm password</label>
                    <input type="password" placeholder="Re-enter password" value={confirmPwd}
                      onChange={e => setConfirmPwd(e.target.value)} disabled={sendOtpMutation.isPending}
                      className={ic(!!errors.confirmPwd, sendOtpMutation.isPending)} />
                    {errors.confirmPwd && <p className="text-xs text-red-500 mt-1">{errors.confirmPwd}</p>}
                  </div>
                  <Btn pending={sendOtpMutation.isPending} label="Send OTP" />
                </form>
                <Switch tab="signup" onSwitch={() => switchTab("login")} />
              </>
            )}

            {/* ── Signup Step 2: OTP ── */}
            {tab === "signup" && signupStep === "otp" && (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 text-xl">✉</div>
                  <h2 className="text-xl font-bold tracking-tight mb-1">Check your email</h2>
                  <p className="text-sm text-muted-foreground">
                    We sent a 6-digit OTP to{" "}
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                </div>
                <form onSubmit={handleVerifyOtp} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Enter OTP</label>
                    <input type="text" placeholder="••••••" value={otp} maxLength={6}
                      onChange={e => setOtp(e.target.value.replace(/\D/,""))} disabled={verifyOtpMutation.isPending}
                      className={`${ic(!!errors.otp, verifyOtpMutation.isPending)} text-center text-2xl tracking-[0.6em] font-mono`} />
                    {errors.otp && <p className="text-xs text-red-500 mt-1">{errors.otp}</p>}
                  </div>
                  <Btn pending={verifyOtpMutation.isPending} label="Verify & create account" />
                </form>
                <div className="text-center mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive it?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        if (!name || !email || !phone || !password) return
                        sendOtpMutation.mutate({ name, email, phone, password, user_type: userType })
                      }}
                      disabled={sendOtpMutation.isPending || sendOtpMutation.isSuccess}
                      className="text-blue-600 hover:underline font-medium disabled:opacity-50">
                      {sendOtpMutation.isPending ? "Sending..." : "Resend OTP"}
                    </button>
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSignupStep("form"); setOtp(""); setErrors({}) }}
                    className="text-xs text-muted-foreground hover:text-foreground underline">
                    ← Change details
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          By continuing, you agree to our{" "}
          <a href="#" className="hover:underline">Terms</a> and{" "}
          <a href="#" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

function Btn({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button type="submit" disabled={pending}
      className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
      {pending
        ? <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
        : label}
    </button>
  )
}

function Switch({ tab, onSwitch }: { tab: Tab; onSwitch: () => void }) {
  return (
    <p className="text-center text-sm text-muted-foreground mt-5">
      {tab === "login" ? "Don't have an account? " : "Already have an account? "}
      <button onClick={onSwitch} className="text-blue-600 hover:underline font-medium">
        {tab === "login" ? "Create one" : "Sign in"}
      </button>
    </p>
  )
}