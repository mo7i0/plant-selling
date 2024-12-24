import React, { createContext, useState } from "react";

import Image1 from "../Plants/Ikea2.png";

import Image2 from "../Plants/Ikea.png";

import Image3 from "../Plants/Ikea1.png";

import Image4 from "../Plants/Ikea4.png";

import Image6 from "../Plants/Ikea5.png";

import Image7 from "../Plants/Ikea3.png";

import Image8 from "../Plants/Ikea7.png";

import Image9 from "../Plants/Ikea8.png";


// Create Plant Context

export const PlantContext = createContext();


// Initial Seedlings Data

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

const PlantProvider = ({ children }) => {

  const [plants, setPlants] = useState(initialSeedlings);


  // Function to add a new plant

  const addPlant = (newPlant) => {

    setPlants((prevPlants) => [...prevPlants, newPlant]);

  };


  // Function to remove a plant

  const removePlant = (id) => {

    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));

  };


  const updatePlant = (updatedPlant) => {

    setPlants((prevPlants) =>

      prevPlants.map((plant) => (plant.id === updatedPlant.id ? updatedPlant : plant))

    );

  };


  return (

    <PlantContext.Provider value={{ plants, addPlant, removePlant,updatePlant  }}>

      {children}

    </PlantContext.Provider>

  );

};


export default PlantProvider;

