import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Modal from '../ui/Modal';
import { X, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDate, formatPrice } from '../../lib/formatters';

export default function AvailabilityModal({ isOpen, onClose, availabilityData, onConfirmReservation, onSelectAlternativeDate, isLoading: externalLoading, user }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmReservation = async () => {
        setIsLoading(true);
        try {
            await onConfirmReservation(availabilityData);
            // No cerramos el modal aquí, se cerrará cuando se muestre el modal de éxito
        } catch (error) {
            console.error('Error al confirmar la reserva:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Modal open={isOpen} onClose={onClose} size="md">
            <Card className="w-full max-h-[90vh] overflow-y-auto">
                {externalLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600">Buscando disponibilidad...</p>
                        </div>
                    </div>
                )}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold">
                        Disponibilidad de Habitación
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Información de la búsqueda */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Detalles de la búsqueda:</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Check-in: {formatDate(availabilityData?.checkIn)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Check-out: {formatDate(availabilityData?.checkOut)}</span>
                            </div>
                            <div>
                                <span>Habitación: {availabilityData?.habitacion}</span>
                            </div>
                            <div>
                                <span>Huéspedes: {availabilityData?.huespedes}</span>
                            </div>
                        </div>
                    </div>

                    {/* Resultado de disponibilidad */}
                    {availabilityData?.disponible ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <div>
                                    <h3 className="font-semibold text-green-800">¡Habitación disponible!</h3>
                                    <p className="text-green-700 text-sm">
                                        La habitación está disponible para las fechas seleccionadas
                                    </p>
                                </div>
                            </div>

                            {/* Información de precio */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-2">Información de precio:</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Precio por noche:</span>
                                        <span className="font-medium">{formatPrice(availabilityData?.precioPorNoche || 0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Noches:</span>
                                        <span className="font-medium">{availabilityData?.noches || 0}</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                                        <span>Total:</span>
                                        <span className="text-blue-900">{formatPrice(availabilityData?.precioTotal || 0)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Información de autenticación */}
                            {!user && (
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-yellow-600" />
                                        <span className="font-medium text-yellow-800">Inicia sesión para confirmar</span>
                                    </div>
                                    <p className="text-yellow-700 text-sm">
                                        Necesitas estar logueado para confirmar tu reserva. Al hacer clic en "Confirmar Reserva" serás redirigido a la página de login.
                                    </p>
                                </div>
                            )}

                            {/* Botón de confirmar */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={handleConfirmReservation}
                                    disabled={isLoading}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    {isLoading ? 'Confirmando...' : user ? 'Confirmar Reserva' : 'Iniciar Sesión y Confirmar'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="flex-1"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <XCircle className="w-6 h-6 text-red-600" />
                                <div>
                                    <h3 className="font-semibold text-red-800">Habitación no disponible</h3>
                                    <p className="text-red-700 text-sm">
                                        La habitación no está disponible para las fechas seleccionadas
                                    </p>
                                </div>
                            </div>

                            {/* Días disponibles alternativos */}
                            {availabilityData?.diasDisponibles && availabilityData.diasDisponibles.length > 0 && (
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-yellow-900 mb-3 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Fechas alternativas disponibles:
                                    </h4>
                                    <div className="space-y-2">
                                        {availabilityData.diasDisponibles.map((fecha, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                                                <span className="text-sm">{formatDate(fecha)}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        onSelectAlternativeDate(fecha);
                                                    }}
                                                >
                                                    Seleccionar
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-center pt-4">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="px-8"
                                >
                                    Cerrar
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Modal>
    );
}


