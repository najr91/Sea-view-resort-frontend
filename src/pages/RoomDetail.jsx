import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ChevronLeft, Wifi, Car, Coffee, Waves, Dumbbell, Utensils } from 'lucide-react';
import Gallery from '../components/rooms/Gallery.jsx';
import Features from '../components/rooms/Features.jsx';
import Amenities from '../components/rooms/Amenities.jsx';
import BookingSidebar from '../components/rooms/BookingSidebar.jsx';
import { getRoomById } from '../services/rooms.js';

const amenities = [
    { icon: Wifi, label: 'WiFi gratuito' },
    { icon: Car, label: 'Estacionamiento con valet' },
    { icon: Coffee, label: 'Room Service 24/7' },
    { icon: Waves, label: 'Acceso a spa' },
    { icon: Dumbbell, label: 'Gimnasio' },
    { icon: Utensils, label: 'Gastronomía premium' },
];

const roomFeatures = [
    'Cama king con ropa de cama premium',
    'Balcón privado con vistas espectaculares',
    'Entretenimiento de última generación',
    'Baño estilo spa con ducha tipo lluvia',
    'Acabados en mármol con amenities de lujo',
    'Climatización independiente',
    'Cortinas blackout para un descanso perfecto',
    'Minibar con selección premium',
];

export default function RoomDetail() {
    const { id } = useParams();
    const room = useMemo(() => getRoomById(id || 'demo-room'), [id]);

    return (
        <div className="min-h-screen bg-resort-cream">
            <main className="container px-4 py-8">
                <div className="mb-6">
                    <Link to="/rooms" className="inline-flex items-center gap-2 text-resort-olive hover:underline">
                        <ChevronLeft className="w-4 h-4" /> Volver a habitaciones
                    </Link>
                </div>

                {/* Hero */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-display text-gray-900 mb-3">{room.title}</h1>
                    <p className="text-lg text-resort-slate max-w-2xl">Disfrutá de nuestra {room.title} con vistas al mar.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Galería */}
                    <div className="lg:col-span-2">
                        <Gallery images={room.images} />
                        <Features features={room.features} />
                        <Amenities items={amenities} />
                    </div>

                    {/* Sidebar de reserva */}
                    <div className="lg:col-span-1">
                        <BookingSidebar pricePerNight={room.pricePerNight} />
                    </div>
                </div>
            </main>
        </div>
    );
}


