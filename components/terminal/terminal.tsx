"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  ABOUT,
  CONTACT,
  DOWNLOAD_HINT,
  EDUCATION,
  HELP,
  PROJECTS,
  PROJECT_DATAGEN,
  PROJECT_NOCODE,
  PROJECT_NOVA,
  PROMPT,
  RESUME_SUMMARY,
  THEMES_INFO,
  WELCOME,
  COMMAND_NOT_FOUND,
  EXPERIENCE,
} from "./content"

type ThemeName = "dark" | "light" | "blue" | "green"

type HistoryItem = { kind: "cmd"; text: string } | { kind: "out"; text: string } | { kind: "sys"; text: string }

const themePalette: Record<
  ThemeName,
  {
    bg: string
    fg: string
    surface: string
    border: string
    accent: string
    prompt: string
  }
> = {
  dark: {
    bg: "#0b0f19",
    fg: "#e6edf3",
    surface: "#0f172a",
    border: "#1f2937",
    accent: "#22d3ee",
    prompt: "#7dd3fc",
  },
  light: {
    bg: "#f6f8fb",
    fg: "#0b1220",
    surface: "#ffffff",
    border: "#e5e7eb",
    accent: "#2563eb",
    prompt: "#0ea5e9",
  },
  blue: {
    bg: "#081321",
    fg: "#dbeafe",
    surface: "#0b2545",
    border: "#1d4ed8",
    accent: "#60a5fa",
    prompt: "#38bdf8",
  },
  green: {
    bg: "#0a120a",
    fg: "#dcfce7",
    surface: "#0f2912",
    border: "#14532d",
    accent: "#22c55e",
    prompt: "#86efac",
  },
}

export default function Terminal() {
  const [theme, setTheme] = useState<ThemeName>("dark")
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([
    { kind: "out", text: WELCOME },
    { kind: "out", text: "Type 'cd help' to see available commands." },
  ])
  const [active, setActive] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const colors = useMemo(() => themePalette[theme], [theme])

  function push(item: HistoryItem) {
    setHistory((h) => [...h, item])
  }

  function handleDownloadResume() {
    // Try to trigger a download from a known path
    const url = "/resume/tanish-resume.pdf"
    const a = document.createElement("a")
    a.href = url
    a.download = "Tanish_Jagtap_Resume.pdf"
    document.body.appendChild(a)
    a.click()
    a.remove()
    push({ kind: "sys", text: DOWNLOAD_HINT })
  }

  function handleCommand(raw: string) {
    const cmd = raw.trim()
    if (!cmd) return

    push({ kind: "cmd", text: `${PROMPT} ${cmd}` })

    // Special utilities
    if (cmd === "clear") {
      setHistory([])
      return
    }
    if (cmd === "exit") {
      push({ kind: "out", text: "Exiting portfolio. Goodbye! 👋" })
      setActive(false)
      return
    }
    if (cmd === "cd help") {
      push({ kind: "out", text: HELP })
      return
    }

    // Themes
    if (cmd === "cd themes") {
      push({ kind: "out", text: THEMES_INFO })
      return
    }
    if (cmd.startsWith("cd themes ")) {
      const name = cmd.split(" ")[2]?.toLowerCase() as ThemeName | undefined
      if (name && ["dark", "light", "blue", "green"].includes(name)) {
        setTheme(name)
        push({ kind: "sys", text: `Theme changed to: ${name}` })
      } else {
        push({ kind: "sys", text: "Unknown theme. Available: light, dark, blue, green" })
      }
      return
    }

    // Resume
    if (cmd === "cd resume") {
      push({ kind: "out", text: RESUME_SUMMARY })
      return
    }
    if (cmd === "cd resume -d download") {
      handleDownloadResume()
      return
    }

    // Welcome
    if (cmd === "cd welcome") {
      push({ kind: "out", text: WELCOME })
      return
    }

    // About
    if (cmd === "cd about") {
      push({ kind: "out", text: ABOUT })
      return
    }

    // Contact
    if (cmd === "cd contact") {
      push({ kind: "out", text: CONTACT })
      return
    }

    // Experience / Education
    if (cmd === "cd experience") {
      push({ kind: "out", text: EXPERIENCE })
      return
    }
    if (cmd === "cd experience -e edu") {
      push({ kind: "out", text: EDUCATION })
      return
    }

    // Projects
    if (cmd === "cd project") {
      push({ kind: "out", text: PROJECTS })
      return
    }
    if (cmd === "cd project -nocode") {
      push({ kind: "out", text: PROJECT_NOCODE })
      return
    }
    if (cmd === "cd project -datagen") {
      push({ kind: "out", text: PROJECT_DATAGEN })
      return
    }
    if (cmd === "cd project -nova") {
      push({ kind: "out", text: PROJECT_NOVA })
      return
    }

    // Fun
    if (cmd === "sudo hire_tanish") {
      push({ kind: "out", text: "✅ Access granted: Hiring Tanish... Welcome aboard! 🚀" })
      return
    }

    // Fallback
    push({ kind: "sys", text: COMMAND_NOT_FOUND(cmd) })
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!active) return
    const value = input
    setInput("")
    handleCommand(value)
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g
  function renderWithLinks(text: string) {
    const parts = text.split(urlRegex)
    return parts.map((part, idx) => {
      // odd indices are URLs when split by capturing group
      if (idx % 2 === 1) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[color:var(--terminal-accent)] hover:opacity-90"
          >
            {part}
          </a>
        )
      }
      return <span key={idx}>{part}</span>
    })
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto"
      style={
        {
          "--terminal-bg": colors.bg,
          "--terminal-fg": colors.fg,
          "--terminal-surface": colors.surface,
          "--terminal-border": colors.border,
          "--terminal-accent": colors.accent,
          "--terminal-prompt": colors.prompt,
        } as React.CSSProperties
      }
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "var(--terminal-bg)",
          color: "var(--terminal-fg)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px var(--terminal-border)",
          transform: "translateZ(0)",
        }}
      >
        {/* Mac-like top bar */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.1))",
            borderBottom: "1px solid var(--terminal-border)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="inline-block h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="inline-block h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-xs font-mono opacity-70">tanish@portfolio — bash</div>
          <div className="w-6" />
        </div>

        {/* Screen */}
        <div
          className="p-4 md:p-6 font-mono text-sm leading-6"
          style={{
            background:
              "radial-gradient(1200px 500px at 10% 0%, rgba(255,255,255,0.04), transparent), var(--terminal-bg)",
          }}
        >
          {/* Content/history */}
          <div className="whitespace-pre-wrap">
            {history.map((h, i) => (
              <div
                key={i}
                className={
                  h.kind === "cmd"
                    ? "text-[color:var(--terminal-prompt)]"
                    : h.kind === "sys"
                      ? "text-[color:var(--terminal-accent)]"
                      : ""
                }
              >
                {renderWithLinks(h.text)}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Prompt */}
          <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
            <span className="text-[color:var(--terminal-prompt)] select-none">{PROMPT}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!active}
              className="flex-1 bg-transparent outline-none placeholder:text-[color:var(--terminal-border)]"
              placeholder={active ? "type a command… (try: cd help)" : "session ended"}
              aria-label="Terminal input"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
