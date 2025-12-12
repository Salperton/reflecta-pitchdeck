"use client"

import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google"
import html2canvas from "html2canvas"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
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

  return (
    <div className={`${plusJakarta.variable} ${spaceGrotesk.variable} font-[family-name:var(--font-plus-jakarta)]`}>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={handleDownloadImage}
          className="px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-[#8B9D8B] hover:text-white transition-all"
        >
          Download Deck
        </button>
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
          <div className="bg-gradient-to-br from-[#8B9D8B] to-[#6B8E6B] rounded-[32px] p-8 sm:p-12 min-h-[500px] flex flex-col justify-between border border-[#7A8C7A] overflow-hidden">
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
              <span className="text-sm text-white/80">Investor Deck 2025</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#FF6B6B]/10 rounded-[32px] p-6 sm:p-8 border border-[#FF6B6B]/20 min-h-[400px] flex flex-col">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold mb-6 text-[#FF6B6B]">
                The Current Reality
              </h2>
              <div className="space-y-4 flex-1">
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleWarning />
                  </span>
                  <p className="text-sm sm:text-base">
                    Fragmented, conflicting advice across blogs, forums, social media
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleStress />
                  </span>
                  <p className="text-sm sm:text-base">
                    <strong>48%</strong> of parents say stress is completely overwhelming
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleSearch />
                  </span>
                  <p className="text-sm sm:text-base">
                    Average parent consults <strong>7+ sources</strong> for one question
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#FF6B6B] flex-shrink-0">
                    <DoodleLock />
                  </span>
                  <p className="text-sm sm:text-base">Research locked behind paywalls & academic jargon</p>
                </div>
              </div>
            </div>

            <div className="bg-[#8B9D8B]/10 rounded-[32px] p-6 sm:p-8 border border-[#8B9D8B]/30 min-h-[400px] flex flex-col">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold mb-6 text-[#8B9D8B]">
                What Parents Need
              </h2>
              <div className="space-y-4 flex-1">
                <div className="flex gap-3">
                  <span className="text-[#8B9D8B] flex-shrink-0">
                    <DoodleCheckmark />
                  </span>
                  <p className="text-sm sm:text-base">Trustworthy, research-backed guidance</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#8B9D8B] flex-shrink-0">
                    <DoodleLightning />
                  </span>
                  <p className="text-sm sm:text-base">Instant access, 24/7 availability</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#8B9D8B] flex-shrink-0">
                    <DoodleBaby />
                  </span>
                  <p className="text-sm sm:text-base">Personalized to their child's age and needs</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#8B9D8B] flex-shrink-0">
                    <DoodleHandshake />
                  </span>
                  <p className="text-sm sm:text-base">Connection to professionals when needed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: The Solution */}
          <div className="bg-gradient-to-br from-white to-[#F5F5DC] rounded-[32px] p-6 sm:p-8 border border-[#8B9D8B]/20 min-h-[500px]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              The Solution: Reflecta
            </h2>
            <p className="text-lg sm:text-xl text-[#666] mb-8">
              The First AI Parenting Assistant Backed by Real Research
            </p>

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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#8B9D8B]">
                  500K+
                </div>
                <p className="text-xs sm:text-sm text-[#666]">Research Papers</p>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#8B9D8B]">
                  24/7
                </div>
                <p className="text-xs sm:text-sm text-[#666]">Availability</p>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#8B9D8B]">
                  &lt;2s
                </div>
                <p className="text-xs sm:text-sm text-[#666]">Response Time</p>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#8B9D8B]">
                  4-Tier
                </div>
                <p className="text-xs sm:text-sm text-[#666]">Quality System</p>
              </div>
            </div>
          </div>

          {/* Slide 4: Market Opportunity */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white rounded-[32px] p-6 sm:p-8 border border-[#404040] min-h-[500px]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              Market Opportunity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="text-sm text-[#8B9D8B] uppercase tracking-wider mb-2">TAM</div>
                <div className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold mb-2">$70B+</div>
                <p className="text-sm text-white/70">Global parenting products & services market</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="text-sm text-[#8B9D8B] uppercase tracking-wider mb-2">SAM</div>
                <div className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold mb-2">$8.5B+</div>
                <p className="text-sm text-white/70">Digital parenting solutions market</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="text-sm text-[#8B9D8B] uppercase tracking-wider mb-2">SOM (Year 3)</div>
                <div className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold mb-2">$150M</div>
                <p className="text-sm text-white/70">UAE + GCC focus markets</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#8B9D8B] rounded-full"></div>
                <p className="text-sm sm:text-base">
                  <strong>140M births</strong> globally per year
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#8B9D8B] rounded-full"></div>
                <p className="text-sm sm:text-base">
                  Mental health apps growing <strong>14.6% CAGR</strong> to $17.52B by 2030
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#8B9D8B] rounded-full"></div>
                <p className="text-sm sm:text-base">
                  Parenting apps market <strong>$1.69B → $6.02B</strong> by 2035
                </p>
              </div>
            </div>
          </div>

          {/* Slide 5: Business Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#8B9D8B]/20 min-h-[450px]">
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

            <div className="bg-gradient-to-br from-[#8B9D8B] to-[#6B8E6B] text-white rounded-[32px] p-6 sm:p-8 border border-[#7A8C7A] min-h-[450px]">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold mb-6">
                5-Year Revenue
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Year 1</span>
                    <span className="font-bold">$180K</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: "8%" }}></div>
                  </div>
                  <p className="text-xs text-white/70 mt-1">1,000 paying users</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Year 3</span>
                    <span className="font-bold">$4.5M</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <p className="text-xs text-white/70 mt-1">20,000 users + B2B partnerships</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Year 5</span>
                    <span className="font-bold">$22M</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: "100%" }}></div>
                  </div>
                  <p className="text-xs text-white/70 mt-1">80,000 users + B2B revenue</p>
                </div>
              </div>

              <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/70 text-xs">CAC</div>
                    <div className="font-bold">$45</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs">Payback</div>
                    <div className="font-bold">3 months</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs">Gross Margin</div>
                    <div className="font-bold">85%</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs">LTV:CAC</div>
                    <div className="font-bold">12:1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 6: Competitive Advantage */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#8B9D8B]/20 min-h-[500px]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              Competitive Advantage
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#8B9D8B]">
                    <th className="text-left py-3 font-bold">Feature</th>
                    <th className="text-center py-3 font-bold text-[#8B9D8B]">Reflecta</th>
                    <th className="text-center py-3 font-bold text-[#666]">Mental Health Apps</th>
                    <th className="text-center py-3 font-bold text-[#666]">AI Chatbots</th>
                    <th className="text-center py-3 font-bold text-[#666]">Therapy Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#eee]">
                    <td className="py-3">Real-time research</td>
                    <td className="text-center flex justify-center">
                      <span className="text-[#8B9D8B] inline-block">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center text-[#999]">-</td>
                    <td className="text-center text-[#999]">-</td>
                    <td className="text-center">
                      <span className="text-[#8B9D8B] inline-block">
                        <DoodleCheckmark />
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#eee]">
                    <td className="py-3">24/7 availability</td>
                    <td className="text-center">
                      <span className="text-[#8B9D8B] inline-flex justify-center">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-[#8B9D8B] inline-flex justify-center">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-[#8B9D8B] inline-flex justify-center">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center text-[#999]">Limited</td>
                  </tr>
                  <tr className="border-b border-[#eee]">
                    <td className="py-3">Transparent citations</td>
                    <td className="text-center">
                      <span className="text-[#8B9D8B] inline-flex justify-center">
                        <DoodleCheckmark />
                      </span>
                    </td>
                    <td className="text-center text-[#999]">-</td>
                    <td className="text-center text-[#999]">-</td>
                    <td className="text-center">Varies</td>
                  </tr>
                  <tr className="border-b border-[#eee]">
                    <td className="py-3">Parenting-specific</td>
                    <td className="text-center">✅ Specialized</td>
                    <td className="text-center text-[#999]">❌ General</td>
                    <td className="text-center text-[#999]">❌ General</td>
                    <td className="text-center text-[#999]">❌ General</td>
                  </tr>
                  <tr>
                    <td className="py-3">Cost</td>
                    <td className="text-center font-bold text-[#8B9D8B]">$15-25/mo</td>
                    <td className="text-center">$12-15/mo</td>
                    <td className="text-center">$0-20/mo</td>
                    <td className="text-center">$260-436/mo</td>
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

          {/* Slide 7: Traction */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white rounded-[32px] p-6 sm:p-8 border border-[#404040] min-h-[450px]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              Traction & Validation
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-[#8B9D8B] font-bold mb-4">Product Development</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">MVP fully operational (9 core features)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">500K+ papers via OpenAlex API</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">100+ curated papers database</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">UAE license verification system</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">3 validated assessment scales</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[#8B9D8B] font-bold mb-4">Technical Stack</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">Next.js + Supabase + OpenAI</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">99.9% uptime on Vercel</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">Mobile-responsive design</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">Content moderation & RLS security</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#8B9D8B]">✅</span>
                    <p className="text-sm">Complete user journey built</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-sm text-center">
                <strong className="text-[#8B9D8B]">Ready Now:</strong> Complete platform from onboarding → chat →
                assessment → guided plans
              </p>
            </div>
          </div>

          {/* Slide 8: Investment Ask */}
          <div className="bg-gradient-to-br from-[#8B9D8B] to-[#6B8E6B] text-white rounded-[32px] p-6 sm:p-8 border border-[#7A8C7A] min-h-[500px] flex flex-col justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
                Investment Ask
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <div className="text-sm text-white/70 mb-2">Seeking</div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold mb-2">$300K</div>
                  <p className="text-sm">Seed Round</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <div className="text-sm text-white/70 mb-2">Pre-Money Valuation</div>
                  <div className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold mb-2">$3M</div>
                  <p className="text-sm">10% equity offered</p>
                </div>
              </div>

              <h3 className="font-bold text-xl mb-4">Use of Funds</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">40%</div>
                  <p className="text-xs sm:text-sm text-white/80">Team Building</p>
                  <p className="text-xs text-white/60">$120K</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">35%</div>
                  <p className="text-xs sm:text-sm text-white/80">Marketing</p>
                  <p className="text-xs text-white/60">$105K</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">15%</div>
                  <p className="text-xs sm:text-sm text-white/80">Product Dev</p>
                  <p className="text-xs text-white/60">$45K</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">10%</div>
                  <p className="text-xs sm:text-sm text-white/80">Operations</p>
                  <p className="text-xs text-white/60">$30K</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 mt-6">
              <p className="text-sm text-center">
                <strong>18-month runway</strong> to Series A-ready metrics: $1.6M ARR, 7,500+ paying users
              </p>
            </div>
          </div>

          {/* Slide 9: Milestones */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#8B9D8B]/20 min-h-[450px]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6">
              Key Milestones (18 Months)
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-[#8B9D8B] pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#8B9D8B] text-white text-sm font-bold px-3 py-1 rounded-full">Month 6</span>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">$9K MRR</span>
                </div>
                <ul className="space-y-1 text-sm text-[#666]">
                  <li>• 2,500 total users (500 paying)</li>
                  <li>• 15 enrolled clinicians (UAE)</li>
                  <li>• 3 corporate pilot partnerships</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#6B8E6B] pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#6B8E6B] text-white text-sm font-bold px-3 py-1 rounded-full">Month 12</span>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">$45K MRR</span>
                </div>
                <ul className="space-y-1 text-sm text-[#666]">
                  <li>• 12,000 total users (2,500 paying)</li>
                  <li>• 40 clinicians across UAE + Saudi</li>
                  <li>• 2 white-label pilot agreements</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#FF6B6B] pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#FF6B6B] text-white text-sm font-bold px-3 py-1 rounded-full">Month 18</span>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">$135K MRR</span>
                </div>
                <ul className="space-y-1 text-sm text-[#666]">
                  <li>• 30,000 total users (7,500 paying) → $1.6M ARR</li>
                  <li>• 80+ clinicians across GCC</li>
                  <li>• 10 B2B partnerships • Mobile apps launched</li>
                  <li>
                    • <strong>Series A Ready</strong> - LTV:CAC 10:1+
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Slide 10: Vision */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white rounded-[32px] p-6 sm:p-8 border border-[#404040] min-h-[500px] flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B9D8B]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B9D8B]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-4">
                Our Vision
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
                Every parent deserves access to evidence-based knowledge—delivered with empathy, personalization, and
                24/7 availability.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#8B9D8B] mb-1">
                    1M
                  </div>
                  <p className="text-xs sm:text-sm">Families Supported</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#8B9D8B] mb-1">
                    10K+
                  </div>
                  <p className="text-xs sm:text-sm">Clinicians</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#8B9D8B] mb-1">
                    15+
                  </div>
                  <p className="text-xs sm:text-sm">Global Markets</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#8B9D8B] mb-1">
                    50M+
                  </div>
                  <p className="text-xs sm:text-sm">Questions Answered</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-center text-sm sm:text-base">
                We're not just building a parenting app—we're creating a new category of AI-powered, evidence-based
                healthcare support that could expand to eldercare, chronic disease management, and mental health.
              </p>
            </div>
          </div>

          {/* Slide 11: Contact */}
          <div className="bg-gradient-to-br from-[#8B9D8B] to-[#6B8E6B] text-white rounded-[32px] p-8 sm:p-12 min-h-[400px] flex flex-col justify-center items-center text-center border border-[#7A8C7A]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-6xl font-bold mb-6">
              Let's Build the Future
              <br />
              of Parenting Together
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
              $300K Seed Round • $3M Pre-Money Valuation • 10% Equity
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white text-[#8B9D8B] px-8 py-3 rounded-full font-bold">Schedule a Demo</div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold">
                Review Materials
              </div>
            </div>

            <div className="mt-12 flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#8B9D8B" strokeWidth="2" className="w-6 h-6">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">Reflecta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
