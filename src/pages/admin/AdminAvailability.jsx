import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { 
  Calendar, 
  Bed, 
  Users, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';

export default function AdminAvailability() {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Simular datos de disponibilidad
  useEffect(() => {
    const mockAvailability = [
      {
        id: 1,
        roomNumber: '101',
        roomType: 'Standard',
        capacity: 2,
        status: 'available',
        currentGuest: null,
        checkIn: null,
        checkOut: null,
        price: 150,
        amenities: ['WiFi', 'TV', 'A/C']
      },
      {
        id: 2,
        roomNumber: '102',
        roomType: 'Standard',
        capacity: 2,
        status: 'occupied',
        currentGuest: 'María González',
        checkIn: '2025-08-20',
        checkOut: '2025-08-25',
        price: 150,
        amenities: ['WiFi', 'TV', 'A/C']
      },
      {
        id: 3,
        roomNumber: '201',
        roomType: 'Deluxe',
        capacity: 3,
        status: 'available',
        currentGuest: null,
        checkIn: null,
        checkOut: null,
        price: 250,
        amenities: ['WiFi', 'TV', 'A/C', 'Balcony', 'Ocean View']
      },
      {
        id: 4,
        roomNumber: '202',
        roomType: 'Deluxe',
        capacity: 3,
        status: 'maintenance',
        currentGuest: null,
        checkIn: null,
        checkOut: null,
        price: 250,
        amenities: ['WiFi', 'TV', 'A/C', 'Balcony', 'Ocean View']
      },
      {
        id: 5,
        roomNumber: '301',
        roomType: 'Suite',
        capacity: 4,
        status: 'available',
        currentGuest: null,
        checkIn: null,
        checkOut: null,
        price: 400,
        amenities: ['WiFi', 'TV', 'A/C', 'Balcony', 'Ocean View', 'Kitchen', 'Jacuzzi']
      },
      {
        id: 6,
        roomNumber: '302',
        roomType: 'Suite',
        capacity: 4,
        status: 'occupied',
        currentGuest: 'Carlos Rodríguez',
        checkIn: '2025-08-22',
        checkOut: '2025-08-24',
        price: 400,
        amenities: ['WiFi', 'TV', 'A/C', 'Balcony', 'Ocean View', 'Kitchen', 'Jacuzzi']
      },
      {
        id: 7,
        roomNumber: '401',
        roomType: 'Suite',
        capacity: 4,
        status: 'reserved',
        currentGuest: null,
        checkIn: '2025-08-28',
        checkOut: '2025-09-02',
        price: 400,
        amenities: ['WiFi', 'TV', 'A/C', 'Balcony', 'Ocean View', 'Kitchen', 'Jacuzzi']
      },
      {
        id: 8,
        roomNumber: '402',
        roomType: 'Deluxe',
        capacity: 3,
        status: 'available',
        currentGuest: null,
        checkIn: null,
        checkOut: null,
        price: 250,
        amenities: ['WiFi', 'TV', 'A/C', 'Balcony', 'Ocean View']
      }
    ];
    
    setAvailabilityData(mockAvailability);
    setFilteredData(mockAvailability);
    setIsLoading(false);
  }, []);

  // Filtrar datos
  useEffect(() => {
    let filtered = availabilityData;

    // Filtrar por tipo de habitación
    if (roomTypeFilter !== 'all') {
      filtered = filtered.filter(room => room.roomType === roomTypeFilter);
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(room => room.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [availabilityData, roomTypeFilter, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'occupied': return <XCircle className="w-4 h-4" />;
      case 'reserved': return <Clock className="w-4 h-4" />;
      case 'maintenance': return <Eye className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      case 'maintenance': return 'Mantenimiento';
      default: return 'Desconocido';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStatistics = () => {
    const total = availabilityData.length;
    const available = availabilityData.filter(r => r.status === 'available').length;
    const occupied = availabilityData.filter(r => r.status === 'occupied').length;
    const reserved = availabilityData.filter(r => r.status === 'reserved').length;
    const maintenance = availabilityData.filter(r => r.status === 'maintenance').length;

    return { total, available, occupied, reserved, maintenance };
  };

  const stats = getStatistics();

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Disponibilidad de Habitaciones</h1>
        <p className="text-gray-600">Estado en tiempo real de todas las habitaciones</p>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fecha</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min="2025-08-20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de habitación</label>
              <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="occupied">Ocupada</SelectItem>
                  <SelectItem value="reserved">Reservada</SelectItem>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => {
                  setRoomTypeFilter('all');
                  setStatusFilter('all');
                }}
                variant="outline"
                className="w-full"
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Habitaciones</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Bed className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ocupadas</p>
                <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reservadas</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.reserved}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mantenimiento</p>
                <p className="text-2xl font-bold text-gray-600">{stats.maintenance}</p>
              </div>
              <Eye className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid de habitaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Habitaciones - {selectedDate}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((room) => (
              <Card key={room.id} className={`border-2 ${
                room.status === 'available' ? 'border-green-200' :
                room.status === 'occupied' ? 'border-red-200' :
                room.status === 'reserved' ? 'border-yellow-200' :
                'border-gray-200'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Habitación {room.roomNumber}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(room.status)}`}>
                      {getStatusIcon(room.status)}
                      {getStatusText(room.status)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{room.roomType}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>Capacidad: {room.capacity} personas</span>
                    </div>

                    <div className="font-medium text-green-600">
                      {formatPrice(room.price)} / noche
                    </div>

                    {room.currentGuest && (
                      <div className="mt-3 p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600">Huésped actual:</p>
                        <p className="font-medium">{room.currentGuest}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs">
                            {room.checkIn} - {room.checkOut}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-1">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        // Aquí podrías abrir un modal con detalles completos
                        console.log('Ver detalles de habitación:', room);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      Ver detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
