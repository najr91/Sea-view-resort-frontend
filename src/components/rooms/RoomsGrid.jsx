import RoomCard from './RoomCard.jsx';

const ROOM_IMAGE =
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1400&auto=format&fit=crop';

import standard1 from '../../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464712.webp';
import standard2 from '../../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464713.webp';
import standard3 from '../../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464714.webp';
import standard4 from '../../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464716.webp';
import standard5 from '../../assets/Habitaciones/StandardRoom/pexels-siddanth-sawant-178759136-28464723.webp';

import superior1 from '../../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259638.webp';
import superior2 from '../../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259639.webp';
import superior3 from '../../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259640.webp';
import superior4 from '../../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259646.webp';
import superior5 from '../../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259647.webp';
import superior6 from '../../assets/Habitaciones/SuperiorRoom/pexels-siddanth-sawant-178759136-33259650.webp';

import honeymoon1 from '../../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-28356599.webp';
import honeymoon2 from '../../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817152.webp';
import honeymoon3 from '../../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817153.webp';
import honeymoon4 from '../../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817165.webp';
import honeymoon5 from '../../assets/Habitaciones/HoneymoonSuite/pexels-ahmetcotur-31817169 (1).webp';

const rooms = Array.from({ length: 6 }).map((_, idx) => {
  const base = {
    id: 'demo-room',
    imageUrl: ROOM_IMAGE,
    imageUrls: [],
    title: 'Habitación',
    price: 190000,
    available: 'Yes',
  };

  if (idx === 0)
    return {
      ...base,
      id: 'demo-room',
      title: 'Standard',
      imageUrl: standard1,
      imageUrls: [standard1, standard2, standard3, standard4, standard5],
    };
  if (idx === 1)
    return {
      ...base,
      title: 'Superior',
      imageUrl: superior1,
      imageUrls: [superior1, superior2, superior3, superior4, superior5, superior6],
    };
  if (idx === 2)
    return {
      ...base,
      title: 'Honeymoon Suite',
      imageUrl: honeymoon1,
      imageUrls: [honeymoon1, honeymoon2, honeymoon3, honeymoon4, honeymoon5],
    };
  return base;
});

export default function RoomsGrid() {
  return (
    <section id="rooms-grid" className="py-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <RoomCard key={idx} {...room} />
          ))}
        </div>
      </div>
    </section>
  );
}


