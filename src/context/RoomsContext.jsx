import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import standard1 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464712.webp'
import standard2 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464713.webp'
import standard3 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464714.webp'
import standard4 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464716.webp'
import standard5 from '../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464723.webp'
import superior1 from '../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259650.webp'
import superior2 from '../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259638.webp'
import superior3 from '../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259639.webp'
import superior4 from '../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259640.webp'
import superior5 from '../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259646.webp'
import superior6 from '../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259647.webp'
import honeymoon1 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817153.webp'
import honeymoon2 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817169 (1).webp'
import honeymoon3 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817165.webp'
import honeymoon4 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-28356599.webp'
import honeymoon5 from '../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817152.webp'
import oceanview1 from '../assets/Habitaciones/OceanView/pexels-quang-nguyen-vinh-222549-14021929.jpg';
import oceanview2 from '../assets/Habitaciones/OceanView/pexels-quang-nguyen-vinh-222549-14021932.jpg';
import oceanview3 from '../assets/Habitaciones/OceanView/apartment-1899964_1280.jpg';
import oceanviewDeluxe1 from '../assets/Habitaciones/OceanviewDeluxe/pexels-asadphoto-28843954.jpg';
import oceanviewDeluxe2 from '../assets/Habitaciones/OceanviewDeluxe/pexels-asadphoto-28843941.jpg';
import oceanviewDeluxe3 from '../assets/Habitaciones/OceanviewDeluxe/pexels-asadphoto-28843958.jpg';
import oceanviewDeluxe4 from '../assets/Habitaciones/OceanviewDeluxe/pexels-asadphoto-28843952.jpg';

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
      images: [superior1, superior2, superior3, superior4, superior5, superior6],
    },
    {
      id: 3,
      name: "Ocean View Room",
      price: 130000,
      description:
        "Vistas al mar Caribe desde la comodidad de tu habitación\nDisfrutá de la brisa marina y una vista parcial o frontal al océano, sin salir de tu habitación. Una experiencia visual única cada mañana.\nVista parcial o frontal al mar\nHasta 2 adultos\nCama Queen\nSin terraza\nAire acondicionado, TV, escritorio",
      images: [oceanview1, oceanview2, oceanview3],
    },
    {
      id: 4,
      name: "Ocean View Deluxe",
      price: 150000,
      description:
        "Lujo frente al mar con terraza privada\nRelajate en tu terraza privada con vista directa al mar Caribe. Esta categoría combina confort, estilo y una ubicación privilegiada para ver el amanecer sobre el océano.\nVista frontal al mar\nHasta 2 adultos + 1 niño\nCama King\nTerraza privada con mobiliario\nCafetera premium, amenities exclusivos",
      images: [oceanviewDeluxe1, oceanviewDeluxe2, oceanviewDeluxe3, oceanviewDeluxe4],
    },
    {
      id: 5,
      name: "Honeymoon Suite",
      price: 200000,
      description:
        "Romance, privacidad y lujo con vista al mar\nDiseñada especialmente para parejas, esta suite ofrece jacuzzi privado, cama King y una terraza íntima con vista al mar. Ideal para lunas de miel, aniversarios o escapadas románticas.\nVista al mar y piscina\nHasta 2 adultos\nJacuzzi en la habitación\nTerraza con camastros\nDecoración especial y vino de cortesía",
      images: [honeymoon1, honeymoon2, honeymoon3, honeymoon4, honeymoon5],
    },
  ]);

  // 👉 Intentar traer habitaciones del backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/rooms");
        if (Array.isArray(data) && data.length > 0) {
          setRooms(data);
        }
      } catch (error) {
        console.warn("No se pudo conectar al backend, se muestran las habitaciones locales.");
      }
    };

    fetchRooms();
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}

export const useRooms = () => useContext(RoomsContext);
