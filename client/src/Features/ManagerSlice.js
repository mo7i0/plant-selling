import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for manager logout
export const logoutM = createAsyncThunk('managers/logoutM', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3001/logoutM');
    return response.data; // { msg: 'Logout successful' }
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Logout failed');
  }
});

// Async thunk for manager login
export const loginM = createAsyncThunk('managers/loginM', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3001/loginM', {
      email: userData.email,
      password: userData.password,
    });
    return { manager: response.data.manager, msg: response.data.msg };
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Login failed');
  }
});

// Async thunk for manager registration
export const registerM = createAsyncThunk('managers/registerM', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3001/registerM', {
      name: userData.name,
      email: userData.email,
      phonNo: userData.phonNo,
      password: userData.password,
    });
    return { manager: response.data.manager, msg: response.data.msg };
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Registration failed');
  }
});

// Initial state for the manager slice
const initialState = {
  manager: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  msg: null,
  isLogin: false,  // Track login status
  cart: [],        // Track cart items
};

export const ManagerSlice = createSlice({
  name: 'managers',
  initialState,
  reducers: {
    addToCart: (state, action) => {
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
      // Register Manager
      .addCase(registerM.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.manager = action.payload.manager;
        state.msg = action.payload.msg;
      })
      .addCase(registerM.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload; // API error message
      })
      // Login Manager
      .addCase(loginM.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;  // Set isLogin to true after successful login
        state.manager = action.payload.manager;
        state.msg = action.payload.msg;
      })
      .addCase(loginM.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload; // API error message
      })
      // Logout Manager
      .addCase(logoutM.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;  // Set isLogin to false after logout
        state.manager = null;
        state.msg = action.payload.msg;
      })
      .addCase(logoutM.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload; // API error message
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = ManagerSlice.actions;
export default ManagerSlice.reducer;
