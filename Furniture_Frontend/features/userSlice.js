import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userID = action.payload.userID;
      state.isAuthenticated = !!action.payload.isAuthenticated;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
