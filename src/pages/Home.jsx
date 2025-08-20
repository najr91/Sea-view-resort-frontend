import SearchFilters from '../components/home/SearchFilters.jsx';
import Facilities from '../components/home/Facilities.jsx';
import RoomsShowcase from '../components/home/RoomsShowcase.jsx';
import Testimonials from '../components/home/Testimonials.jsx';

export default function Home() {
  return (
    <div className="bg-resort-cream">
      
      <section className="relative h-[80vh] w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dokpk3c2l/video/upload/v1755464603/Dise%C3%B1o_sin_t%C3%ADtulo_tn9f4u.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 drop-shadow-md">
            Sea View Resort
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Descubrí tu lugar frente al mar
          </p>
          <div className="w-full max-w-3xl">
            <SearchFilters />
          </div>
        </div>
      </section>

      
      <Facilities />
      <RoomsShowcase />
      <Testimonials />
    </div>
  );
}


