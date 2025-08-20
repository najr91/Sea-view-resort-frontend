import { MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

export default function DestinationSelect({ value, onChange }) {
    return (
        <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                <MapPin className="w-4 h-4" />
                <span>Destino</span>
            </div>
            <div className="w-full">
                <Select value={value} onValueChange={onChange}>
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
    );
}


