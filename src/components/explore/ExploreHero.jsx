import { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal.jsx';

export default function ExploreHero() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative hero-standard w-full bg-center bg-cover flex items-center justify-center">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Explora Nuestro Resort
          </h1>
          <p className="max-w-3xl mx-auto text-resort-cream/90 text-lg md:text-xl leading-relaxed mb-8">
            Descubre todas las comodidades y experiencias que te esperan en Sea View Resort
          </p>

          <button
            type="button"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Ver video tour"
          >
            <Play className="w-6 h-6 text-gray-800 mr-3" />
            <span className="text-gray-800 font-medium text-lg">Ver Video Tour</span>
          </button>
        </div>
      </section>

      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
      />
    </>
  );
}


