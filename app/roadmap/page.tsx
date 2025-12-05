"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Sparkles,
  Flame,
  Clock,
  Rocket,
} from "lucide-react";

type RoadmapCategory =
  | "all"
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "career";

type RoadmapItem = {
  id: string;
  title: string;
  slug: string;
  category: Exclude<RoadmapCategory, "all">;
  level: "Beginner" | "Intermediate" | "Mixed";
  description: string;
  eta?: string;
  isNew?: boolean;
  isComingSoon?: boolean;
};

const categories: { id: RoadmapCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full-stack" },
  { id: "devops", label: "DevOps" },
  { id: "career", label: "Career" },
];

const roadmaps: RoadmapItem[] = [
  {
    id: "frontend",
    title: "Frontend Developer Roadmap",
    slug: "/roadmap/frontend",
    category: "frontend",
    level: "Beginner",
    description:
      "Start from HTML & CSS, move into JavaScript, React, and modern tooling.",
    isNew: true,
  },
  {
    id: "backend",
    title: "Backend Developer Roadmap",
    slug: "/roadmap/backend",
    category: "backend",
    level: "Intermediate",
    description:
      "Node, Express, databases, auth, and patterns to ship reliable APIs.",
    eta: "Coming Q1",
    isComingSoon: true,
  },
  {
    id: "fullstack",
    title: "Full-stack Developer Roadmap",
    slug: "/roadmap/fullstack",
    category: "fullstack",
    level: "Mixed",
    description:
      "Combine frontend + backend into real full-stack apps you can deploy.",
    isComingSoon: true,
    eta: "Draft in progress",
  },
  {
    id: "devops",
    title: "DevOps & Deployment Roadmap",
    slug: "/roadmap/devops",
    category: "devops",
    level: "Intermediate",
    description:
      "From Git workflows to CI/CD, environments, and basic cloud deployment.",
    isComingSoon: true,
  },
  {
    id: "career",
    title: "Career & Projects Roadmap",
    slug: "/roadmap/career",
    category: "career",
    level: "Mixed",
    description:
      "Portfolio, GitHub, resumes, and project ideas to stand out as a dev.",
    isComingSoon: true,
  },
];

export default function RoadmapPage() {
  const [activeCategory, setActiveCategory] =
    React.useState<RoadmapCategory>("all");

  const filteredRoadmaps =
    activeCategory === "all"
      ? roadmaps
      : roadmaps.filter((r) => r.category === activeCategory);

  return (
    <section className="space-y-8 py-10">
      {/* Hero / top section (roadmap.sh style) */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-background via-background/95 to-background/90 px-6 py-8 shadow-sm sm:px-8 md:px-10 md:py-10">
        {/* soft blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4 md:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600" />
              <span className="font-medium">
                Visual roadmaps for full-stack learners
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
                  Learning Roadmaps
                </span>
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                Inspired by roadmap-style learning, but tailored for{" "}
                <span className="font-medium text-foreground">
                  Stack From Scratch
                </span>
                . Pick a role, follow the steps, and move from{" "}
                <span className="font-semibold">zero → productive dev</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground md:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Beginner-friendly, opinionated, and updated for modern stacks.
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
                <Rocket className="h-3.5 w-3.5 text-violet-500" />
                Use alongside your courses & projects.
              </div>
            </div>
          </div>

          <div className="space-y-3 md:text-right">
            <p className="text-xs text-muted-foreground md:text-sm">
              Unsure where to start?
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              <Link href="/courses">
                Start with the Foundations track
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters (like roadmap.sh category tabs) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  "border-border/70 bg-background/80 text-muted-foreground hover:border-indigo-500/70 hover:text-foreground",
                  isActive &&
                    "border-indigo-500/80 bg-indigo-500/10 text-indigo-500 dark:text-indigo-300"
                )}
              >
                {cat.label}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600" />
                )}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          {filteredRoadmaps.length} roadmap
          {filteredRoadmaps.length === 1 ? "" : "s"} · More coming soon
        </p>
      </div>

      {/* Roadmap grid (roadmap.sh style cards) */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRoadmaps.map((item) => {
          const isComingSoon = item.isComingSoon;
          const isNew = item.isNew;

          return (
            <article
              key={item.id}
              className={cn(
                "group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur transition",
                "hover:border-indigo-500/80 hover:shadow-md"
              )}
            >
              {/* top accent line */}
              <div className="absolute inset-x-4 top-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" />

              <div className="space-y-3 pt-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h2 className="text-sm font-semibold tracking-tight md:text-base">
                      {item.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 text-right">
                    <span className="rounded-full bg-muted/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {item.level}
                    </span>
                    {isNew && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-500 dark:text-emerald-300">
                        <Flame className="h-3 w-3" />
                        New
                      </span>
                    )}
                    {isComingSoon && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-500 dark:text-amber-300">
                        <Clock className="h-3 w-3" />
                        {item.eta ?? "Coming soon"}
                      </span>
                    )}
                  </div>
                </div>

                {/* badges row */}
                <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded-full border border-border/70 bg-muted/50 px-2 py-0.5">
                    Visual roadmap
                  </span>
                  <span className="rounded-full border border-border/70 bg-muted/50 px-2 py-0.5">
                    Step-by-step
                  </span>
                  {item.category === "frontend" && (
                    <span className="rounded-full border border-indigo-500/40 bg-indigo-500/5 px-2 py-0.5 text-indigo-500 dark:text-indigo-300">
                      Great starting point
                    </span>
                  )}
                </div>
              </div>

              {/* footer / CTA */}
              <div className="mt-4 flex items-center justify-between gap-3">
                {isComingSoon ? (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="cursor-not-allowed border-dashed border-border/80 bg-background/70 text-[11px] font-medium text-muted-foreground"
                  >
                    Roadmap coming soon
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-indigo-500 to-violet-600 text-xs font-semibold text-white shadow-md transition hover:brightness-110"
                  >
                    <Link href={item.slug}>
                      View roadmap
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                )}

                <span className="text-[11px] text-muted-foreground">
                  Follow it with Stack From Scratch courses.
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
