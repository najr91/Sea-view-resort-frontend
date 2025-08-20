import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaClipboardList, FaUsers } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const buttonClasses =
    "flex flex-col items-center justify-center gap-3 py-8 rounded-lg shadow-lg text-white text-xl font-semibold transition-transform transform hover:scale-105";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-12 text-gray-800">
        Panel de Administración
      </h1>

      <div className="grid gap-6 md:grid-cols-3 w-full max-w-5xl">
        {/* Administración de Habitaciones */}
        <button
          onClick={() => handleNavigate("/admin/rooms")}
          style={{ backgroundColor: "#968260" }}
          className={buttonClasses}
        >
          <FaBed size={40} />
          Administración de Habitaciones
        </button>

        {/* Gestión de Reservas */}
        <button
          onClick={() => handleNavigate("/admin/reservations")}
          style={{ backgroundColor: "#968260" }}
          className={buttonClasses}
        >
          <FaClipboardList size={40} />
          Gestión de Reservas
        </button>

        {/* Gestión de Usuarios */}
        <button
          onClick={() => handleNavigate("/admin/manage-users")}
          style={{ backgroundColor: "#968260" }}
          className={buttonClasses}
        >
          <FaUsers size={40} />
          Gestión de Usuarios
        </button>
      </div>
    </div>
  );
}
