import { Waves, Coffee, Dumbbell, Wifi } from 'lucide-react';

const stats = [
  { label: 'Years of Excellence', value: '12+' },
  { label: 'Rooms & Suites', value: '80+' },
  { label: 'Awards', value: '15' },
  { label: 'Happy Guests', value: '25k+' },
];

const values = [
  { icon: Waves, title: 'Seaside Luxury', text: 'Rooms designed to offer breathtaking ocean views and serenity.' },
  { icon: Wifi, title: 'Modern Comfort', text: 'High-speed connectivity and amenities for a seamless stay.' },
  { icon: Coffee, title: 'Culinary Delight', text: 'Gourmet dining experiences with fresh, local ingredients.' },
  { icon: Dumbbell, title: 'Wellness', text: 'Spa and fitness facilities to relax, recharge and feel your best.' },
];

export default function AboutContent() {
  return (
    <section className="bg-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-serif text-resort-olive mb-4">Our Story</h2>
            <p className="text-resort-slate leading-relaxed">
              Since opening our doors, Sea View Resort has welcomed travelers from around the world with a promise of
              comfort, elegance, and unforgettable experiences. Blending contemporary design with coastal charm, our
              resort offers an oasis where every detail is crafted for your delight.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-lg bg-resort-cream">
                <div className="text-2xl font-semibold text-resort-olive">{s.value}</div>
                <div className="text-sm text-resort-slate">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="p-6 rounded-lg border border-gray-200">
              <v.icon className="w-6 h-6 text-resort-olive mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-resort-slate">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


