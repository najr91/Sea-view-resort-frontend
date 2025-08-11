import RoomCard from './RoomCard.jsx';

const ROOM_IMAGE =
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1400&auto=format&fit=crop';

const rooms = Array.from({ length: 6 }).map(() => ({
  imageUrl: ROOM_IMAGE,
  title: 'The Royal Room',
  price: 190000,
  available: 'Yes',
}));

export default function RoomsGrid() {
  return (
    <section className="py-12">
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


