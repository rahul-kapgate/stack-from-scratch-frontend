"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CourseStatus = "live" | "coming-soon";

type Course = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  status: CourseStatus;
  description: string;
  badge?: string;
  href?: string; // only for live courses
};

const courses: Course[] = [
  {
    id: "html-css",
    title: "HTML & CSS Foundations",
    level: "Beginner",
    status: "live",
    description:
      "Build solid fundamentals with semantic HTML, modern layouts, and responsive design.",
    badge: "Start here",
    href: "/courses/html-css",
  },
  {
    id: "js-core",
    title: "JavaScript Essentials",
    level: "Intermediate",
    status: "coming-soon",
    description:
      "Master core JS concepts, async patterns, and DOM manipulation with real projects.",
    badge: "Coming soon",
    href: "/courses/javascript-essentials",
  },
  {
    id: "react",
    title: "React for the Real World",
    level: "Intermediate",
    status: "coming-soon",
    description:
      "From components to hooks and state management — everything you need to ship React apps.",
    badge: "Coming soon",
  },
  {
    id: "backend",
    title: "Node + Express Backend",
    level: "Advanced",
    status: "coming-soon",
    description:
      "APIs, auth, databases, and best practices for building production-ready backends.",
    badge: "Coming soon",
  },
];

export default function CoursesPage() {
  return (
    <section className="space-y-8 py-10">
      {/* Hero / header */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-background via-background/95 to-background/90 px-6 py-8 shadow-sm sm:px-8 md:px-10 md:py-10">
        <div className="pointer-events-none absolute -left-24 -top-24 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="relative space-y-4 md:space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600" />
            <span className="font-medium">Curated paths for full-stack devs</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
                Courses & Tracks
              </span>
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Progress through focused, project-based courses. Start with the
              fundamentals, then move into JavaScript, React, and backend
              development — with more tracks dropping soon.
            </p>
          </div>

          <p className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
            <Clock className="h-4 w-4" />
            Save your time: everything is organized in a roadmap so you always
            know what to learn next.
          </p>
        </div>
      </div>

      {/* Courses grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => {
          const isComingSoon = course.status === "coming-soon";

          return (
            <article
              key={course.id}
              className={cn(
                "group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-background/80 p-5 shadow-sm backdrop-blur transition",
                "hover:border-indigo-500/70 hover:shadow-md",
                isComingSoon && "opacity-95"
              )}
            >
              {/* Accent bar */}
              <div className="absolute inset-x-5 top-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" />

              <div className="space-y-4 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {course.title}
                  </h2>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      isComingSoon
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-300"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                    )}
                  >
                    {course.level}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {course.badge && (
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5",
                        isComingSoon
                          ? "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-300"
                          : "border-indigo-500/40 bg-indigo-500/5 text-indigo-400"
                      )}
                    >
                      {course.badge}
                    </span>
                  )}
                  {isComingSoon && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5">
                      <Lock className="h-3 w-3" />
                      <span>Coming soon</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-between gap-3">
                {isComingSoon ? (
                  <>
                    <Button
                      variant="outline"
                      disabled
                      className="cursor-not-allowed border-dashed border-border/70 bg-background/60 text-xs font-medium text-muted-foreground"
                    >
                      Coming soon
                    </Button>
                    <p className="text-[11px] text-muted-foreground">
                      New tracks unlock gradually — stay tuned ✨
                    </p>
                  </>
                ) : (
                  <>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-indigo-500 to-violet-600 text-xs font-semibold text-white shadow-md transition hover:brightness-110"
                    >
                      <Link href={course.href ?? "#"}>
                        Start course
                        <PlayCircle className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                    <p className="text-[11px] text-muted-foreground">
                      Save your progress as you go.
                    </p>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
