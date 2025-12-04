import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-lg font-semibold">
          Stack From Scratch
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
