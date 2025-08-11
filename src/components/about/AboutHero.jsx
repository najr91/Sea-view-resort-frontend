export default function AboutHero() {
  return (
    <section
      className="relative hero-standard w-full bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1578898887932-47e3c74f2f6b?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-serif mb-4">About us</h1>
        <p className="max-w-2xl mx-auto text-resort-cream/90 text-sm md:text-base leading-relaxed">
          Discover our story, our commitment to exceptional hospitality and the values that guide Sea View Resort.
        </p>
      </div>
    </section>
  );
}


