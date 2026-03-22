import { useNavigate } from "react-router-dom"

const features = [
  {
    title: "AI-powered questions",
    description:
      "Auto-generate role-specific questions based on JD, skill level, and topic area.",
    iconColor: "bg-blue-50 text-blue-600",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "Live coding editor",
    description:
      "Full-featured in-browser IDE with syntax highlighting, multi-language support, and instant execution.",
    iconColor: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Video & audio interviews",
    description:
      "Record or conduct live video interviews with built-in transcription and AI analysis.",
    iconColor: "bg-amber-50 text-amber-600",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14" />
        <rect x="3" y="8" width="12" height="8" rx="2" />
      </svg>
    ),
  },
  {
    title: "Candidate experience",
    description:
      "Smooth, guided interview flow with real-time hints and structured feedback after submission.",
    iconColor: "bg-purple-50 text-purple-600",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

const stats = [
  { value: "10x", label: "faster screening" },
  { value: "500+", label: "AI question templates" },
  { value: "98%", label: "candidate satisfaction" },
]

const steps = [
  {
    num: "01",
    title: "Create a room",
    description:
      "Set up an interview with role, difficulty, and duration. AI pre-loads relevant questions.",
  },
  {
    num: "02",
    title: "Invite candidate",
    description:
      "Send a link. Candidate joins with no install needed — works in any browser.",
  },
  {
    num: "03",
    title: "Review & decide",
    description:
      "Get AI-generated scorecards, code playback, and video recordings instantly after the interview.",
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="max-w-5xl mx-auto px-6 pb-24">
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-20 items-center">
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            AI-powered interviews
          </span>

          <h1 className="text-5xl font-bold leading-tight tracking-tight mb-5">
            Hire smarter with{" "}
            <span className="text-blue-600">intelligent</span> interviews
          </h1>

          <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
            Conduct real-time coding interviews with AI-generated questions, live
            code execution, and video sessions — all in one platform.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("/auth")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Get started free
            </button>
            <button
              onClick={() => navigate("/demo")}
              className="border border-border bg-background hover:bg-muted text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              See how it works
            </button>
          </div>
        </div>

        {/* Right — preview cards */}
        <div className="flex flex-col gap-3">
          <div className="border border-border rounded-xl p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-2">AI question generated</p>
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                AI
              </div>
              <div className="bg-muted rounded-lg px-3 py-2 text-sm leading-relaxed">
                Implement a function to find the longest palindromic substring in O(n) time.
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-2">Candidate's live code</p>
            <pre className="bg-muted rounded-lg p-3 text-xs font-mono leading-relaxed overflow-x-auto text-foreground">
              <span className="text-blue-600">def</span> longest_palindrome(s):{"\n"}
              {"  "}<span className="text-muted-foreground"># Expand around center</span>{"\n"}
              {"  "}res = <span className="text-emerald-600">""</span>{"\n"}
              {"  "}<span className="text-blue-600">for</span> i <span className="text-blue-600">in</span> range(len(s)):{"\n"}
              {"    "}odd = expand(s, i, i)
            </pre>
          </div>

          <div className="border border-border rounded-xl p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-2">AI feedback</p>
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                AI
              </div>
              <div className="bg-muted rounded-lg px-3 py-2 text-sm leading-relaxed">
                Good approach — expand-around-center runs in O(n²). Consider Manacher's algorithm for true O(n).
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 my-12">
        {stats.map((s) => (
          <div key={s.label} className="bg-muted rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-blue-600 mb-1">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <hr className="border-border" />

      {/* Features */}
      <section className="mt-14 mb-4">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">
          Features
        </p>
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Everything you need to run great interviews
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl">
          From AI-generated questions to live code execution and video sessions —
          your entire hiring workflow in one place.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-border rounded-xl p-5 bg-card hover:border-blue-200 transition-colors"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${f.iconColor}`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border my-14" />

      {/* How it works */}
      <section>
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">
          How it works
        </p>
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          Up and running in minutes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div key={step.num} className="border border-border rounded-xl p-5 bg-card">
              <p className="text-4xl font-bold text-border mb-4">{step.num}</p>
              <h3 className="font-semibold text-sm mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 bg-muted border border-border rounded-2xl px-10 py-14 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Start interviewing smarter today
        </h2>
        <p className="text-muted-foreground text-base mb-8">
          Join thousands of teams using AI to find the best candidates faster.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Create free account
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-border bg-background hover:bg-accent text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Sign in
          </button>
        </div>
      </section>
    </main>
  )
}
