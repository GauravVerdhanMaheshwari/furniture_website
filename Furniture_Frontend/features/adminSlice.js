import { createSlice } from "@reduxjs/toolkit";

/**
 * 🔐 Initial state for admin authentication and identification
 */
const initialState = {
  adminID: null, // Stores logged-in admin's unique ID
  isAuthenticated: false, // Authentication flag for admin login status
};

/**
 * 🧩 Redux slice for admin-related authentication state management
 */
const adminSlice = createSlice({
  name: "admin", // Unique slice name
  initialState,
  reducers: {
    /**
     * ✅ Sets admin credentials and authentication status
     * @param {Object} state - Current Redux state
     * @param {Object} action - Action with payload: { adminID, isAuthenticated }
     */
    setAdmin(state, action) {
      state.adminID = action.payload.adminID;
      state.isAuthenticated = !!action.payload.isAuthenticated;
    },
  },
});

// 👇 Export individual action creators
export const { setAdmin } = adminSlice.actions;

// 👇 Export the reducer to use in Redux store
export default adminSlice.reducer;
