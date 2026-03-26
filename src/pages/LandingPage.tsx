import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    title: "AI-powered questions",
    description: "Auto-generate role-specific questions based on JD, skill level, and topic area.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.08)",
  },
  {
    title: "Live coding editor",
    description: "Full-featured in-browser IDE with syntax highlighting and instant code execution.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    accent: "#10b981",
    glow: "rgba(16,185,129,0.08)",
  },
  {
    title: "Video & audio interviews",
    description: "Live sessions with built-in transcription and AI analysis after the call.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14"/>
        <rect x="3" y="8" width="12" height="8" rx="2"/>
      </svg>
    ),
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.08)",
  },
  {
    title: "Instant AI feedback",
    description: "Get detailed scorecards, code review, and improvement tips right after submission.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.08)",
  },
]

const stats = [
  { value: "10x", label: "Faster screening" },
  { value: "500+", label: "AI question templates" },
  { value: "98%", label: "Candidate satisfaction" },
  { value: "3min", label: "To start an interview" },
]

const steps = [
  { num: "01", title: "Create a room", description: "Set up an interview with role, difficulty, and duration. AI pre-loads relevant questions instantly." },
  { num: "02", title: "Invite candidate", description: "Send a link. Candidate joins with no install needed — works in any browser on any device." },
  { num: "03", title: "Review & decide", description: "Get AI-generated scorecards, code playback, and video recordings instantly after the interview." },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [typed, setTyped] = useState("")
  const fullText = "ace your next interview"

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      setTyped(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(t)
    }, 65)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background: "#060b14", minHeight: "100vh", color: "#f0f4f8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes float1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-16px)} }
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
        .fc:hover { transform:translateY(-5px) !important; border-color:rgba(59,130,246,0.35) !important; }
        .gb:hover { transform:translateY(-2px); box-shadow:0 10px 40px rgba(37,99,235,0.5) !important; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "88px 28px 72px", position: "relative" }}>

        {/* Background orbs */}
        <div className="orb" style={{ position:"absolute", top:-100, left:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 65%)", pointerEvents:"none", zIndex:0 }} />
        <div className="orb" style={{ position:"absolute", top:80, right:-150, width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)", pointerEvents:"none", zIndex:0, animationDelay:"2.5s" }} />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center", position:"relative", zIndex:1 }}>

          {/* Left */}
          <div>
            <div className="a1" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.25)", borderRadius:100, padding:"7px 16px", marginBottom:32 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#3b82f6", display:"inline-block" }} />
              <span style={{ fontSize:12, color:"#93c5fd", fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>AI-powered interview platform</span>
            </div>

            <h1 className="a2" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2.2rem,3.8vw,3.2rem)", lineHeight:1.14, letterSpacing:"-0.02em", marginBottom:22, color:"#f8fafc" }}>
              The smarter way to{" "}
              <span style={{ color:"#3b82f6", fontStyle:"italic" }}>
                {typed}
                <span className="cursor" style={{ color:"#60a5fa", marginLeft:2 }}>|</span>
              </span>
            </h1>

            <p className="a3" style={{ fontSize:16, lineHeight:1.78, color:"#64748b", marginBottom:36, maxWidth:430, fontFamily:"'DM Sans',sans-serif" }}>
              Practice coding interviews with AI-generated questions, a live code editor, and instant feedback. Built for students and professionals in India.
            </p>

            <div className="a4" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
              <button className="gb" onClick={() => navigate("/auth")}
                style={{ background:"#2563eb", color:"#fff", border:"none", padding:"13px 28px", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.2s ease", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 20px rgba(37,99,235,0.35)" }}>
                Start for free →
              </button>
              <button onClick={() => navigate("/auth")}
                style={{ background:"rgba(255,255,255,0.04)", color:"#94a3b8", border:"1px solid rgba(255,255,255,0.09)", padding:"13px 28px", borderRadius:10, fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s ease" }}>
                Sign in
              </button>
            </div>

            {/* Avatars */}
            <div className="a4" style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ display:"flex" }}>
                {["#3b82f6","#10b981","#f59e0b","#8b5cf6","#ef4444"].map((c,i) => (
                  <div key={i} style={{ width:30, height:30, borderRadius:"50%", background:c, border:"2.5px solid #060b14", marginLeft:i>0?-9:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>
                    {["A","B","C","D","E"][i]}
                  </div>
                ))}
              </div>
              <span style={{ fontSize:13, color:"#475569", fontFamily:"'DM Sans',sans-serif" }}>
                <span style={{ color:"#94a3b8" }}>500+</span> candidates joined this month
              </span>
            </div>
          </div>

          {/* Right — floating cards */}
          <div style={{ position:"relative", height:440 }}>

            {/* AI question */}
            <div className="f1" style={{ position:"absolute", top:0, left:0, right:32, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"18px 20px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"rgba(59,130,246,0.18)", color:"#60a5fa", fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif" }}>AI</div>
                <span style={{ fontSize:11, color:"#475569", fontFamily:"'DM Sans',sans-serif" }}>AI question generated</span>
                <span style={{ marginLeft:"auto", fontSize:10, background:"rgba(59,130,246,0.12)", color:"#60a5fa", padding:"2px 8px", borderRadius:100, fontFamily:"'DM Sans',sans-serif" }}>Frontend</span>
              </div>
              <p style={{ fontSize:13, color:"#cbd5e1", lineHeight:1.65, margin:0, fontFamily:"'DM Sans',sans-serif" }}>
                Implement a function to find the longest palindromic substring in O(n) time. Explain your approach and trade-offs.
              </p>
            </div>

            {/* Code editor */}
            <div className="f2" style={{ position:"absolute", top:136, left:24, right:0, background:"#0d1117", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, overflow:"hidden" }}>
              <div style={{ padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:6, alignItems:"center" }}>
                {["#ef4444","#f59e0b","#22c55e"].map((c,i) => <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
                <span style={{ fontSize:11, color:"#334155", marginLeft:8, fontFamily:"'JetBrains Mono',monospace" }}>solution.js</span>
              </div>
              <pre style={{ margin:0, padding:"14px 16px", fontSize:12, fontFamily:"'JetBrains Mono',monospace", lineHeight:1.75, color:"#64748b" }}>
                <span style={{ color:"#60a5fa" }}>function</span> <span style={{ color:"#34d399" }}>flattenObj</span>(obj) {"{"}
                {"\n"}  <span style={{ color:"#60a5fa" }}>return</span> Object.<span style={{ color:"#f472b6" }}>keys</span>(obj)
                {"\n"}    .reduce((acc, key) {"=>"} {"{"}
                {"\n"}      <span style={{ color:"#60a5fa" }}>if</span> (obj[key] !== <span style={{ color:"#fb923c" }}>null</span>)
                {"\n"}        acc[key] = obj[key]
                {"\n"}      <span style={{ color:"#60a5fa" }}>return</span> acc
                {"\n"}    {"}"}, {"{}"})
                {"\n"}{"}"}
              </pre>
            </div>

            {/* Score */}
            <div className="f3" style={{ position:"absolute", bottom:0, left:0, right:48, background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.18)", borderRadius:16, padding:"16px 18px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div>
                  <p style={{ fontSize:11, color:"#475569", margin:"0 0 2px", fontFamily:"'DM Sans',sans-serif" }}>Interview score</p>
                  <p style={{ fontSize:11, color:"#10b981", margin:0, fontFamily:"'DM Sans',sans-serif" }}>✓ Passed</p>
                </div>
                <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:"#34d399" }}>82%</span>
              </div>
              <div style={{ height:5, background:"rgba(255,255,255,0.05)", borderRadius:5, overflow:"hidden" }}>
                <div style={{ width:"82%", height:"100%", background:"linear-gradient(90deg,#059669,#34d399)", borderRadius:5 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <FadeUp>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"52px 28px" }}>
          <div style={{ maxWidth:1140, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign:"center", padding:"8px 0" }}>
                <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:"2.6rem", color:"#3b82f6", margin:"0 0 4px" }}>{s.value}</p>
                <p style={{ fontSize:13, color:"#475569", margin:0, fontFamily:"'DM Sans',sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Features ── */}
      <FadeUp>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"96px 28px" }}>
          <div style={{ marginBottom:60 }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", color:"#3b82f6", textTransform:"uppercase", marginBottom:12, fontFamily:"'DM Sans',sans-serif" }}>Features</p>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.8rem,3vw,2.6rem)", color:"#f8fafc", margin:"0 0 16px", lineHeight:1.18 }}>
              Everything you need to nail<br />the interview
            </h2>
            <p style={{ fontSize:15, color:"#475569", maxWidth:500, lineHeight:1.75, margin:0, fontFamily:"'DM Sans',sans-serif" }}>
              From AI-generated questions to live code execution — your entire interview prep in one place.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
            {features.map(f => (
              <div key={f.title} className="fc" style={{ background:"rgba(255,255,255,0.018)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:18, padding:"30px 28px", transition:"all 0.25s ease", cursor:"default" }}>
                <div style={{ width:46, height:46, borderRadius:13, background:f.glow, color:f.accent, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22, border:`1px solid ${f.accent}20` }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize:16, fontWeight:600, color:"#e2e8f0", margin:"0 0 10px", fontFamily:"'DM Sans',sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize:14, color:"#475569", margin:0, lineHeight:1.7, fontFamily:"'DM Sans',sans-serif" }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── How it works ── */}
      <FadeUp>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"96px 28px" }}>
          <div style={{ maxWidth:1140, margin:"0 auto" }}>
            <div style={{ marginBottom:60 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", color:"#3b82f6", textTransform:"uppercase", marginBottom:12, fontFamily:"'DM Sans',sans-serif" }}>How it works</p>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.8rem,3vw,2.6rem)", color:"#f8fafc", margin:0, lineHeight:1.18 }}>Up and running in minutes</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {steps.map((step, i) => (
                <div key={step.num} style={{ padding:"32px 28px", background:"rgba(255,255,255,0.018)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:18, position:"relative" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                    <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:"2.8rem", color:"rgba(59,130,246,0.2)", margin:0, lineHeight:1 }}>{step.num}</p>
                    {i < steps.length - 1 && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                    )}
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:600, color:"#e2e8f0", margin:"0 0 10px", fontFamily:"'DM Sans',sans-serif" }}>{step.title}</h3>
                  <p style={{ fontSize:14, color:"#475569", margin:0, lineHeight:1.7, fontFamily:"'DM Sans',sans-serif" }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ── CTA ── */}
      <FadeUp>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 28px 120px" }}>
          <div style={{ background:"linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(139,92,246,0.08) 100%)", border:"1px solid rgba(59,130,246,0.18)", borderRadius:24, padding:"80px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-80, left:"50%", transform:"translateX(-50%)", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)", pointerEvents:"none" }} />
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", color:"#3b82f6", textTransform:"uppercase", marginBottom:18, fontFamily:"'DM Sans',sans-serif" }}>Get started today</p>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,4vw,3rem)", color:"#f8fafc", margin:"0 0 18px", lineHeight:1.18 }}>
              Ready to ace your next<br />
              <span style={{ color:"#3b82f6", fontStyle:"italic" }}>tech interview?</span>
            </h2>
            <p style={{ fontSize:16, color:"#475569", maxWidth:460, margin:"0 auto 44px", lineHeight:1.75, fontFamily:"'DM Sans',sans-serif" }}>
              Join thousands of students and professionals preparing smarter with AI-powered practice.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="gb" onClick={() => navigate("/auth")}
                style={{ background:"#2563eb", color:"#fff", border:"none", padding:"15px 36px", borderRadius:11, fontSize:15, fontWeight:600, cursor:"pointer", transition:"all 0.2s ease", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 24px rgba(37,99,235,0.4)" }}>
                Create free account →
              </button>
              <button onClick={() => navigate("/auth")}
                style={{ background:"rgba(255,255,255,0.04)", color:"#94a3b8", border:"1px solid rgba(255,255,255,0.08)", padding:"15px 36px", borderRadius:11, fontSize:15, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s ease" }}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </FadeUp>

    </div>
  )
}