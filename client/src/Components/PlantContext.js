import React, { createContext, useState } from "react";
import Image1 from "./assets/HomeImg/3.png";
import Image2 from "./assets/HomeImg/1.png";
import Image3 from "./assets/HomeImg/2.png";
import Image4 from "./assets/HomeImg/4.png";
import Image6 from "./assets/HomeImg/5.png";
import Image7 from "./assets/HomeImg/10.png";
import Image8 from "./assets/HomeImg/11.png";
import Image9 from "./assets/HomeImg/12.png";


// PlantContext.js
export const PlantContext = createContext();

const initialSeedlings = [
  { id: 1, image: Image1, name: "Ficus tree", price: 5.0 },
  { id: 2, image: Image2, name: "Dracaena", price: 3.0 },
  { id: 3, image: Image3, name: "Green Princess", price: 2.0 },
  { id: 4, image: Image4, name: "Zamioculcas", price: 2.0 },
  { id: 5, image: Image6, name: "Slap", price: 2.3 },
  { id: 6, image: Image7, name: "Orchid", price: 1.5 },
  { id: 7, image: Image8, name: "Sansevieria", price: 5.0 },
  { id: 8, image: Image9, name: "Philodendron", price: 3.0 },
];

// PlantProvider Component
export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState(initialSeedlings);

  // Function to add a new plant
  const addPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  return (
    <PlantContext.Provider value={{ plants, addPlant }}>
      {children}
    </PlantContext.Provider>
  );
};


export default PlantProvider;
