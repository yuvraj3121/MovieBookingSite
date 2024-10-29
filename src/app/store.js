import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.js";
import movieReducer from "../features/movieSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
});
