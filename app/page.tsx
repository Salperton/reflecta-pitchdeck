"use client"

import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google"
import html2canvas from "html2canvas"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
// import { useRouter } from 'next/navigation'
import {
  DoodleWarning,
  DoodleStress,
  DoodleSearch,
  DoodleLock,
  DoodleCheckmark,
  DoodleLightning,
  DoodleBaby,
  DoodleHandshake,
  DoodleChat,
  DoodleDoctor,
  DoodleChart,
  DoodleRocket, // Added DoodleRocket import for Vision slide
  MailIcon,
  PhoneIcon,
  DoodlePeople, // Added DoodlePeople
  DoodleGear, // Added DoodleGear
} from "@/components/doodle-icons"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export default function Page() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  // const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const captureScreenshot = async () => {
    if (!contentRef.current) return null

    try {
      console.log("[v0] Starting screenshot capture...")

      const element = contentRef.current
      const clone = element.cloneNode(true) as HTMLElement

      clone.style.position = "absolute"
      clone.style.left = "-9999px"
      document.body.appendChild(clone)

      const allElements = clone.querySelectorAll("*")
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        const computed = window.getComputedStyle(el)

        if (computed.backgroundColor && computed.backgroundColor.includes("oklch")) {
          htmlEl.style.backgroundColor = convertOklchToRgb(computed.backgroundColor)
        }

        if (computed.color && computed.color.includes("oklch")) {
          htmlEl.style.color = convertOklchToRgb(computed.color)
        }

        if (computed.borderColor && computed.borderColor.includes("oklch")) {
          htmlEl.style.borderColor = convertOklchToRgb(computed.borderColor)
        }
      })

      const canvas = await html2canvas(clone, {
        backgroundColor: "#050505",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: clone.scrollWidth,
        height: clone.scrollHeight,
      })

      document.body.removeChild(clone)
      console.log("[v0] Screenshot captured successfully")

      return new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        }, "image/png")
      })
    } catch (error) {
      console.error("[v0] Error capturing screenshot:", error)
      return null
    }
  }

  const convertOklchToRgb = (oklchString: string): string => {
    const colorMap: Record<string, string> = {
      "oklch(1 0 0)": "rgb(255, 255, 255)",
      "oklch(0.145 0 0)": "rgb(37, 37, 37)",
      "oklch(0.97 0 0)": "rgb(247, 247, 247)",
      "oklch(0.205 0 0)": "rgb(52, 52, 52)",
      "oklch(0.985 0 0)": "rgb(251, 251, 251)",
      "oklch(0.922 0 0)": "rgb(235, 235, 235)",
      "oklch(0.269 0 0)": "rgb(69, 69, 69)",
      "oklch(0.708 0 0)": "rgb(180, 180, 180)",
      "oklch(0.556 0 0)": "rgb(142, 142, 142)",
      "oklch(0.439 0 0)": "rgb(112, 112, 112)",
    }

    for (const [oklch, rgb] of Object.entries(colorMap)) {
      if (oklchString.includes(oklch)) {
        return rgb
      }
    }

    return "rgb(0, 0, 0)"
  }

  const handleDownloadImage = async () => {
    console.log("[v0] Download Image clicked")
    const blob = await captureScreenshot()
    if (!blob) {
      alert("Failed to capture image. Please try again.")
      return
    }

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "reflecta-pitch-deck.png"
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
    console.log("[v0] Image downloaded successfully")
  }

  /*
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }
  */

  return (
    <div className={`${plusJakarta.variable} ${spaceGrotesk.variable} font-[family-name:var(--font-plus-jakarta)]`}>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={handleDownloadImage}
          className="px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-[#8B9D8B] hover:text-white transition-all"
        >
          Download Deck
        </button>
        {/*
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-[#FF6B6B] hover:text-white transition-all"
        >
          Logout
        </button>
        */}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full transition-all shadow-lg hover:scale-110 bg-white text-black hover:bg-[#8B9D8B]"
          aria-label="Scroll to top"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M18 15l-6-6-6 6"></path>
          </svg>
        </button>
      )}

      <div className="min-h-screen bg-[#F5F5DC] text-[#1a1a1a] flex justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div ref={contentRef} className="w-full max-w-[1200px] flex flex-col gap-6">
          {/* Slide 1: Title Slide */}
          <div className="bg-gradient-to-br from-[#8B9D8B] to-[#6B8E6B] rounded-[32px] p-10 sm:p-16 min-h-[500px] flex flex-col justify-between border border-[#7A8C7A] overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="rounded-2xl px-4 py-2 text-[rgba(251,242,235,1)] bg-[rgba(251,242,235,1)]">
                <Image
                  src="/images/reflecta-logo.png"
                  alt="Reflecta"
                  width={200}
                  height={60}
                  className="h-10 w-auto"
                  priority
                />
              </div>
              <span className="text-2xl text-white/80 font-semibold">Investor Deck 2025</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-7xl font-bold text-white leading-[0.95]">
                Evidence-Based
                <br />
                Parenting Support
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-2xl">Powered by AI</p>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-2xl">
                <p className="text-white text-sm sm:text-base">
                  Connecting parents to 500,000+ peer-reviewed studies through compassionate AI guidance
                </p>
              </div>
            </div>
          </div>

          {/* Slide 2: The Problem */}
          <div className="bg-white/90 backdrop-blur rounded-[32px] p-10 sm:p-16 border border-[#8B9D8B]/20 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 1
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-4xl font-bold mb-6 text-[#8B9D8B]">
              The Problem
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg sm:text-2xl font-semibold text-[#1a1a1a]">
                  Parents Are Overwhelmed
                </h3>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleStress />
                  </span>
                  <p className="text-sm sm:text-base">
                    <strong>48%</strong> of parents say stress is completely overwhelming
                    <a
                      href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7970748/pdf/42761_2020_Article_28.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#8B9D8B] text-white text-[10px] ml-1 hover:bg-[#6B8E6B] transition-colors align-super"
                      title="U.S. Surgeon General, 2024"
                    >
                      1
                    </a>
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleStress />
                  </span>
                  <p className="text-sm sm:text-base">
                    <strong>41%</strong> so stressed they cannot function most days{" "}
                    <a
                      href="https://www.sciencedirect.com/science/article/abs/pii/S0190740920300682"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors"
                      title="View reference"
                    >
                      2
                    </a>
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleStress />
                  </span>
                  <p className="text-sm sm:text-base">
                    <strong>57%</strong> of parents self-reported burnout{" "}
                    <a
                      href="https://wexnermedical.osu.edu/blog/parental-burnout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors"
                      title="Ohio State University Study, 2023"
                    >
                      3
                    </a>
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleSearch />
                  </span>
                  <p className="text-sm sm:text-base">
                    <strong>58%</strong> say there's so much information, it's hard to know who to trust{" "}
                    <a
                      href="https://www.jmir.org/2020/8/e19985/pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors"
                      title="View reference"
                    >
                      4
                    </a>
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleSearch />
                  </span>
                  <p className="text-sm sm:text-base">
                    <strong>40%</strong> find it difficult to distinguish good vs. bad advice on social media{" "}
                    <a
                      href="https://pediatrics.jmir.org/2020/2/e19669/pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors"
                      title="View reference"
                    >
                      5
                    </a>
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleLock />
                  </span>
                  <p className="text-sm sm:text-base">Research locked behind paywalls & academic jargon</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg sm:text-2xl font-semibold text-[#1a1a1a]">
                  Current Resources Fall Short
                </h3>
                <div className="flex gap-3">
                  <span className="text-[#8B9D8B] flex-shrink-0">
                    <DoodleWarning />
                  </span>
                  <p className="text-sm sm:text-base">
                    Fragmented, conflicting advice across blogs, forums, social media
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#8B9D8B] flex-shrink-0">
                    <DoodleLightning />
                  </span>
                  <p className="text-sm sm:text-base">Lack of instant access, 24/7 availability for urgent needs</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#8B9D8B] flex-shrink-0">
                    <DoodleBaby />
                  </span>
                  <p className="text-sm sm:text-base">
                    Generic advice, not personalized to specific child age or developmental stage
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#8B9D8B] flex-shrink-0">
                    <DoodleHandshake />
                  </span>
                  <p className="text-sm sm:text-base">Difficulty finding and connecting with verified professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: The Solution */}
          <div className="bg-gradient-to-br from-white to-[#F5F5DC] rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 min-h-[500px] relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 2
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              The Solution: Reflecta
            </h2>
            <p className="text-lg sm:text-xl text-[#666] mb-8">
              The Evidence-Based Operating System for Modern Parenting
            </p>

            <div className="mb-8 grid md:grid-cols-2 gap-4">
              {/* ChatGPT Side */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                  <h3 className="font-bold text-red-900">Generic AI (e.g., ChatGPT)</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/80 p-3 rounded-lg">
                    <p className="text-sm text-red-800 mb-2 font-semibold">Response:</p>
                    <p className="text-xs text-red-700">
                      &quot;Gotcha, here is a 5 step approach you can take. First tell your child you understand, then
                      calm them down&quot;
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">❌ No citations</span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">❌ Generic advice</span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">⚠️ Potentially unsafe</span>
                  </div>
                </div>
              </div>

              {/* Reflecta Side */}
              <div className="bg-[#8B9D8B]/10 border-2 border-[#8B9D8B] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#8B9D8B] flex items-center justify-center">
                    <Image src="/images/reflecta-logo.png" alt="R" width={20} height={20} className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#1a1a1a]">Reflecta</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/80 p-3 rounded-lg">
                    <p className="text-sm text-[#1a1a1a] mb-2 font-semibold">Response:</p>
                    <p className="text-xs text-[#333]">
                      "Based on AAP & Yale research
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#8B9D8B] text-white text-[8px] ml-1">
                        1
                      </span>
                      , complete ignoring can escalate distress. For ages 2-4, validate feelings first ('I see you're
                      upset'), then redirect. If injury risk exists, ensure safety while staying calm. This approach
                      reduces tantrum duration by 40% vs. full ignoring."
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-[#8B9D8B]/20 text-[#1a1a1a] px-2 py-1 rounded-full">✅ Cited sources</span>
                    <span className="bg-[#8B9D8B]/20 text-[#1a1a1a] px-2 py-1 rounded-full">
                      ✅ Age-specific guidance
                    </span>
                    <span className="bg-[#8B9D8B]/20 text-[#1a1a1a] px-2 py-1 rounded-full">✅ Medically safe</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#8B9D8B]/10 p-4 rounded-2xl border border-[#8B9D8B]/20">
                <div className="text-[#8B9D8B] mb-2">
                  <DoodleChat />
                </div>
                <h3 className="font-bold mb-2">AI Chat</h3>
                <p className="text-sm text-[#666]">Instant, evidence-based answers</p>
              </div>
              <div className="bg-[#8B9D8B]/10 p-4 rounded-2xl border border-[#8B9D8B]/20">
                <div className="text-[#8B9D8B] mb-2">
                  <DoodleDoctor />
                </div>
                <h3 className="font-bold mb-2">Professional Bridge</h3>
                <p className="text-sm text-[#666]">Verified clinician marketplace</p>
              </div>
              <div className="bg-[#8B9D8B]/10 p-4 rounded-2xl border border-[#8B9D8B]/20">
                <div className="text-[#8B9D8B] mb-2">
                  <DoodleChart />
                </div>
                <h3 className="font-bold mb-2">Structured Support</h3>
                <p className="text-sm text-[#666]">Assessments & guided plans</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#8B9D8B]/10 to-[#8B9D8B]/5 rounded-2xl p-6 border-2 border-[#8B9D8B]/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#8B9D8B] flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-bold mb-2 text-[#1a1a1a]">
                    General AI hallucinates. Reflecta validates.
                  </h3>
                  <p className="text-sm sm:text-base text-[#666] leading-relaxed">
                    We use a RAG engine to cross-reference every answer against{" "}
                    <span className="font-bold text-[#8B9D8B]">500,000+ peer-reviewed studies</span>, with{" "}
                    <span className="font-bold text-[#8B9D8B]">100+ hand-curated papers</span> scored by our proprietary
                    quality algorithm. No guesswork. No generic advice. Just evidence-based guidance you can trust.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4: Market Opportunity */}
          <div className="bg-white/90 backdrop-blur rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 3
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-4xl font-bold mb-8 text-[#8B9D8B]">
              Market Opportunity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-[#8B9D8B]/20">
                <div className="flex items-start gap-2">
                  <div className="text-3xl sm:text-4xl font-bold text-[#8B9D8B] mb-2">$21.8B</div>
                  <a
                    href="https://www.imarcgroup.com/middle-east-digital-health-market"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 bg-[#8B9D8B] text-white rounded-full text-xs font-bold hover:bg-[#6B8E6B] transition-colors"
                  >
                    13
                  </a>
                </div>
                <div className="text-xs sm:text-sm text-neutral-600 mb-1">TAM (2024)</div>
                <p className="text-xs sm:text-sm text-neutral-700">Middle East Digital Health Market → $40.5B (2033)</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-[#8B9D8B]/20">
                <div className="flex items-start gap-2">
                  <div className="text-3xl sm:text-4xl font-bold text-[#8B9D8B] mb-2">$1.69B</div>
                  <a
                    href="https://www.rootsanalysis.com/reports/parenting-apps-market.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 bg-[#8B9D8B] text-white rounded-full text-xs font-bold hover:bg-[#6B8E6B] transition-colors"
                  >
                    14
                  </a>
                </div>
                <div className="text-xs sm:text-sm text-neutral-600 mb-1">Global Market</div>
                <p className="text-xs sm:text-sm text-neutral-700">Global parenting apps market</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-[#8B9D8B]/20">
                <div className="text-3xl sm:text-4xl font-bold text-[#8B9D8B] mb-2">$100M</div>
                <div className="text-xs sm:text-sm text-neutral-600 mb-1">SAM</div>
                <p className="text-xs sm:text-sm text-neutral-700">MENA Parenting Apps market</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-[#8B9D8B]/20">
                <div className="text-3xl sm:text-4xl font-bold text-[#8B9D8B] mb-2">$50M</div>
                <div className="text-xs sm:text-sm text-neutral-600 mb-1">SOM</div>
                <p className="text-xs sm:text-sm text-neutral-700">GCC-Focused serviceable market</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#8B9D8B]/20">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-semibold mb-4 text-[#8B9D8B]">
                Market Growth Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    The global mental health apps market size was estimated at <strong>USD 6.52 billion in 2024</strong>{" "}
                    and is expected to expand at a <strong>CAGR of 14.6%</strong> from 2025 to 2030
                    <a
                      href="https://www.grandviewresearch.com/industry-analysis/mental-health-apps-market-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors ml-1"
                      title="Grand View Research"
                    >
                      5
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    Employers and corporate wellness programs record the fastest projected{" "}
                    <strong>CAGR at 17.68%</strong> to 2030
                    <a
                      href="https://www.mordorintelligence.com/industry-reports/mental-health-apps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors ml-1"
                      title="Mordor Intelligence"
                    >
                      6
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    <strong>Corporate wellness is the fastest-growing segment</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* GCC/MENA Market Growth Analysis section */}
            <div className="mt-8 pt-6 border-t border-[#8B9D8B]/20">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-semibold mb-4 text-[#8B9D8B]">
                GCC/MENA Market Growth Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    The MENA digital health market was valued at <strong>USD 10,981.76 million in 2022</strong> and is
                    expected to grow at a strong <strong>CAGR of around 19.6%</strong>
                    <a
                      href="https://univdatos.com/reports/mena-digital-health-market"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors ml-1"
                      title="UnivDatos Market Insights"
                    >
                      7
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    The GCC Countries Digital Health Market is expected to witness a{" "}
                    <strong>healthy and double-digit growth by 2027</strong>
                    <a
                      href="https://meditechinsights.com/gcc-countries-digital-health-market/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors ml-1"
                      title="MediTech Insights"
                    >
                      8
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    Smartphone penetration rates in KSA and UAE are among the world's highest, at an estimated{" "}
                    <strong>93 percent</strong>
                    <a
                      href="https://www.mckinsey.com/industries/public-sector/our-insights/growth-opportunities-for-digital-health-in-ksa-and-uae"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors ml-1"
                      title="McKinsey & Company"
                    >
                      9
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    Middle East digital health market size reached <strong>USD 21,810.0 Million in 2024</strong> and is
                    expected to reach <strong>USD 40,546.8 Million by 2033</strong>, exhibiting a{" "}
                    <strong>CAGR of 7.13%</strong>
                    <a
                      href="https://www.imarcgroup.com/middle-east-digital-health-market"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors ml-1"
                      title="IMARC Group"
                    >
                      10
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    <strong>Saudi Arabia dominated</strong> the Middle East digital health market with a revenue share
                    in 2024. <strong>UAE is expected to grow at the fastest CAGR</strong> in the market during the
                    forecast period
                    <a
                      href="https://www.grandviewresearch.com/industry-analysis/middle-east-digital-health-market-report"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors ml-1"
                      title="Grand View Research - ME Digital Health"
                    >
                      11
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#8B9D8B] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    PwC forecasts that AI could contribute{" "}
                    <strong>US$320 billion to Middle East economies by 2030</strong>, with healthcare predicted to offer
                    some of the biggest gains
                    <a
                      href="https://www.weforum.org/stories/2024/10/digital-innovation-reshaping-healthcare-middle-east/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B9D8B] rounded-full hover:bg-[#6B8E6B] transition-colors ml-1"
                      title="World Economic Forum"
                    >
                      12
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#8B9D8B]/20">
              <p className="text-xs text-neutral-500">
                Sources: Grand View Research (2024), Roots Analysis (2024), Fortune Business Insights (2024), UN World
                Population Prospects (2024), Mordor Intelligence (2024), UnivDatos Market Insights (2022), MediTech
                Insights, McKinsey & Company, IMARC Group (2024), World Economic Forum (2024)
              </p>
            </div>
          </div>

          {/* Slide 5: Why Now? */}
          <div className="bg-gradient-to-br from-white to-[#F5F5DC] rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 4
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-8">
              Why Now?
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 mb-8 font-medium">
              The Intersection of Desperation and Adoption.
            </p>

            <div className="space-y-8">
              {/* Trend 1: Mental Health Explosion */}
              <div className="bg-gradient-to-br from-[#8B9D8B]/10 to-white/50 backdrop-blur rounded-2xl p-6 border border-[#8B9D8B]/30">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-[#8B9D8B] rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-bold text-center text-[#8B9D8B]">
                      Trend 1: Mental Health Explosion
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-center">
                      The global <strong>Mental Health Apps market</strong> was valued at{" "}
                      <span className="text-[#8B9D8B] font-bold text-xl">$6.52 Billion in 2024</span> and is projected
                      to hit
                      <span className="text-[#8B9D8B] font-bold text-xl">$23.8 Billion by 2032</span> (
                      <strong>18% CAGR</strong>).
                    </p>
                    <div className="bg-white/80 rounded-lg p-4 border border-[#8B9D8B]/20">
                      <p className="text-sm sm:text-base italic text-neutral-700 text-center">
                        "<strong>Stress Management</strong>" is identified as a primary growth driver, validating the
                        need for daily parental support tools.
                      </p>
                    </div>
                    <p className="text-xs text-neutral-500 flex items-center justify-center gap-2">
                      <span>Source: Fortune Business Insights, 2025 Report</span>
                      <a
                        href="https://www.fortunebusinessinsights.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-5 h-5 bg-[#8B9D8B] text-white rounded-full text-xs font-bold hover:bg-[#6B8E6B] transition-colors"
                      >
                        15
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Trend 3: Smart Capital Shift */}
              <div className="bg-gradient-to-br from-[#8B9D8B]/10 to-white/50 backdrop-blur rounded-2xl p-6 border border-[#8B9D8B]/30">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-[#8B9D8B] rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-bold text-center text-[#8B9D8B]">
                      Trend 3: Smart Capital Shift
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-center">
                      <span className="text-[#8B9D8B] font-bold text-xl">83%</span> of <strong>Family Offices</strong>{" "}
                      rank AI as a top investment priority for the next 5 years, actively shifting capital toward
                      specialized AI applications that offer distinct competitive advantages.
                    </p>
                    <div className="bg-white/80 rounded-lg p-4 border border-[#8B9D8B]/20">
                      <p className="text-sm sm:text-base italic text-neutral-700 text-center">
                        High-net-worth investors are prioritizing AI solutions with clear moats and specialized
                        expertise.
                      </p>
                    </div>
                    <p className="text-xs text-neutral-500 flex items-center justify-center gap-2">
                      <span>Source: BNY Mellon, 2025 Investment Insights</span>
                      <a
                        href="https://www.bnymellon.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-5 h-5 bg-[#8B9D8B] text-white rounded-full text-xs font-bold hover:bg-[#6B8E6B] transition-colors"
                      >
                        16
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white/50 backdrop-blur rounded-2xl p-6 border border-amber-200">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-bold text-center text-amber-800">
                      The GCC Regional Context
                    </h3>
                    <p className="text-base leading-relaxed text-center text-neutral-700">
                      GCC is a sophisticated market that behaves very differently from the US/Europe. The MENA region
                      (specifically UAE & KSA) has{" "}
                      <strong>78-84% Smartphone Penetration, but 91% Internet Penetration</strong> and a culture that
                      deeply values privacy and family reputation.
                    </p>

                    {/* Key Context Points */}
                    <div className="space-y-3">
                      {/* High Willingness to Pay */}
                      <div className="bg-white/90 rounded-lg p-4 border border-amber-200">
                        <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                          <span className="text-xl">💳</span>
                          High Willingness to Pay
                        </h4>
                        <p className="text-sm leading-relaxed text-neutral-800">
                          A 2024 Oliver Wyman survey found that{" "}
                          <strong className="text-amber-700">80% of Saudis</strong> are willing to increase their number
                          of paid subscriptions (the highest rate globally), compared to flatlining growth in the West.
                        </p>
                      </div>

                      {/* The Nanny Gap */}
                      <div className="bg-white/90 rounded-lg p-4 border border-amber-200">
                        <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                          <span className="text-xl">👶</span>
                          The "Nanny Gap"
                        </h4>
                        <p className="text-sm leading-relaxed text-neutral-700">
                          In the UAE, many families have nannies for physical care (feeding/cleaning), but parents are
                          anxious about developmental and behavioral milestones. They don't need a "tracker"; they need
                          a <strong className="text-amber-700">"Supervisor/Expert."</strong>
                        </p>
                      </div>

                      {/* Trust Economy */}
                      <div className="bg-white/90 rounded-lg p-4 border border-amber-200">
                        <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                          <span className="text-xl">🤝</span>
                          Trust Economy
                        </h4>
                        <p className="text-sm leading-relaxed text-neutral-700">
                          In the Gulf, trust is not gained through ads; it is gained through{" "}
                          <strong className="text-amber-700">Influencers (Mom-fluencers)</strong> on Snapchat and
                          TikTok.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 6: Business Model */}
          <div className="bg-white rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 5
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-8">
              Business Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 min-h-[450px]">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold mb-6">
                  B2C Subscription Tiers
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#999] pl-4">
                    <div className="font-bold text-lg">Free Tier</div>
                    <p className="text-sm text-[#666]">5 questions/day • Basic chat</p>
                    <p className="text-xs text-[#999] mt-1">Acquisition funnel</p>
                  </div>
                  <div className="border-l-4 border-[#8B9D8B] pl-4">
                    <div className="font-bold text-lg">Premium - $15/mo</div>
                    <p className="text-sm text-[#666]">Unlimited chat • All assessments</p>
                    <p className="text-xs text-[#8B9D8B] mt-1">70% of users • $540 LTV</p>
                  </div>
                  <div className="border-l-4 border-[#6B8E6B] pl-4">
                    <div className="font-bold text-lg">Family - $25/mo</div>
                    <p className="text-sm text-[#666]">Multiple children • Clinician consults</p>
                    <p className="text-xs text-[#6B8E6B] mt-1">25% of users • $900 LTV</p>
                  </div>
                  <div className="border-l-4 border-[#FF6B6B] pl-4">
                    <div className="font-bold text-lg">Professional - $50/mo</div>
                    <p className="text-sm text-[#666]">Client management • Analytics</p>
                    <p className="text-xs text-[#FF6B6B] mt-1">5% of users • $1,800 LTV</p>
                  </div>
                </div>
              </div>

              {/* Slide 7: Year 1 Financial Roadmap */}
              <div className="bg-gradient-to-br from-white to-[#F5F5DC] rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 overflow-hidden relative">
                <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
                  Slide 6
                </div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
                  Year 1: Financial Roadmap
                </h2>

                <div className="space-y-3 mb-6">
                  {/* Month 1-3 */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-lg">Month 1-3: Build & Beta</div>
                      <div className="text-sm font-semibold">$0 - $500</div>
                    </div>
                    <p className="text-sm text-white/80">Focus: Product Fit</p>
                  </div>

                  {/* Month 4-6 */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-lg">Month 4-6: Paid Testing</div>
                      <div className="text-sm font-semibold">$1k - $2k</div>
                    </div>
                    <p className="text-sm text-white/80">Focus: CAC Calibration</p>
                  </div>

                  {/* Month 12 Target */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-lg">Month 12 Target</div>
                      <div className="text-sm font-semibold">$15,000 MRR ($180K ARR)</div>
                    </div>
                    <p className="text-sm text-white/80">Active Subs: ~1,000</p>
                  </div>
                </div>

                {/* Unit Economics */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <h3 className="font-bold mb-3 text-lg">Unit Economics Target</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/70 text-xs mb-1">CAC</div>
                      <div className="font-bold text-lg">&lt; $45</div>
                      <div className="text-white/60 text-xs">(165 AED)</div>
                    </div>
                    <div>
                      <div className="text-white/70 text-xs mb-1">LTV</div>
                      <div className="font-bold text-lg">&gt; $540</div>
                      <div className="text-white/60 text-xs">(1,980 AED)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 8: Competitive Advantage */}
          <div className="bg-white rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 7
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              Competitive Advantage
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#8B9D8B]">
                    <th className="text-left py-4 font-bold">Feature</th>
                    <th className="text-center py-4 font-bold text-[#8B9D8B]">Reflecta</th>
                    <th className="text-center py-4 font-bold text-[#666]">Mental Health Apps</th>
                    <th className="text-center py-4 font-bold text-[#666]">AI Chatbots</th>
                    <th className="text-center py-4 font-bold text-[#666]">Therapy Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#eee]">
                    <td className="py-5">Real-time research</td>
                    <td className="text-center flex justify-center py-5">
                      <span className="text-[#8B9D8B] inline-block">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center text-[#999] py-5">-</td>
                    <td className="text-center text-[#999] py-5">-</td>
                    <td className="text-center py-5">
                      <span className="text-[#8B9D8B] inline-block">
                        <DoodleCheckmark />
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#eee]">
                    <td className="py-5">24/7 availability</td>
                    <td className="text-center py-5">
                      <span className="text-[#8B9D8B] inline-flex justify-center">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center py-5">
                      <span className="text-[#8B9D8B] inline-flex justify-center">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center py-5">
                      <span className="text-[#8B9D8B] inline-flex justify-center">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center text-[#999] py-5">Limited</td>
                  </tr>
                  <tr className="border-b border-[#eee]">
                    <td className="py-5">Transparent citations</td>
                    <td className="text-center py-5">
                      <span className="text-[#8B9D8B] inline-flex justify-center">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center text-[#999] py-5">-</td>
                    <td className="text-center text-[#999] py-5">-</td>
                    <td className="text-center py-5">Varies</td>
                  </tr>
                  <tr className="border-b border-[#eee]">
                    <td className="py-5">Parenting-specific</td>
                    <td className="text-center py-5">✅ Specialized</td>
                    <td className="text-center text-[#999] py-5">❌ General</td>
                    <td className="text-center text-[#999] py-5">❌ General</td>
                    <td className="text-center text-[#999] py-5">❌ General</td>
                  </tr>
                  <tr>
                    <td className="py-5">Cost</td>
                    <td className="text-center font-bold text-[#8B9D8B] py-5">$15-25/mo</td>
                    <td className="text-center py-5">$12-15/mo</td>
                    <td className="text-center py-5">$0-20/mo</td>
                    <td className="text-center py-5">$260-436/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-[#8B9D8B]/10 p-4 rounded-xl border border-[#8B9D8B]/20">
              <h3 className="font-bold mb-2">Our Unique Moat</h3>
              <p className="text-sm text-[#666]">
                Only platform combining real-time academic database integration, 4-tier quality hierarchy, professional
                network effects, and UAE-specific regulatory compliance.
              </p>
            </div>
          </div>

          {/* Slide 9: Go-To-Market Strategy */}
          <div className="bg-gradient-to-br from-white to-[#F5F5DC] rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 8
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              Go-To-Market Strategy
            </h2>
            <p className="text-center text-[#666] mb-6 text-sm sm:text-base">
              From "Zero" to "Scale": A 12-Month Execution Roadmap
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-5 border border-[#8B9D8B]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#8B9D8B] to-[#6B7D6B] rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Trust Seeding</h3>
                    <p className="text-xs text-[#999]">Months 1-3</p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-[#8B9D8B] mb-2">The "Dark Social" Phase</p>
                <p className="text-xs text-[#666] mb-3 italic">Focus: Infiltration & Feedback</p>
                <ul className="space-y-2 text-xs text-[#666]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9D8B] mt-0.5">•</span>
                    <span>Seed 50 "Ambassador Moms" in private WhatsApp School Groups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9D8B] mt-0.5">•</span>
                    <span>Manual recruitment in Compound Community Groups (The Springs, Arabian Ranches)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9D8B] mt-0.5">•</span>
                    <span className="font-semibold">Goal: 100 Beta Testers & Founder-led trust building</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#8B9D8B]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#FF9B7A] to-[#E87B5A] rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Intent &amp; Visual</h3>
                    <p className="text-xs text-[#999]">Months 4-9</p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-[#FF9B7A] mb-2">Capturing Crisis & Building Brand</p>
                <p className="text-xs text-[#666] mb-3 italic">Focus: CAC Validation</p>
                <ul className="space-y-2 text-xs text-[#666]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF9B7A] mt-0.5">🔍</span>
                    <span>
                      <strong>Google Search Ads:</strong> Sniping high-anxiety queries (e.g., "Toddler fever 39C what to
                      do")
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF9B7A] mt-0.5">📸</span>
                    <span>
                      <strong>Instagram Reels Ads:</strong> High-visual "Stop the Scroll" video ads targeting UAE
                      parents. Focus on "Medical Safety" messaging
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF9B7A] mt-0.5">•</span>
                    <span className="font-semibold">
                      Goal: Validate CAC {"<"} $45 by combining Search Intent with Instagram visual trust
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#8B9D8B]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#6B7D6B] to-[#4B5D6B] rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-base">The Trust Scale</h3>
                    <p className="text-xs text-[#999]">Months 10-12</p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-[#6B7D8B] mb-2">Viral Loop</p>
                <p className="text-xs text-[#666] mb-3 italic">Focus: Expansion & Localization</p>
                <ul className="space-y-2 text-xs text-[#666]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B7D6B] mt-0.5">📱</span>
                    <span>
                      <strong>Snapchat & TikTok:</strong> Paid partnerships with "Micro-Influencers" (KSA Focus)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B7D6B] mt-0.5">🔄</span>
                    <span>
                      <strong>Retargeting Loops:</strong> Showing "Success Story" ads on Instagram to users who visited
                      from Google but didn't sign up
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B7D6B] mt-0.5">•</span>
                    <span className="font-semibold">Goal: Reach 1,000+ paid subscribers and $15K MRR</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#8B9D8B]/10 to-[#FF9B7A]/10 rounded-2xl p-4 border border-[#8B9D8B]/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#8B9D8B]">{"<"}$45</p>
                  <p className="text-xs text-[#666]">Target CAC</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#FF9B7A]">12x</p>
                  <p className="text-xs text-[#666]">LTV:CAC Ratio</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#6B7D6B]">18mo</p>
                  <p className="text-xs text-[#666]">To Profitability</p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 10: The Team */}
          <div className="bg-white rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 9
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-8">
              The Team
            </h2>
            {/* CHANGE: Added complete team member profiles with images and detailed backgrounds */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ivan */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-[#8B9D8B]/20">
                  <img src="/images/ivan-20doncic.png" alt="Ivan" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-1">
                  Ivan [Last Name]
                </h3>
                <p className="text-sm font-semibold text-[#8B9D8B] mb-3">CTO & Founder</p>
                <p className="text-sm text-[#666] leading-relaxed mb-3">
                  15 years in digital analytics and audience behaviour. Formerly worked on campaigns for Mubadala
                  Healthcare, World Economic Forum, ADQ, Hub72, and others. Currently managing Emirates Global Aluminium
                  (EGA) digital platforms globally. Deep expertise in AI platform integrations, healthcare technology,
                  and MENA market dynamics.
                </p>
                <p className="text-xs font-semibold text-[#8B9D8B]">
                  Focus: Strategy & Development, Product Vision, Investor Relations
                </p>
              </div>

              {/* Marko */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-[#8B9D8B]/20">
                  <img
                    src="/images/marko-20cvijic-20grey-20large.jpeg"
                    alt="Marko Cvijic"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-1">Marko Cvijic</h3>
                <p className="text-sm font-semibold text-[#8B9D8B] mb-3">Co-CTO & Head of Digital Acquisition</p>
                <p className="text-sm text-[#666] leading-relaxed mb-3">
                  18 years in digital campaign management and audience acquisition. Google-certified senior ads expert.
                  Skilled in RAG systems, API integrations, and scalable web applications.
                </p>
                <p className="text-xs font-semibold text-[#8B9D8B]">
                  Focus: Audience Acquisition, Technology, Platform Architecture
                </p>
              </div>

              {/* John */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-[#8B9D8B]/20">
                  <img
                    src="/images/john-20lochrie-2c-20grey-20large.jpeg"
                    alt="John Lochrie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-1">John Lochrie</h3>
                <p className="text-sm font-semibold text-[#8B9D8B] mb-3">CFO & Head of Growth</p>
                <p className="text-sm text-[#666] leading-relaxed mb-3">
                  Ex-Director positions at Barclays Private Wealth Geneva, Switzerland, First Abu Dhabi Bank, and
                  Citibank. Deep understanding of GCC financial landscape, corporate partnerships, and scaling
                  operations in regulated industries.
                </p>
                <p className="text-xs font-semibold text-[#8B9D8B]">
                  Focus: Finance, B2B Partnerships, Operational Scale
                </p>
              </div>
            </div>
          </div>

          {/* Slide 11: Use of Funds */}
          <div className="bg-gradient-to-br from-white to-[#F5F5DC] rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 10
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              Use of Funds
            </h2>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#8B9D8B] mb-2">Raising: $300,000 Pre-Seed</h3>
                <p className="text-[#666]">18-month runway to Series A milestones</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team & Talent */}
                <div className="bg-white rounded-xl p-6 border border-[#8B9D8B]/20 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#8B9D8B]/10 flex items-center justify-center text-[#8B9D8B]">
                      <DoodlePeople />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#333]">Team & Talent</h4>
                      <p className="text-2xl font-bold text-[#8B9D8B]">40% — $120K</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li>• Head of Growth Marketing (UAE digital expert)</li>
                    <li>• Senior Engineer (contract)</li>
                    <li className="italic text-xs">*Variable based on hiring timeline*</li>
                  </ul>
                </div>

                {/* Marketing & User Acquisition */}
                <div className="bg-white rounded-xl p-6 border border-[#8B9D8B]/20 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF9B7A]/10 flex items-center justify-center text-[#FF9B7A]">
                      <DoodleChart />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#333]">Marketing & User Acquisition</h4>
                      <p className="text-2xl font-bold text-[#FF9B7A]">35% — $105K</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li>• Paid ads (Google, Instagram, Snapchat): $60K</li>
                    <li>• Content creation (SEO articles, video): $25K</li>
                    <li>• Influencer partnerships: $15K</li>
                    <li className="italic text-xs">*Variable based on CAC performance*</li>
                  </ul>
                </div>

                {/* Product Development */}
                <div className="bg-white rounded-xl p-6 border border-[#8B9D8B]/20 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#8B9D8B]/10 flex items-center justify-center text-[#8B9D8B]">
                      <DoodleRocket />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#333]">Product Development</h4>
                      <p className="text-2xl font-bold text-[#8B9D8B]">15% — $45K</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li>• Mobile app MVP (iOS + Android): $30K</li>
                    <li>• Feature enhancements: $10K</li>
                    <li>• Research database expansion: $5K</li>
                  </ul>
                </div>

                {/* Operations */}
                <div className="bg-white rounded-xl p-6 border border-[#8B9D8B]/20 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF9B7A]/10 flex items-center justify-center text-[#FF9B7A]">
                      <DoodleGear />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#333]">Operations</h4>
                      <p className="text-2xl font-bold text-[#FF9B7A]">10% — $30K</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li>• Legal & compliance: $15K</li>
                    <li>• Infrastructure & tools: $15K</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 12: Milestones */}
          <div className="bg-white rounded-[32px] p-10 sm:p-14 border border-[#8B9D8B]/20 min-h-[450px] relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-[#8B9D8B]/60 bg-[#8B9D8B]/5 px-3 py-1 rounded-full">
              Slide 11
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              Post-Launch Key Milestones (18 Months)
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#8B9D8B] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#8B9D8B] text-white text-sm font-bold px-3 py-1 rounded-full">Month 6</span>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
                    High-Fidelity Launch
                  </span>
                </div>
                <ul className="space-y-1.5 text-sm text-[#666]">
                  <li>• Top 50 Health App (UAE)</li>
                  <li>• 500+ Active Users with 40% Retention</li>
                  <li>• 1st B2B Corporate Pilot Signed</li>
                  <li>• $5K MRR (~300 paid subscribers)</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#6B8E6B] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#6B8E6B] text-white text-sm font-bold px-3 py-1 rounded-full">Month 12</span>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
                    $15K MRR ($180K ARR)
                  </span>
                </div>
                <ul className="space-y-1.5 text-sm text-[#666]">
                  <li>• 1,000 Paid Subscribers (CAC stabilized &lt; $45)</li>
                  <li>• KSA Launch Live (Khaleeji Dialect + Saudi Payment Gateway)</li>
                  <li>• 3 Major Influencer Ambassadors (Exclusive 1-Year Contracts)</li>
                  <li>• LTV:CAC ratio validated at 12x</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#FF6B6B] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#FF6B6B] text-white text-sm font-bold px-3 py-1 rounded-full">Month 18</span>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
                    $45K MRR ($540K ARR)
                  </span>
                </div>
                <ul className="space-y-1.5 text-sm text-[#666]">
                  <li>• 2,500 Paid Subscribers</li>
                  <li>• 3 B2B Enterprise Contracts Live (Employee Wellness Benefit)</li>
                  <li>
                    • <strong>Series A Ready</strong> (Meeting MENA traction benchmarks)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Slide 13: Vision */}
          <div className="bg-gradient-to-br from-[#8B9D8B] to-[#6B8E6B] rounded-[32px] p-10 sm:p-14 min-h-[500px] flex flex-col justify-between border border-[#7A8C7A] overflow-hidden relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-white/60 bg-white/10 px-3 py-1 rounded-full">
              Slide 12
            </div>
            <div className="flex items-center gap-3 mb-8">
              <DoodleRocket className="w-12 h-12 text-[#F5F5DC]" />
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              By 2030, Reflecta will be the Standard Operating System for Parenting in the GCC and beyond. We are
              building the bridge between clinical pediatric care and daily family life—starting in the UAE, dominating
              the MENA region, and exporting our &apos;Safety Layer&apos; technology to the world.
            </p>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-white mb-6">
              The 2030 Targets (The &quot;North Star&quot;)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-sm text-white/70 mb-2 uppercase tracking-wide font-semibold">Impact</div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">1M+ Families</div>
                <div className="text-sm text-white/80">Supported Daily (GCC & Beyond)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-sm text-white/70 mb-2 uppercase tracking-wide font-semibold">Financial</div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$25M ARR</div>
                <div className="text-sm text-white/80">Annual Recurring Revenue</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-sm text-white/70 mb-2 uppercase tracking-wide font-semibold">Reach</div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">Global Scale</div>
                <div className="text-sm text-white/80">MENA Dominance + EU/Asia Expansion</div>
              </div>
            </div>
            <div className="text-center mt-auto">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-white mb-4">
                Let&apos;s Define the Future of Family Health.
              </h3>
              <p className="text-lg text-white/90 mb-6">
                Join us in building the first clinically-verified parenting AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-white">
                  <MailIcon className="w-5 h-5" />
                  <span>info@reflectaa.app</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <PhoneIcon className="w-5 h-5" />
                  <span>+971 56 179 8887</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
