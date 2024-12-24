import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch and update a plant by ID
export const updatePlants = createAsyncThunk(
  "plants/updatePlant",
  async ({ id, name, price }) => {
    const response = await axios.put(`http://localhost:3001/plants/${id}`, {
      name,
      price,
    });
    console.log("API Response:", response.data); // Log the response data
    return response.data; // Updated plant data
  }
);

// Async thunk to fetch a plant by ID
export const fetchPlantById = createAsyncThunk(
  "plants/fetchPlantById",
  async (id) => {
    const response = await axios.get(`http://localhost:3001/plants/${id}`);
    return response.data;
  }
);

const initialState = {
  cart: [],
  plants: [],
  selectedPlant: null,
  isLoading: false,
  isError: false,
  msg: "",
};

export const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    // Add a plant to the cart
    addToCart: (state, action) => {
      const product = action.payload;
    
      const existingProduct = state.cart.find(
        (item) => item.cartItemId === product.cartItemId
      );
    
      if (existingProduct) {
        // If a product with the same cartItemId exists, increase its quantity
        existingProduct.quantity += 1;
      } else {
        // Otherwise, add the product to the cart with an initial quantity of 1
        state.cart.push({ ...product, quantity: 1 });
      }
    
      console.log("Updated cart:", state.cart);
    },
    
    // Remove a plant from the cart
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productId);
    },

    // Update the quantity of a plant in the cart
    updateQuantity: (state, action) => {
      const { id, increment } = action.payload;
      const product = state.cart.find((item) => item.id === id);

      if (product) {
        product.quantity += increment;
        if (product.quantity <= 0) {
          // Remove the plant from the cart if the quantity is zero or less
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
    },

    // Add a plant to the plants list
    addPlant: (state, action) => {
      state.plants.push(action.payload);
    },

    // Remove a plant from the plants list
    removePlant: (state, action) => {
      const plantId = action.payload;
      state.plants = state.plants.filter((plant) => plant.id !== plantId);
    },

    // Update a plant's details in the plants list
    updatePlant: (state, action) => {
      const updatedPlant = action.payload;
      state.plants = state.plants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      );
    },
  },

  // Extra reducers to handle async actions
  extraReducers: (builder) => {
    builder
      .addCase(updatePlants.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updatePlants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const updatedPlant = action.payload;

        // Find the plant in the list and update its details
        const index = state.plants.findIndex((p) => p._id === updatedPlant._id);
        if (index !== -1) {
          state.plants[index] = updatedPlant;
        }

        // Update the selectedPlant to the latest details
        state.selectedPlant = updatedPlant;
      })
      .addCase(updatePlants.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = "Failed to update plant.";
      })
      .addCase(fetchPlantById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPlantById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPlant = action.payload;
      })
      .addCase(fetchPlantById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Export actions and reducer
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  addPlant,
  removePlant,
  updatePlant,
} = plantsSlice.actions;

export default plantsSlice.reducer;
