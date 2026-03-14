"use client"

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">

      <h1 className="text-4xl font-bold text-center mb-10">
        About Us
      </h1>

      <div className="bg-card border border-border rounded-xl p-8 md:p-10 space-y-6">

        <h2 className="text-2xl font-semibold text-center">
          Small Tool. Big Relief.
        </h2>

        <p className="text-muted-foreground leading-relaxed text-center">
          At <span className="font-semibold">Zenvvix</span>, we believe small tools can make a big difference in everyday life. 
          Modern life brings constant pressure, distractions, and stress, making it harder to stay focused and calm.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Our <span className="font-semibold">Stress Key</span> is designed to provide a satisfying tactile experience 
          that keeps your hands engaged and your mind relaxed. The smooth press and gentle click help reduce stress, 
          manage ADHD, and release nervous energy throughout the day.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Compact and durable, the Stress Key fits easily on a keychain or in your pocket. Its clean design, 
          strong build, and RGB lighting add a modern touch while enhancing the sensory experience.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Designed for kids, teens, and adults, it’s a simple tool for staying calm, focused, 
          and balanced during work, study, or everyday moments.
        </p>

        <p className="text-center font-medium pt-2">
          Our mission is simple — help people feel more focused and less stressed.
        </p>

      </div>

    </div>
  )
}