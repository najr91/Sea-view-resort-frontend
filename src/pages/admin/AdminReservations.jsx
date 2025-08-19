import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { 
  Calendar, 
  Users, 
  Bed, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import axios from 'axios';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: '',
    status: 'confirmed',
    specialRequests: ''
  });

  // Simular datos de reservas para demostración
  useEffect(() => {
    const mockReservations = [
      {
        id: 1,
        guestName: 'María González',
        email: 'maria@email.com',
        phone: '+34 123 456 789',
        checkIn: '2025-08-20',
        checkOut: '2025-08-25',
        roomType: 'Deluxe',
        guests: 2,
        status: 'confirmed',
        specialRequests: 'Vista al mar preferida',
        totalPrice: 750,
        createdAt: '2024-12-15'
      },
      {
        id: 2,
        guestName: 'Carlos Rodríguez',
        email: 'carlos@email.com',
        phone: '+34 987 654 321',
        checkIn: '2025-08-22',
        checkOut: '2025-08-24',
        roomType: 'Standard',
        guests: 1,
        status: 'pending',
        specialRequests: '',
        totalPrice: 300,
        createdAt: '2024-12-16'
      },
      {
        id: 3,
        guestName: 'Ana Martínez',
        email: 'ana@email.com',
        phone: '+34 555 123 456',
        checkIn: '2025-08-28',
        checkOut: '2025-09-02',
        roomType: 'Suite',
        guests: 3,
        status: 'cancelled',
        specialRequests: 'Cama extra necesaria',
        totalPrice: 1200,
        createdAt: '2024-12-14'
      },
      {
        id: 4,
        guestName: 'Luis Fernández',
        email: 'luis@email.com',
        phone: '+34 777 888 999',
        checkIn: '2025-08-30',
        checkOut: '2025-09-05',
        roomType: 'Deluxe',
        guests: 2,
        status: 'confirmed',
        specialRequests: 'Check-in temprano si es posible',
        totalPrice: 900,
        createdAt: '2024-12-17'
      }
    ];
    
    setReservations(mockReservations);
    setFilteredReservations(mockReservations);
    setIsLoading(false);
  }, []);

  // Filtrar reservas
  useEffect(() => {
    let filtered = reservations;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(reservation =>
        reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.roomType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(reservation => reservation.status === statusFilter);
    }

    setFilteredReservations(filtered);
  }, [reservations, searchTerm, statusFilter]);

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setFormData({
      guestName: reservation.guestName,
      email: reservation.email,
      phone: reservation.phone,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      roomType: reservation.roomType,
      guests: reservation.guests.toString(),
      status: reservation.status,
      specialRequests: reservation.specialRequests
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      try {
        // Simular llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setReservations(prev => prev.filter(r => r.id !== reservationId));
        alert('Reserva eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        alert('Error al eliminar la reserva');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingReservation) {
        // Simular actualización
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setReservations(prev => prev.map(r => 
          r.id === editingReservation.id 
            ? { ...r, ...formData, guests: parseInt(formData.guests) }
            : r
        ));
        alert('Reserva actualizada exitosamente');
      } else {
        // Simular creación
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newReservation = {
          id: Date.now(),
          ...formData,
          guests: parseInt(formData.guests),
          totalPrice: 0, // Calcular según el tipo de habitación
          createdAt: new Date().toISOString().split('T')[0]
        };
        
        setReservations(prev => [...prev, newReservation]);
        alert('Reserva creada exitosamente');
      }
      
      setIsModalOpen(false);
      setEditingReservation(null);
      setFormData({
        guestName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        roomType: '',
        guests: '',
        status: 'confirmed',
        specialRequests: ''
      });
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      alert('Error al guardar la reserva');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración - Reservas</h1>
        <p className="text-gray-600">Gestiona todas las reservas del hotel</p>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nombre, email o habitación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="confirmed">Confirmadas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setEditingReservation(null);
                  setFormData({
                    guestName: '',
                    email: '',
                    phone: '',
                    checkIn: '',
                    checkOut: '',
                    roomType: '',
                    guests: '',
                    status: 'confirmed',
                    specialRequests: ''
                  });
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nueva Reserva
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reservas</p>
                <p className="text-2xl font-bold text-gray-900">{reservations.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmadas</p>
                <p className="text-2xl font-bold text-green-600">
                  {reservations.filter(r => r.status === 'confirmed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {reservations.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Canceladas</p>
                <p className="text-2xl font-bold text-red-600">
                  {reservations.filter(r => r.status === 'cancelled').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de reservas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Huésped</th>
                  <th className="text-left p-4 font-medium">Fechas</th>
                  <th className="text-left p-4 font-medium">Habitación</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Precio</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{reservation.guestName}</p>
                        <p className="text-sm text-gray-600">{reservation.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm">{formatDate(reservation.checkIn)}</p>
                          <p className="text-sm text-gray-600">a {formatDate(reservation.checkOut)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{reservation.roomType}</p>
                          <p className="text-sm text-gray-600">{reservation.guests} huéspedes</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(reservation.status)}`}>
                        {getStatusIcon(reservation.status)}
                        {reservation.status === 'confirmed' && 'Confirmada'}
                        {reservation.status === 'pending' && 'Pendiente'}
                        {reservation.status === 'cancelled' && 'Cancelada'}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{formatPrice(reservation.totalPrice)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(reservation)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(reservation.id)}
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
        </CardContent>
      </Card>

      {/* Modal para editar/crear reserva */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingReservation ? 'Editar Reserva' : 'Nueva Reserva'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre del huésped</label>
                  <Input
                    value={formData.guestName}
                    onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                    placeholder="Nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+34 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Estado</label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmada</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Check-in</label>
                  <Input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    min="2025-08-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Check-out</label>
                  <Input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    min="2025-08-21"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de habitación</label>
                  <Select value={formData.roomType} onValueChange={(value) => setFormData({...formData, roomType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Deluxe">Deluxe</SelectItem>
                      <SelectItem value="Suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Número de huéspedes</label>
                  <Select value={formData.guests} onValueChange={(value) => setFormData({...formData, guests: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Solicitudes especiales</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  placeholder="Solicitudes especiales o comentarios..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                  rows="3"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                >
                  {editingReservation ? 'Actualizar' : 'Crear'} Reserva
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
