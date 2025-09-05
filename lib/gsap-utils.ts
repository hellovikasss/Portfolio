"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation presets matching the original motion library behavior
export const animationPresets = {
  soft: {
    translateY: 18,
    blur: 10,
    scale: 0.98,
    duration: 0.95,
    ease: "power2.out",
  },
  hero: {
    translateY: 28,
    blur: 16,
    scale: 0.965,
    duration: 0.95,
    ease: "power2.out",
  },
}

// Utility function for scroll-triggered animations
export const createScrollAnimation = (
  element: HTMLElement,
  intensity: "soft" | "hero" = "soft",
  delay = 0,
  staggerChildren = false,
) => {
  const preset = animationPresets[intensity]

  if (staggerChildren) {
    const children = Array.from(element.children) as HTMLElement[]

    // Set initial state for children
    gsap.set(children, {
      opacity: 0,
      y: preset.translateY,
      scale: preset.scale,
      filter: `blur(${preset.blur}px)`,
    })

    // Animate children with stagger
    gsap.to(children, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: preset.duration,
      ease: preset.ease,
      stagger: 0.12,
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        once: true,
      },
    })
  } else {
    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: preset.translateY,
      scale: preset.scale,
      filter: `blur(${preset.blur}px)`,
    })

    // Animate element
    gsap.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: preset.duration,
      ease: preset.ease,
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        once: true,
      },
    })
  }
}

// Utility function for text animations (word-by-word reveal)
export const createTextAnimation = (
  element: HTMLElement,
  startDelay = 0,
  durationPerWord = 0.9,
  staggerPerWord = 0.08,
  lineDelay = 0.3,
  fromBlurPx = 16,
  fromTranslateYPx = 14,
) => {
  const wordSpans = element.querySelectorAll<HTMLSpanElement>("[data-word]")

  // Set initial state for all words
  gsap.set(wordSpans, {
    opacity: 0,
    filter: `blur(${fromBlurPx}px)`,
    y: fromTranslateYPx,
  })

  // Group words by line index
  const wordsByLine = new Map<number, HTMLSpanElement[]>()
  wordSpans.forEach((el) => {
    const lineIndexAttr = el.getAttribute("data-line-index")
    const lineIndex = lineIndexAttr ? Number(lineIndexAttr) : 0
    const arr = wordsByLine.get(lineIndex) ?? []
    arr.push(el)
    wordsByLine.set(lineIndex, arr)
  })

  // Animate each line with stagger
  Array.from(wordsByLine.entries())
    .sort((a, b) => a[0] - b[0])
    .forEach(([lineIndex, words]) => {
      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: durationPerWord,
        ease: "power2.out",
        stagger: staggerPerWord,
        delay: startDelay + lineIndex * lineDelay,
      })
    })
}
