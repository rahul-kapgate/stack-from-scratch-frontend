import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const problems = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
    title: "Generic practice, zero signal",
    description:
      "LeetCode grinding doesn't reflect real interviews. You solve puzzles in isolation with no feedback on communication or approach.",
    accent: "#ef4444",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "No structured feedback loop",
    description:
      "You don't know what went wrong. Most platforms return a pass/fail — no code review, no communication analysis, no skill gap report.",
    accent: "#f59e0b",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Expensive mock interviews",
    description:
      "Hiring a senior engineer for mock sessions costs ₹2,000–₹8,000 per session. Most candidates can't afford consistent practice.",
    accent: "#8b5cf6",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Blind preparation",
    description:
      "You don't know what to study next. No visibility into your weak areas — you waste hours re-studying what you already know.",
    accent: "#3b82f6",
  },
];

const steps = [
  {
    num: "01",
    title: "Set up your interview",
    description:
      "Choose role, difficulty, and topic. Our AI loads 20+ custom questions based on your target company and JD in under 10 seconds.",
  },
  {
    num: "02",
    title: "Interview in real-time",
    description:
      "Talk through your solution on video, write live code, and explain your thinking — just like a real FAANG interview.",
  },
  {
    num: "03",
    title: "Get your full report",
    description:
      "Receive a detailed scorecard: code quality, communication, edge cases, and a personalised study roadmap.",
  },
];

