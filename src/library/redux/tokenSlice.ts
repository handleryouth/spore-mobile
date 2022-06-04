import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: "",
  reducers: {
    addToken: (state: string, action: PayloadAction<string>) => {
      return (state = action.payload);
    },
    removeToken: (state: string) => {
      state = "";
      return state;
    },
  },
});

export const { addToken, removeToken } = tokenSlice.actions;
