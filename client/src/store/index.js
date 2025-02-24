import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authSlice from "./authSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
  },
});
