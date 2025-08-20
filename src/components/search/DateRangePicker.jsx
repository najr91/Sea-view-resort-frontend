import { Calendar, CalendarDays } from 'lucide-react';
import { Input } from '../ui/Input';

export default function DateRangePicker({ checkIn, checkOut, onChange }) {
    return (
        <>
            <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                    <Calendar className="w-4 h-4" />
                    <span>Check-in</span>
                </div>
                <div className="w-full">
                    <Input
                        type="date"
                        value={checkIn}
                        min="2025-08-20"
                        onChange={(e) => onChange('checkIn', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-resort-slate md:shrink-0">
                    <CalendarDays className="w-4 h-4" />
                    <span>Check-out</span>
                </div>
                <div className="w-full">
                    <Input
                        type="date"
                        value={checkOut}
                        min="2025-08-21"
                        onChange={(e) => onChange('checkOut', e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}


