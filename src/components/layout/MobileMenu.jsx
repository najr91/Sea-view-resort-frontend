import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const navItems = [
  { name: 'Inicio', to: '/' },
  { name: 'Explorar', to: '/explore' },
  { name: 'Habitaciones', to: '/rooms' },
  { name: 'Nosotros', to: '/about' },
  { name: 'Contacto', to: '/contact' },
];

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="md:hidden fixed inset-0 z-40 bg-black/40" onClick={onClose}>
      <div className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/" onClick={onClose} aria-label="Sea View Resort" className="inline-flex items-baseline leading-none select-none">
              <span className="font-display text-resort-olive text-xl tracking-wide">Sea View</span>
              <span className="font-display text-resort-olive/90 text-xs tracking-[0.35em] ml-2 uppercase">Resort</span>
            </Link>
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
            <Button className="mt-5">Reservar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


