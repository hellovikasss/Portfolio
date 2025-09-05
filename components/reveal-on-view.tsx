"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { createScrollAnimation } from "@/lib/gsap-utils"
import type { JSX } from "react" // Declaring JSX variable

type RevealOnViewProps = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: React.ReactNode
  /** Optional delay per item for staggered lists */
  delay?: number
  style?: CSSProperties
  /** If true, applies a stronger lift/blur for hero content */
  intensity?: "soft" | "hero"
  /** If true, will animate immediate children in a staggered sequence */
  staggerChildren?: boolean
}

export default function RevealOnView({
  as = "div",
  className,
  children,
  delay = 0,
  style,
  intensity = "soft",
  staggerChildren = false,
}: RevealOnViewProps) {
  const Tag = as as any
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    createScrollAnimation(element, intensity, delay, staggerChildren)
  }, [delay, intensity, staggerChildren])

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
