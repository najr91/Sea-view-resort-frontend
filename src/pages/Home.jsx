import SearchFilters from '../components/home/SearchFilters.jsx';
import Facilities from '../components/home/Facilities.jsx';
import RoomsShowcase from '../components/home/RoomsShowcase.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import RoomTestPanel from '../components/home/RoomTestPanel.jsx';

export default function Home() {
  return (
    <div className="bg-resort-cream">
      <section
        className="hero-standard relative bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 animate-fade-in">
            Sea View Resort
          </h1>
          <p className="text-xl md:text-2xl text-resort-cream mb-8 max-w-3xl mx-auto">
            Tu escape perfecto al paraíso costero
          </p>
          <SearchFilters />
        </div>
      </section>

      
      <Facilities />
      <RoomsShowcase />
      <Testimonials />
      
      {/* Panel de prueba para demostrar actualización automática */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto">
          <RoomTestPanel />
        </div>
      </section>
    </div>
  );
}


