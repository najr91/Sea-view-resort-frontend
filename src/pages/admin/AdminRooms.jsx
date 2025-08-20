import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRooms } from "../../context/RoomsContext";
import axios from "axios";

export default function AdminRooms() {
  const { rooms, setRooms } = useRooms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
  });
  const [confirmData, setConfirmData] = useState({
    open: false,
    action: null,
    message: "",
  });

  const API_URL = "http://localhost:3000/api/rooms";

  const openModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        name: room.name,
        price: room.price,
        description: room.description,
        images: room.images || [],
      });
    } else {
      setEditingRoom(null);
      setFormData({ name: "", price: "", description: "", images: [] });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (
      formData.name !== (editingRoom?.name || "") ||
      formData.price !== (editingRoom?.price || "") ||
      formData.description !== (editingRoom?.description || "") ||
      JSON.stringify(formData.images) !==
        JSON.stringify(editingRoom?.images || [])
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
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    if (editingRoom) {
      axios
        .post(`${API_URL}/${editingRoom.id}/images`, data)
        .then((res) => {
          setRooms(rooms.map((r) => (r.id === editingRoom.id ? res.data : r)));
          setFormData({ ...formData, images: res.data.images });
          toast.success("Imagen subida");
        })
        .catch(() => toast.error("Error al subir la imagen"));
    } else {
      // aún no existe en DB, solo vista previa
      setFormData({
        ...formData,
        images: [...formData.images, URL.createObjectURL(file)],
      });
    }
  };

  const removeImage = (index) => {
    if (editingRoom) {
      const imageToDelete = formData.images[index];
      axios
        .delete(`${API_URL}/${editingRoom.id}/images/${index}`)
        .then((res) => {
          setRooms(rooms.map((r) => (r.id === editingRoom.id ? res.data : r)));
          setFormData({ ...formData, images: res.data.images });
          toast("Imagen eliminada", { icon: "🗑️" });
        })
        .catch(() => toast.error("Error al eliminar la imagen"));
    } else {
      const newImages = [...formData.images];
      newImages.splice(index, 1);
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleSave = () => {
    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.description.trim()
    ) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }
    if (formData.name.length > 25) {
      toast.error("El nombre no puede tener más de 25 caracteres");
      return;
    }
    if (formData.description.length > 440) {
      toast.error("La descripción no puede tener más de 440 caracteres");
      return;
    }

    setConfirmData({
      open: true,
      message: "¿Quieres guardar los cambios?",
      action: async () => {
        try {
          if (editingRoom) {
            const { data } = await axios.put(
              `${API_URL}/${editingRoom.id}`,
              formData
            );
            setRooms(rooms.map((r) => (r.id === editingRoom.id ? data : r)));
            toast.success("Habitación actualizada");
          } else {
            const { data } = await axios.post(API_URL, formData);
            setRooms([...rooms, data]);
            toast.success("Habitación agregada");
          }
          setIsModalOpen(false);
        } catch (err) {
          console.error(err);
          toast.error("Error guardando habitación");
        }
      },
    });
  };

  const handleDelete = (id) => {
    setConfirmData({
      open: true,
      message: "¿Seguro que deseas borrar esta habitación?",
      action: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          setRooms(rooms.filter((r) => r.id !== id));
          toast.error("Habitación eliminada");
        } catch (err) {
          console.error(err);
          toast.error("Error eliminando habitación");
        }
      },
    });
  };

  return (
    <div className="container py-8">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Gestión de Habitaciones</h1>

      <button
        onClick={() => openModal()}
        className="mb-6 bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white px-4 py-2 rounded "
      >
        + Agregar Habitación
      </button>

      {/* Tabla */}
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
                  {room.images?.length > 0 ? (
                    <img
                      src={room.images[0]}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">Sin imagen</span>
                  )}
                </td>
                <td className="py-3 px-4 align-top">
                  <div className="flex flex-col gap-2 w-max">
                    <button
                      onClick={() => openModal(room)}
                      style={{ backgroundColor: "#968260" }}
                      className="text-white px-3 py-1 rounded hover:opacity-90"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      style={{ backgroundColor: "#ceb996" }}
                      className="text-white px-3 py-1 rounded hover:opacity-90"
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid gap-4 md:hidden">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold">{room.name}</h3>
            <p className="text-gray-600">Precio: ${room.price}</p>
            <p className="text-gray-500">{room.description}</p>
            {room.images?.length > 0 && (
              <div className="flex gap-2">
                <img
                  src={room.images[0]}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            )}
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => openModal(room)}
                style={{ backgroundColor: "#968260" }}
                className="flex-1 text-white px-3 py-2 rounded hover:opacity-90 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(room.id)}
                style={{ backgroundColor: "#ceb996" }}
                className="flex-1 text-white px-3 py-2 rounded hover:opacity-90 text-sm"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
              maxLength={25}
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
              maxLength={440}
            />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Imagen
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border p-2 rounded"
              />
              {formData.images?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img}
                        alt={`image-${idx}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm */}
      {confirmData.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h3 className="text-lg">{confirmData.message}</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() =>
                  setConfirmData({ open: false, action: null, message: "" })
                }
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  confirmData.action();
                  setConfirmData({ open: false, action: null, message: "" });
                }}
                className="bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white px-4 py-2 rounded"
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
