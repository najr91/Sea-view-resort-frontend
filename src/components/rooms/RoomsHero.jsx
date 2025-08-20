import { ChevronDown } from 'lucide-react';
import Hero from '../hero/Hero';
import { Button } from '../ui/Button';

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
    <Hero
      backgroundImage="https://images.unsplash.com/photo-1578898887932-47e3c74f2f6b?q=80&w=2000&auto=format&fit=crop"
      overlay="bg-black/40"
      title="Habitaciones y Suites"
      subtitle="Habitaciones elegantes con diseño cuidado y todo lo necesario para una estadía perfecta."
    >
      <div className="mt-8 flex justify-center">
        <Button
          aria-label="Desplazarse hacia abajo"
          onClick={handleScrollDown}
          variant="ghost"
          className="w-10 h-10 p-0 border border-white/80 hover:bg-white/10 focus:ring-white/60"
          radius="full"
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </Button>
      </div>
    </Hero>
  );
}


