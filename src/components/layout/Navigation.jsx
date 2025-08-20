import { NavLink } from "react-router-dom";
import { classNames } from "../../lib/classNames";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { LogOut, User, LogIn } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Inicio", to: "/" },
  { name: "Explorar", to: "/explore" },
  { name: "Habitaciones", to: "/rooms" },
  { name: "Nosotros", to: "/about" },
  { name: "Contacto", to: "/contact" },
  { name: "Administrador", to: "/admin" },
];

export default function Navigation() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [showName, setShowName] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
      {navItems
        .filter((item) => {
          if (item.name === "Administrador") {
            return user?.role === "admin";
          }
          return true;
        })
        .map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              classNames(
                "font-medium transition-colors",
                isActive
                  ? "text-resort-olive"
                  : "text-gray-700 hover:text-resort-olive"
              )
            }
            end={item.to === "/"}
          >
            {item.name}
          </NavLink>
        ))}
      <div className="flex gap-4 items-center ml-4 relative">
        {!user && (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white"
              aria-label="Iniciar sesión"
            >
              <LogIn size={18} />
            </button>
          </>
        )}
        {user && (
          <>
            <button
              onClick={() => setShowName((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 relative"
              aria-label="Usuario"
            >
              <User size={18} />
            </button>

            {showName && (
              <div className="absolute top-12 left-0 bg-white border border-gray-200 shadow-md rounded px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                {user.username}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white transition"
              aria-label="Cerrar sesión"
            >
              <LogOut size={18} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
