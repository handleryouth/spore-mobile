import { useCallback, useState } from "react";
import { AxiosResponse } from "axios";

import requestHelper from "../requestHelper";

interface RequstResponse<T> {
  loading: "idle" | "loading" | "error" | "success";
  data?: T;
  error?: {
    message: AxiosResponse["statusText"];
    status: AxiosResponse["status"];
  };
}

interface HooksProps<T> {
  endpoint: string;
  method: "GET" | "POST";
  params: T;
}

export default function useQuery<T, K>({
  endpoint,
  method,
  params,
}: HooksProps<T>) {
  const [responseData, setResponseData] = useState<RequstResponse<K>>({
    loading: "idle",
  });

  const attemptRequest = useCallback(() => {
    setResponseData({ loading: "loading", data: undefined, error: undefined });
    requestHelper({
      method,
      url: endpoint,
      params,
    })
      .then((res) =>
        setResponseData({
          data: res.data,
          loading: "success",
          error: undefined,
        })
      )
      .catch((err) =>
        setResponseData({
          data: undefined,
          loading: "error",
          error: {
            message: err.response?.statusText,
            status: err.response?.status,
          },
        })
      );
  }, [endpoint, method, params]);

  return {
    ...responseData,
    attemptRequest,
  };
}
