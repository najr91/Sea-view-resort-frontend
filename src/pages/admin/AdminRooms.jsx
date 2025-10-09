import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRooms } from "../../context/RoomsContext";
import axios from "axios";
import { apiUrl } from "../../services/http";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import PageHeader from "../../components/admin/PageHeader";
import StatsGrid from "../../components/admin/StatsGrid";
import StatsCard from "../../components/admin/StatsCard";
import ImageGalleryModal from "../../components/admin/ImageGalleryModal";
import { Bed, Users, Edit, Trash2, Eye, CheckCircle, AlertCircle, Search, Plus, DollarSign } from "lucide-react";

export default function AdminRooms() {
  const { rooms, setRooms } = useRooms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const [gallery, setGallery] = useState({
    open: false,
    images: [],
    index: 0,
    title: "",
  });

  // Estadísticas calculadas
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => !r.isOccupied).length; // Asumiendo que existe esta propiedad
  const occupiedRooms = totalRooms - availableRooms;
  const totalCapacity = rooms.reduce((sum, r) => sum + (parseInt(r.capacity) || 0), 0);

  // Filtrar habitaciones por búsqueda
  const filteredRooms = rooms.filter(room =>
    room.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.bedType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const API_URL = apiUrl("/api/rooms");

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

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (editingRoom) {
      try {
        let latestRoom = null;
        for (const file of files) {
          const data = new FormData();
          data.append("image", file);
          const res = await axios.post(`${API_URL}/${editingRoom.id}/images`, data);
          latestRoom = res.data;
        }
        if (latestRoom) {
          setRooms(rooms.map((r) => (r.id === editingRoom.id ? latestRoom : r)));
          setFormData({ ...formData, images: latestRoom.images });
        }
        toast.success("Imágenes subidas");
      } catch (err) {
        toast.error("Error al subir imágenes");
      }
    } else {
      const previews = files.map((f) => URL.createObjectURL(f));
      setFormData({ ...formData, images: [...formData.images, ...previews] });
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

  const setCoverImage = (index) => {
    if (index === 0) return;
    const newImages = [...formData.images];
    const [selected] = newImages.splice(index, 1);
    newImages.unshift(selected);
    setFormData({ ...formData, images: newImages });
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

  const openGallery = (images = [], startIndex = 0, title = "") => {
    if (!images || images.length === 0) return;
    setGallery({ open: true, images, index: startIndex, title });
  };

  const closeGallery = () =>
    setGallery({ open: false, images: [], index: 0, title: "" });

  const formatAmenityName = (amenity) => {
    if (typeof amenity === 'string') {
      const withSpaces = amenity.replace(/_/g, ' ');
      return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
    }
    if (amenity && typeof amenity === 'object') {
      const raw = amenity.name || amenity.label || '';
      return raw.charAt(0).toUpperCase() + raw.slice(1);
    }
    return String(amenity);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <PageHeader
        title="Panel de Administración - Habitaciones"
        subtitle={`Gestiona todas las habitaciones del hotel • ${totalRooms} habitación${totalRooms !== 1 ? 'es' : ''} en el sistema`}
      />

      {/* Estadísticas */}
      <StatsGrid>
        <StatsCard
          label="Total Habitaciones"
          value={totalRooms}
          icon={Bed}
          iconColor="text-green-600"
        />
        <StatsCard
          label="Disponibles"
          value={availableRooms}
          icon={CheckCircle}
          iconColor="text-green-600"
          valueColor="text-green-600"
        />
        <StatsCard
          label="Ocupadas"
          value={occupiedRooms}
          icon={AlertCircle}
          iconColor="text-yellow-600"
          valueColor="text-yellow-600"
        />
        <StatsCard
          label="Capacidad Total"
          value={totalCapacity}
          icon={Users}
          iconColor="text-blue-600"
          valueColor="text-blue-600"
        />
      </StatsGrid>

      {/* Tabla de habitaciones */}
      <Card className="w-full mb-8">
        <div className="flex flex-col space-y-1.5 px-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nombre, descripción o tipo de cama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => openModal()}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nueva Habitación
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="pt-4">
          <div style={{ maxHeight: '47vh' }} className="overflow-y-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-4 font-medium">Habitación</th>
                    <th className="text-left px-6 py-4 font-medium">Detalles</th>
                    <th className="text-left px-6 py-4 font-medium">Precio</th>
                    <th className="text-left px-6 py-4 font-medium">Amenidades</th>
                    <th className="text-left px-6 py-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{room.name}</p>
                            <p className="text-sm text-gray-600 line-clamp-1">{room.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span>{room.capacity} personas</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Bed className="w-4 h-4 text-gray-400" />
                            <span>{room.bedType}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-green-600">{formatPrice(room.price)}</p>
                        <p className="text-xs text-gray-500">por noche</p>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(room.amenities || []).slice(0, 2).map((amenity, index) => (
                            <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {formatAmenityName(amenity)}
                            </span>
                          ))}
                          {(room.amenities || []).length > 2 && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{room.amenities.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openGallery(room.images, 0, room.name)}
                            title="Ver imágenes"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openModal(room)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(room.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow w-full max-w-4xl max-h-[85vh] flex flex-col">
            <div className="p-4 md:p-6 overflow-auto">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
                {editingRoom ? "Editar Habitación" : "Agregar Habitación"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3 text-sm md:text-base"
                    maxLength={25}
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3 text-sm md:text-base"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="description"
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-1 min-h-[140px] text-sm md:text-base"
                    maxLength={440}
                  />
                  <p className="text-xs text-gray-500 mb-2">Máximo 440 caracteres.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="w-full border p-2 rounded text-sm md:text-base"
                  />

                  {formData.images?.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          {idx === 0 && (
                            <span className="absolute -top-2 -left-2 z-10 bg-resort-olive text-white text-[10px] px-2 py-0.5 rounded-full shadow">Portada</span>
                          )}
                          <img
                            src={img}
                            alt={`image-${idx}`}
                            onClick={() => openGallery(formData.images, idx, formData.name || "Imágenes")}
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md ring-1 ring-gray-200 cursor-zoom-in"
                          />
                          <div className="absolute inset-0 flex items-start justify-end gap-1 p-1 opacity-0 group-hover:opacity-100 transition">
                            <button
                              type="button"
                              onClick={() => setCoverImage(idx)}
                              className="bg-white/90 hover:bg-white text-gray-800 text-[10px] px-2 py-0.5 rounded shadow"
                            >
                              Portada
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="bg-red-500 hover:bg-red-600 text-white text-[10px] w-6 h-6 rounded-full grid place-items-center shadow"
                              aria-label="Eliminar"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="ghost" onClick={closeModal}>Cancelar</Button>
              <Button onClick={handleSave}>Guardar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm */}
      {confirmData.open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h3 className="text-lg">{confirmData.message}</h3>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="ghost"
                onClick={() =>
                  setConfirmData({ open: false, action: null, message: "" })
                }
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  confirmData.action();
                  setConfirmData({ open: false, action: null, message: "" });
                }}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Galería */}
      <ImageGalleryModal
        isOpen={gallery.open}
        onClose={closeGallery}
        images={gallery.images}
        currentIndex={gallery.index}
        onIndexChange={(newIndex) => setGallery(g => ({ ...g, index: newIndex }))}
        title={gallery.title}
      />
    </div>
  );
}
