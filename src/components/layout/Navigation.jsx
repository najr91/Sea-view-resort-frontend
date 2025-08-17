import { NavLink } from 'react-router-dom';
import { classNames } from '../../lib/classNames';

const navItems = [
  { name: 'Inicio', to: '/' },
  { name: 'Explorar', to: '/explore' },
  { name: 'Habitaciones', to: '/rooms' },
  { name: 'Nosotros', to: '/about' },
  { name: 'Contacto', to: '/contact' },
  { name: 'Administrador', to: '/admin/rooms' },
];

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            classNames(
              'font-medium transition-colors',
              isActive ? 'text-resort-olive' : 'text-gray-700 hover:text-resort-olive'
            )
          }
          end={item.to === '/'}
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}


