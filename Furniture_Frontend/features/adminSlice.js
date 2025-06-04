import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminID: null,
  isAuthenticated: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.adminID = action.payload.adminID;
      state.isAuthenticated = !!action.payload.isAuthenticated;
    },
  },
});

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
