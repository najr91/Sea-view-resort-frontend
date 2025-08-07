import { Button } from './components/ui/Button';
import { Card, CardContent } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/Select';
import { MapPin, Bed, Users, Calendar, CalendarDays, Waves, Wifi, Coffee, Dumbbell, Gamepad2, Lightbulb, Shirt, Car, Star, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-resort-cream">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-resort-olive rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-resort-olive font-medium transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-resort-olive font-medium transition-colors">
            Explore
          </a>
          <a href="#" className="text-gray-700 hover:text-resort-olive font-medium transition-colors">
            Rooms
          </a>
          <a href="#" className="text-gray-700 hover:text-resort-olive font-medium transition-colors">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-resort-olive font-medium transition-colors">
            Contact
          </a>
        </nav>

        <Button>Book Now</Button>
      </header>

      {/* Hero Section */}
      <section className="bg-resort-cream py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-resort-olive mb-16 animate-fade-in">Sea View Resort</h1>

          {/* Booking Form */}
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-resort-slate">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="bali">Bali</SelectItem>
                      <SelectItem value="hawaii">Hawaii</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-resort-slate">
                    <Bed className="w-4 h-4" />
                    <span>Room type</span>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Standard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-resort-slate">
                    <Users className="w-4 h-4" />
                    <span>Person</span>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="2 Adults" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Adult</SelectItem>
                      <SelectItem value="2">2 Adults</SelectItem>
                      <SelectItem value="3">3 Adults</SelectItem>
                      <SelectItem value="4">4 Adults</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-resort-slate">
                    <Calendar className="w-4 h-4" />
                    <span>Check in</span>
                  </div>
                  <Input type="date" defaultValue="2024-05-15" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-resort-slate">
                    <CalendarDays className="w-4 h-4" />
                    <span>Check out</span>
                  </div>
                  <Input type="date" defaultValue="2024-05-20" />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button size="lg">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-resort-olive mb-4">Our Facilities</h2>
            <p className="text-resort-slate">We offer modern (5 star) hotel facilities for your comfort.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Waves, label: 'Swimming Pool' },
              { icon: Wifi, label: 'WiFi' },
              { icon: Coffee, label: 'Breakfast' },
              { icon: Dumbbell, label: 'Gym' },
              { icon: Gamepad2, label: 'Game center' },
              { icon: Lightbulb, label: '24/7 Light' },
              { icon: Shirt, label: 'Laundry' },
              { icon: Car, label: 'Parking space' }
            ].map((facility, index) => (
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

      {/* Luxurious Rooms Section */}
      <section
        className="py-16 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-resort-slate/70"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-white mb-4">Luxurious Rooms</h2>
            <p className="text-resort-cream">All room are design for your comfort</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                available: '3 Rooms available',
                description: 'Television set, Extra sheets and breakfast'
              },
              {
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                available: '4 Rooms available',
                description: 'Television set, Extra sheets, Breakfast, and fireplace'
              },
              {
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                available: '2 Rooms available',
                description: 'Television set, Extra sheets, Breakfast, and fireplace, Console and best rest'
              }
            ].map((room, index) => (
              <Card key={index} className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={room.image || "/placeholder.svg"}
                    alt={`Room ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-resort-olive text-white px-3 py-1 rounded text-sm">
                    {room.available}
                  </div>
                </div>
                <CardContent>
                  <p className="text-sm text-resort-slate">{room.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-resort-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-resort-olive">Testimonies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { date: '3 Mar 2023', name: 'Anthony Bell' },
              { date: '25 Mar 2023', name: 'Regina Delia' },
              { date: '8 Apr 2023', name: 'German Alva' }
            ].map((testimonial, index) => (
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

      {/* Footer */}
      <footer className="bg-resort-olive text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">Sea View Resort</h3>
            </div>

            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {['Explore', 'Rooms', 'Contact', 'About'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-resort-gold transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                {['Privacy policy', 'Terms of service', 'FAQ', 'Careers'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-resort-gold transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Newsletter</h4>
              <p className="text-sm mb-4">Get the latest news and updates to get amazing discounts</p>
              <div className="flex gap-2 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white text-gray-900 text-sm flex-1"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>

              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <Icon
                    key={index}
                    className="w-5 h-5 hover:text-resort-cyan cursor-pointer transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-resort-taupe mt-8 pt-8 text-center text-sm">
            <p>Sea View Resort - 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
