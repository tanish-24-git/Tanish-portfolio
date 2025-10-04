"use client"

import { useEffect, useRef } from "react"

export default function FloatingIdCard() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const { innerWidth } = window
      const rotate = (e.clientX / innerWidth - 0.5) * 6 // -3deg to 3deg
      el.style.setProperty("--tilt", `${rotate}deg`)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none"
      style={{
        perspective: "1000px",
      }}
      aria-hidden="true"
    >
      <div
        className="relative w-[260px] sm:w-[300px] md:w-[340px] select-none mx-auto z-10"
        style={{
          transform: "rotateX(8deg) rotateY(var(--tilt, 0deg)) translateZ(0)",
          animation: "float-y 6s ease-in-out infinite",
          filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))",
        }}
      >
        <img src="/images/id-card.png" alt="Tanish Jagtap portrait" className="block w-full h-auto" draggable={false} />
      </div>

      <style jsx>{`
        @keyframes float-y {
          0% { transform: rotateX(8deg) rotateY(var(--tilt,0deg)) translateY(0); }
          50% { transform: rotateX(8deg) rotateY(var(--tilt,0deg)) translateY(-10px); }
          100% { transform: rotateX(8deg) rotateY(var(--tilt,0deg)) translateY(0); }
        }
      `}</style>
    </div>
  )
}
