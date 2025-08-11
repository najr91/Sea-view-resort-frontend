import { ChevronDown } from 'lucide-react';

export default function RoomsHero() {
  return (
    <section
      className="relative hero-standard w-full bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1578898887932-47e3c74f2f6b?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-serif mb-4">Rooms and Suites</h1>
        <p className="max-w-2xl mx-auto text-resort-cream/90 text-sm md:text-base leading-relaxed">
          The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View
          pictures and find your perfect luxury bedroom design.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center">
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}


