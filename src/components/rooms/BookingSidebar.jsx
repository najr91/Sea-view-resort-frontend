import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Sidebar de reserva con cálculo de costos.
 *
 * Encapsula UI y lógica de cálculo del resumen.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.pricePerNight - Precio por noche de la habitación.
 * @returns {JSX.Element}
 */
export default function BookingSidebar({ pricePerNight }) {
  const nights = 3;
  const serviceFee = 25000;
  const taxes = 30000;
  const subtotal = pricePerNight * nights;
  const total = subtotal + serviceFee + taxes;

  return (
    <div
      className="sticky"
      style={{ top: "calc(var(--app-header-height, 64px) + 1rem)" }}
    >
      <Card className="border-2 border-resort-olive/20">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                ${pricePerNight.toLocaleString()}
              </span>
              <span className="text-resort-slate">/noche</span>
            </div>
            <p className="text-sm text-resort-olive font-medium">
              Beneficios exclusivos por reserva anticipada
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Check-in
                </label>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <Calendar className="h-4 w-4 text-resort-slate" />
                  <span className="text-sm text-resort-slate">15 Dic</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Check-out
                </label>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <Calendar className="h-4 w-4 text-resort-slate" />
                  <span className="text-sm text-resort-slate">18 Dic</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Huéspedes
              </label>
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Users className="h-4 w-4 text-resort-slate" />
                <span className="text-sm text-resort-slate">2 Adultos</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm text-gray-900">
              <span>
                ${pricePerNight.toLocaleString()} × {nights} noches
              </span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-900">
              <span>Servicio</span>
              <span>${serviceFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-900">
              <span>Impuestos</span>
              <span>${taxes.toLocaleString()}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <Button asChild className="w-full" size="lg">
            {" "}
            <Link to="/login">Reservar ahora</Link>{" "}
          </Button>
          <p className="text-xs text-resort-slate text-center mt-4">
            Aún no se realizará ningún cargo
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            ¿Necesitás ayuda?
          </h4>
          <p className="text-sm text-resort-slate mb-4">
            Nuestro equipo de concierge está disponible 24/7 para ayudarte a
            planificar la estadía perfecta.
          </p>
          <Button variant="outline" className="w-full bg-transparent">
            Contactar concierge
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
