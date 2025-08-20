import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { MapPin, Bed, Users, Calendar, CalendarDays } from 'lucide-react';
import AvailabilityModal from './AvailabilityModal';
import SuccessModal from './SuccessModal';
import LoginRequiredModal from './LoginRequiredModal';
import { useAuth } from '../../context/AuthContext';
import { useRooms } from '../../context/RoomsContext';

export default function SearchFilters() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rooms } = useRooms();
  
  const [filters, setFilters] = useState({
    destino: '',
    habitacion: '',
    huespedes: '',
    checkIn: '2025-08-20',
    checkOut: '2025-08-25',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(false);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0);

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Función para obtener el precio de la habitación seleccionada
  const getRoomPrice = (roomName) => {
    const room = rooms.find(r => r.name === roomName);
    return room ? room.price : 150; // Precio por defecto si no se encuentra
  };

  // Actualizar el precio cuando cambie la habitación seleccionada
  useEffect(() => {
    if (filters.habitacion) {
      const price = getRoomPrice(filters.habitacion);
      setSelectedRoomPrice(price);
    }
  }, [filters.habitacion, rooms]);

  const handleSearch = async () => {
    // Validar que se haya seleccionado una habitación
    if (!filters.habitacion) {
      alert('Por favor selecciona una habitación antes de buscar');
      return;
    }
    
    setIsLoading(true);
    try {
      // reemplaza con tu endpoint
      //const response = await axios.post('http://localhost:5173/api/reserva', filters);
      
      // Procesar la respuesta y calcular información adicional
      const processedData = {
        ...filters,
        ...response.data,
        noches: calculateNights(filters.checkIn, filters.checkOut),
        precioTotal: response.data.precioPorNoche * calculateNights(filters.checkIn, filters.checkOut)
      };
      
      setAvailabilityData(processedData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      // En caso de error, mostrar datos de ejemplo para demostración
      const precioPorNoche = getRoomPrice(filters.habitacion);
      const mockData = {
        ...filters,
        disponible: Math.random() > 0.5, // Simular disponibilidad aleatoria
        precioPorNoche: precioPorNoche,
        noches: calculateNights(filters.checkIn, filters.checkOut),
        precioTotal: precioPorNoche * calculateNights(filters.checkIn, filters.checkOut),
        diasDisponibles: generateAvailableDates(filters.checkIn, filters.checkOut)
      };
      setAvailabilityData(mockData);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const generateAvailableDates = (checkIn, checkOut) => {
    // Generar fechas alternativas disponibles más variadas
    const dates = [];
    const startDate = new Date(checkIn);
    
    // Asegurar que las fechas sean desde el 20 de agosto de 2025 en adelante
    const minDate = new Date('2025-08-20');
    
    // Generar fechas en diferentes rangos para dar más opciones
    const ranges = [
      { start: 1, end: 3 },    // Próximos días
      { start: 7, end: 10 },   // Semana siguiente
      { start: 14, end: 17 },  // Dos semanas después
      { start: 21, end: 24 },  // Tres semanas después
      { start: 30, end: 35 },  // Un mes después
      { start: 60, end: 65 }   // Dos meses después
    ];
    
    ranges.forEach(range => {
      for (let i = range.start; i <= range.end; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        
        // Solo agregar fechas que sean después del 20 de agosto de 2025
        if (newDate >= minDate) {
          dates.push(newDate.toISOString().split('T')[0]);
        }
      }
    });
    
    return dates;
  };

  const handleConfirmReservation = async (data) => {
    // Verificar si el usuario está logueado
    if (!user) {
      // Si no está logueado, mostrar el modal de login requerido
      setIsLoginRequiredModalOpen(true);
      return;
    }

    try {
      // Aquí implementarías la lógica para confirmar la reserva
      console.log('Confirmando reserva:', data);
      // Ejemplo: await axios.post('http://localhost:5000/api/reservas', data);
      
      // Simular un pequeño delay para mostrar el proceso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Guardar los datos de la reserva confirmada y mostrar el modal de éxito
      setConfirmedReservation(data);
      setIsSuccessModalOpen(true);
      // Cerrar el modal de disponibilidad
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al confirmar la reserva:', error);
      throw error;
    }
  };

  const handleNavigateToLogin = () => {
    setIsLoginRequiredModalOpen(false);
    setIsModalOpen(false);
    navigate('/login');
  };

  const handleNavigateToRegister = () => {
    setIsLoginRequiredModalOpen(false);
    setIsModalOpen(false);
    navigate('/register');
  };

  const handleSelectAlternativeDate = async (selectedDate) => {
    try {
      // Calcular la nueva fecha de check-out (mantener la misma duración de estadía)
      const checkInDate = new Date(selectedDate);
      const originalCheckIn = new Date(filters.checkIn);
      const originalCheckOut = new Date(filters.checkOut);
      const nightsDiff = Math.ceil((originalCheckOut - originalCheckIn) / (1000 * 60 * 60 * 24));
      
      const newCheckOutDate = new Date(checkInDate);
      newCheckOutDate.setDate(checkInDate.getDate() + nightsDiff);
      
      // Actualizar los filtros con las nuevas fechas
      const updatedFilters = {
        ...filters,
        checkIn: selectedDate,
        checkOut: newCheckOutDate.toISOString().split('T')[0]
      };
      
      setFilters(updatedFilters);
      
      // Hacer una nueva búsqueda con las fechas actualizadas
      setIsLoading(true);
      
      // Simular llamada a la API con las nuevas fechas
      const precioPorNoche = getRoomPrice(updatedFilters.habitacion);
      const mockData = {
        ...updatedFilters,
        disponible: Math.random() > 0.3, // Mayor probabilidad de disponibilidad
        precioPorNoche: precioPorNoche,
        noches: calculateNights(selectedDate, newCheckOutDate.toISOString().split('T')[0]),
        precioTotal: precioPorNoche * calculateNights(selectedDate, newCheckOutDate.toISOString().split('T')[0]),
        diasDisponibles: generateAvailableDates(selectedDate, newCheckOutDate.toISOString().split('T')[0])
      };
      
      setAvailabilityData(mockData);
      // El modal ya está abierto, solo actualizamos los datos
      
    } catch (error) {
      console.error('Error al seleccionar fecha alternativa:', error);
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <>
      <style jsx>{`
        .select-content {
          background: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          z-index: 9999 !important;
          position: relative !important;
        }
        .select-item {
          background: white !important;
          color: #374151 !important;
          padding: 0.5rem 0.75rem !important;
          cursor: pointer !important;
        }
        .select-item:hover {
          background: #f3f4f6 !important;
        }
        .select-item.selected {
          background: #e5e7eb !important;
        }
      `}</style>
      <Card className="max-w-7xl mx-auto shadow-2xl bg-white border-0 overflow-hidden">
         <CardContent className="p-4 md:p-6 lg:p-8">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-end">
            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex flex-col items-start gap-2">
                                 <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-700 md:shrink-0">
                   <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                   <span className="truncate">Destino</span>
                 </div>
                <div className="w-full">
                  <Select onValueChange={v => handleChange('destino', v)}>
                                         <SelectTrigger className="text-sm !bg-white !border-gray-300 hover:!border-gray-400 focus:!border-blue-500 !text-gray-900">
                       <SelectValue placeholder="Destino" />
                     </SelectTrigger>
                                         <SelectContent className="select-content">
                       <SelectItem value="maldives" className="select-item">Maldives</SelectItem>
                       <SelectItem value="bali" className="select-item">Bali</SelectItem>
                       <SelectItem value="hawaii" className="select-item">Hawaii</SelectItem>
                     </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex flex-col items-start gap-2">
                                 <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-700 md:shrink-0">
                   <Bed className="w-3 h-3 md:w-4 md:h-4" />
                   <span className="truncate">Tipo de habitación</span>
                 </div>
                                 <div className="w-full">
                   <Select onValueChange={v => handleChange('habitacion', v)}>
                                           <SelectTrigger className="text-sm !bg-white !border-gray-300 hover:!border-gray-400 focus:!border-blue-500 !text-gray-900">
                        <SelectValue placeholder="Habitación" />
                      </SelectTrigger>
                                           <SelectContent className="select-content">
                        {rooms.length > 0 ? (
                          rooms.map((room) => (
                            <SelectItem key={room.id} value={room.name} className="select-item">
                              {room.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled className="select-item">
                            No hay habitaciones disponibles
                          </SelectItem>
                        )}
                      </SelectContent>
                   </Select>
                   
                 </div>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex flex-col items-start gap-2">
                                 <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-700 md:shrink-0">
                   <Users className="w-3 h-3 md:w-4 md:h-4" />
                   <span className="truncate">Huéspedes</span>
                 </div>
                <div className="w-full">
                  <Select onValueChange={v => handleChange('huespedes', v)}>
                                         <SelectTrigger className="text-sm !bg-white !border-gray-300 hover:!border-gray-400 focus:!border-blue-500 !text-gray-900">
                       <SelectValue placeholder="Huéspedes" />
                     </SelectTrigger>
                                         <SelectContent className="select-content">
                       <SelectItem value="1" className="select-item">1 Adulto</SelectItem>
                       <SelectItem value="2" className="select-item">2 Adultos</SelectItem>
                       <SelectItem value="3" className="select-item">3 Adultos</SelectItem>
                       <SelectItem value="4" className="select-item">4 Adultos</SelectItem>
                     </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex flex-col items-start gap-2">
                                 <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-700 md:shrink-0">
                   <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                   <span className="truncate">Check-in</span>
                 </div>
                                 <div className="w-full">
                                       <Input
                      type="date"
                      value={filters.checkIn}
                      min="2025-08-20"
                      onChange={e => handleChange('checkIn', e.target.value)}
                      className="!bg-white !border-gray-300 hover:!border-gray-400 focus:!border-blue-500 !text-gray-900"
                    />
                 </div>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex flex-col items-start gap-2">
                                 <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-700 md:shrink-0">
                   <CalendarDays className="w-3 h-3 md:w-4 md:h-4" />
                   <span className="truncate">Check-out</span>
                 </div>
                                 <div className="w-full">
                                       <Input
                      type="date"
                      value={filters.checkOut}
                      min="2025-08-21"
                      onChange={e => handleChange('checkOut', e.target.value)}
                      className="!bg-white !border-gray-300 hover:!border-gray-400 focus:!border-blue-500 !text-gray-900"
                    />
                 </div>
              </div>
            </div>

                         <div className="mt-2 md:mt-0 flex md:col-span-2 lg:col-span-2 md:justify-start self-end">
               <Button 
                 size="md" 
                 className={`w-full md:w-full font-semibold text-sm shadow-md ${!filters.habitacion ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                 onClick={handleSearch}
                 disabled={isLoading || !filters.habitacion}
               >
                 {isLoading ? 'Buscando...' : !filters.habitacion ? 'Selecciona habitación' : 'Buscar'}
               </Button>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de disponibilidad */}
      <AvailabilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availabilityData={availabilityData}
        onConfirmReservation={handleConfirmReservation}
        onSelectAlternativeDate={handleSelectAlternativeDate}
        isLoading={isLoading}
        user={user}
      />

      {/* Modal de confirmación exitosa */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        reservationData={confirmedReservation}
      />

      {/* Modal de login requerido */}
      <LoginRequiredModal
        isOpen={isLoginRequiredModalOpen}
        onClose={() => setIsLoginRequiredModalOpen(false)}
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToRegister={handleNavigateToRegister}
      />
    </>
  );
}


