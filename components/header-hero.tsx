"use client"

import type { ThemeName } from "@/lib/themes"
import Image from "next/image"
import { Palette } from "lucide-react"

type Props = {
  imageUrl: string
  name: string
  tagline: string
  theme: ThemeName
  onThemeChange: (t: ThemeName) => void
}

const themes: ThemeName[] = ["light", "dark", "blue", "green"]

export function HeaderHero({ imageUrl, name, tagline, theme, onThemeChange }: Props) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-muted/30">
      {/* Decorative moving lines (no heavy gradients) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-6 h-px w-[140%] rotate-2 bg-primary/20 animate-[slideX_8s_linear_infinite]" />
        <div className="absolute -left-10 top-16 h-px w-[140%] -rotate-1 bg-accent/20 animate-[slideX_10s_linear_infinite]" />
        <div className="absolute -left-10 bottom-8 h-px w-[140%] rotate-3 bg-primary/10 animate-[slideX_12s_linear_infinite]" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:gap-10 md:text-left">
          <div className="relative">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt="Profile picture"
              width={160}
              height={160}
              className="h-32 w-32 rounded-xl border border-border object-cover shadow-sm md:h-40 md:w-40"
              priority
            />
            {/* subtle pulsing dot */}
            <span className="absolute -right-2 bottom-1 inline-block h-3 w-3 animate-pulse rounded-full bg-primary/80 ring-2 ring-background" />
          </div>

          <div className="flex-1">
            <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">{tagline}</h1>
            <p className="mt-2 text-muted-foreground">
              Pune, Maharashtra • AI/ML & Full‑Stack • Building useful, scalable systems
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
                <Palette className="h-4 w-4 text-primary" />
                Theme:
                <strong className="ml-1 capitalize text-foreground">{theme}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => onThemeChange(t)}
                    className={`rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted ${t === theme ? "bg-muted" : "bg-background"}`}
                    aria-label={`Switch theme to ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideX {
          0% { transform: translateX(-10%); opacity: 0.6; }
          50% { opacity: 0.35; }
          100% { transform: translateX(10%); opacity: 0.6; }
        }
      `}</style>
    </header>
  )
}
