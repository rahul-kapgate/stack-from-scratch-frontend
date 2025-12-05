// src/app/roadmap/frontend/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRoadmapBySlug } from "@/lib/roadmaps";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";

export default async function FrontendRoadmapPage() {
  const roadmap = await getRoadmapBySlug("frontend");
  if (!roadmap) {
    notFound();
  }

  // Define ID groups for the three stages
  const fundamentalsIDs = [
    "internet",
    "html",
    "css",
    "javascript",
    "version-control",
    "vcs-hosting",
    "package-managers",
    "frameworks",
  ];
  const toolsIDs = [
    "tailwind-css",
    "build-tools",
    "linting",
    "testing",
    "auth-security",
    "type-checkers",
    "ssr-spa",
    "graphql",
    "ssg",
    "pwas",
    "browser-apis",
  ];
  const advancedIDs = ["web-components", "desktop-mobile", "next-tracks"];

  const fundamentals = roadmap.sections.filter((s) =>
    fundamentalsIDs.includes(s.id)
  );
  const tools = roadmap.sections.filter((s) =>
    toolsIDs.includes(s.id)
  );
  const advanced = roadmap.sections.filter((s) =>
    advancedIDs.includes(s.id)
  );

  const Stage: React.FC<{ title: string; sections: typeof roadmap.sections }> = ({
    title,
    sections,
  }) => (
    <div className="space-y-4">
      <h2 className="text-lg font-bold tracking-tight sm:text-xl">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <article
            key={section.id}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-background/90 p-4 text-xs shadow-sm backdrop-blur transition",
              "hover:border-indigo-500/70 hover:shadow-md",
              section.optional
                ? "border-border/70"
                : "border-indigo-500/60 bg-indigo-500/3"
            )}
          >
            {/* Accent line */}
            <div
              className={cn(
                "absolute inset-x-3 top-0 h-[2px] rounded-full",
                section.optional
                  ? "bg-muted/70"
                  : "bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500"
              )}
            />

            <div className="pt-2 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[13px] font-semibold leading-snug">
                  {section.title}
                </h3>
                {section.level && (
                  <span className="rounded-full bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {section.level}
                  </span>
                )}
              </div>
              {section.description && (
                <p className="text-[11px] text-muted-foreground">
                  {section.description}
                </p>
              )}
              <ul className="mt-1 space-y-1">
                {section.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
                  >
                    <span className="mt-[3px] flex h-3 w-3 items-center justify-center rounded-full bg-muted/80">
                      <Zap className="h-[9px] w-[9px] text-indigo-400" />
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
              {section.optional && (
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-muted/70 px-2 py-0.5 text-[10px] text-muted-foreground">
                  Optional
                  <Sparkles className="h-3 w-3" />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <section className="space-y-8 py-10">
      {/* Back link and header */}
      <button
        type="button"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <Link href="/roadmap">Back to all roadmaps</Link>
      </button>

      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-background via-background/95 to-background/90 px-6 py-8 shadow-sm sm:px-8 md:px-10 md:py-10">
        <div className="pointer-events-none absolute -left-24 -top-24 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4 md:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600" />
              <span className="font-medium">{roadmap.heroBadge}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
                  {roadmap.title}
                </span>
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                {roadmap.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground md:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
                <Layers className="h-3.5 w-3.5 text-indigo-500" />
                Follow stages in order, or skip what you know.
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                Grey cards are optional/advanced topics.
              </div>
            </div>
          </div>

          <div className="space-y-3 md:text-right">
            <p className="text-xs text-muted-foreground md:text-sm">
              Role focus:
              <span className="ml-1 font-semibold text-foreground">
                {roadmap.roleLabel}
              </span>
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              <Link href="/courses/html-css">
                Start with HTML &amp; CSS
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stage sections */}
      <Stage title="1. Core Fundamentals" sections={fundamentals} />
      <Stage title="2. Tools & Frameworks" sections={tools} />
      <Stage title="3. Advanced & Beyond" sections={advanced} />
    </section>
  );
}
