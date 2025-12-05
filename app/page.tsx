import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-background via-background/95 to-background/90 px-6 py-10 shadow-sm sm:px-8 md:px-10 md:py-14">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative max-w-2xl space-y-6">
        {/* Tag / badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600" />
          <span className="font-medium">From zero to full-stack</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
            Stack From Scratch
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-sm text-muted-foreground md:text-base">
          A modern Next.js, TypeScript, Tailwind, and shadcn/ui playground to
          learn full-stack development step by step — HTML, CSS, JS, React,
          Node, Express, Git, and more.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            asChild
            className="bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
          >
            <Link href="/projects">
              Start with projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="border-border/70 bg-background/80 text-sm font-medium text-foreground shadow-sm transition hover:border-indigo-500/80 hover:bg-background/90"
          >
            <Link href="/docs">Browse docs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
