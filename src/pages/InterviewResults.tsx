import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RESULT = {
  role: "Frontend Developer",
  company: "TechCorp",
  date: "March 22, 2026",
  duration: "38 min",
  totalScore: 76,
  passed: true,
  sections: [
    { label: "Problem solving", score: 82, max: 100, color: "bg-blue-500" },
    { label: "Code quality", score: 70, max: 100, color: "bg-purple-500" },
    { label: "MCQ accuracy", score: 75, max: 100, color: "bg-emerald-500" },
    { label: "Communication", score: 80, max: 100, color: "bg-amber-500" },
  ],
  mcq: [
    {
      q: "Which hook should you use to run a side effect only once after the component mounts?",
      options: ["useState", "useEffect with []", "useMemo", "useCallback"],
      selected: 1,
      correct: 1,
    },
    {
      q: "Which selector has the highest specificity?",
      options: ["div p", ".class", "#id", "* { }"],
      selected: 1,
      correct: 2,
    },
    {
      q: "What does the virtual DOM do in React?",
      options: [
        "Directly updates the browser DOM",
        "Stores component state",
        "Diffs changes and batches real DOM updates",
        "Handles routing",
      ],
      selected: 2,
      correct: 2,
    },
  ],
  code: {
    language: "JavaScript",
    question: "Flatten a nested object",
    submitted: `function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const fullKey = prefix ? \`\${prefix}.\${key}\` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], fullKey))
    } else {
      acc[fullKey] = obj[key]
    }
    return acc
  }, {})
}`,
    feedback:
      "Good use of recursion and Object.keys. The reduce pattern is clean. Consider handling arrays inside the object and adding a null check for non-plain objects (e.g. Date, Map). Time complexity is O(n) where n is total number of leaf nodes — correctly identified.",
  },
  aiFeedback: [
    {
      type: "strength",
      title: "Strong recursion pattern",
      body: "Your flatten function correctly handles deeply nested structures using recursion. The reduce approach is idiomatic JavaScript.",
    },
    {
      type: "strength",
      title: "Clean variable naming",
      body: "Variables like fullKey and prefix clearly convey intent. This makes the code easy to follow without comments.",
    },
    {
      type: "improve",
      title: "Edge case handling",
      body: "Arrays inside the object were not handled. Flattening { a: [1, 2] } should produce { 'a.0': 1, 'a.1': 2 }. Adding Array.isArray() before the object check covers this.",
    },
    {
      type: "improve",
      title: "CSS specificity gap",
      body: "The MCQ on CSS specificity was answered incorrectly. The order is: inline > #id > .class > tag. An #id selector always beats a .class selector.",
    },
  ],
};

const scoreColor = (s: number) =>
  s >= 80 ? "text-emerald-600" : s >= 60 ? "text-amber-600" : "text-red-500";

const scoreBg = (s: number) =>
  s >= 80
    ? "bg-emerald-50 border-emerald-200"
    : s >= 60
      ? "bg-amber-50 border-amber-200"
      : "bg-red-50 border-red-200";

type Tab = "overview" | "mcq" | "code" | "feedback";

