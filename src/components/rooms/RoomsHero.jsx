import { ChevronDown } from 'lucide-react';

export default function RoomsHero() {
  const handleScrollDown = () => {
    const target = document.getElementById('rooms-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };
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
        <h1 className="text-white text-4xl md:text-5xl font-serif mb-4">Habitaciones y Suites</h1>
        <p className="max-w-2xl mx-auto text-resort-cream/90 text-sm md:text-base leading-relaxed">
          Habitaciones elegantes con diseño cuidado y todo lo necesario para una estadía perfecta.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-label="Desplazarse hacia abajo"
            onClick={handleScrollDown}
            className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}


