import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ChevronLeft, ChevronRight, Wifi, Car, Coffee, Waves, Dumbbell, Utensils, Calendar, Users } from 'lucide-react';

import honeymoon1 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-28356599.webp';
import honeymoon2 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817152.webp';
import honeymoon3 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817153.webp';
import honeymoon4 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817165.webp';
import honeymoon5 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817169 (1).webp';

const roomImages = [honeymoon1, honeymoon2, honeymoon3, honeymoon4, honeymoon5];

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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % roomImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);

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
                    <h1 className="text-3xl md:text-4xl font-display text-gray-900 mb-3">Vive el lujo sin límites</h1>
                    <p className="text-lg text-resort-slate max-w-2xl">Disfrutá de nuestra Honeymoon Suite con vistas al mar.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Galería */}
                    <div className="lg:col-span-2">
                        <div className="relative mb-8">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                                <img
                                    src={roomImages[currentImageIndex]}
                                    alt={`Vista habitación ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                            </div>

                            <Button
                                variant="outline"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white h-10 w-10 p-0 rounded-full"
                                onClick={prevImage}
                                aria-label="Imagen anterior"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white h-10 w-10 p-0 rounded-full"
                                onClick={nextImage}
                                aria-label="Imagen siguiente"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {roomImages.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/60'}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                        aria-label={`Ir a imagen ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <Card className="mb-8">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Características de la habitación</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {roomFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-resort-olive rounded-full flex-shrink-0" />
                                            <span className="text-resort-slate">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Amenidades que redefinen el confort</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {amenities.map((amenity, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center text-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                                        >
                                            <amenity.icon className="h-8 w-8 text-resort-olive group-hover:text-resort-olive/80 transition-colors" />
                                            <span className="text-sm font-medium text-gray-900">{amenity.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar de reserva */}
                    <div className="lg:col-span-1">
                        <div className="sticky" style={{ top: 'calc(var(--app-header-height, 64px) + 1rem)' }}>
                            <Card className="border-2 border-resort-olive/20">
                                <CardContent className="p-8">
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-3xl font-bold text-gray-900">$250.000</span>
                                            <span className="text-resort-slate">/noche</span>
                                        </div>
                                        <p className="text-sm text-resort-olive font-medium">Beneficios exclusivos por reserva anticipada</p>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">Check-in</label>
                                                <div className="flex items-center gap-2 p-3 border rounded-lg">
                                                    <Calendar className="h-4 w-4 text-resort-slate" />
                                                    <span className="text-sm text-resort-slate">15 Dic</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-900">Check-out</label>
                                                <div className="flex items-center gap-2 p-3 border rounded-lg">
                                                    <Calendar className="h-4 w-4 text-resort-slate" />
                                                    <span className="text-sm text-resort-slate">18 Dic</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-900">Huéspedes</label>
                                            <div className="flex items-center gap-2 p-3 border rounded-lg">
                                                <Users className="h-4 w-4 text-resort-slate" />
                                                <span className="text-sm text-resort-slate">2 Adultos</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between text-sm text-gray-900">
                                            <span>$250.000 × 3 noches</span>
                                            <span>$750.000</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-900">
                                            <span>Servicio</span>
                                            <span>$25.000</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-900">
                                            <span>Impuestos</span>
                                            <span>$30.000</span>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <div className="flex justify-between font-semibold text-gray-900">
                                            <span>Total</span>
                                            <span>$805.000</span>
                                        </div>
                                    </div>

                                    <Button className="w-full" size="lg">Reservar ahora</Button>
                                    <p className="text-xs text-resort-slate text-center mt-4">Aún no se realizará ningún cargo</p>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardContent className="p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">¿Necesitás ayuda?</h4>
                                    <p className="text-sm text-resort-slate mb-4">Nuestro equipo de concierge está disponible 24/7 para ayudarte a planificar la estadía perfecta.</p>
                                    <Button variant="outline" className="w-full bg-transparent">Contactar concierge</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


