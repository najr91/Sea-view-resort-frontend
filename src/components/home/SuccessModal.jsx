import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { CheckCircle, X } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose, reservationData }) {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-green-800">
            ¡Reserva Confirmada!
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Tu reserva ha sido confirmada exitosamente. Te hemos enviado un email con todos los detalles.
            </p>
          </div>

          {/* Detalles de la reserva */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Detalles de tu reserva:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="font-medium">{formatDate(reservationData?.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="font-medium">{formatDate(reservationData?.checkOut)}</span>
              </div>
              <div className="flex justify-between">
                <span>Habitación:</span>
                <span className="font-medium">{reservationData?.habitacion}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-medium text-green-600">{formatPrice(reservationData?.precioTotal)}</span>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Próximos pasos:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Revisa tu email para confirmar los detalles</li>
              <li>• Llega 15 minutos antes del check-in</li>
              <li>• Ten tu documento de identidad listo</li>
            </ul>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Entendido
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Aquí podrías implementar la lógica para ver la reserva
                console.log('Ver reserva');
              }}
              className="flex-1"
            >
              Ver Reserva
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
