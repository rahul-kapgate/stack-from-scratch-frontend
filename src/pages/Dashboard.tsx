import { useState } from "react"
import { useNavigate } from "react-router-dom"

const stats = [
  { label: "Interviews taken", value: "12" },
  { label: "Problems solved", value: "48" },
  { label: "Avg. score", value: "78%" },
  { label: "Streak", value: "5 days" },
]

const upcomingInterviews = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "TechCorp",
    date: "Mar 25, 2026",
    time: "10:00 AM",
    type: "Technical",
    status: "Confirmed",
  },
  {
    id: 2,
    role: "Full Stack Engineer",
    company: "StartupXYZ",
    date: "Mar 28, 2026",
    time: "2:30 PM",
    type: "System Design",
    status: "Pending",
  },
]

const pastInterviews = [
  {
    id: 1,
    role: "React Developer",
    company: "Acme Inc.",
    date: "Mar 10, 2026",
    score: 82,
    result: "Passed",
  },
  {
    id: 2,
    role: "Backend Engineer",
    company: "DevStudio",
    date: "Mar 5, 2026",
    score: 65,
    result: "Failed",
  },
  {
    id: 3,
    role: "SDE Intern",
    company: "CloudBase",
    date: "Feb 28, 2026",
    score: 91,
    result: "Passed",
  },
]

const practiceProblems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays", solved: true },
  { id: 2, title: "Longest Substring Without Repeating", difficulty: "Medium", topic: "Strings", solved: true },
  { id: 3, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", solved: false },
  { id: 4, title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Linked Lists", solved: false },
  { id: 5, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", solved: true },
]

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700",
  Medium: "bg-amber-50 text-amber-700",
  Hard: "bg-red-50 text-red-700",
}

const tabs = ["Overview", "Upcoming", "History", "Practice"]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Overview")
  const [showSchedule, setShowSchedule] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 pb-24">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="text-2xl font-bold tracking-tight">John Doe 👋</h1>
        </div>
        <button
          onClick={() => setShowSchedule(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          + Schedule interview
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-8">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === t
                ? "border-blue-600 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "Overview" && (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-muted rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600 mb-1">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Upcoming preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base">Upcoming interviews</h2>
              <button onClick={() => setActiveTab("Upcoming")} className="text-xs text-blue-600 hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-3">
              {upcomingInterviews.map((iv) => (
                <UpcomingCard key={iv.id} iv={iv} onJoin={() => navigate("/interview")} />
              ))}
            </div>
          </div>

          {/* Practice preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base">Practice problems</h2>
              <button onClick={() => setActiveTab("Practice")} className="text-xs text-blue-600 hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-2">
              {practiceProblems.slice(0, 3).map((p) => (
                <PracticeRow key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Tab */}
      {activeTab === "Upcoming" && (
        <div className="space-y-4">
          <h2 className="font-semibold text-base mb-2">Upcoming interviews</h2>
          {upcomingInterviews.length === 0 ? (
            <EmptyState message="No upcoming interviews. Schedule one!" />
          ) : (
            upcomingInterviews.map((iv) => (
              <UpcomingCard key={iv.id} iv={iv} onJoin={() => navigate("/interview")} />
            ))
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "History" && (
        <div>
          <h2 className="font-semibold text-base mb-4">Past interviews</h2>
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Role</th>
                  <th className="text-left px-4 py-3 font-medium">Company</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Score</th>
                  <th className="text-left px-4 py-3 font-medium">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {pastInterviews.map((iv) => (
                  <tr key={iv.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{iv.role}</td>
                    <td className="px-4 py-3 text-muted-foreground">{iv.company}</td>
                    <td className="px-4 py-3 text-muted-foreground">{iv.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${iv.score >= 75 ? "bg-emerald-500" : "bg-red-400"}`}
                            style={{ width: `${iv.score}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{iv.score}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        iv.result === "Passed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}>
                        {iv.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Practice Tab */}
      {activeTab === "Practice" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base">Practice problems</h2>
            <span className="text-xs text-muted-foreground">
              {practiceProblems.filter(p => p.solved).length}/{practiceProblems.length} solved
            </span>
          </div>
          <div className="border border-border rounded-xl overflow-hidden divide-y divide-border bg-card">
            {practiceProblems.map((p) => (
              <PracticeRow key={p.id} p={p} full />
            ))}
          </div>
        </div>
      )}

      {/* Schedule modal */}
      {showSchedule && (
        <ScheduleModal onClose={() => setShowSchedule(false)} />
      )}
    </div>
  )
}

/* ── Sub-components ── */

function UpcomingCard({ iv, onJoin }: { iv: typeof upcomingInterviews[0]; onJoin: () => void }) {
  return (
    <div className="flex items-center justify-between border border-border rounded-xl px-4 py-3.5 bg-card hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg shrink-0">
          💼
        </div>
        <div>
          <p className="font-medium text-sm">{iv.role}</p>
          <p className="text-xs text-muted-foreground">{iv.company} · {iv.date} at {iv.time}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          iv.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
        }`}>
          {iv.status}
        </span>
        <button
          onClick={onJoin}
          className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          Join
        </button>
      </div>
    </div>
  )
}

function PracticeRow({ p, full }: { p: typeof practiceProblems[0]; full?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${full ? "" : "border border-border rounded-xl bg-card mb-2"} hover:bg-muted/40 transition-colors`}>
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          p.solved ? "border-emerald-500 bg-emerald-500" : "border-border"
        }`}>
          {p.solved && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{p.title}</p>
          <p className="text-xs text-muted-foreground">{p.topic}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[p.difficulty]}`}>
          {p.difficulty}
        </span>
        {!p.solved && (
          <button className="text-xs text-blue-600 hover:underline font-medium">Solve</button>
        )}
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-muted-foreground text-sm border border-border rounded-xl bg-card">
      {message}
    </div>
  )
}

function ScheduleModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [type, setType] = useState("Technical")

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg">Schedule an interview</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl leading-none">×</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Role / Position</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border text-sm bg-background outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border text-sm bg-background outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border text-sm bg-background outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Interview type</label>
            <div className="grid grid-cols-3 gap-2">
              {["Technical", "HR", "System Design"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`h-9 rounded-lg border text-xs font-medium transition-colors ${
                    type === t
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 h-10 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  )
}