import { Card, CardContent } from '../../components/ui/Card';

export default function ExploreSection({ imageUrl, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-[340px] object-cover rounded-xl" />
      </div>
      <div className="-mt-12 px-6 pb-6">
        <Card className="mx-auto max-w-3xl">
          <CardContent className="pt-4">
            <h3 className="text-center font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-center text-xs text-resort-slate leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


