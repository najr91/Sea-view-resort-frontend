import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { useRooms } from '../../context/RoomsContext';

export default function RoomTestPanel() {
  const { rooms, setRooms } = useRooms();
  const [newRoom, setNewRoom] = useState({
    name: '',
    price: '',
    description: ''
  });

  const handleAddRoom = () => {
    if (!newRoom.name || !newRoom.price || !newRoom.description) {
      alert('Por favor completa todos los campos');
      return;
    }

    const roomToAdd = {
      id: Date.now(), // ID temporal
      name: newRoom.name,
      price: parseInt(newRoom.price),
      description: newRoom.description,
      images: [] // Sin imágenes por ahora
    };

    setRooms([...rooms, roomToAdd]);
    
    // Limpiar el formulario
    setNewRoom({
      name: '',
      price: '',
      description: ''
    });

    alert('Habitación agregada! Ve a la página principal para ver los cambios.');
  };

  return (
    <Card className="max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Panel de Prueba - Agregar Habitación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre de la habitación</label>
          <Input
            type="text"
            value={newRoom.name}
            onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
            placeholder="Ej: Suite Presidencial"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Precio por noche</label>
          <Input
            type="number"
            value={newRoom.price}
            onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
            placeholder="250000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            value={newRoom.description}
            onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
            placeholder="Descripción de la habitación..."
          />
        </div>
        
        <Button onClick={handleAddRoom} className="w-full">
          Agregar Habitación de Prueba
        </Button>
        
        <div className="text-sm text-gray-600">
          <p>Habitaciones actuales: {rooms.length}</p>
          <p>Última agregada: {rooms[rooms.length - 1]?.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
