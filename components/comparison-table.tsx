import { CheckCircle2, X } from "lucide-react"

const comparisons = [
  "Authentic product guarantee",
  "Fast delivery & easy shipping",
  "Quick customer support",
]

export function ComparisonTable() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-5">

        <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-3 text-center border-b border-border">

            <div />

            <div className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground py-7 font-semibold text-sm md:text-base relative">
              <span>Stress Keys</span>

              <div className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full bg-white/20">
                Best Choice
              </div>
            </div>

            <div className="py-7 font-semibold text-muted-foreground text-sm md:text-base">
              Others
            </div>

          </div>

          {/* Rows */}
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 items-center text-center transition-colors
              hover:bg-muted/30
              ${index !== comparisons.length - 1 ? "border-b border-border" : ""}
              `}
            >

              {/* Feature */}
              <div className="py-6 px-4 md:px-6 text-left">
                <p className="font-medium text-foreground text-sm md:text-base">
                  {item}
                </p>
              </div>

              {/* Stress Keys */}
              <div className="bg-primary/5 py-6 flex justify-center items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Others */}
              <div className="py-6 flex justify-center items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                  <X className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}