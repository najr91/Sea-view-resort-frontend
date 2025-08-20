import ExploreHero from '../components/explore/ExploreHero.jsx';
import ExploreSection from '../components/explore/ExploreSection.jsx';

const sections = [
  {
    title: 'Habitaciones de lujo',
    imageUrl:
      'https://images.unsplash.com/photo-1578898887932-47e3c74f2f6b?q=80&w=1600&auto=format&fit=crop',
    description:
      'Dormitorios elegantes con diseño personalizado y detalles exclusivos. Inspírese y encuentre su estilo ideal.',
  },
  {
    title: 'Centro de fitness',
    imageUrl:
      'https://images.unsplash.com/photo-1571907480495-2ba5f3b1d0d9?q=80&w=1600&auto=format&fit=crop',
    description:
      'Espacios modernos equipados para entrenar con comodidad y bienestar durante su estadía.',
  },
  {
    title: 'Restaurante',
    imageUrl:
      'https://images.unsplash.com/photo-1521017432531-fbd92d1cf990?q=80&w=1600&auto=format&fit=crop',
    description:
      'Gastronomía de autor con ingredientes frescos y locales, pensada para deleitar cada momento.',
  },
];

export default function Explore() {
  return (
    <div className="bg-white">
      <ExploreHero />

      <section className="py-10">
        <div className="container">
          <h2 className="text-center text-xl md:text-2xl text-gray-900 mb-6">Haga un recorrido</h2>
          <div className="space-y-12">
            {sections.map((s) => (
              <ExploreSection key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


