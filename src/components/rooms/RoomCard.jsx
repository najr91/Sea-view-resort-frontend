import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Wifi, Coffee, Waves } from 'lucide-react';

export default function RoomCard({ imageUrl, title, price, available = 'Yes' }) {
  return (
    <Card className="overflow-hidden bg-white">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </div>
      <CardContent className="px-0">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-start justify-between text-sm text-resort-slate">
            <h3 className="text-gray-900 font-medium">{title}</h3>
            <span className="text-[11px]">Available: {available}</span>
          </div>
          <div className="mt-2 text-gray-900 font-medium">${price.toLocaleString()}</div>
        </div>

        <div className="px-4 py-3 flex items-center gap-4 text-resort-slate">
          <span className="inline-flex items-center gap-1 text-xs"><Wifi className="w-4 h-4" /> WiFi</span>
          <span className="inline-flex items-center gap-1 text-xs"><Coffee className="w-4 h-4" /> Breakfast</span>
          <span className="inline-flex items-center gap-1 text-xs"><Waves className="w-4 h-4" /> Pool</span>
        </div>

        <div className="px-4 pb-4">
          <Button className="w-full">Book now</Button>
        </div>
      </CardContent>
    </Card>
  );
}


