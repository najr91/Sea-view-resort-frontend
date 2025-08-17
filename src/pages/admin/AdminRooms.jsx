import { useState } from "react";

export default function AdminRooms() {
  
  const [rooms, setRooms] = useState([
    { id: 1, name: "Habitación Simple", price: 50, description: "Cama individual, baño privado" },
    { id: 2, name: "Habitación Doble", price: 80, description: "Cama doble, vista al mar" },
    { id: 3, name: "Suite Familiar", price: 120, description: "Dos habitaciones, cocina equipada" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });

  
  const openModal = (room = null) => {
    setEditingRoom(room);
    if (room) {
      setFormData(room);
    } else {
      setFormData({ name: "", price: "", description: "" });
    }
    setIsModalOpen(true);
  };

  
  const handleSave = () => {
    if (editingRoom) {
      setRooms(rooms.map(r => (r.id === editingRoom.id ? { ...formData, id: editingRoom.id } : r)));
    } else {
      setRooms([...rooms, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  
  const handleDelete = (id) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Habitaciones</h1>

      <button
        onClick={() => openModal()}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Agregar Habitación
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Precio</th>
              <th className="py-3 px-4">Descripción</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-t">
                <td className="py-3 px-4">{room.name}</td>
                <td className="py-3 px-4">${room.price}</td>
                <td className="py-3 px-4">{room.description}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => openModal(room)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingRoom ? "Editar Habitación" : "Agregar Habitación"}
            </h2>

            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <input
              type="number"
              placeholder="Precio"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <textarea
              placeholder="Descripción"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
