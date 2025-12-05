"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ROADMAP_STEPS = [
  "Learn HTML & CSS basics",
  "Master modern JavaScript",
  "Build UIs with React",
  "Create APIs with Node & Express",
  "Connect DBs with PostgreSQL / MongoDB",
  "Deploy & ship full-stack apps",
];

export default function Home() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Cycle through roadmap steps
  React.useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROADMAP_STEPS.length);
    }, 2000); // change every 2s
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-b border-border/60 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-10 md:flex-row md:py-16">
        {/* Left: text */}
        <div className="max-w-xl space-y-5 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            Full-stack from scratch
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Learn full-stack development{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              step by step.
            </span>
          </h1>

          <p className="text-sm text-muted-foreground sm:text-base">
            Follow a guided roadmap from HTML &amp; CSS to React, Node.js, and
            DevOps. No CS degree, no tutorial hell — just clear paths and
            project-based learning.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
            <Button
              asChild
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold shadow-md hover:brightness-110"
            >
              <Link href="/courses">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto border-border/70 bg-background/80 text-sm"
            >
              <Link href="/roadmap">View Roadmap</Link>
            </Button>
          </div>

          {/* Mini value props */}
          <div className="mt-4 flex flex-col items-center gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Beginner-friendly</span>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-border/80 sm:inline-block" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Project-based roadmap</span>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-border/80 sm:inline-block" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>No tutorial hell</span>
            </div>
          </div>
        </div>

        {/* Right: dynamic roadmap.ts card */}
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/80 p-4 shadow-xl">
            {/* Top bar */}
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 flex items-center gap-1 text-xs text-muted-foreground">
                roadmap.ts
                {/* tiny blinking cursor */}
                <span className="h-3 w-[2px] animate-pulse bg-emerald-400" />
              </span>
            </div>

            {/* Dynamic lines */}
            <div className="space-y-1.5 text-[11px] font-mono">
              {ROADMAP_STEPS.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={step}
                    className={[
                      "flex items-center rounded-md border px-3 py-1.5 transition-all duration-300",
                      isActive
                        ? "border-indigo-500/60 bg-indigo-500/10 text-indigo-50 shadow-md translate-x-1"
                        : "border-transparent text-muted-foreground/90",
                    ].join(" ")}
                  >
                    <span
                      className={
                        "mr-2 text-[10px] text-indigo-300/80 select-none"
                      }
                    >
                      {String(index + 1).padStart(2, "0")}:
                    </span>
                    <span className="flex-1">{step}</span>
                    {isActive && (
                      <span className="ml-2 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
