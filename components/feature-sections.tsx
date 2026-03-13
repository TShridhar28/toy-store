import Image from "next/image"

const features = [
  {
    title: "Perfect solution for stress & ADHD",
    description:
      "This fidget key helps reduce stress and manage ADHD by keeping your hands engaged with smooth, satisfying presses. The tactile feedback and calming interaction support better focus, ease anxiety, and provide a simple way to release nervous energy throughout the day.",
    image: "/adhd.png",
    imageAlt: "Stress Key fidget toy on desk with keychain",
    reverse: false,
    badge: "Stress relief right on your keychain.",
  },
  {
    title: "Maximum Relief.",
    description:
      "A compact, tough fidget key designed for daily stress relief. Clean design, strong build, and a click that feels just right.",
    image: "/color.png",
    imageAlt: "Stress Key with RGB lighting",
    reverse: true,
    badge: null,
  },
  {
    title: "Suitable for all age groups",
    description:
      "Designed for everyone, its smooth tactile press and gentle click provide engaging stress relief for kids, teens, and adults alike. Safe, fun, and versatile, it's an ideal gift for anyone looking to stay calm and focused.",
    image: "/age.png",
    imageAlt: "Hand holding Stress Key",
    reverse: false,
    badge: null,
  },
]

export function FeatureSections() {
  return (
    <section className="pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`py-14 md:py-20 ${
              index !== features.length - 1
                ? "border-b border-border/60"
                : ""
            }`}
          >
            <div
              className={`grid items-center gap-12 lg:gap-20 lg:grid-cols-2 ${
                feature.reverse ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`flex justify-center ${
                  feature.reverse ? "lg:col-start-2" : ""
                }`}
              >
                <div className="relative w-full max-w-lg aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                  />

                  {feature.badge && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs md:text-sm font-semibold shadow-md backdrop-blur">
                      {feature.badge}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div
                className={`max-w-xl space-y-5 ${
                  feature.reverse ? "lg:col-start-1" : ""
                }`}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
                  {feature.title}
                </h2>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}