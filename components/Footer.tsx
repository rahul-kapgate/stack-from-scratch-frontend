export function Footer() {
    const year = new Date().getFullYear();
  
    return (
      <footer className="border-t bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-muted-foreground">
          <p>© {year} Stack From Scratch</p>
          <p className="flex gap-3">
            <a
              href="https://github.com/rahul-kapgate"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="mailto:rahulkapgate03@gmail.com"
              className="hover:underline"
            >
              Contact
            </a>
          </p>
        </div>
      </footer>
    );
  }
  