import SearchFilters from '../components/home/SearchFilters.jsx';
import Facilities from '../components/home/Facilities.jsx';
import RoomsShowcase from '../components/home/RoomsShowcase.jsx';
import Testimonials from '../components/home/Testimonials.jsx';

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
    </div>
  );
}


