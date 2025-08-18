import { createContext, useContext, useState } from "react";
import standard1 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464712.webp'
import standard2 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464713.webp'
import standard3 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464714.webp'
import standard4 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464716.webp'
import standard5 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464723.webp'

const RoomsContext = createContext();

export function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Standard Room",
      price: 85000,
      description:
        "Confort esencial para una escapada tropical\nDescansá en una habitación cómoda y funcional, con diseño relajado y todos los servicios básicos. Ideal para quienes buscan una opción accesible sin resignar confort.\nVista al jardín\nHasta 2 adultos\nCama Queen\nAire acondicionado, Wi-Fi, TV LED\nSin terraza",
      images: [standard1, standard2, standard3, standard4, standard5],
    },
    {
      id: 2,
      name: "Superior Room",
      price: 95000,
      description:
        "Espacio, luz natural y conexión con la naturaleza\nUna opción más amplia, con decoración moderna y una terraza privada para disfrutar de los jardines tropicales o la piscina. Perfecta para una estadía relajante en pareja o en familia.\nVista al jardín o piscina\nHasta 2 adultos + 1 niño\nCama King o Twin\nTerraza privada\nMinibar, Wi-Fi, caja fuerte",
      image: null,
    },
    {
      id: 3,
      name: "Ocean View Room",
      price: 130000,
      description:
        "Vistas al mar Caribe desde la comodidad de tu habitación\nDisfrutá de la brisa marina y una vista parcial o frontal al océano, sin salir de tu habitación. Una experiencia visual única cada mañana.\nVista parcial o frontal al mar\nHasta 2 adultos\nCama Queen\nSin terraza\nAire acondicionado, TV, escritorio",
      image: null,
    },
    {
      id: 4,
      name: "Ocean View Deluxe",
      price: 150000,
      description:
        "Lujo frente al mar con terraza privada\nRelajate en tu terraza privada con vista directa al mar Caribe. Esta categoría combina confort, estilo y una ubicación privilegiada para ver el amanecer sobre el océano.\nVista frontal al mar\nHasta 2 adultos + 1 niño\nCama King\nTerraza privada con mobiliario\nCafetera premium, amenities exclusivos",
      image: null,
    },
    {
      id: 5,
      name: "Honeymoon Suite",
      price: 200000,
      description:
        "Romance, privacidad y lujo con vista al mar\nDiseñada especialmente para parejas, esta suite ofrece jacuzzi privado, cama King y una terraza íntima con vista al mar. Ideal para lunas de miel, aniversarios o escapadas románticas.\nVista al mar y piscina\nHasta 2 adultos\nJacuzzi en la habitación\nTerraza con camastros\nDecoración especial y vino de cortesía",
      image: null,
    },
  ]);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}

export const useRooms = () => useContext(RoomsContext);
