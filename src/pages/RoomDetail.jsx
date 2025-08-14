import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

const mockRoom = {
    id: 'demo-room',
    title: 'Honeymoon Suite',
    description:
        'Nuestra suite Honeymoon ofrece una experiencia de lujo con vista al mar, balcón privado y todas las comodidades para una estadía inolvidable.',
    price: 250000,
    amenities: ['WiFi', 'Desayuno', 'Piscina', 'Vista al mar'],
    image:
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1400&auto=format&fit=crop',
};

export default function RoomDetail() {
    const { id } = useParams();

    const room = useMemo(() => {
        if (id === mockRoom.id) return mockRoom;
        return mockRoom; // Por ahora, siempre devolvemos el mock
    }, [id]);

    return (
        <div className="bg-white">
            <div className="container py-8">
                <div className="mb-6">
                    <Link to="/rooms" className="inline-flex items-center gap-2 text-resort-olive hover:underline">
                        <ChevronLeft className="w-4 h-4" /> Volver a habitaciones
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <img src={room.image} alt={room.title} className="w-full h-80 object-cover rounded-xl shadow" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display text-gray-900">{room.title}</h1>
                        <p className="mt-3 text-resort-slate">{room.description}</p>
                        <div className="mt-4 text-xl font-semibold text-gray-900">${room.price.toLocaleString()}</div>

                        <ul className="mt-4 flex flex-wrap gap-2 text-sm text-resort-slate">
                            {room.amenities.map((a) => (
                                <li key={a} className="px-3 py-1 rounded-full bg-gray-100">{a}</li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            <Button className="w-full sm:w-auto">Reservar ahora</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


