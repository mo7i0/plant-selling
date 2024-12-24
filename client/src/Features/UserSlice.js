import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for logging out
export const logout = createAsyncThunk("users/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3001/logout");
    return response.data; // Expecting { msg: 'Logout successful' }
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Logout failed");
  }
});

// Async thunk for logging in
export const login = createAsyncThunk("users/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });
    return response.data; // Expecting { user: {...}, msg: 'Login successful' }
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Login failed");
  }
});

// Async thunk for registering a user
export const registerUser = createAsyncThunk("users/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3001/registerUser", {
      name: userData.name,
      email: userData.email,
      phonNo: userData.phonNo,
      password: userData.password,
    });
    return response.data; // Expecting { user: {...}, msg: 'Registration successful' }
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Registration failed");
  }
});

// Async thunk for adding a plant to the cart
export const addToCart = createAsyncThunk("users/addToCart", async (plantData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3001/addToCart", {
      name: plantData.name,
      image: plantData.image,
      quantity: plantData.quantity,
    });
    return response.data; // Expecting { plant: {...}, msg: 'Plant added successfully' }
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Failed to add plant");
  }
});

// Initial state for the user slice
const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
  msg: null,
  cart: [],
};

// Create the user slice
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addToCartItem: (state, action) => { // Renamed to avoid conflict
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    updateQuantity: (state, action) => {
      const { id, increment } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      if (product) {
        product.quantity += increment;
        if (product.quantity <= 0) {
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      })
      // Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.user = { ...action.payload.user, role: action.payload.user.role };
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      })
      // Logout User
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      })
      // Add Plant
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.msg = action.payload.msg;
        state.cart.push(action.payload.plant); // Add the plant to the cart or state
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      });
  },
});

// Export the reducer and actions
export default userSlice.reducer;
export const { addToCartItem, removeFromCart, updateQuantity } = userSlice.actions;
