"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginResponse } from "@/lib/authApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type LoginDialogProps = {
  onLoggedIn?: (data: LoginResponse) => void;
};

export function LoginDialog({ onLoggedIn }: LoginDialogProps) {
  const { setAuth, isAuthenticated, isHydrating, user } = useAuth();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("rahulkapgate999@gmail.com");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      setAuth(data); // updates context + localStorage
      onLoggedIn?.(data);
      setOpen(false);
      setPassword("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  // While hydrating from localStorage, avoid flicker
  if (isHydrating) return null;

  // If already authenticated, you can either hide this
  // OR render something else. For now, we'll render nothing.
  if (isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button in header/navbar (small, subtle, matches theme) */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-border/70 bg-background/80 text-xs font-medium text-foreground shadow-sm hover:border-indigo-500/70 hover:bg-background/90 sm:text-sm"
        >
          <LogIn className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Login
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[90vw] max-w-md rounded-2xl border border-border/60 
          bg-gradient-to-b from-background via-background/95 to-background/90 
          shadow-xl backdrop-blur
        "
      >
        {/* subtle background accents like hero */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-24 w-24 rounded-full bg-violet-600/10 blur-3xl" />

        <DialogHeader className="relative space-y-1">
          <DialogTitle className="text-lg font-semibold sm:text-xl">
            Sign in to your account
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground sm:text-sm">
            Use the credentials you registered with to continue learning
            full-stack from scratch.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="relative mt-3 space-y-4 sm:mt-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              className="h-9 text-sm sm:h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs sm:text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              className="h-9 text-sm sm:h-10"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 sm:text-sm">
              {(error as Error)?.message ?? "Something went wrong"}
            </p>
          )}

          <DialogFooter className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-3">
            <Button
              type="submit"
              disabled={isPending}
              className="
                w-full sm:w-auto
                bg-gradient-to-r from-indigo-500 to-violet-600 
                text-sm font-semibold text-white shadow-md 
                hover:brightness-110
              "
            >
              {isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>

            <p className="text-[11px] text-muted-foreground sm:text-xs">
              Tip: You can later swap this to OTP / social logins without
              changing this layout.
            </p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
