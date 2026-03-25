import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCurrentUser, useLogout } from "@/hooks/Useauth";

export default function Header() {
  const { data: user } = useCurrentUser();
  const { mutate: logout, isPending } = useLogout();

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        {/* <h1 className="text-xl font-bold">
          <Link to="/" className="hover:text-blue-500">Stack From Scratch</Link>
        </h1> */}

        <Link to="/">
          <img
            src="/logo.svg"
            alt="Stack From Scratch"
            className="h-8 w-auto"
          />
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-500">
            About Us
          </Link>
          <Link to="/" className="hover:text-blue-500">
            Contact
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:text-blue-500">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user.name}
              </span>
              <Button
                variant="outline"
                onClick={() => logout()}
                disabled={isPending}
              >
                {isPending ? "Signing out..." : "Sign out"}
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
