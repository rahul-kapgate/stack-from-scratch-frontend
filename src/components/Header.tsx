import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        
        {/* Logo */}
        <h1 className="text-xl font-bold"><Link to="/" className="hover:text-blue-500">Stack From Scratch</Link></h1>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-500">About Us</Link>
          <Link to="/" className="hover:text-blue-500">Contact</Link>
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
        </nav>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link to="/auth">
            <Button>SignIn</Button>
          </Link>
        </div>

      </div>
    </header>
  )
}