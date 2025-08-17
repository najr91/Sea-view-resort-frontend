import { useState } from "react";

export default function AdminRooms() {

  const [rooms] = useState([
    {
      id: 1,
      name: "Habitación Simple",
      price: 5000,
      description: "Una opción cómoda y económica.",
      images: ["https://via.placeholder.com/100"],
    },
    {
      id: 2,
      name: "Habitación Doble",
      price: 9000,
      description: "Ideal para parejas o amigos.",
      images: ["https://via.placeholder.com/100"],
    },
  ]);

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Habitaciones</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Agregar Habitación
        </button>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Categoría</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Descripción</th>
              <th className="px-4 py-2 border">Imágenes</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="text-center">
                <td className="px-4 py-2 border">{room.name}</td>
                <td className="px-4 py-2 border">${room.price}</td>
                <td className="px-4 py-2 border">{room.description}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    Editar
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg shadow p-4 flex flex-col gap-2"
          >
            <img
              src={room.images[0]}
              alt={room.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p className="text-gray-700 text-sm">{room.description}</p>
            <p className="font-bold">Precio: ${room.price}</p>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                Editar
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
