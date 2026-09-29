export function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-2.5 border-t border-line py-6 font-mono text-[0.6875rem] text-muted sm:flex-row sm:items-center">
      <span>© {new Date().getFullYear()} Sentzunhat Corp. · Winnipeg, Manitoba</span>
      <a href="#founder">Meet the founder ↗</a>
    </footer>
  )
}
