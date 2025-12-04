import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        Stack From Scratch
      </h1>

      <p className="max-w-xl text-sm text-muted-foreground">
        A simple Next.js + TypeScript + Tailwind + shadcn/ui setup to learn
        full-stack development step by step.
      </p>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/projects">View Projects</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/docs">Read Docs</Link>
        </Button>
      </div>
    </section>
  );
}
