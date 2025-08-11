import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Navigation from '../components/layout/Navigation.jsx';
import MobileMenu from '../components/layout/MobileMenu.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function MainLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-resort-cream flex flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-resort-olive rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          </div>
        </div>

        <Navigation />

        <div className="hidden md:block">
          <Button asChild>
            <a href="/rooms">Book Now</a>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-resort-olive"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}


