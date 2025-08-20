import { Waves, Wifi, Coffee, Dumbbell, Gamepad2, Lightbulb, Shirt, Car } from 'lucide-react';

const facilities = [
  { icon: Waves, label: 'Piscina' },
  { icon: Wifi, label: 'Wi‑Fi de cortesía' },
  { icon: Coffee, label: 'Desayuno incluido' },
  { icon: Dumbbell, label: 'Gimnasio' },
  { icon: Gamepad2, label: 'Sala de juegos' },
  { icon: Lightbulb, label: 'Energía 24/7' },
  { icon: Shirt, label: 'Lavandería' },
  { icon: Car, label: 'Estacionamiento' },
];

export default function Facilities() {
  return (
    <section className="section-standard bg-white flex items-start pt-16 md:pt-20 pb-12">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl font-serif text-resort-olive mb-4">Nuestras instalaciones</h2>
          <p className="text-resort-slate">Comodidades modernas de categoría para una estadía excepcional.</p>
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


