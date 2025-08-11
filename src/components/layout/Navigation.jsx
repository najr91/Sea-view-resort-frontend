import { NavLink } from 'react-router-dom';
import { classNames } from '../../lib/classNames';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Explore', to: '/explore' },
  { name: 'Rooms', to: '/rooms' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">
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


