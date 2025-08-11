import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { MapPin, Bed, Users, Calendar, CalendarDays } from 'lucide-react';

export default function SearchFilters() {
  return (
    <Card className="max-w-6xl mx-auto shadow-lg">
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-resort-slate">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maldives">Maldives</SelectItem>
                <SelectItem value="bali">Bali</SelectItem>
                <SelectItem value="hawaii">Hawaii</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-resort-slate">
              <Bed className="w-4 h-4" />
              <span>Room type</span>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Standard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-resort-slate">
              <Users className="w-4 h-4" />
              <span>Person</span>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="2 Adults" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Adult</SelectItem>
                <SelectItem value="2">2 Adults</SelectItem>
                <SelectItem value="3">3 Adults</SelectItem>
                <SelectItem value="4">4 Adults</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-resort-slate">
              <Calendar className="w-4 h-4" />
              <span>Check in</span>
            </div>
            <Input type="date" defaultValue="2024-05-15" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-resort-slate">
              <CalendarDays className="w-4 h-4" />
              <span>Check out</span>
            </div>
            <Input type="date" defaultValue="2024-05-20" />
          </div>

          <div className="mt-2 md:mt-0 flex md:justify-end">
            <Button size="lg" className="w-full md:w-auto">Book Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


