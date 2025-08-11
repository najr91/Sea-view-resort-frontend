import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const quickLinks = [
  { label: 'Explore', to: '/explore' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
];

const companyLinks = ['Privacy policy', 'Terms of service', 'FAQ', 'Careers'];

export default function Footer() {
  return (
    <footer className="bg-resort-olive text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Sea View Resort</h3>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-resort-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link}>
                  <span className="hover:text-resort-gold transition-colors cursor-pointer">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest news and updates to get amazing discounts</p>
            <div className="flex gap-2 mb-6">
              <Input type="email" placeholder="Enter your email" className="bg-white text-gray-900 text-sm flex-1" />
              <Button variant="secondary">Subscribe</Button>
            </div>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Icon key={index} className="w-5 h-5 hover:text-resort-cyan cursor-pointer transition-colors" />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-resort-taupe mt-8 pt-8 text-center text-sm">
          <p>Sea View Resort - 2024</p>
        </div>
      </div>
    </footer>
  );
}


