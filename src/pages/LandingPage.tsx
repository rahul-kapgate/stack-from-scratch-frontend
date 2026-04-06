import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "AI-powered questions",
    description:
      "Auto-generate role-specific questions based on JD, skill level, and topic area.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.08)",
  },
  {
    title: "Live coding editor",
    description:
      "Full-featured in-browser IDE with syntax highlighting and instant code execution.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    accent: "#10b981",
    glow: "rgba(16,185,129,0.08)",
  },
  {
    title: "Video & audio interviews",
    description:
      "Live sessions with built-in transcription and AI analysis after the call.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14" />
        <rect x="3" y="8" width="12" height="8" rx="2" />
      </svg>
    ),
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.08)",
  },
  {
    title: "Instant AI feedback",
    description:
      "Get detailed scorecards, code review, and improvement tips right after submission.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.08)",
  },
];

const stats = [
  { value: "10x", label: "Faster screening" },
  { value: "500+", label: "AI question templates" },
  { value: "98%", label: "Candidate satisfaction" },
  { value: "3min", label: "To start an interview" },
];

const steps = [
  {
    num: "01",
    title: "Create a room",
    description:
      "Set up an interview with role, difficulty, and duration. AI pre-loads relevant questions instantly.",
  },
  {
    num: "02",
    title: "Invite candidate",
    description:
      "Send a link. Candidate joins with no install needed — works in any browser on any device.",
  },
  {
    num: "03",
    title: "Review & decide",
    description:
      "Get AI-generated scorecards, code playback, and video recordings instantly after the interview.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [typed, setTyped] = useState("");
  const fullText = "ace your next interview";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(t);
    }, 65);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#060b14] min-h-screen text-slate-100 font-['DM_Sans',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes orb    { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadein { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .f1 { animation: float1 7s ease-in-out infinite; }
        .f2 { animation: float2 7s ease-in-out 2s infinite; }
        .f3 { animation: float3 7s ease-in-out 4s infinite; }
        .orb { animation: orb 5s ease-in-out infinite; }
        .cursor { animation: blink 1s step-end infinite; }
        .a1 { animation: fadein 0.7s ease 0.05s both; }
        .a2 { animation: fadein 0.7s ease 0.15s both; }
        .a3 { animation: fadein 0.7s ease 0.25s both; }
        .a4 { animation: fadein 0.7s ease 0.35s both; }
        .fc { transition: all 0.25s ease; }
        .fc:hover { transform:translateY(-5px); border-color:rgba(59,130,246,0.35) !important; }
        .gb { transition: all 0.2s ease; }
        .gb:hover { transform:translateY(-2px); box-shadow:0 10px 40px rgba(37,99,235,0.5) !important; }
      `}</style>

      {/* ── Hero ── */}
      <section className="max-w-[1140px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 lg:pt-[88px] pb-12 sm:pb-16 lg:pb-[72px] relative">
        {/* Orbs */}
        <div
          className="orb absolute -top-24 -left-24 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 65%)",
          }}
        />
        <div
          className="orb absolute top-20 -right-24 sm:-right-36 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)",
            animationDelay: "2.5s",
          }}
        />

        <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[72px] items-center">
          {/* Left */}
          <div>
            <div className="a1 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-[7px] mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              <span className="text-xs text-blue-300 font-medium">
                AI-powered interview platform
              </span>
            </div>

            <h1 className="a2 font-['DM_Serif_Display',serif] text-[clamp(1.8rem,5vw,3.2rem)] leading-[1.14] tracking-tight mb-5 text-slate-50">
              The smarter way to{" "}
              <span className="text-blue-500 italic">
                {typed}
                <span className="cursor text-blue-400 ml-0.5">|</span>
              </span>
            </h1>

            <p className="a3 text-[15px] sm:text-base leading-[1.78] text-slate-500 mb-8 sm:mb-9 max-w-[430px]">
              Practice coding interviews with AI-generated questions, a live
              code editor, and instant feedback. Built for students and
              professionals in India.
            </p>

            <div className="a4 flex gap-3 flex-wrap mb-7 sm:mb-8">
              <button
                className="gb bg-blue-600 text-white border-none px-6 sm:px-7 py-3 rounded-[10px] text-sm font-semibold cursor-pointer shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
                onClick={() => navigate("/auth")}
              >
                Start for free →
              </button>
              <button
                className="bg-white/[0.04] text-slate-400 border border-white/[0.09] px-6 sm:px-7 py-3 rounded-[10px] text-sm font-medium cursor-pointer transition-all hover:text-slate-200"
                onClick={() => navigate("/auth")}
              >
                Sign in
              </button>
            </div>

            {/* Avatars */}
            <div className="a4 flex items-center gap-3">
              <div className="flex">
                {["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"].map(
                  (c, i) => (
                    <div
                      key={i}
                      className="w-[30px] h-[30px] rounded-full border-[2.5px] border-[#060b14] flex items-center justify-center text-[11px] font-bold text-white"
                      style={{ background: c, marginLeft: i > 0 ? -9 : 0 }}
                    >
                      {["A", "B", "C", "D", "E"][i]}
                    </div>
                  ),
                )}
              </div>
              <span className="text-[13px] text-slate-600">
                <span className="text-slate-400">500+</span> candidates joined
                this month
              </span>
            </div>
          </div>

          {/* Right — floating cards (hidden on small, shown lg+) */}
          <div className="relative h-[360px] sm:h-[400px] lg:h-[440px] hidden md:block">
            {/* AI question card */}
            <div className="f1 absolute top-0 left-0 right-4 lg:right-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/[0.18] text-blue-400 text-[10px] font-bold flex items-center justify-center">
                  AI
                </div>
                <span className="text-[11px] text-slate-600">
                  AI question generated
                </span>
                <span className="ml-auto text-[10px] bg-blue-500/[0.12] text-blue-400 px-2 py-0.5 rounded-full">
                  Frontend
                </span>
              </div>
              <p className="text-[13px] text-slate-300 leading-relaxed m-0">
                Implement a function to find the longest palindromic substring
                in O(n) time. Explain your approach and trade-offs.
              </p>
            </div>

            {/* Code editor card */}
            <div className="f2 absolute top-[136px] left-4 lg:left-6 right-0 bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/[0.05] flex gap-1.5 items-center">
                {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: c }}
                  />
                ))}
                <span className="text-[11px] text-slate-700 ml-2 font-['JetBrains_Mono',monospace]">
                  solution.js
                </span>
              </div>
              <pre className="m-0 px-4 py-3.5 text-xs font-['JetBrains_Mono',monospace] leading-[1.75] text-slate-500">
                <span className="text-blue-400">function</span>{" "}
                <span className="text-emerald-400">flattenObj</span>(obj) {"{"}
                {"\n"} <span className="text-blue-400">return</span> Object.
                <span className="text-pink-400">keys</span>(obj)
                {"\n"} .reduce((acc, key) {"=>"} {"{"}
                {"\n"} <span className="text-blue-400">if</span> (obj[key] !=={" "}
                <span className="text-orange-400">null</span>){"\n"} acc[key] =
                obj[key]
                {"\n"} <span className="text-blue-400">return</span> acc
                {"\n"} {"}"}, {"{}"}){"\n"}
                {"}"}
              </pre>
            </div>

            {/* Score card */}
            <div className="f3 absolute bottom-0 left-0 right-8 lg:right-12 bg-emerald-500/[0.06] border border-emerald-500/[0.18] rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-[11px] text-slate-600 m-0 mb-0.5">
                    Interview score
                  </p>
                  <p className="text-[11px] text-emerald-500 m-0">✓ Passed</p>
                </div>
                <span className="font-['DM_Serif_Display',serif] text-[28px] text-emerald-400">
                  82%
                </span>
              </div>
              <div className="h-[5px] bg-white/[0.05] rounded-full overflow-hidden">
                <div className="w-[82%] h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <FadeUp>
        <div className="border-t border-b border-white/[0.05] py-10 sm:py-13 px-5 sm:px-7">
          <div className="max-w-[1140px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-2">
                <p className="font-['DM_Serif_Display',serif] text-3xl sm:text-[2.6rem] text-blue-500 m-0 mb-1">
                  {s.value}
                </p>
                <p className="text-[13px] text-slate-600 m-0">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Features ── */}
      <FadeUp>
        <div className="max-w-[1140px] mx-auto px-5 sm:px-7 py-16 sm:py-20 lg:py-24">
          <div className="mb-10 sm:mb-14">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-blue-500 uppercase mb-3">
              Features
            </p>
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.6rem,3vw,2.6rem)] text-slate-50 m-0 mb-4 leading-[1.18]">
              Everything you need to nail
              <br className="hidden sm:block" />
              the interview
            </h2>
            <p className="text-[15px] text-slate-600 max-w-[500px] leading-[1.75] m-0">
              From AI-generated questions to live code execution — your entire
              interview prep in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="fc bg-white/[0.018] border border-white/[0.06] rounded-[18px] p-6 sm:p-7 cursor-default"
              >
                <div
                  className="w-[46px] h-[46px] rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: f.glow,
                    color: f.accent,
                    border: `1px solid ${f.accent}20`,
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-200 m-0 mb-2.5">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 m-0 leading-[1.7]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── How it works ── */}
      <FadeUp>
        <div className="border-t border-white/[0.05] px-5 sm:px-7 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1140px] mx-auto">
            <div className="mb-10 sm:mb-14">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-blue-500 uppercase mb-3">
                How it works
              </p>
              <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.6rem,3vw,2.6rem)] text-slate-50 m-0 leading-[1.18]">
                Up and running in minutes
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="p-6 sm:p-7 bg-white/[0.018] border border-white/[0.06] rounded-[18px] relative"
                >
                  <div className="flex items-center justify-between mb-5">
                    <p className="font-['DM_Serif_Display',serif] text-[2.8rem] text-blue-500/20 m-0 leading-none">
                      {step.num}
                    </p>
                    {i < steps.length - 1 && (
                      <svg
                        className="hidden sm:block"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(59,130,246,0.3)"
                        strokeWidth="1.5"
                      >
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-slate-200 m-0 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 m-0 leading-[1.7]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ── CTA ── */}
      <FadeUp>
        <div className="max-w-[1140px] mx-auto px-5 sm:px-7 pb-20 sm:pb-24 lg:pb-[120px]">
          <div
            className="rounded-3xl p-8 sm:p-12 lg:px-12 lg:py-20 text-center relative overflow-hidden border border-blue-500/[0.18]"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(139,92,246,0.08) 100%)",
            }}
          >
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
              }}
            />
            <p className="text-[11px] font-semibold tracking-[0.12em] text-blue-500 uppercase mb-4 sm:mb-5">
              Get started today
            </p>
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.6rem,4vw,3rem)] text-slate-50 m-0 mb-4 sm:mb-5 leading-[1.18]">
              Ready to ace your next
              <br />
              <span className="text-blue-500 italic">tech interview?</span>
            </h2>
            <p className="text-[15px] sm:text-base text-slate-600 max-w-[460px] mx-auto mb-8 sm:mb-11 leading-[1.75]">
              Join thousands of students and professionals preparing smarter
              with AI-powered practice.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                className="gb bg-blue-600 text-white border-none px-7 sm:px-9 py-3.5 rounded-xl text-[15px] font-semibold cursor-pointer shadow-[0_4px_24px_rgba(37,99,235,0.4)]"
                onClick={() => navigate("/auth")}
              >
                Create free account →
              </button>
              <button
                className="bg-white/[0.04] text-slate-400 border border-white/[0.08] px-7 sm:px-9 py-3.5 rounded-xl text-[15px] font-medium cursor-pointer transition-all hover:text-slate-200"
                onClick={() => navigate("/auth")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
