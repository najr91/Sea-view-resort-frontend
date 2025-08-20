import SearchFilters from '../components/home/SearchFilters.jsx';
import Facilities from '../components/home/Facilities.jsx';
import RoomsShowcase from '../components/home/RoomsShowcase.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import RoomTestPanel from '../components/home/RoomTestPanel.jsx';

export default function Home() {
  return (
    <div className="bg-resort-cream">
      <section className="hero-standard bg-resort-cream flex items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-resort-olive mb-16 animate-fade-in">Sea View Resort</h1>
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