export default function InterviewResults() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(RESULT.code.submitted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "mcq", label: "MCQ review" },
    { key: "code", label: "Code review" },
    { key: "feedback", label: "AI feedback" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-24">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                RESULT.passed
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-red-50 text-red-600 border-red-200"
              }`}
            >
              {RESULT.passed ? "✓ Passed" : "✗ Did not pass"}
            </span>
            <span className="text-xs text-muted-foreground">{RESULT.date}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{RESULT.role}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {RESULT.company} · {RESULT.duration} interview
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm border border-border rounded-lg px-4 py-2 hover:bg-muted transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/interview")}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>

      {/* Score hero */}
      <div
        className={`border rounded-2xl p-6 mb-6 ${scoreBg(RESULT.totalScore)}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Overall score
            </p>
            <p
              className={`text-6xl font-bold tracking-tight ${scoreColor(RESULT.totalScore)}`}
            >
              {RESULT.totalScore}
              <span className="text-2xl font-normal text-muted-foreground">
                /100
              </span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {RESULT.totalScore >= 80
                ? "Excellent performance — well above the passing bar."
                : RESULT.totalScore >= 60
                  ? "Good effort — a few areas to tighten up."
                  : "Keep practising — review the feedback below."}
            </p>
          </div>
          {/* Circular score ring */}
          <div className="relative w-24 h-24 shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle
                cx="48"
                cy="48"
                r="38"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                className="text-border opacity-30"
              />
              <circle
                cx="48"
                cy="48"
                r="38"
                fill="none"
                stroke={
                  RESULT.totalScore >= 80
                    ? "#10b981"
                    : RESULT.totalScore >= 60
                      ? "#f59e0b"
                      : "#ef4444"
                }
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${(RESULT.totalScore / 100) * 238.76} 238.76`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-lg font-bold ${scoreColor(RESULT.totalScore)}`}
              >
                {RESULT.totalScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-7">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? "border-blue-600 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === "overview" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-sm mb-4">Score breakdown</h2>
            <div className="space-y-4">
              {RESULT.sections.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-muted-foreground">
                      {s.label}
                    </span>
                    <span
                      className={`text-sm font-semibold ${scoreColor(s.score)}`}
                    >
                      {s.score}/100
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${s.color}`}
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-blue-600">
                {RESULT.mcq.filter((q) => q.selected === q.correct).length}/
                {RESULT.mcq.length}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                MCQs correct
              </p>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-blue-600">
                {RESULT.duration}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Time taken</p>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-blue-600">1/1</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Coding submitted
              </p>
            </div>
          </div>

          {/* Quick AI note */}
          <div className="border border-border rounded-xl p-4 bg-card">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                AI
              </div>
              <div>
                <p className="text-sm font-medium mb-1">AI summary</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You showed solid JavaScript fundamentals and clean code
                  structure. Focus on CSS specificity rules and edge case
                  handling in your coding solutions to push your score above 85.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MCQ review tab */}
      {tab === "mcq" && (
        <div className="space-y-5">
          <h2 className="font-semibold text-sm mb-2">
            {RESULT.mcq.filter((q) => q.selected === q.correct).length} of{" "}
            {RESULT.mcq.length} correct
          </h2>
          {RESULT.mcq.map((q, qi) => {
            const correct = q.selected === q.correct;
            return (
              <div
                key={qi}
                className={`border rounded-xl p-5 ${correct ? "border-emerald-200 bg-emerald-50/40" : "border-red-200 bg-red-50/40"}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${correct ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
                  >
                    {correct ? "✓" : "✗"}
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{q.q}</p>
                </div>
                <div className="space-y-2 ml-9">
                  {q.options.map((opt, oi) => (
                    <div
                      key={oi}
                      className={`text-sm px-3 py-2 rounded-lg border ${
                        oi === q.correct
                          ? "bg-emerald-100 border-emerald-300 text-emerald-800 font-medium"
                          : oi === q.selected && !correct
                            ? "bg-red-100 border-red-300 text-red-700 line-through"
                            : "border-border text-muted-foreground"
                      }`}
                    >
                      <span className="font-semibold mr-2">
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      {opt}
                      {oi === q.correct && (
                        <span className="ml-2 text-xs text-emerald-600">
                          ← correct
                        </span>
                      )}
                      {oi === q.selected && !correct && (
                        <span className="ml-2 text-xs text-red-500">
                          ← your answer
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Code review tab */}
      {tab === "code" && (
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-semibold text-sm">
                  {RESULT.code.question}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {RESULT.code.language}
                </p>
              </div>
              <button
                onClick={copyCode}
                className="text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors"
              >
                {copied ? "Copied!" : "Copy code"}
              </button>
            </div>
            <pre className="bg-[#1e1e1e] text-[#d4d4d4] rounded-xl p-5 text-xs font-mono leading-relaxed overflow-x-auto">
              {RESULT.code.submitted}
            </pre>
          </div>

          {/* AI code feedback */}
          <div className="border border-border rounded-xl p-5 bg-card">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                AI
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Code review</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {RESULT.code.feedback}
                </p>
              </div>
            </div>
          </div>

          {/* Score for coding */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Correctness", score: 85 },
              { label: "Efficiency", score: 70 },
              { label: "Readability", score: 90 },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-muted rounded-xl p-4 text-center"
              >
                <p className={`text-xl font-bold ${scoreColor(m.score)}`}>
                  {m.score}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI feedback tab */}
      {tab === "feedback" && (
        <div className="space-y-4">
          <div className="space-y-3">
            <h2 className="font-semibold text-sm text-emerald-700">
              Strengths (
              {RESULT.aiFeedback.filter((f) => f.type === "strength").length})
            </h2>
            {RESULT.aiFeedback
              .filter((f) => f.type === "strength")
              .map((f, i) => (
                <div
                  key={i}
                  className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4"
                >
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-sm">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{f.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="space-y-3 mt-6">
            <h2 className="font-semibold text-sm text-amber-700">
              Areas to improve (
              {RESULT.aiFeedback.filter((f) => f.type === "improve").length})
            </h2>
            {RESULT.aiFeedback
              .filter((f) => f.type === "improve")
              .map((f, i) => (
                <div
                  key={i}
                  className="border border-amber-200 bg-amber-50/50 rounded-xl p-4"
                >
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-sm">
                      ↑
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{f.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Recommended practice */}
          <div className="border border-border rounded-xl p-5 bg-card mt-4">
            <p className="text-sm font-semibold mb-3">Recommended practice</p>
            <div className="space-y-2">
              {[
                { title: "CSS Specificity Quiz", tag: "CSS" },
                { title: "Flatten nested structures", tag: "JavaScript" },
                { title: "Array & object edge cases", tag: "JavaScript" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm">{p.title}</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {p.tag}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {}}
              className="w-full mt-4 h-9 text-sm border border-border rounded-lg hover:bg-muted transition-colors font-medium"
            >
              Go to practice →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
