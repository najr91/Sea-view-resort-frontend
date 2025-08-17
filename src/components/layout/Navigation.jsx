import { NavLink } from "react-router-dom";
import { classNames } from "../../lib/classNames";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Inicio", to: "/" },
  { name: "Explorar", to: "/explore" },
  { name: "Habitaciones", to: "/rooms" },
  { name: "Nosotros", to: "/about" },
  { name: "Contacto", to: "/contact" },
];

export default function Navigation() {
  const { user, profileImage, loading, logout } = useAuth();
  const navigate = useNavigate();

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
      {navItems.map((item) => (
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
      <div className="flex gap-4 items-center">
        {user && (
          <>
            <span className=" hidden lg:inline text-gray-700 text-sm">
              Bienvenido, <strong>{user.username}</strong>
            </span>

            <button
              onClick={handleLogout}
              className="bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white px-4 py-2 text-sm"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
