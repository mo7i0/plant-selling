// src/Store/store.js

import { configureStore } from '@reduxjs/toolkit';
// Correct import paths based on your folder structure
import usersReducer from '../Features/UserSlice'; 
import PlantsReduser from "../Features/PlantSlice"; // Users file is directly in the Features folder
import ManagerSlice from '../Features/ManagerSlice'; // Assuming ManagerSlice is exported correctly 
const store = configureStore({
  reducer: {
    plants:PlantsReduser,
    users: usersReducer,
    managers: ManagerSlice,
  },
});

export default store;
