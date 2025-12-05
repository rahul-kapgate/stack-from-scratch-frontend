import * as React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-gradient-to-t from-background via-background/95 to-background/90">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        {/* Top section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm space-y-3">
            <span className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-500/80 via-sky-500/80 to-emerald-400/80 px-3 py-1 text-sm font-semibold text-slate-50 shadow-sm">
              StackSprint
            </span>
            <p className="text-sm text-muted-foreground">
              StackSprint — Learn full-stack development from scratch. Curated
              tracks, hands-on projects, and a roadmap from zero to ship-ready.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 gap-6 text-sm sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Learn
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/tracks"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    Tracks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tracks/html-css"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    HTML &amp; CSS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tracks/javascript"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    JavaScript
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tracks/react"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    React
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tracks/backend"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    Backend
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Platform
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmap"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Resources
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/resources/git"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    Git &amp; GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-border/60 pt-6">
          <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
            {/* Socials */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wide">
                Follow us
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href="#"
                  aria-label="StackSprint on GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-violet-500/80 hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="StackSprint on X (Twitter)"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-sky-500/80 hover:text-foreground"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="StackSprint on LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-emerald-500/80 hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-xs md:text-sm">
              © {year} <span className="font-medium text-foreground">StackSprint</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
