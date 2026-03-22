export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        
        <p>© {new Date().getFullYear()} InterviewPrep. All rights reserved.</p>

        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-blue-500">Privacy</a>
          <a href="#" className="hover:text-blue-500">Terms</a>
          <a href="#" className="hover:text-blue-500">Contact</a>
        </div>

      </div>
    </footer>
  )
}