import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export interface RequestProps {
  data?: AxiosResponse["data"];
  loading?: "idle" | "pending" | "success";
  error?: boolean;
}

const initialState: RequestProps = {
  data: undefined,
  loading: "idle",
  error: false,
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    requestSuccess: (
      state: RequestProps,
      action: PayloadAction<RequestProps>
    ) => {
      return (state = {
        error: false,
        data: action.payload.data,
        loading: "success",
      });
    },
    requestFailure: (state: RequestProps) => {
      return (state = { ...state, error: true, loading: "success" });
    },
    requestLoading: (state: RequestProps) => {
      return (state = { ...state, loading: "pending" });
    },
  },
});

export const { requestSuccess, requestFailure, requestLoading } =
  requestSlice.actions;
