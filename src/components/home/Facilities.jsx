import { Waves, Wifi, Coffee, Dumbbell, Gamepad2, Lightbulb, Shirt, Car } from 'lucide-react';

const facilities = [
  { icon: Waves, label: 'Swimming Pool' },
  { icon: Wifi, label: 'WiFi' },
  { icon: Coffee, label: 'Breakfast' },
  { icon: Dumbbell, label: 'Gym' },
  { icon: Gamepad2, label: 'Game center' },
  { icon: Lightbulb, label: '24/7 Light' },
  { icon: Shirt, label: 'Laundry' },
  { icon: Car, label: 'Parking space' },
];

export default function Facilities() {
  return (
    <section className="section-standard bg-white flex items-start pt-16 md:pt-20 pb-12">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl font-serif text-resort-olive mb-4">Our Facilities</h2>
          <p className="text-resort-slate">We offer modern (5 star) hotel facilities for your comfort.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 justify-items-center">
          {facilities.map((facility, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-resort-gold/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-resort-gold/50 transition-colors">
                <facility.icon className="w-8 h-8 text-resort-olive" />
              </div>
              <h3 className="font-medium text-resort-olive group-hover:text-resort-olive/80 transition-colors">
                {facility.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


