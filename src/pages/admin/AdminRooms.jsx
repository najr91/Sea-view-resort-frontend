import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const initialRooms = [
  { id: 1, name: "Suite Deluxe", price: 120, description: "Amplia suite con vista al mar", image: null },
  { id: 2, name: "Habitación Doble", price: 80, description: "Cómoda habitación para dos personas", image: null },
  { id: 3, name: "Habitación Simple", price: 50, description: "Opción económica con todas las comodidades", image: null },
];

export default function AdminRooms() {
  const [rooms, setRooms] = useState(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", description: "", image: null });

  const [confirmData, setConfirmData] = useState({ open: false, action: null, message: "" });

  const openModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData(room);
    } else {
      setEditingRoom(null);
      setFormData({ name: "", price: "", description: "", image: null });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (
      formData.name !== (editingRoom?.name || "") ||
      formData.price !== (editingRoom?.price || "") ||
      formData.description !== (editingRoom?.description || "") ||
      formData.image !== (editingRoom?.image || null)
    ) {
      setConfirmData({
        open: true,
        message: "Tienes cambios sin guardar, ¿quieres salir igualmente?",
        action: () => {
          setIsModalOpen(false);
          toast("Cambios descartados", { icon: "⚠️" });
        },
      });
    } else {
      setIsModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => setFormData({ ...formData, image: null });

  const handleSave = () => {
    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    setConfirmData({
      open: true,
      message: "¿Quieres guardar los cambios?",
      action: () => {
        if (editingRoom) {
          setRooms(rooms.map((r) => (r.id === editingRoom.id ? { ...formData, id: r.id } : r)));
          toast.success("Habitación actualizada");
        } else {
          setRooms([...rooms, { ...formData, id: Date.now() }]);
          toast.success("Habitación agregada");
        }
        setIsModalOpen(false);
      },
    });
  };

  const handleDelete = (id) => {
    setConfirmData({
      open: true,
      message: "¿Seguro que deseas borrar esta habitación?",
      action: () => {
        setRooms(rooms.filter((r) => r.id !== id));
        toast.error("Habitación eliminada");
      },
    });
  };

  return (
    <div className="container py-8">
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-6">Gestión de Habitaciones</h1>

      <button
        onClick={() => openModal()}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Agregar Habitación
      </button>

      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Precio</th>
              <th className="py-3 px-4">Descripción</th>
              <th className="py-3 px-4">Imagen</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-t">
                <td className="py-3 px-4">{room.name}</td>
                <td className="py-3 px-4">${room.price}</td>
                <td className="py-3 px-4">{room.description}</td>
                <td className="py-3 px-4">
                  {room.image ? (
                    <img src={room.image} alt="preview" className="w-16 h-16 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400">Sin imagen</span>
                  )}
                </td>
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

      <div className="grid gap-4 md:hidden">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold">{room.name}</h3>
            <p className="text-gray-600">Precio: ${room.price}</p>
            <p className="text-gray-500">{room.description}</p>
            {room.image && (
              <img src={room.image} alt="preview" className="w-full h-32 object-cover rounded mt-2" />
            )}
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => openModal(room)}
                className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(room.id)}
                className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingRoom ? "Editar Habitación" : "Agregar Habitación"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />
            <textarea
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Imagen</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
              {formData.image && (
                <div className="mt-3">
                  <img src={formData.image} alt="preview" className="w-full h-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Quitar imagen
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancelar
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmData.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm text-center">
            <p className="mb-6 text-lg">{confirmData.message}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setConfirmData({ open: false, action: null, message: "" })}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  confirmData.action();
                  setConfirmData({ open: false, action: null, message: "" });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
