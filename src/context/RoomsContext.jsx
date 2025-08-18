import { createContext, useContext, useState } from "react";

const RoomsContext = createContext();

export function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState([]); 

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}

export const useRooms = () => useContext(RoomsContext);
