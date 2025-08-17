import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';

export default function AdminRooms() {
  return (
    <div className="bg-white py-10">
      <div className="container">
        <h1 className="text-2xl md:text-3xl font-serif text-resort-olive mb-6">
          Catálogo de habitaciones
        </h1>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <p className="text-sm text-resort-slate">
                Administra el catálogo: nombre, descripción, precio e imágenes.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nueva habitación
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-resort-cream/60 text-resort-slate">
                  <tr>
                    <th className="text-left p-3">Tipo</th>
                    <th className="text-left p-3">Descripción</th>
                    <th className="text-left p-3">Precio</th>
                    <th className="text-left p-3">Fotos</th>
                    <th className="text-right p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="p-4 text-gray-400 italic">
                      Sin habitaciones cargadas
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
