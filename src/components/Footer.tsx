export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#060b14] font-['DM_Sans',sans-serif]">
      <div className="max-w-[1140px] mx-auto px-7 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} StackFromScratch. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <a
            href="#"
            className="text-slate-500 hover:text-slate-200 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-slate-200 transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-slate-200 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
