import ExploreHero from '../components/explore/ExploreHero.jsx';
import ExploreSection from '../components/explore/ExploreSection.jsx';

const sections = [
  {
    title: 'Luxurious rooms',
    imageUrl:
      'https://images.unsplash.com/photo-1578898887932-47e3c74f2f6b?q=80&w=1600&auto=format&fit=crop',
    description:
      'The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design. See more ideas about luxurious bedrooms, bedroom design.',
  },
  {
    title: 'Gym center',
    imageUrl:
      'https://images.unsplash.com/photo-1571907480495-2ba5f3b1d0d9?q=80&w=1600&auto=format&fit=crop',
    description:
      'The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design. See more ideas about luxurious bedrooms, bedroom design.',
  },
  {
    title: 'Restaurant',
    imageUrl:
      'https://images.unsplash.com/photo-1521017432531-fbd92d1cf990?q=80&w=1600&auto=format&fit=crop',
    description:
      'The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design. See more ideas about luxurious bedrooms, bedroom design.',
  },
];

export default function Explore() {
  return (
    <div className="bg-white">
      <ExploreHero />

      <section className="py-10">
        <div className="container">
          <h2 className="text-center text-xl md:text-2xl text-gray-900 mb-6">Take a tour</h2>
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


