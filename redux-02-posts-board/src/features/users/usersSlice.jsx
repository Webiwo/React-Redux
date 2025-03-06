import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "Phil Collins" },
  { id: "2", name: "James Hetfield" },
  { id: "3", name: "Eric Clapton" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const allUsers = (state) => state.users;
export default usersSlice.reducer;
