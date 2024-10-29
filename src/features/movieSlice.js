import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    selectedMovie: null,
  },
  reducers: {
    setMovie: (state, action) => {
      state.movies = action.payload;
    },
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setMovie, selectMovie } = movieSlice.actions;
export default movieSlice.reducer;
