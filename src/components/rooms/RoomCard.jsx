import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Wifi, Coffee, Waves, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageGalleryModal from './ImageGalleryModal.jsx';

export default function RoomCard({ imageUrl, imageUrls = [], title, price, available = 'Yes' }) {
  const images = imageUrls && imageUrls.length ? imageUrls : [imageUrl];
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setCurrentIndex((i) => (i + 1) % images.length);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Card className="group overflow-hidden bg-white rounded-xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative cursor-pointer overflow-hidden" onClick={() => setOpenModal(true)}>
        <img src={images[currentIndex]} alt={title} className="w-full h-56 md:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur bg-white/80 ${available === 'Yes' ? 'text-emerald-700' : 'text-rose-700'}`}>{available === 'Yes' ? 'Disponible' : 'No disponible'}</span>
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <ImageGalleryModal open={openModal} onClose={() => setOpenModal(false)} images={images} initialIndex={currentIndex} />
      <CardContent className="px-0">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-start justify-between text-sm text-resort-slate">
            <h3 className="text-gray-900 font-semibold text-lg font-serif">{title}</h3>
            <span className="text-[11px] text-gray-500">Capacidad: 2-3</span>
          </div>
          <div className="mt-2 text-gray-900 font-semibold text-lg">${price.toLocaleString()}</div>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-resort-slate border-t border-gray-100">
          <span className="inline-flex items-center gap-1.5 text-xs bg-gray-50 rounded-full px-2.5 py-1"><Wifi className="w-4 h-4" /> WiFi</span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-gray-50 rounded-full px-2.5 py-1"><Coffee className="w-4 h-4" /> Desayuno</span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-gray-50 rounded-full px-2.5 py-1"><Waves className="w-4 h-4" /> Piscina</span>
        </div>

        <div className="px-4 pb-4">
          <Button className="w-full">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  );
}


