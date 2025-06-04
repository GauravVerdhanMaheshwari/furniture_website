import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "../features/adminSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
  },
});
