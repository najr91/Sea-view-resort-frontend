import { createContext, useContext, useState } from "react";

const RoomsContext = createContext();

export function RoomsProvider({ children }) {
  
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Suite Deluxe",
      price: 120000,
      description: "Amplia suite con vista al mar",
      image: null,
    },
    {
      id: 2,
      name: "Habitación Estándar",
      price: 80000,
      description: "Confort esencial para una escapada tropical",
      image: null,
    },
    {
      id: 3,
      name: "Habitación Superior",
      price: 95000,
      description: "Espacio, luz natural y conexión con la naturaleza",
      image: null,
    },
    {
      id: 4,
      name: "Honeymoon Suite",
      price: 150000,
      description: "Diseñada para un romanticismo sin interrupciones",
      image: null,
    },
    {
      id: 5,
      name: "Suite Familiar",
      price: 110000,
      description: "Ideal para familias, amplia y cómoda",
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
