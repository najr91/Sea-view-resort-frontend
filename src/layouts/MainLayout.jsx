import { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../components/ui/Button";
import Navigation from "../components/layout/Navigation.jsx";
import MobileMenu from "../components/layout/MobileMenu.jsx";
import Footer from "../components/layout/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function MainLayout() {
  const { user, profileImage } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const updateHeaderHeightVar = () => {
      const height = headerRef.current
        ? Math.ceil(headerRef.current.getBoundingClientRect().height)
        : 0;
      document.documentElement.style.setProperty(
        "--app-header-height",
        `${height}px`
      );
    };

    updateHeaderHeightVar();

    let resizeObserver;
    if (headerRef.current && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(updateHeaderHeightVar);
      resizeObserver.observe(headerRef.current);
    } else {
      window.addEventListener("resize", updateHeaderHeightVar);
    }

    return () => {
      if (resizeObserver && headerRef.current) resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeightVar);
    };
  }, []);
  return (
    <div className="min-h-screen bg-resort-cream flex flex-col">
      <header
        ref={headerRef}
        className="sticky top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center px-8 py-5 bg-white shadow-sm"
      >
        <div className="flex items-center">
          <Link
            to="/"
            className="inline-flex items-baseline leading-none select-none"
            aria-label="Sea View Resort"
          >
            <span className="font-display text-resort-olive text-2xl md:text-3xl tracking-wide">
              Sea View
            </span>
            <span className="font-display text-resort-olive/90 text-sm md:text-base tracking-[0.35em] ml-3 uppercase">
              Resort
            </span>
          </Link>
        </div>

        <Navigation />

        <div className="flex gap-4 items-center">
          {user && (
            <>
              <span className="text-sm hidden sm:block">
                Bienvenido, <strong>{user.username}</strong>
              </span>
              {profileImage && (
                <Link to="/profile">
                  <img
                    src={profileImage}
                    alt="Perfil"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>

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

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
