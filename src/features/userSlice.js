import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
