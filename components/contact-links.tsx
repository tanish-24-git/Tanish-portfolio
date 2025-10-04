"use client"

import { Github, Linkedin, Mail, Phone, Code2 } from "lucide-react"

export function ContactLinks() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">Contact</h2>
      <p className="mt-1 text-sm text-muted-foreground">Reach out via email or phone, or find me on these platforms.</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <a
          href="mailto:tanishjagtap91@gmail.com"
          className="group flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2 hover:bg-muted transition-colors"
        >
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">Email</div>
            <div className="text-xs text-muted-foreground">tanishjagtap91@gmail.com</div>
          </div>
        </a>

        <a
          href="tel:+918055876779"
          className="group flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2 hover:bg-muted transition-colors"
        >
          <Phone className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">Phone</div>
            <div className="text-xs text-muted-foreground">+91 8055876779</div>
          </div>
        </a>

        <a
          href="https://github.com/tanish-24-git"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2 hover:bg-muted transition-colors"
        >
          <Github className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">GitHub</div>
            <div className="text-xs text-muted-foreground">github.com/tanish-24-git</div>
          </div>
        </a>

        <a
          href="http://www.linkedin.com/in/tanish-jagtap-b363ab2ba"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2 hover:bg-muted transition-colors"
        >
          <Linkedin className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">LinkedIn</div>
            <div className="text-xs text-muted-foreground">tanish-jagtap-b363ab2ba</div>
          </div>
        </a>

        <a
          href="https://leetcode.com/u/Tanish_Jagtap"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2 hover:bg-muted transition-colors"
        >
          <Code2 className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">LeetCode</div>
            <div className="text-xs text-muted-foreground">leetcode.com/u/Tanish_Jagtap</div>
          </div>
        </a>
      </div>
    </div>
  )
}
