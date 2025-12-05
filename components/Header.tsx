"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tracks", href: "/tracks" },
  { label: "Courses", href: "/courses" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "About", href: "/about" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-gradient-to-b from-background/80 via-background/90 to-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo + Tagline */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={closeMenu}
        >
          <div className="rounded-xl bg-gradient-to-r from-violet-500/80 via-sky-500/80 to-emerald-400/80 px-3 py-1 text-sm font-semibold text-slate-50 shadow-sm">
            StackSprint
          </div>
          <span className="hidden flex-col text-xs text-muted-foreground sm:flex">
            <span className="font-medium text-foreground/80">
              Learn full-stack from scratch
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden flex-1 items-center justify-center md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-1 transition-all",
                    "text-muted-foreground hover:text-foreground",
                    "hover:bg-accent/60",
                    isActive(item.href) &&
                    "text-foreground bg-accent/80 shadow-sm"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Button
            asChild
            variant="outline"
            className="border-border/70 bg-background/60 text-sm font-medium shadow-sm transition hover:border-violet-500/70 hover:bg-background/80"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-400 text-sm font-semibold text-slate-50 shadow-md transition hover:brightness-110"
          >
            <Link href="/start">Start Learning</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border/70 bg-background/80 p-2 text-foreground shadow-sm transition hover:bg-accent/80 md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "border-t border-border/60 bg-background/95 px-4 pb-4 pt-2 shadow-sm transition-[max-height,opacity] duration-200 ease-out md:hidden",
          isOpen ? "max-h-[320px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <nav className="space-y-3">
          <ul className="space-y-1 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 transition",
                    "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                    isActive(item.href) &&
                    "bg-accent/80 text-foreground shadow-sm"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            <div className="mb-1 flex justify-end">
              <ThemeToggle />
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full border-border/70 bg-background/80 text-sm font-medium transition hover:border-violet-500/70 hover:bg-background/90"
            >
              <Link href="/login" onClick={closeMenu}>
                Login
              </Link>
            </Button>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-400 text-sm font-semibold text-slate-50 shadow-md transition hover:brightness-110"
            >
              <Link href="/start" onClick={closeMenu}>
                Start Learning
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
