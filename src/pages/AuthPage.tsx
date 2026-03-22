import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Tab = "login" | "signup"
type Role = "student" | "professional"

export default function AuthPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>("login")

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Signup state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [role, setRole] = useState<Role>("student")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})

  function validateLogin() {
    const e: Record<string, string> = {}
    if (!loginEmail) e.loginEmail = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(loginEmail)) e.loginEmail = "Enter a valid email"
    if (!loginPassword) e.loginPassword = "Password is required"
    return e
  }

  function validateSignup() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = "Full name is required"
    if (!email) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email"
    if (!mobile) e.mobile = "Mobile number is required"
    else if (!/^\d{10}$/.test(mobile)) e.mobile = "Enter a valid 10-digit number"
    if (!password) e.password = "Password is required"
    else if (password.length < 8) e.password = "Password must be at least 8 characters"
    if (!confirmPassword) e.confirmPassword = "Please confirm your password"
    else if (password !== confirmPassword) e.confirmPassword = "Passwords do not match"
    return e
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateLogin()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    navigate("/dashboard")
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateSignup()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    navigate("/dashboard")
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="border border-border rounded-2xl bg-card shadow-sm overflow-hidden">

          {/* Tab toggle */}
          <div className="grid grid-cols-2 border-b border-border">
            <button
              onClick={() => { setTab("login"); setErrors({}) }}
              className={`py-3.5 text-sm font-medium transition-colors ${
                tab === "login"
                  ? "bg-background text-foreground border-b-2 border-blue-600"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => { setTab("signup"); setErrors({}) }}
              className={`py-3.5 text-sm font-medium transition-colors ${
                tab === "signup"
                  ? "bg-background text-foreground border-b-2 border-blue-600"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Create account
            </button>
          </div>

          <div className="p-7">
            {tab === "login" ? (
              <>
                <h2 className="text-xl font-bold tracking-tight mb-1">Welcome back</h2>
                <p className="text-sm text-muted-foreground mb-6">Sign in to your account to continue</p>

                <form onSubmit={handleLogin} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.loginEmail ? "border-red-400" : "border-border"
                      }`}
                    />
                    {errors.loginEmail && <p className="text-xs text-red-500 mt-1">{errors.loginEmail}</p>}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-medium">Password</label>
                      <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.loginPassword ? "border-red-400" : "border-border"
                      }`}
                    />
                    {errors.loginPassword && <p className="text-xs text-red-500 mt-1">{errors.loginPassword}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors mt-2"
                  >
                    Sign in
                  </button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-5">
                  Don't have an account?{" "}
                  <button onClick={() => { setTab("signup"); setErrors({}) }} className="text-blue-600 hover:underline font-medium">
                    Create one
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold tracking-tight mb-1">Create your account</h2>
                <p className="text-sm text-muted-foreground mb-6">Join thousands of interviewers and candidates</p>

                <form onSubmit={handleSignup} className="space-y-4" noValidate>
                  {/* Full name */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.name ? "border-red-400" : "border-border"
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.email ? "border-red-400" : "border-border"
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Mobile number</label>
                    <div className="flex gap-2">
                      <span className="h-10 px-3 flex items-center border border-border rounded-lg text-sm text-muted-foreground bg-muted shrink-0">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={mobile}
                        maxLength={10}
                        onChange={e => setMobile(e.target.value.replace(/\D/, ""))}
                        className={`flex-1 h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                          errors.mobile ? "border-red-400" : "border-border"
                        }`}
                      />
                    </div>
                    {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">I am a</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRole("student")}
                        className={`h-10 rounded-lg border text-sm font-medium transition-colors ${
                          role === "student"
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        🎓 Student
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("professional")}
                        className={`h-10 rounded-lg border text-sm font-medium transition-colors ${
                          role === "professional"
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        💼 Professional
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Password</label>
                    <input
                      type="password"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.password ? "border-red-400" : "border-border"
                      }`}
                    />
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Confirm password</label>
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className={`w-full h-10 px-3 rounded-lg border text-sm bg-background outline-none transition-colors focus:border-blue-500 ${
                        errors.confirmPassword ? "border-red-400" : "border-border"
                      }`}
                    />
                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors mt-2"
                  >
                    Create account
                  </button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-5">
                  Already have an account?{" "}
                  <button onClick={() => { setTab("login"); setErrors({}) }} className="text-blue-600 hover:underline font-medium">
                    Sign in
                  </button>
                </p>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          By continuing, you agree to our{" "}
          <a href="#" className="hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}