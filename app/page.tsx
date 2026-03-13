import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeatureSections } from "@/components/feature-sections"
import { ComparisonTable } from "@/components/comparison-table"
import { Footer } from "@/components/footer"
import { StickyCart } from "@/components/sticky-cart"

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Header />
      <HeroSection />
      <FeatureSections />
      <ComparisonTable />
      <Footer />
      <StickyCart />
    </main>
  )
}
