import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { MapPin, Bed, Users, Calendar, CalendarDays } from 'lucide-react';

export default function SearchFilters() {
  return (
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
                <Select>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Estándar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Estándar</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
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
                <Select>
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
                <span>Ingreso</span>
              </div>
              <div className="w-full">
                <Input type="date" defaultValue="2024-05-15" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                <CalendarDays className="w-4 h-4" />
                <span>Egreso</span>
              </div>
              <div className="w-full">
                <Input type="date" defaultValue="2024-05-20" />
              </div>
            </div>
          </div>

          <div className="mt-2 md:mt-0 flex md:col-span-2 md:justify-start self-end">
            <Button size="md" className="w-full md:w-full">Buscar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


