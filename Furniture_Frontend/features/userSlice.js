import { createSlice } from "@reduxjs/toolkit";

/**
 * 👤 Initial state for user authentication
 */
const initialState = {
  userID: null, // Stores the unique ID of the logged-in user
  isAuthenticated: false, // Indicates whether the user is logged in
};

/**
 * 🧩 Redux slice to manage user authentication state
 */
export const userSlice = createSlice({
  name: "user", // Unique slice name for Redux
  initialState, // Default state
  reducers: {
    /**
     * ✅ Updates user state with login data
     * @param {Object} state - Current Redux state
     * @param {Object} action - Action containing userID and auth flag
     */
    setUser(state, action) {
      const { userID, isAuthenticated } = action.payload;
      state.userID = userID ?? null;
      state.isAuthenticated = !!isAuthenticated;
      state.isVerified = action.payload.isVerified ?? false;
    },
  },
});

// 🔄 Export action creator
export const { setUser } = userSlice.actions;

// 🧠 Export reducer to plug into Redux store
export default userSlice.reducer;
