import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { requestSlice } from "./requestSlice";
import { tokenSlice } from "./tokenSlice";
import { userSlice } from "./userSlice";

export const rootReducer = combineReducers({
  token: tokenSlice.reducer,
  user: userSlice.reducer,
  request: requestSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
