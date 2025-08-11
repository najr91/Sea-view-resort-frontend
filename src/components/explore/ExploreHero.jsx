import { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal.jsx';

export default function ExploreHero() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative w-full">
        <div
          className="hero-standard w-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center"
          onClick={() => setOpen(true)}
          aria-label="Play video tour"
        >
          <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center ring-1 ring-black/10">
            <Play className="w-8 h-8 text-gray-800" />
          </span>
        </button>
      </section>
      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
      />
    </>
  );
}


