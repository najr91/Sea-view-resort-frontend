import { useState } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { MapPin, Bed, Users, Calendar, CalendarDays } from 'lucide-react';
import AvailabilityModal from './AvailabilityModal';
import SuccessModal from './SuccessModal';

export default function SearchFilters() {
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

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
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
      const mockData = {
        ...filters,
        disponible: Math.random() > 0.5, // Simular disponibilidad aleatoria
        precioPorNoche: 150,
        noches: calculateNights(filters.checkIn, filters.checkOut),
        precioTotal: 150 * calculateNights(filters.checkIn, filters.checkOut),
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
      const mockData = {
        ...updatedFilters,
        disponible: Math.random() > 0.3, // Mayor probabilidad de disponibilidad
        precioPorNoche: 150,
        noches: calculateNights(selectedDate, newCheckOutDate.toISOString().split('T')[0]),
        precioTotal: 150 * calculateNights(selectedDate, newCheckOutDate.toISOString().split('T')[0]),
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
      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 lg:gap-6 items-end">
            <div className="md:col-span-2">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                  <MapPin className="w-4 h-4" />
                  <span>Destino</span>
                </div>
                <div className="w-full">
                  <Select onValueChange={v => handleChange('destino', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="bali">Bali</SelectItem>
                      <SelectItem value="hawaii">Hawaii</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                  <Bed className="w-4 h-4" />
                  <span>Tipo de habitación</span>
                </div>
                <div className="w-full">
                  <Select onValueChange={v => handleChange('habitacion', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estándar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Room</SelectItem>
                      <SelectItem value="Superior Room">Deluxe</SelectItem>
                      <SelectItem value="Ocean View Room">Super Deluxe</SelectItem>
                      <SelectItem value="Ocean View Deluxe">Deluxe</SelectItem>
                      <SelectItem value="Honeymoon Suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                  <Users className="w-4 h-4" />
                  <span>Huéspedes</span>
                </div>
                <div className="w-full">
                  <Select onValueChange={v => handleChange('huespedes', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="2 Adultos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Adulto</SelectItem>
                      <SelectItem value="2">2 Adultos</SelectItem>
                      <SelectItem value="3">3 Adultos</SelectItem>
                      <SelectItem value="4">4 Adultos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                  <Calendar className="w-4 h-4" />
                  <span>Check-in</span>
                </div>
                                 <div className="w-full">
                   <Input
                     type="date"
                     value={filters.checkIn}
                     min="2025-08-20"
                     onChange={e => handleChange('checkIn', e.target.value)}
                   />
                 </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                  <CalendarDays className="w-4 h-4" />
                  <span>Check-out</span>
                </div>
                                 <div className="w-full">
                   <Input
                     type="date"
                     value={filters.checkOut}
                     min="2025-08-21"
                     onChange={e => handleChange('checkOut', e.target.value)}
                   />
                 </div>
              </div>
            </div>

            <div className="mt-2 md:mt-0 flex md:col-span-2 md:justify-start self-end">
              <Button 
                size="md" 
                className="w-full md:w-full" 
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? 'Buscando...' : 'Buscar'}
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
      />

      {/* Modal de confirmación exitosa */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        reservationData={confirmedReservation}
      />
    </>
  );
}


