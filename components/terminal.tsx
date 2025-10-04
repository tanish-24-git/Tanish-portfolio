"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ThemeName, ThemePresets } from "@/lib/themes"
import { ExternalLink, Trash2, LogOut, LifeBuoy } from "lucide-react"

// Prompt constant
const PROMPT = "visitor@terminal.tanish.portfolio:~$"

// Helpers: segment typing (letters -> words -> lines)
async function typeInto(lines: string[], pushChar: (c: string) => void, speed = 12) {
  for (const line of lines) {
    // Letters
    for (let i = 0; i < line.length; i++) {
      pushChar(line[i])
      // slightly variable speed
      await new Promise((r) => setTimeout(r, speed + Math.random() * 12))
    }
    // Newline
    pushChar("\n")
    await new Promise((r) => setTimeout(r, 90))
  }
}

type OutputBlock = {
  id: string
  content: string // plain text + basic ascii
}

type Props = {
  theme: ThemeName
  onThemeChange: (t: ThemeName) => void
  themePresets: ThemePresets
}

const SUGGESTIONS = ["cd welcome", "cd about", "cd project", "cd experience", "cd contact", "cd themes", "cd help"]

export function Terminal({ theme, onThemeChange, themePresets }: Props) {
  const [history, setHistory] = useState<OutputBlock[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [input, setInput] = useState("")
  const [locked, setLocked] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [history, currentLine])

  // Boot message
  useEffect(() => {
    const boot = async () => {
      setLocked(true)
      await printLines([
        "==========================================",
        "👋 Welcome to my Terminal Portfolio!",
        "==========================================",
        'Type "cd help" to see available commands.',
      ])
      setLocked(false)
    }
    boot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function printLines(lines: string[]) {
    let buffer = ""
    const id = crypto.randomUUID()
    setHistory((h) => [...h, { id, content: "" }])
    await typeInto(lines, (c) => {
      buffer += c
      setHistory((h) => h.map((b) => (b.id === id ? { ...b, content: buffer } : b)))
    })
  }

  function clearTerminal() {
    setHistory([])
    setCurrentLine("")
  }

  // Command router
  const handlers = useMemo(() => {
    const link = (label: string, href: string) => `${label} : ${href}`
    const HBAR = "------------------------------------------"

    return {
      help: async () => {
        await printLines([
          "==========================================",
          "📝 Available Commands",
          "==========================================",
          "👋 Welcome",
          "cd welcome               → Display welcome message & GitHub repo",
          "",
          "👤 About Me",
          "cd about                 → Learn about me, my background, and tech skills",
          "",
          "💼 Projects",
          "cd project               → See all my major projects",
          "cd project -nocode       → View No-Code ML Platform details & link",
          "cd project -datagen      → View Data-Gen Platform details & links",
          "cd project -nova         → View Nova Desktop Automation project & link",
          "",
          "🎓 Experience & Education",
          "cd experience            → See hackathons & club roles",
          "cd experience -e edu     → View education details",
          "",
          "📄 Resume",
          "cd resume                → Quick resume summary",
          "cd resume -d download    → Download full resume as PDF",
          "",
          "📞 Contact",
          "cd contact               → My email, phone, GitHub, LinkedIn",
          "",
          "🎨 Themes",
          "cd themes <theme-name>   → Change terminal color theme (light, dark, blue, green)",
          "",
          "🛠 Utility",
          "cd help                  → Display all commands",
          "clear                    → Clear the terminal screen",
          "exit                     → Exit the portfolio",
        ])
      },

      themesInfo: async () => {
        await printLines([
          "==========================================",
          "🎨 Terminal Themes",
          "==========================================",
          "Available themes:",
          "  ▸ light",
          "  ▸ dark",
          "  ▸ blue",
          "  ▸ green",
          "Usage:",
          "  cd themes <theme-name>   → Apply the selected theme",
          "...",
          "Example:",
          "  cd themes dark           → Switches the portfolio to dark theme",
        ])
      },

      welcome: async () => {
        await printLines([
          "==========================================",
          "👋 Welcome to my Terminal Portfolio!",
          "==========================================",
          "Hi! I’m Tanish Jagtap, a B.Tech AI & DS student passionate about AI, ML, and full-stack development.",
          "💻 Explore my projects, experience, resume, and more using terminal commands.",
          "🔗 GitHub Repository:",
          "https://github.com/tanish-24-git",
          "clear                    → Clear the terminal screen",
          "exit                     → Exit the portfolio",
        ])
      },

      about: async () => {
        await printLines([
          "==========================================",
          "👤 About Me",
          "==========================================",
          "Name       : Tanish Jagtap",
          "Age        : 20",
          "DOB        : 24 May 2005",
          "Location   : Pune, India",
          "Education  :",
          "  ▸ SSC (Rosary School, Viman Nagar) - 2021",
          "  ▸ HSC (MIT Junior College, Alandi) - 2023",
          "  ▸ B.Tech AI & DS (AISSMS IOIT, 2023–2027)",
          "------------------------------------------",
          "📌 Summary",
          "------------------------------------------",
          "🔹 Focus Areas",
          "  - Machine Learning & Deep Learning",
          "    (Supervised, Unsupervised, Reinforcement Learning)",
          "  - Large Language Models (LLMs): fine-tuning, RAGs,",
          "    prompt engineering, domain adaptation",
          "  - Generative AI: text generation, synthetic data,",
          "    multimodal systems",
          "  - LangChain & Graph ML for reasoning & knowledge integration",
          "  - GPU Computing & Parallelization for ML acceleration",
          "  - Compiler Design concepts in AI optimization",
          "  - MLOps & Deployment: CI/CD, containerization, cloud scaling",
          "🌱 Always combining theory, engineering & research to build",
          "   intelligent, scalable AI systems.",
          "------------------------------------------",
          "🛠 Tech Stack",
          "------------------------------------------",
          "Languages        : C++, Python, Dart, JavaScript, TypeScript",
          "Frameworks       : Flutter, React",
          "Infrastructure   : Docker, AWS, Git",
          "Databases        : MySQL, PostgreSQL, SQLite, MongoDB",
          "ML / AI          : Scikit-learn, TensorFlow, PyTorch, OpenCV,",
          "                   LangChain, Graph ML",
        ])
      },

      project: async () => {
        await printLines([
          "==========================================",
          "📂 Projects",
          "==========================================",
          "⿡ No-Code ML Platform",
          "  ▸ Drag-and-drop platform to train classical ML algorithms",
          "    (SVM, Linear Regression, Decision Trees, etc.)",
          "  ▸ Features: preprocessing, model evaluation, testing, AI insights",
          "  ▸ Under development:",
          "       - Fine-tuning with drag-and-drop",
          "       - Deploying trained models seamlessly",
          "  ▸ Links: use 'cd project -nocode' for details",
          "------------------------------------------",
          "⿢ Data-Gen Platform",
          "  ▸ A platform to generate synthetic data via prompts or",
          "    uploading datasets.",
          "  ▸ Output: CSV / JSON formats",
          "  ▸ Features:",
          "       - Prompt-based dataset generation",
          "       - Synthetic data expansion",
          "       - Frontend + Backend + Deployed version",
          "  ▸ Links: use 'cd project -datagen' for details",
          "------------------------------------------",
          "⿣ Nova (Desktop Automation Agent)",
          "  ▸ Agentic framework for full desktop automation",
          "  ▸ Performs tasks on just a prompt",
          "  ▸ Converts code → PPT → applies actions directly",
          "  ▸ Vision: Compete with Warp AI in agentic workflows",
          "  ▸ Status: Under DevOps development",
          "  ▸ Links: use 'cd project -nova' for details",
        ])
      },

      "project -nocode": async () => {
        await printLines(["GitHub Repo : https://github.com/tanish-24-git/NoCode.git"])
      },

      "project -datagen": async () => {
        await printLines([
          "Frontend Repo : https://github.com/tanish-24-git/Data-gen-frontend",
          "Backend Repo  : https://github.com/tanish-24-git/Data-gen-backend.git",
          "Live Demo     : https://data-gen-frontend.vercel.app",
        ])
      },

      "project -nova": async () => {
        await printLines(["GitHub Repo : https://github.com/ParthDhengle/crew-ai-trial.git"])
      },

      experience: async () => {
        await printLines([
          "==========================================",
          "💼 Experience",
          "==========================================",
          "⚠ No formal work experience yet.",
          "Currently exploring internships and job opportunities.",
          "🚀 Hackathons",
          " ▸ TechXcelerate @ BITS Hyderabad",
          "       - Secured 8th place",
          "       - Worked on AI/ML-based project",
          " ▸ Startathon @ PICT Pune",
          "       - Secured 4th place",
          "       - Project: File Sensitivity Prediction System",
          "         (classified government/company files using ML)",
          "👥 College Clubs",
          " ▸ AISA (AI & DS Student Association)",
          "       - Role: Social Executive",
          "       - Organizing events, managing student engagement",
          " ▸ CyberShield Club",
          "       - Role: Chief Documentation Head",
          "       - Leading documentation, knowledge sharing & reports",
          "------------------------------------------",
          "Tip: Use cd experience -e edu to view Education details.",
        ])
      },

      "experience -e edu": async () => {
        await printLines([
          "==========================================",
          "🎓 Education",
          "==========================================",
          "📍 SSC (Rosary School, Viman Nagar)",
          "     ▸ Completed 1st–10th",
          "     ▸ Passed out: 2021",
          "📍 HSC (MIT Junior College, Alandi)",
          "     ▸ 11th–12th",
          "     ▸ Passed out: 2023",
          "📍 B.Tech in AI & Data Science",
          "     ▸ AISSMS Institute of Information Technology, Pune",
          "     ▸ Batch: 2023 – 2027",
        ])
      },

      resume: async () => {
        await printLines([
          "==========================================",
          "📄 Resume (Quick Summary)",
          "==========================================",
          "Skills",
          "  Languages: C/C++, Python, TypeScript, SQL, Dart Basics.",
          "  Technologies & Tools: AWS (EC2, Lambda), Docker, MongoDB, Firebase,",
          "  Version Control, PyTorch, TensorFlow, YOLO, LangChain, LangGraph.",
          "",
          "HACKATHONS",
          "  TechXcelerate – BITS Hyderabad (2025)",
          "  • Secured 8th place among 50+ teams.",
          "  • Built ML-based supply chain forecasting with serverless DB.",
          "",
          "Education",
          "  B.Tech in AI & DS (AISSMS IOIT, 2023–2027)",
          "",
          "Projects",
          "  1) Menstrual Tracker (LLM chatbot, RF/SVM)",
          "  2) No‑Code ML Platform (Drag‑and‑drop classical ML)",
          "  3) Synthetic Data Generation (LangChain + GenAI)",
          "",
          'Use "cd resume -d download" to download the full PDF.',
        ])
      },

      "resume -d download": async () => {
        const resumePath = "/resume.pdf"
        const absoluteUrl =
          "https://www.linkedin.com/in/tanish-jagtap/overlay/1755077522437/single-media-viewer/?profileId=ACoAAEyWvpoBmY3AtQCjQGoBUVv6paSNoqFsdvU" +
          resumePath

        await printLines([
          "Preparing download:",
          absoluteUrl,
          "If the download does not start, the link above opens in a new tab.",
        ])

        try {
          // Try same-origin file first for a reliable Blob download
          const res = await fetch(resumePath, { cache: "no-store" })
          if (!res.ok) {
            await printLines([
              "Resume not found at /public/resume.pdf.",
              "Fix: ensure the file name is exactly 'resume.pdf' in the public/ folder, then reload and retry.",
            ])
            // Fallback: open the LinkedIn media viewer link
            window.open(absoluteUrl, "_blank")
            return
          }

          const blob = await res.blob()
          const blobUrl = URL.createObjectURL(blob)

          const a = document.createElement("a")
          a.href = blobUrl
          a.download = "Tanish_Jagtap_Resume.pdf"
          document.body.appendChild(a)
          a.click()
          a.remove()
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
        } catch {
          // Final fallback if programmatic download is blocked
          window.open(absoluteUrl, "_blank")
        }
      },

      contact: async () => {
        await printLines([
          "==========================================",
          "📞 Contact Information",
          "==========================================",
          "📧 Email       : tanishjagtap91@gmail.com",
          "📱 Phone       : +91 8055876779",
          "🌐 Links",
          "  ▸ GitHub     : https://github.com/tanish-24-git",
          "  ▸ LinkedIn   : https://www.linkedin.com/in/tanish-jagtap-b363ab2ba",
          "  ▸ LeetCode   : https://leetcode.com/problems/letter-tile-possibilities/description",
          "------------------------------------------",
          "💡 Tip: Type 'sudo hire_tanish' to instantly add me to your team 😉",
        ])
      },

      sudoHire: async () => {
        await printLines(["Granting sudo privileges...", "Adding Tanish to your team… ✅", "Opening mail draft…"])
        window.location.href =
          "mailto:tanishjagtap91@gmail.com?subject=Opportunity%20for%20Tanish%20Jagtap&body=Hi%20Tanish%2C%20we%27d%20love%20to%20connect%20about%20a%20role."
      },
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  async function runCommand(cmdRaw: string) {
    const cmd = cmdRaw.trim()
    if (!cmd) return
    setLocked(true)

    // echo command
    await printLines([`${PROMPT} ${cmd}`])

    // routing
    if (cmd === "clear") {
      clearTerminal()
      setLocked(false)
      return
    }
    if (cmd === "exit") {
      await printLines(["Exiting portfolio… bye! 👋"])
      setLocked(true)
      return
    }
    if (cmd === "cd help") {
      await handlers.help()
      setLocked(false)
      return
    }
    if (cmd === "cd welcome") {
      await handlers.welcome()
      setLocked(false)
      return
    }
    if (cmd === "cd about") {
      await handlers.about()
      setLocked(false)
      return
    }
    if (cmd === "cd project") {
      await handlers.project()
      setLocked(false)
      return
    }
    if (cmd === "cd project -nocode") {
      await handlers["project -nocode"]()
      setLocked(false)
      return
    }
    if (cmd === "cd project -datagen") {
      await handlers["project -datagen"]()
      setLocked(false)
      return
    }
    if (cmd === "cd project -nova") {
      await handlers["project -nova"]()
      setLocked(false)
      return
    }
    if (cmd === "cd experience") {
      await handlers.experience()
      setLocked(false)
      return
    }
    if (cmd === "cd experience -e edu") {
      await handlers["experience -e edu"]()
      setLocked(false)
      return
    }
    if (cmd === "cd resume") {
      await handlers.resume()
      setLocked(false)
      return
    }
    if (cmd === "cd resume -d download") {
      await handlers["resume -d download"]()
      setLocked(false)
      return
    }
    if (cmd === "cd contact") {
      await handlers.contact()
      setLocked(false)
      return
    }
    if (cmd === "cd themes") {
      await handlers.themesInfo()
      setLocked(false)
      return
    }
    if (cmd.startsWith("cd themes ")) {
      const t = cmd.split(" ")[2] as ThemeName
      const allowed = ["light", "dark", "blue", "green"] as const
      if (allowed.includes(t)) {
        onThemeChange(t)
        await printLines([`Theme switched to: ${t}`])
      } else {
        await printLines([`Unknown theme: ${t}`, "Try: light, dark, blue, green"])
      }
      setLocked(false)
      return
    }
    if (cmd === "sudo hire_tanish") {
      await handlers.sudoHire()
      setLocked(false)
      return
    }

    // convenience aliases
    if (cmd === "help") {
      await handlers.help()
      setLocked(false)
      return
    }

    await printLines([`command not found: ${cmd}`, `Type "cd help" for the command list.`])
    setLocked(false)
  }

  // handle submit
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = input
    setInput("")
    runCommand(value)
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      {/* mac terminal top bar */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" aria-hidden />
          <span className="ml-3 text-xs text-muted-foreground">tanish@portfolio — bash</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Theme: <span className="capitalize">{theme}</span>
        </div>
      </div>

      {/* terminal body */}
      <div className="relative">
        {/* subtle scan-line */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background:repeating-linear-gradient(180deg,transparent,transparent_2px,currentColor_3px,currentColor_3px)]" />
        <div className="relative h-[520px] overflow-auto bg-background/70 p-4 font-mono text-sm leading-6">
          {history.map((b) => (
            <pre key={b.id} className="whitespace-pre-wrap text-pretty">
              {makeClickable(b.content)}
            </pre>
          ))}

          {/* live typing line */}
          {currentLine && <pre className="whitespace-pre-wrap text-pretty">{currentLine}</pre>}

          {/* prompt + input */}
          {!locked && (
            <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
              <span className="shrink-0 text-primary">{PROMPT}</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Type a command (e.g., cd help)"
                aria-label="Terminal input"
                autoFocus
              />
            </form>
          )}

          {/* when locked (e.g., exit), show disabled prompt */}
          {locked && history.length > 0 && <div className="mt-2 text-muted-foreground">[terminal locked]</div>}

          <div ref={endRef} />
        </div>

        {/* quick actions */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border bg-muted/30 px-3 py-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => runCommand(s)}
              className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground hover:bg-muted transition-colors"
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => runCommand("clear")}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground hover:bg-muted transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> clear
          </button>
          <button
            onClick={() => runCommand("exit")}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> exit
          </button>
          <button
            onClick={() => runCommand("cd help")}
            className="ml-auto inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground hover:bg-muted transition-colors"
          >
            <LifeBuoy className="h-3.5 w-3.5" /> help
          </button>
        </div>
      </div>
    </div>
  )
}

// Convert URLs, email, and phone inside terminal output to clickable links
function makeClickable(text: string) {
  const parts = text.split(/(\bhttps?:\/\/[^\s]+|\b[\w.-]+@[\w.-]+\.\w+|\+?\d[\d\s-]{7,}\d)/g)
  return parts.map((p, i) => {
    if (/^https?:\/\//.test(p)) {
      return (
        <a
          key={i}
          href={p}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline inline-flex items-center gap-1"
        >
          {p} <ExternalLink className="inline-block h-3.5 w-3.5" />
        </a>
      )
    }
    if (/^[\w.-]+@[\w.-]+\.\w+$/.test(p)) {
      return (
        <a key={i} href={`mailto:${p}`} className="text-primary underline">
          {p}
        </a>
      )
    }
    // very simple phone matcher; make tel:
    if (/^\+?\d[\d\s-]{7,}\d$/.test(p)) {
      const tel = p.replace(/\s+/g, "")
      return (
        <a key={i} href={`tel:${tel}`} className="text-primary underline">
          {p}
        </a>
      )
    }
    return <span key={i}>{p}</span>
  })
}
