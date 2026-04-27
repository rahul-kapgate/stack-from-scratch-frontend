import React from "react";

const points = [
  {
    title: "AI-driven interviews",
    desc: "Simulate real interview environments with smart, role-based questions powered by AI.",
  },
  {
    title: "Skill gap analysis",
    desc: "Understand exactly where you lack — whether it's DSA, frontend, backend, or system design.",
  },
  {
    title: "Personalized learning path",
    desc: "Get recommended courses tailored to your performance and career goals.",
  },
];

const stats = [
  { value: "10k+", label: "Students learning" },
  { value: "500+", label: "Interview questions" },
  { value: "95%", label: "Success improvement" },
];

export default function AboutUsPage() {
  return (
    <div className="bg-[#060b14] min-h-screen text-slate-100 font-['DM_Sans',sans-serif]">
      
      {/* HERO */}
      <section className="max-w-[1000px] mx-auto px-5 sm:px-7 pt-20 pb-14 text-center">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-blue-500 uppercase mb-3">
          About us
        </p>

        <h1 className="font-['DM_Serif_Display',serif] text-[clamp(2rem,5vw,3rem)] leading-tight text-slate-50 mb-5">
          Building the future of
          <br />
          <span className="text-blue-500 italic">
            AI-powered learning & hiring
          </span>
        </h1>

        <p className="text-slate-500 max-w-[650px] mx-auto text-[15px] leading-[1.8]">
          We are building a platform where anyone can take AI-powered interviews,
          identify their real skill gaps, and get guided towards the right
          courses to grow faster and smarter.
        </p>
      </section>

      {/* STORY */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-7 pb-16 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">
            Why we started
          </h2>

          <p className="text-slate-500 text-sm leading-[1.8] mb-4">
            Many students and developers prepare blindly — watching courses,
            solving problems, but never truly knowing if they are ready for real
            interviews.
          </p>

          <p className="text-slate-500 text-sm leading-[1.8]">
            We wanted to change that. Instead of guessing what to learn, our
            platform helps you <span className="text-blue-400">experience real interviews</span>,
            analyze your performance, and guide you toward the exact skills you
            need to improve.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-3">
            🚀 Our mission
          </h3>

          <p className="text-slate-500 text-sm leading-[1.8]">
            To bridge the gap between learning and real-world hiring by combining
            AI interviews with personalized education — helping people become
            job-ready with clarity and confidence.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/[0.05] py-16 px-5 sm:px-7">
        <div className="max-w-[1100px] mx-auto">
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-200 mb-3">
              How our platform works
            </h2>
            <p className="text-slate-500 text-sm max-w-[500px]">
              A simple 3-step process to help you learn smarter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {points.map((p) => (
              <div
                key={p.title}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
              >
                <h3 className="text-base font-semibold text-slate-200 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-500 leading-[1.7]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-white/[0.05] py-12 px-5 sm:px-7">
        <div className="max-w-[900px] mx-auto grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl text-blue-500 font-['DM_Serif_Display',serif]">
                {s.value}
              </p>
              <p className="text-sm text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1000px] mx-auto px-5 sm:px-7 pb-20 text-center">
        <div className="bg-white/[0.02] border border-blue-500/[0.2] rounded-3xl p-10">
          
          <h2 className="text-2xl font-semibold text-slate-200 mb-3">
            Ready to improve your interview skills?
          </h2>

          <p className="text-slate-500 text-sm mb-6">
            Start your AI interview today and discover what you actually need to learn.
          </p>

          <button className="bg-blue-600 hover:bg-blue-500 transition text-white px-7 py-3 rounded-lg font-semibold shadow-[0_4px_20px_rgba(37,99,235,0.35)]">
            Start Interview →
          </button>
        </div>
      </section>
    </div>
  );
}