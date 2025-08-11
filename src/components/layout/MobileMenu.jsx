import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Explore', to: '/explore' },
  { name: 'Rooms', to: '/rooms' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="md:hidden fixed inset-0 z-40 bg-black/40" onClick={onClose}>
      <div className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-resort-olive rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="flex flex-col space-y-5">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="text-gray-700 hover:text-resort-olive font-medium" onClick={onClose}>
              {item.name}
            </Link>
          ))}
          <Link to="/rooms" onClick={onClose}>
            <Button className="mt-5">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


