"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Terminal } from "@/components/terminal"
import { ContactLinks } from "@/components/contact-links"
import { HeaderHero } from "@/components/header-hero"
import { themePresets, type ThemeName, varsForTheme } from "@/lib/themes"

export default function Page() {
  const [theme, setTheme] = useState<ThemeName>("dark")

  // compute CSS variable overrides so Tailwind design tokens update
  const cssVars = useMemo(() => varsForTheme(theme), [theme])

  return (
    <main
      style={cssVars as React.CSSProperties}
      className="min-h-dvh bg-background text-foreground transition-colors duration-500"
    >
      <HeaderHero
        theme={theme}
        onThemeChange={setTheme}
        // NOTE: user requested: MUST use the Source URL directly for the image
        imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profilepic-n2AbCK1OxEy82PrIr90nylOl0uddSN.png"
        name="Tanish Jagtap"
        tagline="Hi, I am Tanish Jagtap"
      />

      <section className="container mx-auto px-4 py-6 md:py-10">
        <div className="mx-auto max-w-4xl">
          <Terminal theme={theme} onThemeChange={setTheme} themePresets={themePresets} />
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <ContactLinks />
        </div>
      </section>
    </main>
  )
}
