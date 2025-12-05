"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ThemeToggle: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Skeleton while hydrating
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center",
          className
        )}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 via-sky-500/10 to-emerald-400/10 blur-sm" />
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full border border-border/70 bg-background/90 shadow-sm"
          aria-label="Toggle theme"
          {...props}
        />
      </div>
    );
  }

  const isDark = theme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      {/* Glow / halo behind the button */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/15 via-sky-500/15 to-emerald-400/15 blur-sm" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn(
          "relative h-9 w-9 rounded-full border border-border/70 bg-background/95 text-foreground shadow-sm",
          "transition-all duration-200 ease-out",
          "hover:scale-105 hover:bg-accent/80 hover:border-border",
        )}
        aria-label="Toggle theme"
        {...props}
      >
        {/* Sun icon */}
        <Sun
          className={cn(
            "h-4 w-4 rotate-0 scale-100 text-amber-500 transition-all duration-200",
            isDark && "rotate-90 scale-0 opacity-0"
          )}
        />
        {/* Moon icon */}
        <Moon
          className={cn(
            "absolute h-4 w-4 rotate-90 scale-0 text-sky-400 opacity-0 transition-all duration-200",
            isDark && "rotate-0 scale-100 opacity-100"
          )}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};
