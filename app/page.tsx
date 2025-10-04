import FloatingIdCard from "@/components/floating-id-card"
import Terminal from "@/components/terminal/terminal"

export default function HomePage() {
  return (
    <main className="min-h-[100svh] bg-background text-foreground relative overflow-x-hidden">
      <section className="relative container mx-auto px-4 pt-20 pb-8 flex items-center justify-center">
        <FloatingIdCard />
      </section>

      <section className="container mx-auto px-4 pb-12 flex flex-col items-center gap-8">
        <Terminal />

        <div className="w-full max-w-4xl">
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {/* GitHub */}
            <a
              href="https://github.com/tanish-24-git"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-[color:var(--terminal-border,#1f2937)] px-3 py-2 hover:bg-[color:var(--terminal-surface,#0f172a)] transition-colors"
              aria-label="GitHub Profile"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="opacity-90 group-hover:opacity-100"
              >
                <path
                  fill="currentColor"
                  d="M12 .5A12 12 0 0 0 0 12.7c0 5.38 3.44 9.94 8.21 11.55c.6.11.82-.27.82-.58c0-.29-.01-1.05-.02-2.06c-3.34.74-4.04-1.65-4.04-1.65c-.55-1.43-1.35-1.81-1.35-1.81c-1.1-.78.08-.76.08-.76c1.22.09 1.86 1.3 1.86 1.3c1.08 1.9 2.83 1.35 3.52 1.03c.11-.81.42-1.35.76-1.66c-2.67-.31-5.47-1.39-5.47-6.17c0-1.36.46-2.47 1.23-3.34c-.12-.31-.54-1.56.12-3.25c0 0 1.01-.33 3.31 1.27a11.2 11.2 0 0 1 6.02 0c2.3-1.6 3.31-1.27 3.31-1.27c.66 1.69.24 2.94.12 3.25c.77.87 1.23 1.98 1.23 3.34c0 4.8-2.81 5.85-5.49 6.16c.43.38.81 1.12.81 2.27c0 1.64-.02 2.96-.02 3.36c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.7A12 12 0 0 0 12 .5Z"
                />
              </svg>
              <span className="font-mono text-sm">GitHub</span>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/tanish-jagtap-b363ab2ba"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-[color:var(--terminal-border,#1f2937)] px-3 py-2 hover:bg-[color:var(--terminal-surface,#0f172a)] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="opacity-90 group-hover:opacity-100"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9.5 16H7V10h2.5zm-1.25-9.7a1.45 1.45 0 1 1 0-2.9a1.45 1.45 0 0 1 0 2.9M20 19h-2.5v-4.9c0-1.17-.02-2.67-1.63-2.67c-1.64 0-1.89 1.27-1.89 2.58V19H11V10h2.4v1.23h.03c.33-.63 1.15-1.3 2.37-1.3C18.43 9.93 20 11.2 20 14.03z"
                />
              </svg>
              <span className="font-mono text-sm">LinkedIn</span>
            </a>
            {/* LeetCode */}
            <a
              href="https://leetcode.com/problems/letter-tile-possibilities/description"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-[color:var(--terminal-border,#1f2937)] px-3 py-2 hover:bg-[color:var(--terminal-surface,#0f172a)] transition-colors"
              aria-label="LeetCode"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 256 256"
                aria-hidden="true"
                className="opacity-90 group-hover:opacity-100"
              >
                <path
                  fill="currentColor"
                  d="M151.9 39.5a12 12 0 0 1 17 0l47.6 47.6a12 12 0 0 1 0 17l-7.5 7.5a12 12 0 0 1-17 0l-47.6-47.6a12 12 0 0 1 0-17zM52.9 149.6L119 83.5a12 12 0 1 1 17 17l-66.1 66.1l66.1 66.1a12 12 0 0 1-17 17L35.9 183.6a24 24 0 0 1 0-34zM228 168a44 44 0 1 1-88 0a44 44 0 0 1 88 0m-24 0a20 20 0 1 0-40 0a20 20 0 0 0 40 0"
                />
              </svg>
              <span className="font-mono text-sm">LeetCode</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