const features = [
  {
    title: "AI-generated questions",
    description:
      "Role-specific questions auto-generated from your JD, level, and skill area. New questions every session.",
    icon: (
      <svg
        width="20"
        height="20"
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
      "Full in-browser IDE with syntax highlighting, execution, and test cases. Supports 15+ languages.",
    icon: (
      <svg
        width="20"
        height="20"
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
    title: "Voice & video interviews",
    description:
      "HD video sessions with live transcription and AI-powered communication analysis post-interview.",
    icon: (
      <svg
        width="20"
        height="20"
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
    title: "Instant AI scorecards",
    description:
      "Detailed feedback on code quality, time complexity, communication clarity, and confidence — delivered in seconds.",
    icon: (
      <svg
        width="20"
        height="20"
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
  {
    title: "Skill gap detection",
    description:
      "AI identifies exactly where you struggle — trees, DP, system design — and builds a targeted improvement plan.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    accent: "#ef4444",
    glow: "rgba(239,68,68,0.08)",
  },
  {
    title: "Progress tracking",
    description:
      "Track interview scores over time, see your improvement curve, and compare against target company benchmarks.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.08)",
  },
];

const courses = [
  {
    tag: "Recommended",
    tagColor: "#3b82f6",
    title: "Dynamic Programming Mastery",
    description:
      "From memoisation to tabulation. 45 problems with detailed explanations.",
    level: "Intermediate",
    duration: "18 hours",
    topics: ["DP", "Recursion", "Optimization"],
  },
  {
    tag: "Most Popular",
    tagColor: "#10b981",
    title: "System Design Interview Prep",
    description:
      "Design scalable systems like a senior engineer. Covers databases, caching, queues.",
    level: "Advanced",
    duration: "24 hours",
    topics: ["HLD", "LLD", "Databases"],
  },
  {
    tag: "Recommended",
    tagColor: "#3b82f6",
    title: "Data Structures Deep Dive",
    description:
      "Trees, graphs, heaps and segment trees — everything interviewers test.",
    level: "Beginner–Mid",
    duration: "14 hours",
    topics: ["Trees", "Graphs", "Heaps"],
  },
  {
    tag: "New",
    tagColor: "#f59e0b",
    title: "Behavioural & STAR Framework",
    description:
      "Craft compelling stories that score on culture fit, leadership, and impact.",
    level: "All levels",
    duration: "6 hours",
    topics: ["STAR", "Communication", "Stories"],
  },
];

const faqs = [
  {
    q: "How are AI questions generated?",
    a: "Our model analyses your target role, years of experience, and the job description you paste in. It then generates questions that mirror what engineers at that company actually ask — updated every quarter based on interview reports.",
  },
  {
    q: "Is this useful for both freshers and experienced engineers?",
    a: "Yes. Freshers get entry-level DSA + HR rounds. Experienced engineers get system design, architecture, and leadership questions scaled to their seniority. The AI calibrates automatically.",
  },
  {
    q: "How does the code editor work?",
    a: "It's a full in-browser IDE powered by Monaco (same as VS Code). You can write, run, and debug code in 15+ languages. The AI reviews your solution for correctness, edge cases, and time/space complexity.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Everything runs in your browser — the editor, the video call, the AI analysis. Just open the link and start.",
  },
  {
    q: "How accurate is the AI feedback?",
    a: "Our feedback engine is trained on thousands of real interview evaluations from engineers at FAANG and top Indian tech companies. It scores within 8% of human interviewers on average.",
  },
  {
    q: "What's included in the free plan?",
    a: "3 full AI mock interviews per month, access to the coding editor, basic scorecard, and 2 course previews. Paid plans unlock unlimited interviews, full feedback reports, and all courses.",
  },
];


// ─── Helpers ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.14em] text-blue-500 uppercase mb-3">
      {text}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.65rem,3.2vw,2.7rem)] text-slate-50 leading-[1.16] m-0 mb-4">
      {children}
    </h2>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: open
          ? "rgba(255,255,255,0.025)"
          : "rgba(255,255,255,0.015)",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer bg-transparent border-none"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] font-medium text-slate-200 pr-4">{q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full border border-white/[0.12] flex items-center justify-center transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M6 2v8M2 6h8" />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          opacity: open ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.3s ease",
          overflow: "hidden",
        }}
      >
        <p className="px-6 pb-5 text-sm text-slate-500 leading-[1.78] m-0">
          {a}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

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
    <div
      className="bg-[#060b14] min-h-screen text-slate-100"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes orb    { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadein { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .f1 { animation: float1 7s ease-in-out infinite; }
        .f2 { animation: float2 7s ease-in-out 2s infinite; }
        .f3 { animation: float3 7s ease-in-out 4s infinite; }
        .orb { animation: orb 5s ease-in-out infinite; }
        .cursor { animation: blink 1s step-end infinite; }
        .a1 { animation: fadein 0.7s ease 0.05s both; }
        .a2 { animation: fadein 0.7s ease 0.15s both; }
        .a3 { animation: fadein 0.7s ease 0.25s both; }
        .a4 { animation: fadein 0.7s ease 0.35s both; }
        .a5 { animation: fadein 0.7s ease 0.45s both; }
        .fc { transition: all 0.26s ease; }
        .fc:hover { transform:translateY(-5px); border-color:rgba(59,130,246,0.3) !important; background:rgba(255,255,255,0.03) !important; }
        .gb { transition: all 0.2s ease; }
        .gb:hover { transform:translateY(-2px); box-shadow:0 10px 40px rgba(37,99,235,0.55) !important; }
        .sb { transition: all 0.2s ease; }
        .sb:hover { transform:translateY(-2px); background:rgba(255,255,255,0.07) !important; }
        .course-card { transition: all 0.26s ease; }
        .course-card:hover { transform:translateY(-4px); border-color:rgba(59,130,246,0.25) !important; }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E"); }
        .grid-bg { background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px); background-size: 48px 48px; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative max-w-[1140px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 lg:pt-[96px] pb-16 sm:pb-20 lg:pb-[80px]">
        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
        {/* Orbs */}
        <div
          className="orb absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)",
          }}
        />
        <div
          className="orb absolute top-10 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)",
            animationDelay: "2.5s",
          }}
        />

        <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="a1 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-[7px] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block animate-pulse" />
              <span className="text-xs text-blue-300 font-medium tracking-wide">
                AI-powered interview platform · India's #1
              </span>
            </div>

            <h1 className="a2 font-['DM_Serif_Display',serif] text-[clamp(2rem,5.5vw,3.4rem)] leading-[1.12] tracking-tight mb-5 text-slate-50">
              The smarter way to{" "}
              <span className="text-blue-500 italic">
                {typed}
                <span className="cursor text-blue-400 ml-0.5">|</span>
              </span>
            </h1>

            <p className="a3 text-[15.5px] leading-[1.8] text-slate-500 mb-9 max-w-[440px]">
              AI mock interviews with a live code editor, voice analysis, and
              instant scorecards. Built for developers targeting FAANG and top
              Indian tech companies.
            </p>

            <div className="a4 flex gap-3 flex-wrap mb-8">
              <button
                className="gb bg-blue-600 text-white border-none px-7 py-3.5 rounded-xl text-[14.5px] font-semibold cursor-pointer shadow-[0_4px_24px_rgba(37,99,235,0.4)]"
                onClick={() => navigate("/auth")}
              >
                Start for free →
              </button>
              <button
                className="sb bg-white/[0.04] text-slate-400 border border-white/[0.09] px-7 py-3.5 rounded-xl text-[14.5px] font-medium cursor-pointer hover:text-slate-200"
                onClick={() => navigate("/auth")}
              >
                Sign in
              </button>
            </div>

            {/* Trust badges */}
            <div className="a5 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2.5">
                <div className="flex">
                  {["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-[2.5px] border-[#060b14] flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: c, marginLeft: i > 0 ? -8 : 0 }}
                      >
                        {["A", "B", "C", "D", "E"][i]}
                      </div>
                    ),
                  )}
                </div>
                <span className="text-[13px] text-slate-600">
                  <span className="text-slate-300 font-medium">2,400+</span>{" "}
                  interviews this month
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="#f59e0b"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="text-[13px] text-slate-600 ml-1">
                  <span className="text-slate-300">4.9</span> / 5 rating
                </span>
              </div>
            </div>
          </div>

          {/* Right – floating UI cards */}
          <div className="relative h-[380px] sm:h-[420px] hidden md:block">
            {/* AI card */}
            <div className="f1 absolute top-0 left-0 right-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-[9px] font-bold flex items-center justify-center">
                  AI
                </div>
                <span className="text-[11px] text-slate-600">
                  Question · Senior Frontend · Round 2
                </span>
                <span className="ml-auto text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                  React
                </span>
              </div>
              <p className="text-[13px] text-slate-300 leading-relaxed m-0">
                Implement a virtualised list component that renders 100,000 rows
                smoothly. Explain your approach and memory trade-offs.
              </p>
            </div>

            {/* Code editor */}
            <div className="f2 absolute top-[148px] left-5 right-0 bg-[#0c1018] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/[0.05] flex gap-1.5 items-center">
                {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: c }}
                  />
                ))}
                <span
                  className="text-[10.5px] text-slate-700 ml-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  solution.tsx
                </span>
              </div>
              <pre
                className="m-0 px-4 py-3.5 text-[11.5px] leading-[1.8] text-slate-500"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-blue-400">function</span>{" "}
                <span className="text-emerald-400">VirtualList</span>
                {"({ items, rowHeight }) {"}
                {"\n"}
                {"  "}
                <span className="text-blue-400">const</span> [scrollTop,
                setScrollTop] = useState(
                <span className="text-orange-400">0</span>){"\n"}
                {"  "}
                <span className="text-blue-400">const</span> startIdx =
                Math.floor(scrollTop / rowHeight){"\n"}
                {"  "}
                <span className="text-blue-400">return</span> visible.map(i{" "}
                {"=> <Row"} key={"{i}"} {"/>"}){"\n"}
                {"}"}
              </pre>
            </div>

            {/* Score card */}
            <div className="f3 absolute bottom-0 left-0 right-8 bg-emerald-500/[0.055] border border-emerald-500/[0.2] rounded-2xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-[10.5px] text-slate-600 m-0 mb-0.5">
                    Interview score · Software Engineer II
                  </p>
                  <p className="text-[11px] text-emerald-400 m-0">
                    ✓ Strong hire signal
                  </p>
                </div>
                <span className="font-['DM_Serif_Display',serif] text-[30px] text-emerald-400 leading-none">
                  87%
                </span>
              </div>
              <div className="h-[4px] bg-white/[0.05] rounded-full overflow-hidden">
                <div className="w-[87%] h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
              </div>
              <div className="flex gap-3 mt-3">
                {[
                  ["Code", "92%"],
                  ["Comms", "81%"],
                  ["Approach", "88%"],
                ].map(([l, v]) => (
                  <div key={l} className="text-center">
                    <p className="text-[10px] text-slate-600 m-0">{l}</p>
                    <p className="text-[11px] text-emerald-400 font-medium m-0">
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-5 sm:px-7 py-20 sm:py-24">
        <FadeUp>
          <div className="mb-12">
            <SectionLabel text="The problem" />
            <SectionHeading>
              Interview prep is broken
              <br />
              <span className="text-slate-500">for most developers</span>
            </SectionHeading>
            <p className="text-[15px] text-slate-600 max-w-[480px] leading-[1.8] m-0">
              Most platforms teach you to memorise patterns — not to actually
              interview well. Here's what's missing.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.05}>
                <div className="fc bg-white/[0.018] border border-white/[0.06] rounded-2xl p-6 sm:p-7 h-full cursor-default">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `${p.accent}12`,
                      color: p.accent,
                      border: `1px solid ${p.accent}22`,
                    }}
                  >
                    {p.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-200 m-0 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 m-0 leading-[1.75]">
                    {p.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-7 py-20 sm:py-24">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              {/* Text */}
              <div>
                <SectionLabel text="The solution" />
                <SectionHeading>
                  One platform that covers
                  <br />
                  <span className="italic text-blue-400">
                    the full interview loop
                  </span>
                </SectionHeading>
                <p className="text-[15px] text-slate-500 leading-[1.82] mb-8 max-w-[420px]">
                  We simulate the entire interview pipeline — from technical
                  screens to system design — with AI that gives you feedback no
                  human reviewer has time to.
                </p>
                <ul className="space-y-4 m-0 p-0 list-none">
                  {[
                    "AI generates role-specific questions from your JD",
                    "Live editor + voice recording in one session",
                    "Instant scorecard with code + communication analysis",
                    "Personalised course recommendations after every session",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14.5px] text-slate-400 leading-[1.65]"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center mt-0.5">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        >
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual card */}
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(37,99,235,0.07) 0%, transparent 70%)",
                  }}
                />
                <div className="bg-white/[0.02] border border-white/[0.07] rounded-3xl p-6 sm:p-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-slate-600 m-0 mb-1">
                        Candidate · Priya Sharma
                      </p>
                      <p className="text-[13px] text-slate-300 m-0 font-medium">
                        SDE-II · Bangalore
                      </p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      ● Live now
                    </span>
                  </div>

                  {/* Score bars */}
                  {[
                    { label: "Problem solving", score: 88, color: "#3b82f6" },
                    { label: "Code quality", score: 75, color: "#10b981" },
                    { label: "Communication", score: 82, color: "#8b5cf6" },
                    { label: "System thinking", score: 70, color: "#f59e0b" },
                  ].map((metric) => (
                    <div key={metric.label} className="mb-4">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[12px] text-slate-500">
                          {metric.label}
                        </span>
                        <span
                          className="text-[12px] font-medium"
                          style={{ color: metric.color }}
                        >
                          {metric.score}%
                        </span>
                      </div>
                      <div className="h-[5px] bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${metric.score}%`,
                            background: metric.color,
                            opacity: 0.75,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-600 m-0 mb-0.5">
                        Overall verdict
                      </p>
                      <p className="text-[14px] font-semibold text-emerald-400 m-0">
                        Strong hire · 79%
                      </p>
                    </div>
                    <button className="text-[12px] text-blue-400 border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 rounded-lg cursor-pointer hover:bg-blue-500/15 transition-all">
                      Full report →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-7 py-20 sm:py-24">
          <FadeUp>
            <div className="mb-12">
              <SectionLabel text="How it works" />
              <SectionHeading>Up and running in minutes</SectionHeading>
              <p className="text-[15px] text-slate-600 max-w-[440px] leading-[1.8] m-0">
                No setup, no installs. Open a browser and start your first AI
                interview in under 3 minutes.
              </p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div className="bg-white/[0.018] border border-white/[0.06] rounded-2xl p-6 sm:p-7 h-full relative">
                  <div className="flex items-center justify-between mb-5">
                    <p className="font-['DM_Serif_Display',serif] text-[3rem] text-blue-500/[0.18] m-0 leading-none select-none">
                      {step.num}
                    </p>
                    {i < steps.length - 1 && (
                      <svg
                        className="hidden sm:block"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(59,130,246,0.25)"
                        strokeWidth="1.5"
                      >
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-200 m-0 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 m-0 leading-[1.75]">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-7 py-20 sm:py-24">
          <FadeUp>
            <div className="mb-12">
              <SectionLabel text="Features" />
              <SectionHeading>
                Everything you need
                <br />
                <span className="text-slate-500">to nail the interview</span>
              </SectionHeading>
              <p className="text-[15px] text-slate-600 max-w-[480px] leading-[1.8] m-0">
                From AI question generation to live execution and deep feedback
                — your complete interview prep stack.
              </p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.06}>
                <div className="fc bg-white/[0.018] border border-white/[0.06] rounded-2xl p-6 sm:p-7 h-full cursor-default">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: f.glow,
                      color: f.accent,
                      border: `1px solid ${f.accent}22`,
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-200 m-0 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-600 m-0 leading-[1.75]">
                    {f.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ──────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-7 py-20 sm:py-24">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <SectionLabel text="Courses" />
                <SectionHeading>
                  AI-recommended courses
                  <br />
                  <span className="text-slate-500">based on your gaps</span>
                </SectionHeading>
              </div>
              <button className="sb flex-shrink-0 text-[13px] text-slate-400 border border-white/[0.08] bg-white/[0.03] px-4 py-2 rounded-lg cursor-pointer hover:text-slate-200 transition-all self-start sm:self-auto">
                Browse all courses →
              </button>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.08}>
                <div className="course-card bg-white/[0.018] border border-white/[0.06] rounded-2xl p-5 h-full flex flex-col cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                      style={{
                        color: c.tagColor,
                        background: `${c.tagColor}12`,
                        borderColor: `${c.tagColor}25`,
                      }}
                    >
                      {c.tag}
                    </span>
                    <span className="text-[10px] text-slate-700">
                      {c.duration}
                    </span>
                  </div>
                  <h3 className="text-[14.5px] font-semibold text-slate-200 m-0 mb-2 leading-[1.45]">
                    {c.title}
                  </h3>
                  <p className="text-[13px] text-slate-600 m-0 leading-[1.7] flex-1">
                    {c.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/[0.05]">
                    <p className="text-[10px] text-slate-700 m-0 mb-2">
                      {c.level}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-slate-600 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[760px] mx-auto px-5 sm:px-7 py-20 sm:py-24">
          <FadeUp>
            <div className="text-center mb-12">
              <SectionLabel text="FAQ" />
              <SectionHeading>Common questions</SectionHeading>
              <p className="text-[15px] text-slate-600 leading-[1.8] m-0">
                Everything you need to know before your first session.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-7 pb-20 sm:pb-28">
          <FadeUp>
            <div
              className="relative rounded-3xl overflow-hidden border border-blue-500/[0.15] text-center"
              style={{
                background:
                  "linear-gradient(140deg, rgba(37,99,235,0.13) 0%, rgba(139,92,246,0.09) 50%, rgba(6,11,20,0) 100%)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute -top-28 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(37,99,235,0.11) 0%, transparent 65%)",
                }}
              />
              {/* Grid */}
              <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

              <div className="relative z-[1] px-8 sm:px-12 py-16 sm:py-20 lg:py-24">
                <SectionLabel text="Get started today" />
                <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.8rem,4.5vw,3.2rem)] text-slate-50 m-0 mb-4 leading-[1.15]">
                  Ready to ace your next
                  <br />
                  <span className="text-blue-400 italic">tech interview?</span>
                </h2>
                <p className="text-[15.5px] text-slate-500 max-w-[460px] mx-auto mb-10 leading-[1.8]">
                  Join 2,400+ students and professionals preparing smarter with
                  AI-powered mock interviews and personalised courses.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    className="gb bg-blue-600 text-white border-none px-8 sm:px-10 py-3.5 rounded-xl text-[15px] font-semibold cursor-pointer shadow-[0_4px_28px_rgba(37,99,235,0.45)]"
                    onClick={() => navigate("/auth")}
                  >
                    Start for free →
                  </button>
                  <button
                    className="sb bg-white/[0.04] text-slate-400 border border-white/[0.08] px-8 sm:px-10 py-3.5 rounded-xl text-[15px] font-medium cursor-pointer hover:text-slate-200"
                    onClick={() => navigate("/courses")}
                  >
                    Explore courses
                  </button>
                </div>
                <p className="text-[12px] text-slate-700 mt-6 m-0">
                  No credit card required · 3 free interviews included · Cancel
                  anytime
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
