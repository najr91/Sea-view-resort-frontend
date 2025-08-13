import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Navigation from '../components/layout/Navigation.jsx';
import MobileMenu from '../components/layout/MobileMenu.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function MainLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-resort-cream flex flex-col">
      <header className="sticky top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center">
          <Link to="/" className="inline-flex items-baseline leading-none select-none" aria-label="Sea View Resort">
            <span className="font-display text-resort-olive text-2xl md:text-3xl tracking-wide">Sea View</span>
            <span className="font-display text-resort-olive/90 text-sm md:text-base tracking-[0.35em] ml-3 uppercase">Resort</span>
          </Link>
        </div>

        <Navigation />

        <div className="flex items-center justify-end gap-3">
          <div className="hidden md:block">
            <Button asChild>
              <a href="/rooms">Reservar</a>
            </Button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-resort-olive"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}


