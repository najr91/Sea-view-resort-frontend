import { Card } from '../../components/ui/Card';
import { Star } from 'lucide-react';

const testimonials = [
  { date: '3 Mar 2023', name: 'Anthony Bell' },
  { date: '25 Mar 2023', name: 'Regina Delia' },
  { date: '8 Apr 2023', name: 'German Alva' },
];

export default function Testimonials() {
  return (
    <section className="section-standard bg-resort-cream flex items-start pt-16 md:pt-20 pb-12">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl font-serif text-resort-olive">Testimonies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <p className="text-sm text-resort-slate mb-2">{testimonial.date}</p>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-resort-gold text-resort-gold" />
                  ))}
                </div>
              </div>
              <blockquote className="text-sm text-resort-slate mb-4 leading-relaxed">
                "The service at the Hotel Magnificent was exceptional. There was absolutely no issue that was not
                addressed timely and with satisfactory results. We were particularly impressed with how the hotel staff
                anticipated our needs..."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-resort-beige rounded-full"></div>
                <div>
                  <p className="font-medium text-resort-olive">{testimonial.name}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


