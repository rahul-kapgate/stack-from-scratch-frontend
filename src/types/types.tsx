// ── Types ─────────────────────────────────────────────────────────────────────

export type Page = "profile" | "interview";

export interface Interview {
  id: number;
  role: string;
  company: string;
  date: string;
  score: number;
  status: "passed" | "average" | "failed";
  duration: string;
  round: string;
}

// ── Shared data ───────────────────────────────────────────────────────────────

export const USER = {
  name: "Priya Sharma",
  email: "priya.sharma@gmail.com",
  role: "Frontend Engineer",
  level: "Mid-level · 3 YOE",
  avatar: "PS",
  target: "SDE-II",
  targetCompanies: ["Flipkart", "Swiggy", "Razorpay"],
  stats: [
    { label: "Interviews", value: "12" },
    { label: "Avg Score",  value: "81%" },
    { label: "Best Score", value: "94%" },
    { label: "Streak",     value: "5 days" },
  ],
};

export const PAST_INTERVIEWS: Interview[] = [
  { id: 1, role: "Frontend Engineer", company: "Flipkart", date: "Apr 24, 2026", score: 87, status: "passed",  duration: "42 min", round: "Technical Round 2" },
  { id: 2, role: "SDE-II",           company: "Swiggy",   date: "Apr 21, 2026", score: 74, status: "average", duration: "38 min", round: "System Design"    },
  { id: 3, role: "Frontend Engineer", company: "Razorpay", date: "Apr 18, 2026", score: 92, status: "passed",  duration: "45 min", round: "Coding Round"      },
  { id: 4, role: "React Developer",   company: "Meesho",   date: "Apr 14, 2026", score: 61, status: "failed",  duration: "35 min", round: "Technical Round 1" },
  { id: 5, role: "SDE-I",            company: "Zepto",    date: "Apr 10, 2026", score: 88, status: "passed",  duration: "40 min", round: "Technical Round 2" },
];

export const SKILLS = [
  { name: "React & Hooks",    level: 88, color: "#3b82f6" },
  { name: "Data Structures",  level: 72, color: "#8b5cf6" },
  { name: "System Design",    level: 58, color: "#f59e0b" },
  { name: "JavaScript Core",  level: 91, color: "#10b981" },
  { name: "TypeScript",       level: 80, color: "#06b6d4" },
];

// ── Helper fns ────────────────────────────────────────────────────────────────

export function statusConfig(status: Interview["status"]) {
  if (status === "passed")  return { label: "Passed",  color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)"  };
  if (status === "average") return { label: "Average", color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)"  };
  return                           { label: "Failed",  color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)"   };
}

export function scoreColor(score: number) {
  if (score >= 80) return "#10b981";
  if (score >= 65) return "#f59e0b";
  return "#ef4444";
}