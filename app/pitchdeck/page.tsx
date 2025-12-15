import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PitchDeckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6">
        <Link href="/" className="flex items-center">
          <span className="text-white text-sm font-light hover:opacity-80 transition-opacity">← Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4">
            <span className="font-medium italic">Reflecta</span> Pitch Deck
          </h1>
          <p className="text-lg text-white/70 font-light">Compassionate, Research-Backed Parenting Support</p>
        </div>

        {/* Pitch Deck Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
          <div className="space-y-8 text-white">
            {/* Problem */}
            <section>
              <h2 className="text-3xl font-medium mb-4">The Problem</h2>
              <p className="text-white/80 leading-relaxed">
                Parents face an overwhelming amount of conflicting advice and lack access to reliable, evidence-based
                guidance when they need it most. Traditional resources are time-consuming to navigate and often
                inaccessible during critical moments.
              </p>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Our Solution</h2>
              <p className="text-white/80 leading-relaxed">
                Reflecta is an AI-powered parenting companion that delivers compassionate, evidence-based guidance
                backed by 500,000+ peer-reviewed studies. Available 24/7, we provide instant, personalized support when
                parents need it most.
              </p>
            </section>

            {/* Market */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Market Opportunity</h2>
              <p className="text-white/80 leading-relaxed">
                The global parenting market is valued at billions, with millions of parents seeking reliable guidance
                daily. Our AI-driven approach scales personalized support to reach families worldwide.
              </p>
            </section>

            {/* Traction */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Traction</h2>
              <p className="text-white/80 leading-relaxed">
                Join our growing waitlist of parents eager for compassionate, research-backed parenting support.
              </p>
            </section>

            {/* CTA */}
            <div className="pt-8 flex justify-center">
              <Link href="/">
                <Button className="bg-white text-emerald-900 hover:bg-white/90 px-8 py-6 text-base rounded-full">
                  Join the Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
