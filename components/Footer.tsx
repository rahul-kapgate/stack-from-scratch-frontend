import * as React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-gradient-to-t from-background via-background/95 to-background/90">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Top section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm space-y-3 text-center md:text-left mx-auto md:mx-0">
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
              StackFromScratch
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              StackFromScratch — Learn full-stack development from scratch.
              Curated tracks, hands-on projects, and a roadmap from zero to
              ship-ready.
            </p>
          </div>

          {/* Link columns – centered */}
          <div className="mt-8 flex justify-center">
            <div className="grid gap-6 text-sm text-center sm:grid-cols-2 md:grid-cols-3">
              {/* Learn */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Learn
                </h3>
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      href="/courses/html-css"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      HTML &amp; CSS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses/javascript"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      JavaScript
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses/react"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      React
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses/backend"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      Backend
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses/devops"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      DevOps
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Platform */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Platform
                </h3>
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      href="/about"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/roadmap"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      Roadmap
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Resources
                </h3>
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      href="/resources/git"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      Git &amp; GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      Docs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faqs"
                      className="block text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-border/60 pt-6">
          <div className="flex flex-col items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:text-left">
            {/* Socials */}
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <span className="text-xs uppercase tracking-wide text-muted-foreground sm:inline">
                Follow us
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href="#"
                  aria-label="StackFromScratch on GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-violet-500/80 hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="StackFromScratch on X (Twitter)"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-sky-500/80 hover:text-foreground"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="StackFromScratch on LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-emerald-500/80 hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-center md:text-right">
              © {year}{" "}
              <span className="font-medium text-foreground">
                StackFromScratch
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
